import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Paper } from '@mui/material';
import axios from 'axios';

const BookRental = () => {
  const [bookId, setBookId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');

  const handleRentBook = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/rentals', { bookId, quantity });
      setMessage('Book rented successfully!');
    } catch (error) {
      setMessage('Failed to rent book.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Rent a Book
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            label="Book ID"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
          />
          <TextField
            label="Quantity"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, mb: 2 }}
            onClick={handleRentBook}
          >
            Rent Book
          </Button>
          {message && <Typography variant="body2" color="textSecondary">{message}</Typography>}
        </Box>
      </Paper>
    </Container>
  );
};

export default BookRental;