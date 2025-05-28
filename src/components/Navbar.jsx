// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ComputerDesktopIcon, UserGroupIcon, Cog6ToothIcon, ChartBarIcon, PowerIcon, HomeIcon } from '@heroicons/react/24/solid';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  const getMenuItems = () => {
    if (!isAuthenticated) return [];

    const items = [
      { name: 'Tableau de bord', path: '/dashboard', icon: <HomeIcon className="h-5 w-5 mr-2" /> },
      { name: 'Gestion du Parc', path: '/assets', icon: <ComputerDesktopIcon className="h-5 w-5 mr-2" /> },
      { name: 'Support', path: '/support', icon: <UserGroupIcon className="h-5 w-5 mr-2" /> },
    ];

    if (user?.role === 'admin') {
      items.push(
        { name: 'Administration', path: '/admin', icon: <Cog6ToothIcon className="h-5 w-5 mr-2" /> },
        { name: 'Rapports', path: '/reports', icon: <ChartBarIcon className="h-5 w-5 mr-2" /> }
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
                <Link to={item.path} className="flex items-center hover:text-indigo-400 transition-colors duration-200">
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