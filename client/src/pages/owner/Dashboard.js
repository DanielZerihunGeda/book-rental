import React, { useState, useEffect } from 'react';
import { Typography, Container, Paper, Box, Grid, Button, Alert, Dialog, DialogTitle, DialogContent, DialogActions, TextField, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import axios from 'axios';
import RevenueChart from './RevenueChart'; // Import the Chart component

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [revenueData, setRevenueData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchBooks = async (ownerId) => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const response = await axios.get(`http://localhost:5000/api/books?ownerId=${ownerId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setBooks(response.data);
      } catch (error) {
        setMessage('Error fetching books: ' + (error.response?.data?.message || error.message));
        setMessageType('error');
      }
    };

    const fetchRentals = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');
    
        const response = await axios.get('http://localhost:5000/api/rentals/getAggregatedRental', {
          headers: { Authorization: `Bearer ${token}` }
        });
    
        const rentals = response.data;
    
        // Calculate daily revenue
        const dailyRevenue = rentals.reduce((acc, rental) => {
          const date = new Date(rental.date).toISOString().split('T')[0];
          if (!acc[date]) acc[date] = 0;
          acc[date] += parseFloat(rental.totalRevenue);
          return acc;
        }, {});
    
        const labels = Object.keys(dailyRevenue);
        const data = Object.values(dailyRevenue);
    
        setRevenueData({
          labels,
          datasets: [{
            label: 'Revenue Over Time',
            data,
            borderColor: '#3f51b5',
            backgroundColor: 'rgba(63, 81, 181, 0.2)',
            borderWidth: 2,
          }]
        });
    
        const total = data.reduce((sum, value) => sum + value, 0);
        setTotalRevenue(total || 0); // Ensuring totalRevenue is a number
      } catch (error) {
        console.error('Error fetching aggregated rentals:', error); // Log error
        setMessage('Error fetching aggregated rentals: ' + (error.response?.data?.message || error.message));
        setMessageType('error');
      }
    };

    const ownerId = 'exampleOwnerId'; // Replace with actual owner ID
    fetchBooks(ownerId);
    fetchRentals();
  }, []);

  const handleEditOpen = (book) => {
    setEditingBook(book);
    setOpen(true);
  };

  const handleEditClose = () => {
    setOpen(false);
    setEditingBook(null);
  };

  const handleEditSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      await axios.put(`http://localhost:5000/api/books/${editingBook.id}`, editingBook, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setBooks(books.map(book => (book.id === editingBook.id ? editingBook : book)));
      handleEditClose();
      setMessage('Book updated successfully!');
      setMessageType('success');
    } catch (error) {
      setMessage('Error updating book: ' + (error.response?.data?.message || error.message));
      setMessageType('error');
    }
  };

  const handleChange = (e) => {
    setEditingBook({ ...editingBook, [e.target.name]: e.target.value });
  };

  return (
    <Container component="main" maxWidth="lg">
      <Paper elevation={3} sx={{ padding: 4, marginBottom: 4 }}>
        <Typography component="h1" variant="h5">
          Owner Dashboard
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6">Total Revenue</Typography>
              <Typography variant="h4">
                ${Number.isFinite(totalRevenue) ? totalRevenue.toFixed(2) : '0.00'}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6">Revenue Over Time</Typography>
              <RevenueChart data={revenueData} /> {/* Use the Chart component */}
            </Paper>
          </Grid>
        </Grid>
      </Paper>
      {message && (
        <Alert severity={messageType} sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Book Id</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Available Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Date Added</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id}>
                <TableCell>{book.id}</TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.category}</TableCell>
                <TableCell>{book.available_quantity}</TableCell>
                <TableCell>${book.price}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleEditOpen(book)}>
                    Edit
                  </Button>
                </TableCell>
                <TableCell>{new Date(book.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Book Dialog */}
      <Dialog open={open} onClose={handleEditClose}>
        <DialogTitle>Edit Book</DialogTitle>
        <DialogContent>
          {editingBook && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Title"
                name="title"
                value={editingBook.title}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Author"
                name="author"
                value={editingBook.author}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Category"
                name="category"
                value={editingBook.category}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Available Quantity"
                name="available_quantity"
                type="number"
                value={editingBook.available_quantity}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Price"
                name="price"
                type="number"
                value={editingBook.price}
                onChange={handleChange}
                fullWidth
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="secondary">Cancel</Button>
          <Button onClick={handleEditSubmit} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Dashboard;
