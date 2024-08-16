const express = require('express');
const { rentBook, returnBook, getRentals, getAggregatedRentals, getDashboardData } = require('../controllers/rentalController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/rent', authMiddleware, rentBook);

router.post('/return', authMiddleware, returnBook);

router.get('/getAggregatedRental',authMiddleware, getAggregatedRentals);

router.get('/', authMiddleware, getRentals);

router.get('/dashboard', authMiddleware, getDashboardData);

module.exports = router;
