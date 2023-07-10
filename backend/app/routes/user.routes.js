import express from 'express';
import User from '../models/user.models.js';

const userRoutes = express.Router();

// (GET)

// Ruta principal (base path /api/users)
userRoutes.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong', data: {} });
    }
});

// Ruta para obtener un usuario por su ID (base path /api/users/:id) (GET)
userRoutes.get('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong', data: {} });
    }
});

// Ruta para obtener un usuario por su username (base path /api/users/username/:username) (GET)
userRoutes.get('/username/:username', async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.params.username
            }
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong', data: {} });
    }
});

// (POST)

// Ruta para crear un usuario (base path /api/users) (POST)
userRoutes.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ message: 'User created successfully', data: user });
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong', data: {} });
    }
});

// (PUT)

// Ruta para actualizar un usuario por su ID (base path /api/users/:id) (PUT)
userRoutes.put('/:id', async (req, res) => {
    try {
        const user = await User.update(req.body, {
            where: {
                userID: req.params.id
            }
        });
        res.status(200).json({ message: 'User updated successfully', data: user });
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong', data: {} });
    }
});

// (DELETE)

// Ruta para eliminar un usuario por su ID (base path /api/users/:id) (DELETE)
userRoutes.delete('/:id', async (req, res) => {
    try {
        const user = await User.destroy({
            where: {
                userID: req.params.id
            }
        });
        res.status(200).json({ message: 'User deleted successfully', data: user });
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong', data: {} });
    }
});

export default userRoutes;