const User = require('../models/user.model');

class UserManager {
    constructor(cartManager) {
        this.cartManager = cartManager;
    }

    async createUser(userData) {
        return await User.create(userData);
    }

    async getUserById(id) {
        return await User.findById(id).populate('cart').lean();
    }

    async getUserByEmail(email) {
        return await User.findOne({ email });
    }

    async updateUser(id, userData) {
        return await User.findByIdAndUpdate(id, userData, { new: true });
    }

    async deleteUser(id) {
        return await User.findByIdAndDelete(id);
    }

    async getAllUsers() {
        return await User.find().lean();
    }
}

module.exports = UserManager;
