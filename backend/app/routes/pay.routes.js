import Stripe from 'stripe';
import express from 'express';
import ShoppingCart from '../models/cart.models.js';
import Product from '../models/product.models.js';

const stripe = Stripe('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const payRouter = express.Router();


const calculateOrderAmount = async (userID) => {
  try {
    // Obtener los carritos activos del mismo usuario
    const activeCarts = await ShoppingCart.findAll({
      where: {
        userID,
        cartStatus: 'Active',
      },
      include: [Product],
    });

    let totalPrice = 0;

    // Calcular el precio total de los productos
    for (const cart of activeCarts) {
      totalPrice += cart.Product.price * cart.quantity;
    }

    return totalPrice;
  } catch (error) {
    console.error(error);
    throw new Error('Error al calcular el precio total de los productos');
  }
};

payRouter.post('/create-payment-intent', async (req, res) => {
  const { userID } = req.body;

  try {
    const amount = await calculateOrderAmount(userID);

    // Crear un PaymentIntent con el monto y la moneda
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // El monto se debe proporcionar en centavos
      currency: 'usd',
      payment_method_types: ['card'],
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el PaymentIntent' });
  }
});

payRouter.post('/confirm-payment', async (req, res) => {
  const { userID, paymentIntentID } = req.body;

  try {
    // Obtener los carritos activos del mismo usuario
    const activeCarts = await ShoppingCart.findAll({
      where: {
        userID,
        cartStatus: 'Active',
      },
      include: [Product],
    });

    // Verificar si los carritos aún están activos
    if (activeCarts.length === 0) {
      res.status(400).json({ message: 'No hay carritos activos para este usuario' });
      return;
    }

    // Obtener el monto total de la orden
    const totalPrice = await calculateOrderAmount(userID);

    // Obtener el PaymentIntent
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentID);

    // Verificar el estado del PaymentIntent
    if (paymentIntent.status !== 'succeeded') {
      res.status(400).json({ message: 'El pago no ha sido completado' });
      return;
    }

    // Cambiar el estado de los carritos a "Ordered"
    await ShoppingCart.update(
      { cartStatus: 'Ordered' },
      {
        where: {
          userID,
          cartStatus: 'Active',
        },
      }
    );

    // Crear la orden en la base de datos
    const order = await Order.create({
      userID,
      totalPrice,
      shippingAddress: '', // Agrega la dirección de envío correspondiente
      orderStatus: 'Ordered',
    });

    // Actualizar el inventario restando la cantidad vendida
    for (const cart of activeCarts) {
      const inventory = await Inventory.findOne({
        where: { productID: cart.productID },
      });

      await inventory.decrement('quantity', { by: cart.quantity });
    }

    res.status(200).json({ message: 'Pago exitoso', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al confirmar el pago' });
  }
});

export default payRouter;
