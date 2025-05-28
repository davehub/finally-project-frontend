import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import App from './App.jsx';
import './index.css';
// Importer le AuthProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   {/* Englobe l'App pour l'authentification */}
        <App />
      
  </React.StrictMode>,
);