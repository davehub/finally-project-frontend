// src/main.jsx ou src/index.js (selon votre configuration)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Assurez-vous que votre fichier CSS global est bien importé ici pour Tailwind

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);