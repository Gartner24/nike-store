import express from 'express';
import Inventory from '../models/inventory.model.js';
import Product from '../models/product.models.js';

const inventoryRouter = express.Router();

// Obtener el inventario de un producto por su ID
inventoryRouter.get('/product/:productID', async (req, res) => {
  try {
    const productID = req.params.productID;

    // Verificar si el producto existe
    const product = await Product.findByPk(productID);

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Obtener el inventario asociado al producto
    const inventory = await Inventory.findOne({
      where: { productID }
    });

    if (!inventory) {
      return res.status(404).json({ message: 'Inventario no encontrado' });
    }

    res.status(200).json({ product, inventory });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al obtener el inventario del producto' });
  }
});

// Actualizar el inventario de un producto
inventoryRouter.put('/product/:productID', async (req, res) => {
  try {
    const productID = req.params.productID;
    const { quantity, stockMin, stockMax } = req.body;

    // Verificar si el producto existe
    const product = await Product.findByPk(productID);

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Verificar si el inventario existe
    let inventory = await Inventory.findOne({
      where: { productID }
    });

    // Crear el inventario si no existe
    if (!inventory) {
      inventory = await Inventory.create({
        productID,
        quantity,
        stockMin,
        stockMax
      });
    } else {
      // Actualizar el inventario si ya existe
      await inventory.update({
        quantity,
        stockMin,
        stockMax
      });
    }

    res.status(200).json({ message: 'Inventario actualizado', inventory });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al actualizar el inventario del producto' });
  }
});

export default inventoryRouter;