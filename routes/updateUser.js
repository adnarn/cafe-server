const express = require('express');
const {getUserDetails, updateUserDetails} = require('../controllers/updateUser');
const authenticate = require('../middlewares/verifyToken');

const userRoutes = express.Router();


userRoutes.get("/get-profile", authenticate, getUserDetails)
userRoutes.put("/update-profile", authenticate, updateUserDetails)


module.exports = userRoutes;
