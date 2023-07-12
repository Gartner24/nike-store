import express from 'express';
import ShoppingCart from '../models/cart.models.js';
import Order from '../models/orders.model.js';
import Inventory from '../models/inventory.model.js';

const paymentRouter = express.Router();

// Ruta para procesar el pago (http://localhost:8080/api/success)
paymentRouter.get('/success', async (req, res) => {
	try {
		const { totalPrice, userID, shippingAddress } = req.query; // Utilizamos req.query en lugar de req.body para obtener los parámetros enviados desde la pasarela de pago

		// Actualizar el inventario restando la cantidad vendida
		const activeCarts = await ShoppingCart.findAll({
			where: {
			  userID,
			  cartStatus: 'Active'
			}
		  });

		for (const cart of activeCarts) {
			const inventory = await Inventory.findOne({
				where: { productID: cart.productID },
			});

			await inventory.decrement('quantity', { by: cart.quantity });
		}

		// Crear la orden en la base de datos
		const order = await Order.create({
			userID,
			totalPrice,
			shippingAddress,
		});
		
		// Si el pago es exitoso, cambiar el estado de los carritos a "Ordered" y crear la orden
		await ShoppingCart.update(
			{ cartStatus: 'Ordered' },
			{
				where: {
					userID,
					cartStatus: 'Active',
				},
			}
		);

		// CLose the window
		return res.status(200).json({ message: 'Pago exitoso', order });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Error al procesar el pago' });
	}
});

// Ruta para cancelar el pago
paymentRouter.get('/cancel', (req, res) => {
	res.status(200).json({ message: 'Pago cancelado' });
});

export default paymentRouter;
