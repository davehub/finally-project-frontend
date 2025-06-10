import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Importer le CSS global (y compris Tailwind)


// Assurez-vous que l'élément racine existe avant le rendu
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('L\'élément racine avec l\'ID "root" est introuvable dans le document.');
}


