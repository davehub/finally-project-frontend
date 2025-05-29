// src/components/Navbar.js (Mise à jour partielle)
import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Importez useLocation
import { ComputerDesktopIcon, UserGroupIcon, Cog6ToothIcon, ChartBarIcon, PowerIcon, HomeIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation(); // Obtenez l'objet location actuel

  const getMenuItems = () => {
    if (!isAuthenticated) return [];

    const items = [
      { name: 'Tableau de bord', path: '/dashboard', icon: <HomeIcon className="h-5 w-5 mr-2" /> },
      { name: 'Équipements', path: '/equipments', icon: <ComputerDesktopIcon className="h-5 w-5 mr-2" /> },
      { name: 'Logiciels', path: '/software', icon: <ComputerDesktopIcon className="h-5 w-5 mr-2" /> }, // Icône à adapter
      { name: 'Incidents', path: '/incidents', icon: <UserGroupIcon className="h-5 w-5 mr-2" /> }, // Icône à adapter
      { name: 'Maintenance', path: '/maintenance', icon: <Cog6ToothIcon className="h-5 w-5 mr-2" /> }, // Icône à adapter
      { name: 'Rapports', path: '/reports', icon: <ChartBarIcon className="h-5 w-5 mr-2" /> }, // Icône à adapter
    ];

    if (user?.role === 'admin') {
      items.push(
        { name: 'Utilisateurs', path: '/users', icon: <UserGroupIcon className="h-5 w-5 mr-2" /> }, // Icône à adapter
        { name: 'Paramètres', path: '/settings', icon: <Cog6ToothIcon className="h-5 w-5 mr-2" /> } // Icône à adapter
      );
    }
    return items;
  };

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="text-2xl font-bold text-indigo-400">
          Mon Parc Info
        </Link>
        {isAuthenticated && (
          <ul className="flex space-x-6">
            {getMenuItems().map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  // Appliquez une classe 'active' si le chemin correspond
                  className={`flex items-center hover:text-indigo-400 transition-colors duration-200 ${
                    location.pathname.startsWith(item.path) ? 'text-indigo-400 font-semibold' : ''
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={logout}
                className="flex items-center bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded transition-colors duration-200"
              >
                <PowerIcon className="h-5 w-5 mr-2" />
                Déconnexion
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;