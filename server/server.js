const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');  // Import CORS
const { authMiddleware } = require('./middlewares/authMiddleware');
const authRoutes = require('./routes/authRoutes'); // Login and Registration routes
const bookRoutes = require('./routes/bookRoutes'); // Book related routes
const rentalRoutes = require('./routes/rentalRoutes'); // Rental related routes

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(bodyParser.json());

// Public routes for authenticaauthRoutestion and registration
app.use('/api/auth', authRoutes);

// Protected routes
app.use('/api/books', authMiddleware, bookRoutes); 
app.use('/api/rentals', authMiddleware, rentalRoutes); 

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
