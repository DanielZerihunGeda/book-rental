import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Alert, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

const Registration = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);

      if (res.data.status === 'success') {
        setSuccess(true);
        setTimeout(() => navigate('/login'), 1500);
      } else if (res.data.errors) {
        setError(res.data.errors.map(err => err.msg).join(', '));
      } else {
        setError(res.data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Server error, please try again later.');
    }
  };

  return (
    <Box
      sx={{
        width: 400,
        margin: 'auto',
        padding: 3,
        mt: 5,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: '#fff',
      }}
    >
      <Typography variant="h5" mb={2} textAlign="center">
        Create an Account
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">You Registered Successfully! Redirecting...</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          variant="outlined"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          variant="outlined"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          required
        />
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel>Role</InputLabel>
          <Select
            name="role"
            value={formData.role}
            onChange={handleChange}
            label="Role"
            required
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="owner">Owner</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Register
        </Button>
      </form>
      <Typography mt={2} textAlign="center">
        Already have an account? <Button onClick={() => navigate('/login')}>Login</Button>
      </Typography>
    </Box>
  );
};

export default Registration;