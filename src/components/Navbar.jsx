import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="text-xl font-semibold text-gray-800">
        Mon Tableau de Bord
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 hover:text-blue-600 p-2 rounded-full hover:bg-gray-100 transition-colors">
          <i className="material-icons">notifications</i>
        </button>
        <button className="text-gray-600 hover:text-blue-600 p-2 rounded-full hover:bg-gray-100 transition-colors">
          <i className="material-icons">account_circle</i>
        </button>
        <span className="text-gray-700">Admin</span>
      </div>
    </nav>
  );
};

export default Navbar;