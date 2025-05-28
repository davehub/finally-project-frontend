import React from 'react';
import { NavLink } from 'react-router-dom'; // Nécessite react-router-dom

const Sidebar = () => {
  const navItems = [
    { name: 'Tableau de Bord', icon: 'dashboard', path: '/' },
    { name: 'Matériel', icon: 'computer', path: '/equipments' },
    { name: 'Logiciels & Licences', icon: 'apps', path: '/software' },
    { name: 'Utilisateurs', icon: 'people', path: '/users' },
    { name: 'Incidents', icon: 'warning', path: '/incidents' },
    { name: 'Maintenance', icon: 'build', path: '/maintenance' },
    { name: 'Rapports', icon: 'summarize', path: '/reports' },
    { name: 'Paramètres', icon: 'settings', path: '/settings' },
  ];

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4 flex flex-col">
      <div className="text-2xl font-bold mb-8 text-center">
        Gestion Parc Info
      </div>
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="mb-2">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center p-2 rounded-md transition-colors duration-200 
                  ${isActive ? 'bg-gray-700 text-blue-400' : 'hover:bg-gray-700'}`
                }
              >
                <i className="material-icons mr-3">{item.icon}</i>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      {/* Vous pouvez ajouter un pied de page ou d'autres éléments ici */}
    </div>
  );
};

export default Sidebar;