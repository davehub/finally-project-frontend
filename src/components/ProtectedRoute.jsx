// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
// import Navbar from './Navbar'; // La Navbar est maintenant dans DashboardLayout

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    // Si non authentifié, redirige vers la page de connexion
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    // Si authentifié mais rôle non autorisé, redirige vers la page d'accès refusé
    return <Navigate to="/unauthorized" replace />;
  }

  // Si authentifié et autorisé, rend le composant de layout (DashboardLayout)
  // et lui passe l'Outlet comme enfant pour rendre la page spécifique
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;