import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Button } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import axios from 'axios';

const Owners = () => {
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    // Fetch owners data
    const fetchOwners = async () => {
      try {
        const response = await axios.get('https://book-rental-nvrq.onrender.com/api/books/owners', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setOwners(response.data);
      } catch (error) {
        console.error('Failed to fetch owners:', error);
      }
    };

    fetchOwners();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://book-rental-nvrq.onrender.com/api/auth/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setOwners(owners.filter(owner => owner.id !== id));
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const columns = [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'createdAt', header: 'Date Added', Cell: ({ cell }) => new Date(cell.getValue()).toLocaleDateString() },
    {
      accessorKey: 'actions',
      header: 'Actions',
      Cell: ({ row }) => (
        <Button variant="contained" color="error" onClick={() => handleDelete(row.original.id)}>
          Delete Account
        </Button>
      ),
    },
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Owners
      </Typography>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <MaterialReactTable columns={columns} data={owners} />
      </Paper>
    </Container>
  );
};

export default Owners;