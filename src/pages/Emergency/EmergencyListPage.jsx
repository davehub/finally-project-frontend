import React, { useEffect, useState } from 'react';
import { getEmergencies, deleteEmergency } from '../../api/emergencyApi';
import { Link } from 'react-router-dom';

const EmergencyListPage = () => {
    const [emergencies, setEmergencies] = useState([]);
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Récupérer l'utilisateur actuel depuis le localStorage
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const fetchEmergencies = async () => {
        setError('');
        try {
            const { data } = await getEmergencies();
            setEmergencies(data);
        } catch (err) {
            setError('Erreur lors de la récupération des urgences.');
            console.error('Fetch emergencies error:', err);
        }
    };

    useEffect(() => {
        fetchEmergencies();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette urgence ?')) {
            setError('');
            try {
                await deleteEmergency(id);
                fetchEmergencies();
            } catch (err) {
                setError('Erreur lors de la suppression de l\'urgence.');
                console.error('Delete emergency error:', err);
            }
        }
    };

    const formatDate = (date) =>
        date ? new Date(date).toLocaleDateString() : 'N/A';

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'faible': return 'text-green-600';
            case 'moyenne': return 'text-yellow-600';
            case 'élevée': return 'text-orange-600';
            case 'critique': return 'text-red-600 font-bold';
            default: return 'text-gray-700';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'nouvelle': return 'bg-blue-100 text-blue-700';
            case 'en cours': return 'bg-yellow-100 text-yellow-700';
            case 'résolue': return 'bg-green-100 text-green-700';
            case 'fermée': return 'bg-gray-200 text-gray-800';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <div className="px-6 py-10 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Liste des Urgences</h2>
                {user && (['admin', 'technician', 'user'].includes(user.role)) && (
                    <Link
                        to="/emergencies/add"
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                    >
                        Signaler une urgence
                    </Link>
                )}
            </div>

            {error && (
                <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>
            )}

            {emergencies.length === 0 ? (
                <p className="text-gray-600">Aucune urgence signalée.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border rounded-md shadow">
                        <thead className="bg-gray-100 text-left text-sm text-gray-600 uppercase">
                            <tr>
                                <th className="px-4 py-2">Équipement</th>
                                <th className="px-4 py-2">Signalé par</th>
                                <th className="px-4 py-2">Date</th>
                                <th className="px-4 py-2">Problème</th>
                                <th className="px-4 py-2">Priorité</th>
                                <th className="px-4 py-2">Statut</th>
                                <th className="px-4 py-2">Résolu par</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-800 divide-y">
                            {emergencies.map((urg) => (
                                <tr key={urg._id}>
                                    <td className="px-4 py-2">{urg.device?.name || 'N/A'}</td>
                                    <td className="px-4 py-2">{urg.reportedBy?.username || 'N/A'}</td>
                                    <td className="px-4 py-2">{formatDate(urg.reportedDate)}</td>
                                    <td className="px-4 py-2">{urg.issue}</td>
                                    <td className={`px-4 py-2 ${getPriorityColor(urg.priority)}`}>
                                        {urg.priority}
                                    </td>
                                    <td className="px-4 py-2">
                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(urg.status)}`}>
                                            {urg.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">{urg.resolvedBy?.username || 'N/A'}</td>
                                    <td className="px-4 py-2 space-x-2">
                                        {(user?.role === 'admin' || user?.role === 'technician') && (
                                            <Link
                                                to={`/emergencies/edit/${urg._id}`}
                                                className="text-blue-600 hover:underline"
                                            >
                                                Modifier
                                            </Link>
                                        )}
                                        {user?.role === 'admin' && (
                                            <button
                                                onClick={() => handleDelete(urg._id)}
                                                className="text-red-600 hover:underline"
                                            >
                                                Supprimer
                                            </button>
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

export default EmergencyListPage;