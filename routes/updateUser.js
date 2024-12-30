const express = require('express');
const cors = require('cors');
const {updateUserProfile} = require('../controllers/login');

const router = express.Router();


router.route("/profile").post( updateUserProfile)


module.exports = router;