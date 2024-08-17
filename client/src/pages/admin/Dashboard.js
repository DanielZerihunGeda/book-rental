import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';
import Sidebar from '../../components/Sidebar'; // Adjust path as necessary
import { Box } from '@mui/system'; // For layout
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [data, setData] = useState({
    totalBooks: 0,
    rentedBooks: 0,
    totalRentals: 0,
    activeRentals: 0,
    overdueRentals: 0,
    totalRevenue: 0,
    mostRentedBooks: []
  });

  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    // Fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('https://book-rental-nvrq.onrender.com/api/rentals/dashboard', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  // Data for the most rented books chart
  const mostRentedBooksData = {
    labels: data.mostRentedBooks.map(book => book.Book.title),
    datasets: [
      {
        label: 'Most Rented Books',
        data: data.mostRentedBooks.map(book => book.rentCount),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
      }
    ]
  };

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
              <Typography variant="h6">Total Books</Typography>
              <Typography variant="h4">{data.totalBooks}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6">Books Currently Rented Out</Typography>
              <Typography variant="h4">{data.rentedBooks}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6">Total Rentals</Typography>
              <Typography variant="h4">{data.totalRentals}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6">Active Rentals</Typography>
              <Typography variant="h4">{data.activeRentals}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6">Overdue Rentals</Typography>
              <Typography variant="h4">{data.overdueRentals}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6">Total Revenue</Typography>
              <Typography variant="h4">{data.totalRevenue}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6">Most Rented Books</Typography>
              <Bar data={mostRentedBooksData} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;