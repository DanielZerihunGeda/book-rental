import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Container, Paper, MenuItem, Alert } from '@mui/material';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const categories = [
  { value: 'Science Fiction', label: 'Science Fiction' },
  { value: 'Fantasy', label: 'Fantasy' },
  { value: 'Mystery', label: 'Mystery' },
  { value: 'Biography', label: 'Biography' },
];

const BookUpload = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [availableQuantity, setAvailableQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [ownerId, setOwnerId] = useState(null);
  const [message, setMessage] = useState(''); // For storing success/error message
  const [messageType, setMessageType] = useState(''); // For storing the type of message (success/error)

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setOwnerId(decodedToken.id);
    }
  }, []);

  const handleUpload = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/books',
        {
          title,
          author,
          category,
          available_quantity: availableQuantity,
          price,
          ownerId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage('Book uploaded successfully!');
      setMessageType('success');
      // Clear form fields after successful upload
      setTitle('');
      setAuthor('');
      setCategory('');
      setAvailableQuantity('');
      setPrice('');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error uploading book');
      setMessageType('error');
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Upload Book
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          {message && (
            <Alert severity={messageType} sx={{ width: '100%', mb: 2 }}>
              {message}
            </Alert>
          )}
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Author"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <TextField
            select
            label="Category"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Available Quantity"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            type="number"
            value={availableQuantity}
            onChange={(e) => setAvailableQuantity(e.target.value)}
          />
          <TextField
            label="Price"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, mb: 2 }}
            onClick={handleUpload}
            disabled={!ownerId}
          >
            Upload Book
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default BookUpload;
