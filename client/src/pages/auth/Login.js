import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Paper, FormControlLabel, Checkbox, Link } from '@mui/material';
import { LockOutlined as LockIcon } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('https://book-rental-nvrq.onrender.com/api/auth/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role;

      if (userRole === 'admin') {
        navigate('/admin/dashboard');
      } else if (userRole === 'owner') {
        navigate('/owner/dashboard');
      }
    } catch (error) {
      setError('Login failed. Please check your credentials and try again.');
      console.error('Login failed:', error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignupRedirect = () => {
    navigate('/register');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <LockIcon sx={{ fontSize: 60, mb: 2, color: 'primary.main' }} />
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            label="Email Address"
            variant="outlined"
            fullWidth
            margin="normal"
            autoComplete="email"
            autoFocus
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="Remember me"
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, mb: 2 }}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Sign In'}
          </Button>
          {error && <Typography color="error">{error}</Typography>}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
            <Link href="#" variant="body2" onClick={handleSignupRedirect}>
              Create an Account
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;