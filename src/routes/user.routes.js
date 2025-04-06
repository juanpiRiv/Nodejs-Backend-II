const express = require('express');
const router = express.Router();
const userService = require('../services/user.service');
const { isAuthenticated, isAdmin } = require('../middlewares/auth.middleware.js');

// Obtener todos los usuarios (solo admin)
router.get('/', isAuthenticated, isAdmin, async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json({ status: 'success', payload: users });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// Obtener un usuario por ID
router.get('/:id', isAuthenticated, async (req, res) => {
    try {
        const user = await userService.getCurrentUser(req.params.id);
        res.json({ status: 'success', payload: user });
    } catch (error) {
        res.status(404).json({ status: 'error', message: error.message });
    }
});

// Actualizar un usuario
router.put('/:id', isAuthenticated, async (req, res) => {
    try {
        // Verificar que el usuario solo pueda actualizar su propio perfil o sea admin
        if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
            return res.status(403).json({ status: 'error', message: 'No autorizado para editar este usuario' });
        }

        const updatedUser = await userService.updateUser(req.params.id, req.body);
        res.json({ status: 'success', payload: updatedUser });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
});

// Eliminar un usuario (solo admin)
router.delete('/:id', isAuthenticated, isAdmin, async (req, res) => {
    try {
        await userService.deleteUser(req.params.id);
        res.json({ status: 'success', message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
});

module.exports = router;