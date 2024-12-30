const User = require('../models/user');
const argon2 = require("argon2");

async function createAdminAccount() {
    try {
        const existingAdmin = await User.findOne({ email: 'admin@test.com' });

        if (!existingAdmin) {
            const newAdmin = new User({
                email: 'admin@test.com',
                name: 'Admin',
                password: await argon2.hash('admin'),
                role: 'admin'
            });

            await newAdmin.save();
            console.log("Admin account created successfully");
        } else {
            console.log('Admin already exists');
        }
    } catch (error) {
        console.error("Error creating admin account:", error.message);
    }
}

module.exports = createAdminAccount;
