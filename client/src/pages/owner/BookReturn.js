import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Paper } from '@mui/material';
import axios from 'axios';

const BookReturn = () => {
  const [rentalId, setRentalId] = useState('');
  const [message, setMessage] = useState('');

  const handleReturnBook = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/rentals/return', { rentalId });
      setMessage('Book returned successfully!');
    } catch (error) {
      setMessage('Failed to return book.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Return a Book
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            label="Rental ID"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={rentalId}
            onChange={(e) => setRentalId(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, mb: 2 }}
            onClick={handleReturnBook}
          >
            Return Book
          </Button>
          {message && <Typography variant="body2" color="textSecondary">{message}</Typography>}
        </Box>
      </Paper>
    </Container>
  );
};

export default BookReturn;