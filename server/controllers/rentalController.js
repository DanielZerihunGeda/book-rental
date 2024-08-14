const { Rental, Book } = require('../models');
const jwt = require('jsonwebtoken');

exports.rentBook = async (req, res) => {
    try {
        const { bookId, username, address, email, phone, rentStart, rentEnd, quantity } = req.body;

        // Decode token to get the userId
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        // Check if the book exists and is available
        const book = await Book.findByPk(bookId);
        if (!book) {
            return res.status(404).json({ msg: 'Book not found' });
        }
        if (book.availableQuantity < quantity) {
            return res.status(400).json({ msg: 'Not enough available quantity' });
        }

        // Create the rental record
        const rental = await Rental.create({
            bookId,
            userId,
            username,
            address,
            email,
            phone,
            rentStart,
            rentEnd,
            quantity
        });

        // Update the books available 
        await book.update({ available_quantity: book.available_quantity - quantity });

        res.status(201).json(rental);
    } catch (err) {
        console.error(err); // Log error 
        res.status(500).json({ error: 'Server error' });
    }
};

exports.returnBook = async (req, res) => {
    try {
        const { rentalId } = req.body;

        const rental = await Rental.findByPk(rentalId);
        if (!rental) {
            return res.status(404).json({ msg: 'Rental not found' });
        }

        await rental.update({ returnedAt: new Date() });
        const book = await Book.findByPk(rental.bookId);
        if (book) {
            await book.update({ availableQuantity: book.availableQuantity + rental.quantity });
        }

        res.json({ msg: 'Book returned successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getRentals = async (req, res) => {
    try {
        const rentals = await Rental.findAll({ include: [{ model: Book, as: 'book' }] });
        res.json(rentals);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};