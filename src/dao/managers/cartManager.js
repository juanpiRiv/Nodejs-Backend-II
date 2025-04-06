const Cart = require('../models/cart.model');

class CartManager {
    async createCart() {
        try {
            const newCart = await Cart.create({ products: [] });
            return newCart;
        } catch (error) {
            throw error;
        }
    }

    async getCartById(id) {
        try {
            return await Cart.findById(id);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CartManager;