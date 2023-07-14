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
		// Sum the value of products in active carts of the same user
		const activeCarts = await ShoppingCart.findAll({
			where: {
				userID,
				cartStatus: 'Active',
			},
		});

		let totalPrice = 0;

		// Calculate the total price of the products
		for (const cart of activeCarts) {
			const product = await Product.findOne({
				where: { productID: cart.productID },
			});

			totalPrice += product.price * cart.quantity;
		}

		// Call the Stripe controller and open the payment link
		const paymentLinkResponse = await openStripePaymentLink(activeCarts, totalPrice, userID, shippingAddress);

		if (paymentLinkResponse.url !== undefined) {
			// Send the payment link to the client
			return res.status(200).json({
				message: 'Payment link opened',
				url: paymentLinkResponse.url,
			});
		} else {
			// If payment was unsuccessful, handle each possible event in paymentLinkResponse.error
			return res.status(400).json({
				message: 'Payment error',
				error: paymentLinkResponse.error,
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error processing the order' });
	}
});

orderRouter.get('/', async (req, res) => {
	try {
		const orders = await Order.findAll();
		res.status(200).json(orders);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Error retrieving the orders' });
	}
});

export default orderRouter;
