const express = require('express');
const router = express.Router();


const Inventory = require('../app/models/inventory.model.js');

//ruta GET para obener todos los elementos del inventario
router.get('/inventory', async (req, res) => {
  try {
    const inventory = await Inventory.findAll();
    res.json(inventory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el inventario' });
  }
});

//ruta GET para obtener un elemento específico del inventario por su ID
router.get('/inventory/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Inventory.findByPk(id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: 'Elemento del inventario no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el elemento del inventario' });
  }
});

//ruta POST para agregar un nuevo elemento al inventario
router.post('/inventory', async (req, res) => {
  const { name, quantity, price } = req.body;
  try {
    const newItem = await Inventory.create({ name, quantity, price });
    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al agregar un nuevo elemento al inventario' });
  }
});

// ruta PUT para actualizar un elemento del inventario por su ID
router.put('/inventory/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity, price } = req.body;
  try {
    const item = await Inventory.findByPk(id);
    if (item) {
      await item.update({ name, quantity, price });
      res.json(item);
    } else {
      res.status(404).json({ message: 'Elemento del inventario no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el elemento del inventario' });
  }
});

// ruta DELETE para eliminar un elemento del inventario por su ID
router.delete('/inventory/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Inventory.findByPk(id);
    if (item) {
      await item.destroy();
      res.json({ message: 'Elemento del inventario eliminado correctamente' });
    } else {
      res.status(404).json({ message: 'Elemento del inventario no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el elemento del inventario' });
  }
});

module.exports = router;
