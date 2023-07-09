import express from 'express';

const router = express.Router();

// Ruta principal (base path /api)
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the API' });
});

// Rutas para los usuarios (base path: /api/users)
// router.use('/users', userRoutes)

// Rutas para los productos (base path: /api/products)
// router.use('/products', productRoutes)

//Rutas para el inventario
router.use('/inventory', inventoryRoutes)

// Rutas para los pedidos (base path: /api/orders)
// router.use('/orders', orderRoutes)

export default router;
