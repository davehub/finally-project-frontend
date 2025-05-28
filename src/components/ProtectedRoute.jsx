// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from './Navbar'; // Incluez votre Navbar ici

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    // Si l'utilisateur n'a pas le rôle requis, redirigez-le ou affichez un message
    return <Navigate to="/unauthorized" replace />; // Créez une page /unauthorized
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow p-4">
        <Outlet /> {/* Rend le composant enfant de la route protégée */}
      </main>
    </div>
  );
};

export default ProtectedRoute;