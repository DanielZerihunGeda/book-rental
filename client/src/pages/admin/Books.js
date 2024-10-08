import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow, Paper, Container } from '@mui/material';
import axios from 'axios';
import Sidebar from '../../components/Sidebar'; // Import the reusable Sidebar
import { useLocation } from 'react-router-dom';

const Books = ({ role }) => {
  const [books, setBooks] = useState([]);
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    // Fetch books data
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://book-rental-nvrq.onrender.com/api/books/admin', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setBooks(response.data);
      } catch (error) {
        console.error('Failed to fetch books:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar role={role} currentPath={currentPath} /> {/* Pass the current path to Sidebar */}
      <Container component="main" sx={{ flexGrow: 1, p: 3, maxWidth: '90%' }}>
        <Typography variant="h4" gutterBottom>
          Books
        </Typography>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Owner</TableCell>
                <TableCell>Available Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Date Added</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map((book) => (
                <TableRow key={book.id}>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.owner.name}</TableCell>
                  <TableCell>{book.available_quantity}</TableCell>
                  <TableCell>{book.price}</TableCell>
                  <TableCell>{new Date(book.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" sx={{ mr: 1 }}>
                      Edit
                    </Button>
                    <Button variant="contained" color="error">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    </Box>
  );
};

export default Books;