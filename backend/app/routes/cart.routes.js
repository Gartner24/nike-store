import express from 'express';
import ShoppingCart from '../models/cart.models.js';
import User from '../models/user.models.js';
import Product from '../models/product.models.js';
import Inventory from '../models/inventory.model.js';

const cartRouter = express.Router();

// Agregar un producto al carrito
// Agregar un producto al carrito de compras
cartRouter.post('/add', async (req, res) => {
	try {
		const { userID, productID, quantity } = req.body;

		// Verificar si el inventario tiene suficiente cantidad disponible
		const inventory = await Inventory.findOne({
			where: { productID },
		});

		if (!inventory || inventory.quantity < quantity) {
			return res
				.status(400)
				.json({ message: 'No hay suficiente cantidad disponible' });
		}

		// Agregar el producto al carrito de compras
		const cartItem = await ShoppingCart.create({
			userID,
			productID,
			quantity,
		});

		res.status(201).json({
			message: 'Producto agregado al carrito',
			cartItem,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Error al agregar el producto al carrito',
		});
	}
});

// Obtener el carrito de un usuario
cartRouter.get('/user/:userID', async (req, res) => {
	try {
		const userID = req.params.userID;

		// Verificar si el usuario existe
		const user = await User.findByPk(userID);

		if (!user) {
			return res.status(404).json({ message: 'Usuario no encontrado' });
		}

		// Obtener los productos en el carrito del usuario
		const cartItems = await ShoppingCart.findAll({
			where: { userID },
		});

		res.status(200).json({ cartItems });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Error al obtener el carrito del usuario',
		});
	}
});

// Actualizar la cantidad de un producto en el carrito
cartRouter.put('/:cartID', async (req, res) => {
	try {
		const cartID = req.params.cartID;
		const { quantity } = req.body;

		// Verificar si el registro del carrito existe
		const cartItem = await ShoppingCart.findByPk(cartID);

		if (!cartItem) {
			return res
				.status(404)
				.json({ message: 'Registro del carrito no encontrado' });
		}

		// Actualizar la cantidad del producto
		await cartItem.update({ quantity });

		res.status(200).json({ message: 'Cantidad actualizada', cartItem });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Error al actualizar la cantidad del producto',
		});
	}
});

// Eliminar un producto del carrito
cartRouter.delete('/:cartID', async (req, res) => {
	try {
		const cartID = req.params.cartID;

		// Verificar si el registro del carrito existe
		const cartItem = await ShoppingCart.findByPk(cartID);

		if (!cartItem) {
			return res
				.status(404)
				.json({ message: 'Registro del carrito no encontrado' });
		}

		// Eliminar el producto del carrito
		await cartItem.destroy();

		res.status(200).json({ message: 'Producto eliminado del carrito' });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Error al eliminar el producto del carrito',
		});
	}
});

export default cartRouter;
