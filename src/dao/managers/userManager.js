const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const CartManager = require('./cartManager');

class UserManager {
    constructor() {
        this.cartManager = new CartManager();
    }

    async createUser(userData) {
        try {
            const { email, password } = userData;

            // Verificar si el usuario ya existe
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error('El usuario ya existe con ese email');
            }

            // Crear un carrito para el usuario
            const cart = await this.cartManager.createCart();

            // Encriptar la contraseña
            const hashedPassword = bcrypt.hashSync(password, 10);

            // Crear el usuario con su carrito asociado
            const newUser = await User.create({
                ...userData,
                password: hashedPassword,
                cart: cart._id
            });

            return newUser;
        } catch (error) {
            throw error;
        }
    }

    async getUserById(id) {
        try {
            return await User.findById(id).populate('cart').lean();
        } catch (error) {
            throw error;
        }
    }

    async getUserByEmail(email) {
        try {
            return await User.findOne({ email });
        } catch (error) {
            throw error;
        }
    }

    async updateUser(id, userData) {
        try {
            // Si se actualiza la contraseña, hashearla
            if (userData.password) {
                userData.password = bcrypt.hashSync(userData.password, 10);
            }

            return await User.findByIdAndUpdate(id, userData, { new: true });
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(id) {
        try {
            return await User.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    }

    async getAllUsers() {
        try {
            return await User.find().lean();
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserManager;