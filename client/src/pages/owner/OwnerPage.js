import React, { useEffect } from 'react';
import { Route, Routes, Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import BookUpload from './BookUpload';
import BookRental from './BookRental';
import BookReturn from './BookReturn';
import Dashboard from './Dashboard'; // Placeholder {}}
import Notification from '../../components/Notification';
import Settings from '../../components/Settings';
import { jwtDecode } from 'jwt-decode';

const OwnerPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.role !== 'owner') {
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flexGrow: 1, padding: '16px' }}>
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="book-upload" element={<BookUpload />} />
          <Route path="book-rental" element={<BookRental />} />
          <Route path="book-return" element={<BookReturn />} />
          <Route path="settings" element={<Settings />} />
          <Route path="notifications" element={<Notification />} />
          
        </Routes>
        <Outlet />
      </div>
    </div>
  );
};

export default OwnerPage;