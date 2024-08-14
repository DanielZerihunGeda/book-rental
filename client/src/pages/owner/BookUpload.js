import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Paper } from '@mui/material';
import axios from 'axios';

const BookUpload = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('description', description);
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/api/books/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Book uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading book:', error.response?.data?.message || error.message);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Upload Book
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
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
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ mt: 2, mb: 2 }}
          >
            Upload File
            <input
              type="file"
              hidden
              onChange={handleFileChange}
            />
          </Button>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, mb: 2 }}
            onClick={handleUpload}
          >
            Upload Book
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default BookUpload;