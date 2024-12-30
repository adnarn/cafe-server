// const createUser = require('../services/signup'); // Import directly as a function

// async function createUserController(req, res) {
//     try {
//         const userData = req.body;
//         const user = await createUser(userData);
//         res.status(201).json({ user: user, message: 'User created successfully' });
//     } catch (error) {
//         console.log(error);
//         res.status(400).json({ message: error.message });
//     }
// }

// module.exports = { createUser: createUserController };


const createUser = require('../services/signup');

async function createUserController(req, res) {
    try {
        const userData = req.body;
        
        // Attempt to create a new user
        const user = await createUser(userData);
        
        res.status(201).json({
            user: user,
            message: 'User created successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}

module.exports = { createUser: createUserController };
