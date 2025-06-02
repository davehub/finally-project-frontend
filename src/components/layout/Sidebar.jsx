// src/components/layout/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Importer le contexte d'authentification

/**
 * Composant de barre latérale pour la navigation.
 * @param {object} props - Propriétés du composant.
 * @param {boolean} props.isOpen - Contrôle la visibilité de la barre latérale (pour la réactivité mobile).
 * @param {function} props.onClose - Rappel pour fermer la barre latérale (pour mobile).
 */
const Sidebar = ({ isOpen, onClose }) => {
  const { currentUser, userRole } = useAuth();

  const navLinks = [
    { path: '/', name: 'Tableau de bord', icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l-7 7m7-7v10a1 1 0 00-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ), roles: ['user', 'admin']
    },
    { path: '/users', name: 'Gestion des utilisateurs', icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.146-1.288-.423-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.146-1.288.423-1.857m0 0A9.002 9.002 0 0112 9.002a9.002 9.002 0 015.577 1.143m-3.264 3.264A9.002 9.002 0 0112 15.002a9.002 9.002 0 01-3.264-1.143m0 0L7 20m10-7l-3.264-3.264M12 12a3 3 0 100-6 3 3 0 000 6z" />
        </svg>
      ), roles: ['admin'] // Seuls les administrateurs peuvent voir cette page
    },
    { path: '/materials', name: 'Gestion des matériaux', icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m7 0V5a2 2 0 012-2h2a2 2 0 012 2v6m-6 0H6" />
        </svg>
      ), roles: ['user', 'admin']
    },
    { path: '/categories', name: 'Gestion des catégories', icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ), roles: ['user', 'admin']
    },
    { path: '/roles', name: 'Gestion des rôles', icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0H9m7 0h-1.5M12 10v4m-2 0h4m-4 0H9" />
        </svg>
      ), roles: ['admin'] // Seuls les administrateurs peuvent voir cette page
    },
  ];

  return (
    <>
      {/* Superposition pour mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white p-5 space-y-6 z-40
          transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
          transition-transform duration-300 ease-in-out lg:relative lg:flex-shrink-0`}
      >
        <div className="flex items-center justify-between lg:justify-center">
          <h1 className="text-2xl font-bold text-blue-400">Panneau d'administration</h1>
          <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-white focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav>
          {currentUser && navLinks
            .filter(link => link.roles.includes(userRole)) // Filtrer les liens en fonction du rôle de l'utilisateur
            .map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={onClose} // Fermer la barre latérale lors du clic sur un lien pour mobile
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-3 rounded-lg transition duration-200 ease-in-out
                  ${isActive
                    ? 'bg-blue-700 text-white shadow-md'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`
                }
              >
                {link.icon}
                <span>{link.name}</span>
              </NavLink>
            ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;