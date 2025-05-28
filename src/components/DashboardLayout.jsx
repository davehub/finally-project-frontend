import React from 'react';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-100">
        {/* Vous pouvez ajouter une barre de navigation supérieure ici si nécessaire */}
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;