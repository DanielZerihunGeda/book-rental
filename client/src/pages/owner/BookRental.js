import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Paper, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import axios from 'axios';

const BookRental = () => {
  const [bookId, setBookId] = useState('');
  const [username, setUsername] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [rentStart, setRentStart] = useState('');
  const [rentEnd, setRentEnd] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [open, setOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const calculateTotalPrice = () => {
    const startDate = new Date(rentStart);
    const endDate = new Date(rentEnd);
    const days = (endDate - startDate) / (1000 * 60 * 60 * 24);
    const pricePerDay = 100; // Assuming a fixed price per day for simplicity
    return days * pricePerDay * quantity;
  };

  const handleRentBook = () => {
    const price = calculateTotalPrice();
    setTotalPrice(price);
    setOpen(true);
  };

  const confirmRentBook = async () => {
    try {
      const token = localStorage.getItem('token'); // Get token from localStorage

      await axios.post(
        'http://localhost:5000/api/rentals/rent',
        { bookId, username, address, email, phone, rentStart, rentEnd, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}` // Include the token in the Authorization header
          }
        }
      );

      setMessage('Book rented successfully!');
      setMessageType('success');
      setOpen(false);
    } catch (error) {
      setMessage(error.response?.data?.msg || 'Failed to rent book.');
      setMessageType('error');
      setOpen(false);
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
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Phone"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            label="Rental Start Date"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            type="date"
            InputLabelProps={{ shrink: true }}
            value={rentStart}
            onChange={(e) => setRentStart(e.target.value)}
          />
          <TextField
            label="Rental End Date"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            type="date"
            InputLabelProps={{ shrink: true }}
            value={rentEnd}
            onChange={(e) => setRentEnd(e.target.value)}
          />
          <TextField
            label="Quantity"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            type="number"
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
          {message && (
            <Alert severity={messageType} sx={{ mt: 2 }}>
              {message}
            </Alert>
          )}
        </Box>
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Rental</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please confirm the rental details:
          </DialogContentText>
          <Box>
            <Typography>Book ID: {bookId}</Typography>
            <Typography>Username: {username}</Typography>
            <Typography>Address: {address}</Typography>
            <Typography>Email: {email}</Typography>
            <Typography>Phone: {phone}</Typography>
            <Typography>Rental Start Date: {rentStart}</Typography>
            <Typography>Rental End Date: {rentEnd}</Typography>
            <Typography>Quantity: {quantity}</Typography>
            <Typography>Total Price: ${totalPrice.toFixed(2)}</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={confirmRentBook} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BookRental;

