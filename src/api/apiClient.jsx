import axios from 'axios';

// For Create React App, use process.env; for Vite, use import.meta.env
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const apiClient = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Intercepteur pour ajouter le token JWT à chaque requête
apiClient.interceptors.request.use(
    (config) => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const user = JSON.parse(userInfo);
            if (user && user.token) {
                config.headers.Authorization = `Bearer ${user.token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Intercepteur pour gérer les réponses d'erreur (ex: 401 Unauthorized)
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Si le token est invalide ou expiré, déconnecter l'utilisateur
            localStorage.removeItem('userInfo');
            window.location.href = '/login'; // Rediriger vers la page de connexion
        }
        return Promise.reject(error);
    }
);

export default apiClient;