import express from 'express';
import Order from '../models/orders.model.js';
import ShoppingCart from '../models/cart.models.js';
import Inventory from '../models/inventory.model.js';
import Product from '../models/product.models.js';
import { openStripePaymentLink } from '../controllers/processPayment.js';

const orderRouter = express.Router();

orderRouter.post('/', async (req, res) => {
	const { userID, shippingAddress } = req.body;

	try {
		// Sumar el valor de los productos en los carritos activos del mismo usuario
		const activeCarts = await ShoppingCart.findAll({
			where: {
				userID,
				cartStatus: 'Active',
			},
		});

		let totalPrice = 0;

		// Calcular el precio total de los productos
		for (const cart of activeCarts) {
			const product = await Product.findOne({
				where: { productID: cart.productID },
			});

			totalPrice += product.price * cart.quantity;
		}

		// Llamar al controlador de Stripe y abrir el enlace de pago
		const paymentLinkResponse = await openStripePaymentLink(activeCarts, totalPrice, userID);

		if (paymentLinkResponse.url !== undefined) {
			// Enviar el enlace de pago al cliente
			return res.status(200).json({
				message: 'Enlace de pago abierto',
				url: paymentLinkResponse.url,
			});
		} else {
			// Si el pago no fue exitoso, manejar cada posible suceso en paymentLinkResponse.error
			return res.status(400).json({
				message: 'Error en el pago',
				error: paymentLinkResponse.error,
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error al procesar la orden' });
	}
});

export default orderRouter;
