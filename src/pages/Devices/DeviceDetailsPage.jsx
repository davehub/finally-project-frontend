import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

// Mock des fonctions API (à remplacer par vos vraies implémentations)
const getDeviceById = async (id) => {
  const response = await fetch(`/api/devices/${id}`);
  return await response.json();
};

const DeviceDetailsPage = () => {
    const { id } = useParams();
    const [device, setDevice] = useState(null);
    const [error, setError] = useState('');
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        // Récupération du rôle depuis le localStorage au lieu du contexte
        const role = localStorage.getItem('userRole');
        setUserRole(role);

        const fetchDevice = async () => {
            setError('');
            try {
                const res = await getDeviceById(id);
                setDevice(res.data);
            } catch (err) {
                console.error('Erreur récupération équipement:', err);
                setError("Impossible de récupérer les détails de l'équipement.");
            }
        };

        fetchDevice();
    }, [id]);

    const formatDate = (dateStr) => {
        return dateStr ? new Date(dateStr).toLocaleDateString() : 'Non renseignée';
    };

    if (error) {
        return <div className="text-red-600 text-center mt-4">{error}</div>;
    }

    if (!device) {
        return <p className="text-center text-gray-500 mt-4">Chargement des détails de l'équipement...</p>;
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Détails de l'Équipement</h2>

            <div className="bg-white shadow-md rounded-xl p-6 space-y-4 border border-gray-200">
                <DetailItem label="Nom" value={device.name} />
                <DetailItem label="Type" value={device.type} />
                <DetailItem label="N° de série" value={device.serialNumber} />
                <DetailItem label="Statut" value={device.status} />
                <DetailItem label="Localisation" value={device.location || 'Non spécifiée'} />
                <DetailItem label="Attribué à" value={device.assignedTo ? device.assignedTo.username : 'Non attribué'} />
                <DetailItem label="Date d'achat" value={formatDate(device.purchaseDate)} />
                <DetailItem label="Fin de garantie" value={formatDate(device.warrantyEndDate)} />
                <DetailItem label="Description" value={device.description || 'Non fournie'} />
            </div>

            <div className="mt-6 flex justify-between">
                <Link to="/devices" className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition">
                    ← Retour à la liste
                </Link>
                {(userRole === 'admin' || userRole === 'technician') && (
                    <Link 
                        to={`/devices/edit/${device._id}`} 
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Modifier
                    </Link>
                )}
            </div>
        </div>
    );
};

const DetailItem = ({ label, value }) => (
    <div className="flex justify-between">
        <span className="font-semibold text-gray-700">{label} :</span>
        <span className="text-gray-900">{value}</span>
    </div>
);

export default DeviceDetailsPage;