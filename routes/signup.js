const express = require('express');
const signupController = require('../controllers/signup'); // No need to change this line

const router = express.Router();

router.post('/register', signupController.createUser);

module.exports = router;
