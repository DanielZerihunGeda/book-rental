const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const { authMiddleware } = require('./middlewares/authMiddleware');
const authRoutes = require('./routes/authRoutes'); // Login and Registration routes
const bookRoutes = require('./routes/bookRoutes'); // Book related routes
const rentalRoutes = require('./routes/rentalRoutes'); // Rental related routes

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

// Public routes for authentication and registration
app.use('/api/auth', authRoutes);

// Protected routes from unautherized api call
app.use('/api/books', authMiddleware, bookRoutes); 
app.use('/api/rentals', authMiddleware, rentalRoutes); 

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
