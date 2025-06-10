import React, { createContext, useContext, useState } from 'react';
import api from '../api/api'; // Assure-toi que le chemin est bon

// Création du contexte
const AuthContext = createContext();

// Provider du contexte
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  });

  const register = async (username, email, password, role) => {
    const response = await api.post('/register', { username, email, password, role });
    const userData = response.data.user;

    setUser(userData);
    localStorage.setItem('userInfo', JSON.stringify(userData));

    return userData;
  };

  const login = async (email, password) => {
    const response = await api.post('/login', { email, password });
    const userData = response.data.user;

    setUser(userData);
    localStorage.setItem('userInfo', JSON.stringify(userData));

    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userInfo');
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useAuth = () => useContext(AuthContext);

// Export du contexte si besoin (facultatif mais peut servir)
export { AuthContext };
