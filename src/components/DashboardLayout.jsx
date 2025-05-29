import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
        <Navbar /> {/* La barre de navigation */}
        <main className="flex-grow p-6">
          <div className="container mx-auto">
            {children}{" "}
            {/* Ici seront rendus les composants de page (DashboardPage, EquipmentsPage, etc.) */}
          </div>
        </main>
        {/* Vous pouvez ajouter un footer ici si nécessaire */}
        {/* <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; {new Date().getFullYear()} Mon Parc Info</p>
      </footer> */}
      </div>
    </div>
  );
};

export default DashboardLayout;
