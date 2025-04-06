const express = require('express');
const router = express.Router();
const passport = require('passport');
const userService = require('../services/user.service');
const { isAuthenticated } = require('../middlewares/auth.middleware.js');

// Registro de usuario
router.post('/register', async (req, res) => {
    try {
        const result = await userService.registerUser(req.body);
        res.status(201).json({ status: 'success', message: 'Usuario registrado correctamente', payload: result.user });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
});

// Login de usuario
router.post('/login', passport.authenticate('login', { session: false, failWithError: true }),
    async (req, res) => {
        try {
            const { token, user } = await userService.loginUser(req.body.email, req.body.password);

            // Enviar token en cookie HTTP Only
            res.cookie(process.env.JWT_COOKIE_NAME, token, {
                httpOnly: true,
                maxAge: 60 * 60 * 1000, // 1 hora
                sameSite: 'strict'
            });

            res.json({ status: 'success', message: 'Login exitoso', payload: user });
        } catch (error) {
            res.status(401).json({ status: 'error', message: error.message });
        }
    },
    (err, req, res, next) => {
        return res.status(401).json({ status: 'error', message: err.message || 'Error de autenticación' });
    }
);

// Logout
router.post('/logout', isAuthenticated, (req, res) => {
    res.clearCookie(process.env.JWT_COOKIE_NAME);
    res.json({ status: 'success', message: 'Logout exitoso' });
});

// Current user - Ruta para obtener el usuario actual a partir del token
router.get('/current', passport.authenticate('current', { session: false }), (req, res) => {
    try {
        const userDTO = userService.getUserDTO(req.user);
        res.json({ status: 'success', payload: userDTO });
    } catch (error) {
        res.status(401).json({ status: 'error', message: 'Usuario no autenticado' });
    }
});

module.exports = router;