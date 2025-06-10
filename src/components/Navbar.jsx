import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ currentUser, logout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white px-4 py-3 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-xl font-semibold">
          <Link to="/" className="hover:text-blue-400">Parc Info</Link>
        </div>
        <ul className="flex flex-wrap items-center space-x-4">
          {currentUser ? (
            <>
              <li>
                <Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link>
              </li>
              <li>
                <Link to="/devices" className="hover:text-blue-400">Équipements</Link>
              </li>
              <li>
                <Link to="/maintenances" className="hover:text-blue-400">Maintenances</Link>
              </li>
              <li>
                <Link to="/emergencies" className="hover:text-blue-400">Urgences</Link>
              </li>
              {currentUser.role === 'admin' && (
                <>
                  <li>
                    <Link to="/users" className="hover:text-blue-400">Utilisateurs</Link>
                  </li>
                  <li>
                    <Link to="/devices/add" className="hover:text-blue-400">Ajouter Équipement</Link>
                  </li>
                  <li>
                    <Link to="/register" className="hover:text-blue-400">Nouvel Utilisateur</Link>
                  </li>
                </>
              )}
              {currentUser.role === 'technician' && (
                <li>
                  <Link to="/maintenances/add" className="hover:text-blue-400">Planifier Maintenance</Link>
                </li>
              )}
              <li>
                <button
                  onClick={handleLogout}
                  className="ml-2 bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded"
                >
                  Déconnexion ({currentUser.email.split('@')[0]})
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="hover:text-blue-400">Connexion</Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-blue-400">Inscription</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;