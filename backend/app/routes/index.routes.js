import express from 'express';
import userRoutes from './user.routes.js';
import cartRouter from './cart.routes.js';
import productRouter from './products.routes.js';
import inventoryRouter from './inventory.routes.js';
import ordersRouters from './orders.routes.js';
import paymentRouter from './payment.routes.js';
import productImageRouter from './productImages.routes.js';
import authenticationRouter from './authentication/authentication.routes.js';

const router = express.Router();

// Main route (base path: /api)
router.get('/', (req, res) => {
	res.status(200).json({
		message: 'Welcome to the API',
	});
});

// User routes (base path: /api/users)
router.use('/users', userRoutes);

// Product routes (base path: /api/products)
router.use('/products', productRouter);

// Product image routes (base path: /api/productImages)
router.use('/images', productImageRouter);

// Inventory routes (base path: /api/inventory)
router.use('/inventory', inventoryRouter);

// Order routes (base path: /api/orders)
router.use('/orders', ordersRouters);

// Cart routes (base path: /api/cart)
router.use('/cart', cartRouter);

// Payment routes (base path: /api/payment)
router.use('/payment', paymentRouter);

router.use('/authentication', authenticationRouter)

export default router;
