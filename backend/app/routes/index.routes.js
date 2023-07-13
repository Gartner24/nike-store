import express from 'express';
import userRoutes from './user.routes.js';
import cartRouter from './cart.routes.js';
import productRouter from './products.routes.js';
import inventoryRouter from './inventory.routes.js';
import ordersRouters from './orders.routes.js';
import paymentRouter from './payment.routes.js';
import productImageRouter from './productImages.routes.js';

const router = express.Router();

// Ruta principal (base path /api)
router.get('/', (req, res) => {
	res.status(200).json({
		message: 'Welcome to the API',
	});
});

// Rutas para los usuarios (base path: /api/users)
router.use('/users', userRoutes);

// Rutas para los productos (base path: /api/products)
router.use('/products', productRouter);

// Rutas para las imagenes de los productos (base path: /api/productImages)
router.use('/images', productImageRouter);

// Rutas para el inventario (base path: /api/inventory)
router.use('/inventory', inventoryRouter);

// Rutas para los pedidos (base path: /api/orders)
router.use('/orders', ordersRouters);

// Rutas para el carrito (base path: /api/cart)
router.use('/cart', cartRouter);

// Rutas para el pago (base path: /api/payment)
router.use('/payment', paymentRouter);

export default router;
