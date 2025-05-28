import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/AuthContext'; // Importer le AuthProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* Englobe l'App pour le routage */}
      <AuthProvider> {/* Englobe l'App pour l'authentification */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);