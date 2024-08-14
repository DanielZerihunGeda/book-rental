import React from 'react';
import { Typography, Container, Paper, Box } from '@mui/material';

const Settings = () => {
  return (
    <Container>
      <Typography variant="h1" gutterBottom>
        Settings
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Add setting */}
          <Typography variant="h6">Settings</Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Settings;
