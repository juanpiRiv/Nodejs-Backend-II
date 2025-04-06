const UserManager = require('../dao/managers/userManager');
const jwtUtils = require('../utils/jwt.utils');

class UserService {
    constructor() {
        this.userManager = new UserManager();
    }

    async registerUser(userData) {
        try {
            const newUser = await this.userManager.createUser(userData);
            const userDTO = this.getUserDTO(newUser);
            return { user: userDTO };
        } catch (error) {
            throw error;
        }
    }

    async loginUser(email, password) {
        try {
            const user = await this.userManager.getUserByEmail(email);

            if (!user || !user.isValidPassword(password)) {
                throw new Error('Credenciales inválidas');
            }

            const token = jwtUtils.generateToken(user);
            return { token, user: this.getUserDTO(user) };
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(userId) {
        try {
            const user = await this.userManager.getUserById(userId);
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            return this.getUserDTO(user);
        } catch (error) {
            throw error;
        }
    }

    async updateUser(userId, userData) {
        try {
            const updatedUser = await this.userManager.updateUser(userId, userData);
            return this.getUserDTO(updatedUser);
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(userId) {
        try {
            return await this.userManager.deleteUser(userId);
        } catch (error) {
            throw error;
        }
    }

    async getAllUsers() {
        try {
            const users = await this.userManager.getAllUsers();
            return users.map(user => this.getUserDTO(user));
        } catch (error) {
            throw error;
        }
    }

    // DTO para no exponer información sensible como la contraseña
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