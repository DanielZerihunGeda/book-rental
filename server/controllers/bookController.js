const { Book } = require('../models');

// Create a new book
exports.createBook = async (req, res) => {
    try {
        const { title, author, category, available_quantity, price, ownerId } = req.body;

        // Basic validation
        if (!title || !author || !category || !available_quantity || !price || !ownerId) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Create the book
        const book = await Book.create({ title, author, category, available_quantity, price, ownerId });
        
        res.status(201).json({ message: 'Book created successfully', book });
    } catch (err) {
        console.error('Error creating book:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get all books (with optional filtering)
exports.getBooks = async (req, res) => {
    try {
        const books = await Book.findAll();
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Update book information
exports.updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Book.update(req.body, { where: { id } });
        if (!updated) return res.status(404).json({ msg: 'Book not found' });

        res.json({ msg: 'Book updated successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete a book
exports.deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Book.destroy({ where: { id } });
        if (!deleted) return res.status(404).json({ msg: 'Book not found' });

        res.json({ msg: 'Book deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};
