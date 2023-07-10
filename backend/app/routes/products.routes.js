import express from 'express';
import Product from '../models/product.models.js';

const productRouter = express.Router();

// Obtener todos los productos
productRouter.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al obtener los productos' });
  }
});

// Obtener un producto por su ID
productRouter.get('/:productID', async (req, res) => {
  try {
    const productID = req.params.productID;
    const product = await Product.findByPk(productID);

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al obtener el producto' });
  }
});

// Crear un nuevo producto
productRouter.post('/', async (req, res) => {
  try {
    const { productName, description, price } = req.body;

    const product = await Product.create({
      productName,
      description,
      price
    });

    res.status(201).json({ message: 'Producto creado', product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al crear el producto' });
  }
});

// Actualizar un producto
productRouter.put('/:productID', async (req, res) => {
  try {
    const productID = req.params.productID;
    const { productName, description, price } = req.body;

    const product = await Product.findByPk(productID);

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    await product.update({
      productName,
      description,
      price
    });

    res.status(200).json({ message: 'Producto actualizado', product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al actualizar el producto' });
  }
});

// Eliminar un producto
productRouter.delete('/:productID', async (req, res) => {
  try {
    const productID = req.params.productID;

    const product = await Product.findByPk(productID);

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    await product.destroy();

    res.status(200).json({ message: 'Producto eliminado' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al eliminar el producto' });
  }
});

export default productRouter;