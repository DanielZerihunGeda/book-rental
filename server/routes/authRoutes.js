const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();

// Registeration post request
router.post('/register', registerUser);

// Login request
router.post('/login', loginUser);

module.exports = router;
