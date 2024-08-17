import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';

const BookReturn = () => {
  const [rentalId, setRentalId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');
  const [rentals, setRentals] = useState([]);

  const handleReturnBook = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
      await axios.post('https://book-rental-nvrq.onrender.com/api/rentals/return', { rentalId, quantity }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessage('Book returned successfully!');
      fetchRentals(); // Refresh the rentals list after returning a book
    } catch (error) {
      setMessage('Failed to return book.');
    }
  };
const fetchRentals = async () => {
  try {
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
      const response = await axios.get('https://book-rental-nvrq.onrender.com/api/rentals/', {
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
      console.log('Fetched rentals:', response.data); // Add this line
      setRentals(response.data);
  } catch (error) {
      console.error('Failed to fetch rentals:', error);
  }
};

  useEffect(() => {
    fetchRentals();
  }, []);

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
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
            onClick={handleReturnBook}
          >
            Return Book
          </Button>
          {message && <Typography variant="body2" color="textSecondary">{message}</Typography>}
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Rental Information
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Rental ID</TableCell>
                <TableCell>Book ID</TableCell>
                <TableCell>Book Title</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Rent Start</TableCell>
                <TableCell>Rent End</TableCell>
                <TableCell>Total Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rentals.map((rental) => (
                <TableRow key={rental.rentalId}>
                  <TableCell>{rental.rentalId}</TableCell>
                  <TableCell>{rental.bookId}</TableCell>
                  <TableCell>{rental.bookTitle}</TableCell>
                  <TableCell>{rental.quantity}</TableCell>
                  <TableCell>{rental.username}</TableCell>
                  <TableCell>{rental.email}</TableCell>
                  <TableCell>{rental.address}</TableCell>
                  <TableCell>{rental.phone}</TableCell>
                  <TableCell>{new Date(rental.rentStart).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(rental.rentEnd).toLocaleDateString()}</TableCell>
                  <TableCell>{rental.totalPrice}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default BookReturn;

