// const User = require("../models/user");
// const argon2 = require("argon2");

// async function createUser(userData) {
//     const {  email, name, password } = userData;

//     const hashedPassword = await argon2.hash(password);

//     const newUser = new User({
//         email,
//         name,
//         password: hashedPassword,   
//         role: 'customer'
//     });

//     const savedUser = await newUser.save();
    
//     return savedUser;
// }

// module.exports = createUser;


const User = require("../models/user");
const argon2 = require("argon2");

async function createUser(userData) {
    const { email, name, password, role } = userData;

    if (role === 'customer1' || role === 'customer2') {
        const customerCount = await User.countDocuments({
            $or: [{ role: 'customer1' }, { role: 'customer2' }]
        });

        // If there are already 2 customers, prevent further signups
        if (customerCount >= 2) {
            throw new Error('Customer registration is closed. Only two customers are allowed.');
        }
    }

    // Hash the password before saving it
    const hashedPassword = await argon2.hash(password);

    // Create a new user instance with the hashed password and role
    const newUser = new User({
        email,
        name,
        password: hashedPassword,
        role: role || 'customer1'  // Default role is 'customer1'
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Return the saved user
    return savedUser;
}

module.exports = createUser;
