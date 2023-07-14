import express from 'express';
import Inventory from '../models/inventory.model.js';
import Product from '../models/product.models.js';

const inventoryRouter = express.Router();

// Get the inventory of a product by its ID
inventoryRouter.get('/product/:productID', async (req, res) => {
  try {
    const productID = req.params.productID;

    // Check if the product exists
    const product = await Product.findByPk(productID);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Get the inventory associated with the product
    const inventory = await Inventory.findOne({
      where: { productID }
    });

    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found' });
    }

    res.status(200).json({ product, inventory });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error retrieving the product inventory' });
  }
});

// Obtener el inventario de todos los productos
inventoryRouter.get('/', async (req, res) => {
  try {
    const inventory = await Inventory.findAll();
    
    res.status(200).json(inventory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al obtener el inventario' });
  }
});

// Actualizar el inventario de un producto
inventoryRouter.put('/product/:productID', async (req, res) => {
  try {
    const productID = req.params.productID;
    const { quantity, stockMin, stockMax } = req.body;

    // Check if the product exists
    const product = await Product.findByPk(productID);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the inventory exists
    let inventory = await Inventory.findOne({
      where: { productID }
    });

    // Create the inventory if it doesn't exist
    if (!inventory) {
      inventory = await Inventory.create({
        productID,
        quantity,
        stockMin,
        stockMax
      });
    } else {
      // Update the inventory if it already exists
      await inventory.update({
        quantity,
        stockMin,
        stockMax
      });
    }

    res.status(200).json({ message: 'Inventory updated', inventory });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error updating the product inventory' });
  }
});

export default inventoryRouter;
