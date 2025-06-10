import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import DashboardPage from './pages/DashboardPage';

import DeviceListPage from './pages/Devices/DeviceListPage';
import AddDevicePage from './pages/Devices/AddDevicePage';

import MaintenanceListPage from './pages/Maintenance/MaintenanceListPage';
import AddMaintenancePage from './pages/Maintenance/AddMaintenancePage';

import EmergencyListPage from './pages/Emergency/EmergencyListPage';
import AddEmergencyPage from './pages/Emergency/AddEmergencyPage';

import UserListPage from './pages/Users/UserListPage';
import EditUserPage from './pages/Users/EditUserPage';

import './App.css';

// Simule une base de données simple en mémoire
const mockUsers = [
  { id: 1, email: 'admin@example.com', password: 'admin123', role: 'admin' },
  { id: 2, email: 'tech@example.com', password: 'tech123', role: 'technician' },
  { id: 3, email: 'user@example.com', password: 'user123', role: 'user' },
];

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  // Au chargement, vérifie si l'utilisateur est déjà connecté
  useEffect(() => {
    const user = sessionStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const login = (email, password) => {
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (user) {
      const { password: _unused, ...userWithoutPassword } = user; // Ne stocke pas le mot de passe
      setCurrentUser(userWithoutPassword);
      sessionStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem('currentUser');
  };

  // Composant de route privée simplifié
  const PrivateRoute = ({ children, roles }) => {
    if (!currentUser) return <Navigate to="/login" />;
    if (roles && !roles.includes(currentUser.role)) return <Navigate to="/" />;
    return children;
  };

  return (
    <Router>
      <Navbar currentUser={currentUser} logout={logout} />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage currentUser={currentUser} />} />
          <Route path="/login" element={currentUser ? <Navigate to="/" /> : <LoginPage login={login} />} />
          
          <Route 
            path="/register" 
            element={
              <PrivateRoute roles={['admin']}>
                <RegisterPage users={mockUsers} />
              </PrivateRoute>
            } 
          />

          <Route 
  path="/dashboard" 
  element={
    <PrivateRoute currentUser={currentUser}>
      <DashboardPage currentUser={currentUser} />
    </PrivateRoute>
  }
/>

          {/* Routes pour les Utilisateurs */}
          <Route
            path="/users"
            element={
              <PrivateRoute roles={['admin', 'technician']}>
                <UserListPage users={mockUsers} />
              </PrivateRoute>
            }
          />
          <Route
            path="/users/edit/:id"
            element={
              <PrivateRoute roles={['admin']}>
                <EditUserPage users={mockUsers} />
              </PrivateRoute>
            }
          />

          {/* Routes pour les Équipements */}
          <Route
            path="/devices"
            element={
              <PrivateRoute>
                <DeviceListPage />
              </PrivateRoute>
            }
          />
          <Route 
  path="/devices/add"
  element={
    <PrivateRoute currentUser={currentUser} roles={['admin', 'technician']}>
      <AddDevicePage currentUser={currentUser} />
    </PrivateRoute>
  }
/>

          {/* Routes pour la Maintenance */}
          <Route
            path="/maintenances"
            element={
              <PrivateRoute>
                <MaintenanceListPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/maintenances/add"
            element={
              <PrivateRoute roles={['admin', 'technician']}>
                <AddMaintenancePage />
              </PrivateRoute>
            }
          />

          {/* Routes pour les Urgences */}
          <Route
            path="/emergencies"
            element={
              <PrivateRoute>
                <EmergencyListPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/emergencies/add"
            element={
              <PrivateRoute>
                <AddEmergencyPage />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<div>404 - Page non trouvée</div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;