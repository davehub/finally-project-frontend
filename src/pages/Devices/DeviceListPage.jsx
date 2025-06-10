import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Mock des fonctions API (à remplacer par vos vraies implémentations)
const getDevices = async () => {
  // Exemple: récupération depuis votre backend
  const response = await fetch('/api/devices');
  return await response.json();
};

const deleteDevice = async (id) => {
  const response = await fetch(`/api/devices/${id}`, {
    method: 'DELETE'
  });
  return await response.json();
};

const DeviceListPage = () => {
    const [devices, setDevices] = useState([]);
    const [error, setError] = useState('');
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        // Récupération du rôle depuis le localStorage au lieu du contexte
        const role = localStorage.getItem('userRole');
        setUserRole(role);
        
        fetchDevices();
    }, []);

    const fetchDevices = async () => {
        setError('');
        try {
            const { data } = await getDevices();
            setDevices(data);
        } catch (err) {
            setError('Erreur lors de la récupération des équipements.');
            console.error('Fetch devices error:', err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cet équipement ?')) {
            setError('');
            try {
                await deleteDevice(id);
                fetchDevices();
            } catch (err) {
                setError("Erreur lors de la suppression de l'équipement.");
                console.error('Delete device error:', err);
            }
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Liste des Équipements</h2>

            {(userRole === 'admin' || userRole === 'technician') && (
                <div className="mb-4 text-right">
                    <Link
                        to="/devices/add"
                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        + Ajouter un équipement
                    </Link>
                </div>
            )}

            {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>}

            {devices.length === 0 ? (
                <p className="text-center text-gray-500">Aucun équipement trouvé.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                                <th className="px-4 py-2">Nom</th>
                                <th className="px-4 py-2">Type</th>
                                <th className="px-4 py-2">N° de série</th>
                                <th className="px-4 py-2">Statut</th>
                                <th className="px-4 py-2">Attribué à</th>
                                <th className="px-4 py-2">Localisation</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {devices.map((device) => (
                                <tr key={device._id} className="border-t hover:bg-gray-50">
                                    <td className="px-4 py-2">{device.name}</td>
                                    <td className="px-4 py-2">{device.type}</td>
                                    <td className="px-4 py-2">{device.serialNumber}</td>
                                    <td className="px-4 py-2">{device.status}</td>
                                    <td className="px-4 py-2">{device.assignedTo ? device.assignedTo.username : 'Non attribué'}</td>
                                    <td className="px-4 py-2">{device.location || 'N/A'}</td>
                                    <td className="px-4 py-2 space-x-2">
                                        {(userRole === 'admin' || userRole === 'technician') && (
                                            <>
                                                <Link
                                                    to={`/devices/edit/${device._id}`}
                                                    className="inline-block bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition text-sm"
                                                >
                                                    Modifier
                                                </Link>
                                                {userRole === 'admin' && (
                                                    <button
                                                        onClick={() => handleDelete(device._id)}
                                                        className="inline-block bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition text-sm"
                                                    >
                                                        Supprimer
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default DeviceListPage;