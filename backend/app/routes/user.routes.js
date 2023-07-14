import express from 'express';
import User from '../models/user.models.js';

const userRoutes = express.Router();

// Get all users
userRoutes.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', data: {} });
    }
});

// Get a user by ID
userRoutes.get('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found', data: {} });
        }
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', data: {} });
    }
});

// Get a user by username
userRoutes.get('/username/:username', async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.params.username,
            },
        });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found', data: {} });
        }
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', data: {} });
    }
});

// Create a user
userRoutes.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ message: 'User created successfully', data: user });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', data: {} });
    }
});

// Update a user by ID
userRoutes.put('/:id', async (req, res) => {
    try {
        const user = await User.update(req.body, {
            where: {
                userID: req.params.id,
            },
        });
        res.status(200).json({ message: 'User updated successfully', data: user });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', data: {} });
    }
});

// Delete a user by ID
userRoutes.delete('/:id', async (req, res) => {
    try {
        const user = await User.destroy({
            where: {
                userID: req.params.id,
            },
        });
        res.status(200).json({ message: 'User deleted successfully', data: user });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', data: {} });
    }
});

export default userRoutes;
