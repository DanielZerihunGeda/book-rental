const express = require('express');
const { registerUser, loginUser, deleteUser } = require('../controllers/authController');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');
// Registeration post request
router.post('/register', registerUser);

// Login request
router.post('/login', loginUser);

// Delete user route
router.delete('/users/:id', authMiddleware, deleteUser);

module.exports = router;
