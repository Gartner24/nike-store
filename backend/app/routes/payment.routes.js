import express from 'express';
import ShoppingCart from '../models/cart.models.js';
import Order from '../models/orders.model.js';
import Inventory from '../models/inventory.model.js';

const paymentRouter = express.Router();

// Route to process the payment (http://localhost:8080/api/success)
paymentRouter.get('/success', async (req, res) => {
	try {
		const { totalPrice, userID, shippingAddress } = req.query; // Use req.query instead of req.body to retrieve parameters sent from the payment gateway

		// Update the inventory by subtracting the sold quantity
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

		// Create the order in the database
		const order = await Order.create({
			userID,
			totalPrice,
			shippingAddress,
		});
		
		// If the payment is successful, change the status of the carts to "Ordered" and create the order
		await ShoppingCart.update(
			{ cartStatus: 'Ordered' },
			{
				where: {
					userID,
					cartStatus: 'Active',
				},
			}
		);

		// Close the window
		return res.status(200).json({ message: 'Payment successful', order });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Error processing the payment' });
	}
});

// Route to cancel the payment
paymentRouter.get('/cancel', (req, res) => {
	res.status(200).json({ message: 'Payment canceled' });
});

export default paymentRouter;
