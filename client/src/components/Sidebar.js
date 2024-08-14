import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText, Divider, Drawer, Button } from '@mui/material';
import { Dashboard as DashboardIcon, Book as BookIcon, People as PeopleIcon, Notifications as NotificationsIcon, Settings as SettingsIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { useRole } from '../contexts/RoleContext';

const Sidebar = ({ currentPath = '' }) => {
  const { role } = useRole();
  const isActive = (path) => currentPath && currentPath.startsWith(path);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#ffffff',
          borderRight: '1px solid #ddd',
        },
      }}
    >
      <List>
        <ListItem button component={Link} to={`/${role}/dashboard`} selected={isActive(`/${role}/dashboard`)}>
          <ListItemIcon><DashboardIcon sx={{ color: '#1976d2' }} /></ListItemIcon>
          <ListItemText primary="Dashboard" primaryTypographyProps={{ fontWeight: 'bold' }} />
        </ListItem>
        {role === 'admin' && (
          <>
            <ListItem button component={Link} to="/admin/books" selected={isActive('/admin/books')}>
              <ListItemIcon><BookIcon sx={{ color: '#1976d2' }} /></ListItemIcon>
              <ListItemText primary="Books" primaryTypographyProps={{ fontWeight: 'bold' }} />
            </ListItem>
            <ListItem button component={Link} to="/admin/owners" selected={isActive('/admin/owners')}>
              <ListItemIcon><PeopleIcon sx={{ color: '#1976d2' }} /></ListItemIcon>
              <ListItemText primary="Owners" primaryTypographyProps={{ fontWeight: 'bold' }} />
            </ListItem>
          </>
        )}
        {role === 'owner' && (
          <>
            <ListItem button component={Link} to="/owner/book-upload" selected={isActive('/owner/book-upload')}>
              <ListItemIcon><BookIcon sx={{ color: '#1976d2' }} /></ListItemIcon>
              <ListItemText primary="Book Upload" primaryTypographyProps={{ fontWeight: 'bold' }} />
            </ListItem>
            <ListItem button component={Link} to="/owner/book-rental" selected={isActive('/owner/book-rental')}>
              <ListItemIcon><BookIcon sx={{ color: '#1976d2' }} /></ListItemIcon>
              <ListItemText primary="Book Rental" primaryTypographyProps={{ fontWeight: 'bold' }} />
            </ListItem>
            <ListItem button component={Link} to="/owner/book-return" selected={isActive('/owner/book-return')}>
              <ListItemIcon><BookIcon sx={{ color: '#1976d2' }} /></ListItemIcon>
              <ListItemText primary="Book Return" primaryTypographyProps={{ fontWeight: 'bold' }} />
            </ListItem>
          </>
        )}
      </List>
      <Divider sx={{ my: 12 }} />
      <List>
        <ListItem button component={Link} to={`/${role}/notifications`} selected={isActive(`/${role}/notifications`)}>
          <ListItemIcon><NotificationsIcon sx={{ color: '#1976d2' }} /></ListItemIcon>
          <ListItemText primary="Notifications" primaryTypographyProps={{ fontWeight: 'bold' }} />
        </ListItem>
        {role === 'admin' && (
          <ListItem button component={Link} to="/admin/settings" selected={isActive('/admin/settings')}>
            <ListItemIcon><SettingsIcon sx={{ color: '#1976d2' }} /></ListItemIcon>
            <ListItemText primary="Settings" primaryTypographyProps={{ fontWeight: 'bold' }} />
          </ListItem>
        )}
        {role === 'owner' && (
          <ListItem button component={Link} to="/owner/settings" selected={isActive('/owner/settings')}>
            <ListItemIcon><SettingsIcon sx={{ color: '#1976d2' }} /></ListItemIcon>
            <ListItemText primary="Settings" primaryTypographyProps={{ fontWeight: 'bold' }} />
          </ListItem>
        )}
      </List>
      <Divider sx={{ my: 0 }} />
      <List>
        <ListItem>
          <Button
            variant="contained"
            color="error"
            fullWidth
            startIcon={<LogoutIcon />}
            sx={{ mt: 'auto' }}
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/login'; // Redirect to login page
            }}
          >
            Logout
          </Button>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;

