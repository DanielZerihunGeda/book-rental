import React from 'react';
import { Container, Typography, Paper } from '@mui/material';
import { MaterialReactTable } from 'material-react-table'; 

const Owners = () => {
  const columns = [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'status', header: 'Status' },
    { accessorKey: 'books', header: 'Books Uploaded' }
  ];

  const data = [
    // Replace with your data
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Owners
      </Typography>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <MaterialReactTable columns={columns} data={data} />
      </Paper>
    </Container>
  );
};

export default Owners;