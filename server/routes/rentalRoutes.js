const express = require('express');
const { rentBook, returnBook, getRentals } = require('../controllers/rentalController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/rent', authMiddleware, rentBook);

router.post('/return', authMiddleware, returnBook);

router.get('/', authMiddleware, getRentals);

module.exports = router;
