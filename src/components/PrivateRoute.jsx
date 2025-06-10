import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, roles = [], currentUser }) => {
    // Si pas d'utilisateur, redirige vers login
    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    // Si des rôles sont spécifiés mais que l'utilisateur n'a pas le bon rôle
    if (roles.length > 0 && !roles.includes(currentUser.role)) {
        // Vous pouvez aussi rediriger vers une page "Accès refusé"
        return <Navigate to="/" />;
    }

    // Sinon, affiche le contenu protégé
    return children;
};

export default PrivateRoute;