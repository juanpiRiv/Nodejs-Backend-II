const jwt = require('jsonwebtoken');

class JwtUtils {
    generateToken(user) {
        const payload = {
            sub: user._id,
            email: user.email,
            role: user.role
        };

        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    }

    verifyToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            throw new Error('Token inválido o expirado');
        }
    }
}

module.exports = new JwtUtils();