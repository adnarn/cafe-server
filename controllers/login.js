const authService = require('../services/login');
const User = require('../models/user');


async function login(req, res) {
    try {
        const { email, password } = req.body;
        const { token } = await authService.login(email, password);
        res.json({ token });        
    } catch (error) {
        // Send specific error message or a generic one if you prefer
        res.status(401).json({ message: error.message || "Invalid Credentials" });
    }
}

 
  

module.exports = {
    login
}
