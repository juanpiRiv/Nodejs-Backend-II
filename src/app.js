require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const connectDB = require('./config/db.config');
const initializePassport = require('./config/passport.config');
const userRoutes = require('./routes/user.routes');
const sessionRoutes = require('./routes/session.routes');

// Inicializar express
const app = express();
const PORT = process.env.PORT || 8080;

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Configuración de Passport
initializePassport();
app.use(passport.initialize());

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/sessions', sessionRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API de ecommerce funcionando correctamente');
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ status: 'error', message: err.message || 'Error interno del servidor' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

module.exports = app;