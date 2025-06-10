import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ton-backend-api.com/api',  // Remplace par l'URL de ton API
  timeout: 10000,  // Timeout de 10 secondes
  headers: {
    'Content-Type': 'application/json',
    // Tu peux ajouter un token d'auth ici si tu en as besoin
    // 'Authorization': `Bearer ${token}`
  },
});

// Exemple d'intercepteur pour ajouter un token d'auth automatiquement
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // Ou autre source
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default api;
