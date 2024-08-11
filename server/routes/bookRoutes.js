const express = require('express');
const { createBook, getBooks, updateBook, deleteBook } = require('../controllers/bookController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

// Create a new book route
router.post('/', authMiddleware, createBook);

// Get all books api
router.get('/', getBooks);

// Update information based on the id of each books
router.put('/:id', authMiddleware, updateBook);

// Delete a book based on id provided
router.delete('/:id', authMiddleware, deleteBook);

module.exports = router;
