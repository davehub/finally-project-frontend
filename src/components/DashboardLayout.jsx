import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar'; 

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <Navbar />  
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;