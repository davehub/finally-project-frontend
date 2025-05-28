// src/pages/Assets.js (Mise à jour)
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const Assets = () => {
  const { isAuthenticated, user } = useAuth();
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAssets = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }
      try {
        const token = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get('http://localhost:5000/api/assets/assets', config);
        setAssets(data);
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors de la récupération des actifs:', err.response?.data?.message || err.message);
        setError(err.response?.data?.message || 'Impossible de charger les actifs.');
        setLoading(false);
      }
    };

    fetchAssets();
  }, [isAuthenticated]); // Déclenche à nouveau si l'état d'authentification change

  if (loading) {
    return <div className="text-center p-6">Chargement des actifs...</div>;
  }

  if (error) {
    return <div className="text-center p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Gestion du Parc Informatique</h1>
      <p className="text-lg text-gray-600 mb-4">Liste de tous les équipements, logiciels et licences.</p>

      {user?.role === 'admin' && (
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
          Ajouter un nouvel actif
        </button>
      )}

      {assets.length === 0 ? (
        <p className="text-gray-500">Aucun actif trouvé pour le moment.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-left text-gray-600">ID</th>
                <th className="py-2 px-4 border-b text-left text-gray-600">Nom</th>
                <th className="py-2 px-4 border-b text-left text-gray-600">Type</th>
                <th className="py-2 px-4 border-b text-left text-gray-600">Statut</th>
                <th className="py-2 px-4 border-b text-left text-gray-600">Assigné à</th>
                {user?.role === 'admin' && <th className="py-2 px-4 border-b text-left text-gray-600">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {assets.map((asset) => (
                <tr key={asset.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{asset.id}</td>
                  <td className="py-2 px-4 border-b">{asset.name}</td>
                  <td className="py-2 px-4 border-b">{asset.type}</td>
                  <td className="py-2 px-4 border-b">{asset.status}</td>
                  <td className="py-2 px-4 border-b">{asset.assignedTo}</td>
                  {user?.role === 'admin' && (
                    <td className="py-2 px-4 border-b">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-2">Modifier</button>
                      <button className="text-red-600 hover:text-red-900">Supprimer</button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Assets;