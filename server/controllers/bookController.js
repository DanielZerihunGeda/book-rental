const { Book, User} = require('../models');
const jwt = require('jsonwebtoken');
// crereate a new book
exports.Admingetbooks = async (req, res) => {
    try {
      const books = await Book.findAll({
        attributes: ['title', 'available_quantity', 'price', 'createdAt'],
        include: [
          {
            model: User,
            as: 'owner',
            attributes: ['name']
          }
        ]
      });
  
      res.json(books);
    } catch (err) {
      console.error('Error fetching books:', err);
      res.status(500).json({ error: 'Server error' });
    }
  };
  exports.createBook = async (req, res) => {
    try {
        const { title, author, category, available_quantity, price, ownerId } = req.body;

        // validation
        if (!title || !author || !category || !available_quantity || !price || !ownerId) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        console.log('Creating book with data:', { title, author, category, available_quantity, price, ownerId });

        // Create the book
        const book = await Book.create({ title, author, category, available_quantity, price, ownerId });
        
        console.log('Book created successfully:', book);

        res.status(201).json({ message: 'Book created successfully', book });
    } catch (err) {
        console.error('Error creating book:', err);
        if (err.name === 'SequelizeValidationError') {
            return res.status(400).json({ error: 'Validation error', details: err.errors });
        }
        res.status(500).json({ error: 'Server error' });
    }
};



// To b filtered ..... 
exports.getBooks = async (req, res) => {
    try {
      const token = req.headers['authorization']?.split(' ')[1];
      if (!token) {
        return res.status(403).json({ error: 'No token provided, authorization denied' });
      }
  
      jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
          return res.status(401).json({ error: 'Token is not valid' });
        }
  
        const ownerId = decoded.id; // decoding
  
        console.log('Verified OwnerId:', ownerId); // Debugging 
  
        const books = await Book.findAll({ where: { ownerId } });
        res.json(books);
      });
    } catch (err) {
      console.error('Error fetching books:', err);
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
// Update the status of a book
exports.updateBookStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        console.log('Updating book status with id:', id, 'and status:', status); // Debugging line

        if (!status) {
            return res.status(400).json({ error: 'Status is required' });
        }
        
        const [updated] = await Book.update({ status }, { where: { id } });
        if (!updated) return res.status(404).json({ msg: 'Book not found' });

        res.json({ msg: 'Book status updated successfully' });
    } catch (err) {
        console.error('Error updating book status:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.fetchOwner = async (req, res) => {
  try {
    const owners = await User.findAll({
      where: { role: 'owner' },
      attributes: ['name', 'email', 'createdAt']
    });

    res.json(owners);
  } catch (err) {
    console.error('Error fetching owners:', err);
    res.status(500).json({ error: 'Server error' });
  }
};