const express = require('express');
const { createBook, getBooks, updateBook, deleteBook, updateBookStatus, Admingetbooks, fetchOwner } = require('../controllers/bookController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createBook);

router.get('/', getBooks);

router.get('/admin', authMiddleware, Admingetbooks);

router.put('/:id', authMiddleware, updateBook);

router.patch('/:id/status', authMiddleware, updateBookStatus);

router.delete('/:id', authMiddleware, deleteBook);

router.get('/owners', authMiddleware, fetchOwner)

module.exports = router;