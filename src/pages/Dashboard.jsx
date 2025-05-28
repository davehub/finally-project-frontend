 // src/pages/Dashboard.js
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ChartPieIcon, DeviceTabletIcon, TicketIcon } from '@heroicons/react/24/outline'; // Exemples d'icônes

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Bonjour, {user?.name} !</h1>
      <p className="text-lg text-gray-600 mb-8">Bienvenue sur votre tableau de bord de gestion de parc informatique.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-indigo-100 p-6 rounded-lg shadow-sm flex items-center">
          <ChartPieIcon className="h-10 w-10 text-indigo-600 mr-4" />
          <div>
            <h3 className="text-xl font-semibold text-indigo-700">Vue d'ensemble du parc</h3>
            <p className="text-gray-700">Consultez l'état de vos équipements.</p>
          </div>
        </div>

        <div className="bg-green-100 p-6 rounded-lg shadow-sm flex items-center">
          <DeviceTabletIcon className="h-10 w-10 text-green-600 mr-4" />
          <div>
            <h3 className="text-xl font-semibold text-green-700">Actifs Recensés</h3>
            <p className="text-gray-700">120 ordinateurs, 30 imprimantes, etc.</p>
          </div>
        </div>

        <div className="bg-yellow-100 p-6 rounded-lg shadow-sm flex items-center">
          <TicketIcon className="h-10 w-10 text-yellow-600 mr-4" />
          <div>
            <h3 className="text-xl font-semibold text-yellow-700">Tickets ouverts</h3>
            <p className="text-gray-700">5 tickets en attente de traitement.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;