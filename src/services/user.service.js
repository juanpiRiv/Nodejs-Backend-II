const bcrypt = require('bcrypt');
const UserManager = require('../dao/managers/userManager');
const CartManager = require('../dao/managers/cartManager');
const jwtUtils = require('../utils/jwt.utils');


class UserService {
    constructor() {
        this.cartManager = new CartManager(); 
        this.userManager = new UserManager(); 
    }

    async registerUser(userData) {
        const { email, password } = userData;

        const existingUser = await this.userManager.getUserByEmail(email);
        if (existingUser) {
            throw new Error('Ya existe un usuario con ese email');
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const cart = await this.cartManager.createCart();

        const newUser = await this.userManager.createUser({
            ...userData,
            password: hashedPassword,
            cart: cart._id
        });

        return { user: this.getUserDTO(newUser) };
    }

    async loginUser(email, password) {
        const user = await this.userManager.getUserByEmail(email);

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            throw new Error('Contraseña incorrecta');
        }

        const token = jwtUtils.generateToken(user);
        return { token, user: this.getUserDTO(user) };
    }

    async getCurrentUser(userId) {
        const user = await this.userManager.getUserById(userId);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        return this.getUserDTO(user);
    }

    async updateUser(userId, userData) {
        if (userData.password) {
            userData.password = bcrypt.hashSync(userData.password, 10);
        }

        const updatedUser = await this.userManager.updateUser(userId, userData);
        return this.getUserDTO(updatedUser);
    }

    async deleteUser(userId) {
        return await this.userManager.deleteUser(userId);
    }

    async getAllUsers() {
        const users = await this.userManager.getAllUsers();
        return users.map(user => this.getUserDTO(user));
    }

    generateToken(user) {
        return jwtUtils.generateToken(user);
    }

    getUserDTO(user) {
        return {
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            age: user.age,
            role: user.role,
            cart: user.cart
        };
    }
}

module.exports = new UserService();
