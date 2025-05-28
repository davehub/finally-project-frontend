// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LoginScreen from './components/LoginScreen';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Assets from './pages/Assets';
import Admin from './pages/Admin';
import Support from './pages/Support'; // Créez ce composant
import Reports from './pages/Reports'; // Créez ce composant
import NotFound from './pages/NotFound'; // Créez une page 404
import Unauthorized from './pages/Unauthorized'; // Créez une page d'accès refusé

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Routes protégées */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/assets" element={<Assets />} />
            <Route path="/support" element={<Support />} />
          </Route>

          {/* Routes protégées avec rôle spécifique (exemple pour l'Admin) */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<Admin />} />
            <Route path="/reports" element={<Reports />} />
          </Route>

          {/* Route 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;