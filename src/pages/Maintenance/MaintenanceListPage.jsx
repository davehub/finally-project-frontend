import React, { useEffect, useState } from 'react';
import { getMaintenances, deleteMaintenance } from '../../api/maintenanceApi';
import { Link } from 'react-router-dom';

const MaintenanceListPage = () => {
    const [maintenances, setMaintenances] = useState([]);
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Récupérer l'utilisateur actuel depuis le localStorage
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const fetchMaintenances = async () => {
        setError('');
        try {
            const { data } = await getMaintenances();
            setMaintenances(data);
        } catch (err) {
            setError('Erreur lors de la récupération des maintenances.');
            console.error('Fetch maintenances error:', err);
        }
    };

    useEffect(() => {
        fetchMaintenances();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette maintenance ?')) {
            setError('');
            try {
                await deleteMaintenance(id);
                fetchMaintenances();
            } catch (err) {
                setError('Erreur lors de la suppression de la maintenance.');
                console.error('Delete maintenance error:', err);
            }
        }
    };

    const formatDate = (dateString) => {
        return dateString ? new Date(dateString).toLocaleDateString() : 'N/A';
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center drop-shadow-sm">
                    Liste des Maintenances
                </h2>

                {(user && (user.role === 'admin' || user.role === 'technician')) && (
                    <div className="flex justify-end mb-6">
                        <Link
                            to="/maintenances/add"
                            className="inline-block px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                        >
                            Planifier une maintenance
                        </Link>
                    </div>
                )}

                {error && (
                    <div className="mb-4 p-3 text-red-700 bg-red-100 rounded-md border border-red-400">
                        {error}
                    </div>
                )}

                {maintenances.length === 0 ? (
                    <p className="text-center text-gray-600 text-lg">Aucune maintenance planifiée.</p>
                ) : (
                    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    {[
                                        'Équipement', 'Date Prévue', 'Date Réal.', 'Type', 
                                        'Description', 'Effectuée par', 'Statut', 'Actions'
                                    ].map((header) => (
                                        <th
                                            key={header}
                                            className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {maintenances.map((maint) => (
                                    <tr key={maint._id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 whitespace-nowrap text-gray-700">{maint.device?.name || 'N/A'}</td>
                                        <td className="px-4 py-3 whitespace-nowrap">{formatDate(maint.scheduledDate)}</td>
                                        <td className="px-4 py-3 whitespace-nowrap">{formatDate(maint.completionDate)}</td>
                                        <td className="px-4 py-3 whitespace-nowrap">{maint.type}</td>
                                        <td className="px-4 py-3 max-w-xs truncate">{maint.description}</td>
                                        <td className="px-4 py-3 whitespace-nowrap">{maint.performedBy?.username || 'N/A'}</td>
                                        <td className="px-4 py-3 whitespace-nowrap capitalize">{maint.status}</td>
                                        <td className="px-4 py-3 whitespace-nowrap space-x-2">
                                            {(user && (user.role === 'admin' || user.role === 'technician')) && (
                                                <>
                                                    <Link
                                                        to={`/maintenances/edit/${maint._id}`}
                                                        className="inline-block px-3 py-1 text-sm text-white bg-indigo-600 rounded hover:bg-indigo-700 transition"
                                                    >
                                                        Modifier
                                                    </Link>
                                                    {user.role === 'admin' && (
                                                        <button
                                                            onClick={() => handleDelete(maint._id)}
                                                            className="inline-block px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700 transition"
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
        </div>
    );
};

export default MaintenanceListPage;