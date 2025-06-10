import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addEmergency } from '../../api/emergencyApi';
import { getDevices } from '../../api/deviceApi';

const AddEmergencyPage = () => {
    const [device, setDevice] = useState('');
    const [issue, setIssue] = useState('');
    const [priority, setPriority] = useState('moyenne');
    const [status, setStatus] = useState('nouvelle');
    const [devices, setDevices] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Récupérer l'utilisateur depuis localStorage
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    useEffect(() => {
        const fetchDevices = async () => {
            setError('');
            try {
                const res = await getDevices();
                setDevices(res.data);
            } catch (err) {
                console.error('Erreur chargement équipements:', err);
                setError('Impossible de charger la liste des équipements.');
            }
        };
        
        if (user) fetchDevices();
    }, [user]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (!user?._id) {
            setError('Vous devez être connecté pour signaler une urgence.');
            return;
        }

        try {
            const emergencyData = {
                device,
                reportedBy: user._id,
                issue,
                priority,
                status
            };

            await addEmergency(emergencyData);
            setMessage('Urgence signalée avec succès!');
            setDevice('');
            setIssue('');
            setPriority('moyenne');
            setStatus('nouvelle');
            setTimeout(() => navigate('/emergencies'), 1500);
        } catch (err) {
            console.error('Erreur signalement urgence:', err.response ? err.response.data.msg : err.message);
            setError(err.response ? err.response.data.msg : 'Erreur lors du signalement de l\'urgence.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
            <div className="bg-white shadow-md rounded-lg max-w-lg w-full p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Signaler une Urgence</h2>

                {message && (
                    <div className="mb-4 p-3 bg-green-100 text-green-700 rounded text-center font-medium">
                        {message}
                    </div>
                )}
                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-center font-medium">
                        {error}
                    </div>
                )}

                <form onSubmit={submitHandler} className="space-y-5">
                    <div>
                        <label htmlFor="device" className="block text-sm font-medium text-gray-700 mb-1">Équipement concerné</label>
                        <select
                            id="device"
                            value={device}
                            onChange={(e) => setDevice(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">-- Sélectionner un équipement --</option>
                            {devices.map(d => (
                                <option key={d._id} value={d._id}>
                                    {d.name} ({d.serialNumber})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="issue" className="block text-sm font-medium text-gray-700 mb-1">Description du problème</label>
                        <textarea
                            id="issue"
                            rows="4"
                            value={issue}
                            onChange={(e) => setIssue(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                    </div>

                    <div>
                        <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">Priorité</label>
                        <select
                            id="priority"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="faible">Faible</option>
                            <option value="moyenne">Moyenne</option>
                            <option value="élevée">Élevée</option>
                            <option value="critique">Critique</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-md transition"
                    >
                        Signaler l'urgence
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddEmergencyPage;