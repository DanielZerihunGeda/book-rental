import React from 'react';
import { Typography, Container, Paper } from '@mui/material';

const Dashboard = () => {
  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography component="h1" variant="h5">
          Owner Dashboard
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Placeholder for Dashboard API integration.
        </Typography>
      </Paper>
    </Container>
  );
};

export default Dashboard;