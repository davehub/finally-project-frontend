import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserById, updateUser } from '../../api/userApi';

const EditUserPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // Récupérer l'utilisateur actuel depuis le localStorage
        const userData = localStorage.getItem('user');
        if (userData) {
            setCurrentUser(JSON.parse(userData));
        }
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await getUserById(id);
                setUsername(data.username);
                setEmail(data.email);
                setRole(data.role);
            } catch (err) {
                setError('Erreur lors de la récupération des détails de l\'utilisateur.');
                console.error('Fetch user details error:', err);
            }
        };

        if (currentUser?.role === 'admin') {
            fetchUser();
        } else {
            setError('Vous n\'avez pas les permissions pour modifier cet utilisateur.');
        }
    }, [id, currentUser]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        try {
            const userData = { username, email, role };
            if (password) {
                userData.password = password;
            }
            await updateUser(id, userData);
            setMessage('Utilisateur mis à jour avec succès!');
            setTimeout(() => navigate('/users'), 1500);
        } catch (err) {
            console.error('Erreur lors de la mise à jour:', err.response ? err.response.data.msg : err.message);
            setError(err.response ? err.response.data.msg : 'Erreur lors de la mise à jour de l\'utilisateur.');
        }
    };

    if (!currentUser || currentUser.role !== 'admin') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <p className="text-red-600 font-semibold text-lg">Accès refusé. Seuls les administrateurs peuvent modifier les utilisateurs.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
            <div className="bg-white shadow-md rounded-lg max-w-md w-full p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center drop-shadow">Modifier l'Utilisateur</h2>

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
                        <label htmlFor="username" className="block text-gray-700 font-semibold mb-1">
                            Nom d'utilisateur
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="role" className="block text-gray-700 font-semibold mb-1">
                            Rôle
                        </label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="user">Utilisateur</option>
                            <option value="technician">Technicien</option>
                            <option value="admin">Admin</option>
                            <option value="viewer">Observateur</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">
                            Nouveau mot de passe <span className="text-gray-400">(laisser vide pour ne pas changer)</span>
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Mettre à jour l'utilisateur
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditUserPage;