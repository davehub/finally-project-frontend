// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext'; // Importez useAuth aussi
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import ProtectedRoute from './components/ProtectedRoute';

// Importez vos composants de page
import DashboardLayout from './components/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
import EquipmentsPage from './pages/EquipmentsPage';
import SoftwarePage from './pages/SoftwarePage';
import UsersPage from './pages/UsersPage';
import IncidentsPage from './pages/IncidentsPage';
import MaintenancePage from './pages/MaintenancePage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';


function AppContent() {
  const { loading } = useAuth(); // Accédez à l'état de chargement du contexte

  if (loading) {
    // Affichez un indicateur de chargement pendant la vérification initiale de l'authentification
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
        <p className="ml-4 text-gray-700">Chargement de l'application...</p>
      </div>
    );
  }

  return (
    <Routes>
      {/* Route de connexion - Non protégée, sans layout */}
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />


      {/* Routes protégées - Enveloppées par ProtectedRoute et DashboardLayout */}
      {/* Le DashboardLayout est rendu par ProtectedRoute */}
      <Route element={<ProtectedRoute component={DashboardLayout} />}>
        {/* Route par défaut après connexion */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/equipments/*" element={<EquipmentsPage />} />
        <Route path="/software/*" element={<SoftwarePage />} />
        {/* Routes nécessitant un rôle spécifique (ex: admin) */}
        <Route element={<ProtectedRoute component={DashboardLayout} allowedRoles={['admin']} />}>
          <Route path="/users/*" element={<UsersPage />} />
          <Route path="/settings/*" element={<SettingsPage />} />
        </Route>
        <Route path="/incidents/*" element={<IncidentsPage />} />
        <Route path="/maintenance/*" element={<MaintenancePage />} />
        <Route path="/reports/*" element={<ReportsPage />} />
      </Route>

    
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;