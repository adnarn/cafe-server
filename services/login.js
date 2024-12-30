const User = require('../models/user');
const { generateToken } = require('../utils/jwtUtils');
const argon2 = require('argon2');

async function login(email, password) {
    try {
        // Find the user by email
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            throw new Error("User not found");
        }

        // Check if the password matches
        const isPasswordValid = await argon2.verify(existingUser.password, password);
        if (!isPasswordValid) {
            throw new Error('Incorrect password');
        }

        // Generate and return a token
        const token = generateToken(existingUser);
        return { token, user: existingUser };

    } catch (error) {
        // Handle errors by throwing a specific error message
        throw new Error(error.message);
    }
}

module.exports = {
    login
}
