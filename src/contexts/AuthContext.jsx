// src/contexts/AuthContext.js (Mise à jour)
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios'; // Assurez-vous d'installer axios: npm install axios

const AuthContext = createContext(null);

const API_URL = 'http://localhost:5000/api/auth/'; // URL de votre backend

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Informations de l'utilisateur (nom, rôle, etc.)
  const [loading, setLoading] = useState(true); // Pour gérer l'état de chargement initial

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          // Vérifier la validité du token et récupérer le profil utilisateur
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const { data } = await axios.get(`${API_URL}profile`, config);
          setIsAuthenticated(true);
          setUser(data);
        } catch (error) {
          console.error('Token invalide ou expiré', error);
          localStorage.removeItem('authToken'); // Nettoyer le token invalide
          setIsAuthenticated(false);
          setUser(null);
        }
      }
      setLoading(false); // Fin du chargement initial
    };

    loadUser();
  }, []);

  const login = async (username, password) => {
    try {
      const { data } = await axios.post(`${API_URL}login`, { username, password });
      localStorage.setItem('authToken', data.token);
      setIsAuthenticated(true);
      setUser({
        _id: data._id,
        username: data.username,
        email: data.email,
        role: data.role,
      });
      return { success: true };
    } catch (error) {
      console.error('Erreur de connexion:', error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || 'Erreur de connexion');
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setUser(null);
  };

  // Optionnel: Fonction pour s'enregistrer (utile pour les admins ou les tests)
  const register = async (username, email, password, role = 'user') => {
    try {
      const { data } = await axios.post(`${API_URL}register`, { username, email, password, role });
      // Après l'enregistrement, vous pouvez choisir de connecter l'utilisateur automatiquement
      localStorage.setItem('authToken', data.token);
      setIsAuthenticated(true);
      setUser({
        _id: data._id,
        username: data.username,
        email: data.email,
        role: data.role,
      });
      return { success: true };
    } catch (error) {
      console.error('Erreur d\'enregistrement:', error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || 'Erreur d\'enregistrement');
    }
  };


  if (loading) {
    return <div>Chargement de l'application...</div>; // Ou un spinner de chargement
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);