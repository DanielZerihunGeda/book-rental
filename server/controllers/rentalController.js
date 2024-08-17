const { Rental, Book, User } = require('../models'); // 
const jwt = require('jsonwebtoken');
const {Op, sequelize} = require('sequelize')
exports.rentBook = async (req, res) => {
    try {
        const { bookId, username, address, email, phone, rentStart, rentEnd, quantity } = req.body;

        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const book = await Book.findByPk(bookId);
        if (!book) {
            return res.status(404).json({ msg: 'Book not found' });
        }
        if (book.ownerId !== userId) {
            return res.status(403).json({ msg: 'Book not available. Please Correct Book Id.' });
        }
        if (book.available_quantity < quantity) {
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

        await book.update({ available_quantity: book.available_quantity - quantity });

        res.status(201).json(rental);
    } catch (err) {
        console.error(err); // Log error 
        res.status(500).json({ error: 'Server error' });
    }
};
exports.returnBook = async (req, res) => {
    try {
        const { rentalId, quantity } = req.body;

        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const rental = await Rental.findByPk(rentalId);
        if (!rental) {
            return res.status(404).json({ msg: 'Rental not found' });
        }

        const book = await Book.findByPk(rental.bookId);
        if (!book) {
            return res.status(404).json({ msg: 'Book not found' });
        }

        if (book.ownerId !== userId) {
            return res.status(403).json({ msg: 'Check the BookId' });
        }

        const newReturnedQuantity = rental.returnedQuantity + quantity;
        if (newReturnedQuantity > rental.quantity) {
            return res.status(400).json({ msg: 'Returned quantity exceeds rented quantity' });
        }

        await rental.update({ returnedQuantity: newReturnedQuantity, returnedAt: new Date() });
        await book.update({ available_quantity: book.available_quantity + quantity });

        res.json({ msg: 'Book returned successfully' });
    } catch (err) {
        console.error(err); // Log error 
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getRentals = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is stored in req.user from session

        const rentals = await Rental.findAll({
            where: { userId },
            attributes: ['id', 'quantity', 'username', 'email', 'address', 'phone', 'rentStart', 'rentEnd', 'totalPrice'],
            include: [{
                model: Book,
                as: 'book',
                attributes: ['id', 'title']
            }]
        });

        const rentalDetails = rentals.map(rental => ({
            rentalId: rental.id,
            bookId: rental.book.id,
            bookTitle: rental.book.title,
            quantity: rental.quantity,
            username: rental.username,
            email: rental.email,
            address: rental.address,
            phone: rental.phone,
            rentStart: rental.rentStart,
            rentEnd: rental.rentEnd,
            totalPrice: rental.totalPrice
        }));

        res.json(rentalDetails);
    } catch (err) {
        console.error(err); // Log error 
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getAggregatedRentals = async (req, res) => {
  try {
    const ownerId = req.user.id; // Assuming ownerId is stored in req.user from authentication middleware

    console.log('Verified OwnerId:', ownerId); // Debugging line

    const rentals = await Rental.findAll({
      attributes: [
        [sequelize.fn('DATE', sequelize.col('rentStart')), 'date'],
        [sequelize.fn('SUM', sequelize.col('totalPrice')), 'totalRevenue'],
      ],
      include: [
        {
          model: Book,
          as: 'book',
          where: { ownerId },
          attributes: []
        }
      ],
      group: ['date'],
      order: [['date', 'ASC']],
      logging: console.log
    });

    console.log('Aggregated Rentals:', rentals); // Debugging line
    res.json(rentals);
  } catch (err) {
    console.error('Error fetching aggregated rentals:', err); // Log error
    res.status(500).json({ error: 'Server error' });
  }
};


exports.getDashboardData = async (req, res) => {
  try {
    // Decode the token
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Total Books
    const totalBooks = await Book.count();

    // Books Currently Rented Out
    const rentedBooks = await Rental.count({ where: { returnedQuantity: 0 } });

    // Total Rentals
    const totalRentals = await Rental.count();

    // Active Rentals
    const activeRentals = await Rental.count({ where: { rentEnd: { [Op.gt]: new Date() } } });

    // Overdue Rentals
    const overdueRentals = await Rental.count({ where: { rentEnd: { [Op.lt]: new Date() }, returnedQuantity: 0 } });

    // Total Revenue
    const totalRevenue = await Rental.sum('totalPrice');

    // Most Rented Books
    const mostRentedBooks = await Rental.findAll({
      attributes: ['bookId', [sequelize.fn('COUNT', sequelize.col('bookId')), 'rentCount']],
      group: ['bookId'],
      order: [[sequelize.fn('COUNT', sequelize.col('bookId')), 'DESC']],
      limit: 5,
      include: [{ model: Book, attributes: ['title'] }]
    });

    res.json({
      totalBooks,
      rentedBooks,
      totalRentals,
      activeRentals,
      overdueRentals,
      totalRevenue,
      mostRentedBooks
    });
  } catch (err) {
    console.error('Error fetching dashboard data:', err);
    res.status(500).json({ error: 'Server error' });
  }
};