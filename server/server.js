require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { authMiddleware } = require('./middlewares/authMiddleware');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const rentalRoutes = require('./routes/rentalRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Log environment variables to debug
console.log('Loaded Environment Variables:', {
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  JWT_SECRET: process.env.JWT_SECRET,
  DB_DIALECT: process.env.DB_DIALECT,
  PORT: process.env.PORT,
});

app.use(cors({
  origin: ['http://localhost:3000', 'https://your-render-app.onrender.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/books', authMiddleware, bookRoutes);
app.use('/api/rentals', authMiddleware, rentalRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
