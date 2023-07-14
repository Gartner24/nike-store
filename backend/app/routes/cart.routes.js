import express from 'express';
import ShoppingCart from '../models/cart.models.js';
import User from '../models/user.models.js';
import Product from '../models/product.models.js';
import Inventory from '../models/inventory.model.js';

const cartRouter = express.Router();

// Add a product to the shopping cart
cartRouter.post('/add', async (req, res) => {
	try {
		const { userID, productID, quantity } = req.body;

		// Check if the inventory has enough quantity available
		const inventory = await Inventory.findOne({
			where: { productID },
		});

		if (!inventory || inventory.quantity < quantity) {
			return res
				.status(400)
				.json({ message: 'Not enough quantity available' });
		}

		// Add the product to the shopping cart
		const cartItem = await ShoppingCart.create({
			userID,
			productID,
			quantity,
		});

		res.status(201).json({
			message: 'Product added to the cart',
			cartItem,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Error adding the product to the cart',
		});
	}
});

// Get a user's shopping cart
cartRouter.get('/user/:userID', async (req, res) => {
	try {
		const userID = req.params.userID;

		// Check if the user exists
		const user = await User.findByPk(userID);

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		// Get the products in the user's shopping cart
		const cartItems = await ShoppingCart.findAll({
			where: { userID },
		});

		res.status(200).json({ cartItems });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Error getting the user\'s shopping cart',
		});
	}
});

// Update the quantity of a product in the cart
cartRouter.put('/:cartID', async (req, res) => {
	try {
		const cartID = req.params.cartID;
		const { quantity } = req.body;

		// Check if the cart item exists
		const cartItem = await ShoppingCart.findByPk(cartID);

		if (!cartItem) {
			return res
				.status(404)
				.json({ message: 'Cart item not found' });
		}

		// Update the product quantity
		await cartItem.update({ quantity });

		res.status(200).json({ message: 'Quantity updated', cartItem });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Error updating the product quantity',
		});
	}
});

// Remove a product from the cart
cartRouter.delete('/:cartID', async (req, res) => {
	try {
		const cartID = req.params.cartID;

		// Check if the cart item exists
		const cartItem = await ShoppingCart.findByPk(cartID);

		if (!cartItem) {
			return res
				.status(404)
				.json({ message: 'Cart item not found' });
		}

		// Remove the product from the cart
		await cartItem.destroy();

		res.status(200).json({ message: 'Product removed from the cart' });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Error removing the product from the cart',
		});
	}
});

export default cartRouter;
