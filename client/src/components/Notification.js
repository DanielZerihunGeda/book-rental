import React from 'react';
import { Typography, Container, Paper, Box } from '@mui/material';

const Notification = () => {
  return (
    <Container>
      <Typography variant="h1" gutterBottom>
        Notifications
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Add content  */}
          <Typography variant="h6">Notification List</Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Notification;
