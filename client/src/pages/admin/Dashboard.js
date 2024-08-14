import React from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';
import Sidebar from '../../components/Sidebar'; // Adjust path as necessary
import { Box } from '@mui/system'; // For layout
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar role="admin" currentPath={currentPath} /> {/* Pass the current path to Sidebar */}

      <Container sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6">Books Overview</Typography>
              {/* Add relevant content and charts */}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6">Owners Overview</Typography>
              {/* Add relevant content and charts */}
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6">Notifications</Typography>
              {/* Add relevant content */}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
