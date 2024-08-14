import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/admin/Dashboard';
import Books from './pages/admin/Books';
import Owners from './pages/admin/Owners';
import Notification from './components/Notification';
import Settings from './components/Settings';
import Login from './pages/auth/Login';
import Registration from './pages/auth/Registration';
import OwnerPage from './pages/owner/OwnerPage';
import { RoleProvider, useRole } from './contexts/RoleContext';
import { jwtDecode } from 'jwt-decode';

function App() {
  return (
    <RoleProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          
          <Route element={<WithSidebar />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/books" element={<Books />} />
            <Route path="/admin/owners" element={<Owners />} />
            <Route path="/admin/notifications" element={<Notification />} />
            <Route path="/admin/settings" element={<Settings />} />
            <Route path="/owner/*" element={<OwnerPage />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </RoleProvider>
  );
}

function WithSidebar() {
  const { setRole } = useRole();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setRole(decodedToken.role);
    } else {
      window.location.href = '/login';
    }
  }, [setRole]);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flexGrow: 1, padding: '16px' }}>
        <Outlet />
      </div>
    </div>
  );
}

export default App;