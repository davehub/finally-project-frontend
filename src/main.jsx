// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Importer le CSS global (y compris Tailwind)

// Importer les modules Firebase nécessaires
// import * as firebase from 'firebase/app'; // Non utilisé si Firebase est retiré
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, signInAnonymously, signInWithCustomToken } from 'firebase/auth'; // Non utilisé
// import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'; // Non utilisé

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

// Ajouter le CDN Tailwind CSS pour des tests rapides dans des environnements sans outils de construction
// Dans un vrai projet, vous utiliseriez un processus de construction (par exemple, Vite, Create React App)
// pour compiler Tailwind CSS.
// Dans le but de cet exemple autonome, nous incluons le CDN.
const tailwindScript = document.createElement('script');
tailwindScript.src = 'https://cdn.tailwindcss.com';
document.head.appendChild(tailwindScript);

// Ajouter la police Inter de Google Fonts
const interFontLink = document.createElement('link');
interFontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
interFontLink.rel = 'stylesheet';
document.head.appendChild(interFontLink);

// Définir la famille de polices pour le corps dans une balise de style pour une application immédiate
const fontStyle = document.createElement('style');
fontStyle.innerHTML = `
  body {
    font-family: 'Inter', sans-serif;
  }
`;
document.head.appendChild(fontStyle);
