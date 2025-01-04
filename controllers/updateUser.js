const User = require('../models/user');
const argon2 = require('argon2'); // Using Argon2 for password hashing

// Get User Details
const getUserDetails = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming `req.user` contains the authenticated user's ID from middleware
    const user = await User.findById(userId).select('-password'); // Exclude password from response
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update User Details
const updateUserDetails = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming `req.user` contains the authenticated user's ID from middleware
    const { name, email, password } = req.body;

    // Validate input
    if (!name && !email && !password) {
      return res.status(400).json({ message: 'Please provide at least one field to update' });
    }

    const updates = {};
    if (name) updates.name = name;
    if (email) updates.email = email;

    // If password is provided, hash it before saving
    if (password) {
      if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
      }
      updates.password = await argon2.hash(password);
    }

    // Update user details
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates }, // Update provided fields
      { new: true, runValidators: true } // Return the updated user and run schema validations
    ).select('-password'); // Exclude password from response

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getUserDetails,
  updateUserDetails,
};
