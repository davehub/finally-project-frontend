import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../../api/userApi';
import { Link } from 'react-router-dom';

const UserListPage = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        // Récupérer l'utilisateur actuel depuis le localStorage
        const userData = localStorage.getItem('user');
        if (userData) {
            setCurrentUser(JSON.parse(userData));
        }
    }, []);

    const fetchUsers = async () => {
        setError('');
        try {
            const { data } = await getUsers();
            setUsers(data);
        } catch (err) {
            setError('Erreur lors de la récupération des utilisateurs.');
            console.error('Fetch users error:', err);
        }
    };

    useEffect(() => {
        if (currentUser?.role === 'admin') {
            fetchUsers();
        } else {
            setError("Vous n'avez pas les permissions pour voir cette page.");
        }
    }, [currentUser]);

    const handleDelete = async (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
            setError('');
            try {
                await deleteUser(id);
                fetchUsers();
            } catch (err) {
                setError("Erreur lors de la suppression de l'utilisateur.");
                console.error('Delete user error:', err);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center drop-shadow-sm">
                    Liste des Utilisateurs
                </h2>

                {currentUser?.role === 'admin' && (
                    <div className="flex justify-end mb-6">
                        <Link
                            to="/register"
                            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                        >
                            Ajouter un nouvel utilisateur
                        </Link>
                    </div>
                )}

                {error && (
                    <div className="mb-6 p-4 text-red-700 bg-red-100 rounded-md border border-red-400 text-center font-medium">
                        {error}
                    </div>
                )}

                {!error && users.length === 0 ? (
                    <p className="text-center text-gray-600 text-lg">Aucun utilisateur trouvé.</p>
                ) : (
                    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    {['Nom d\'utilisateur', 'Email', 'Rôle', 'Actions'].map((header) => (
                                        <th
                                            key={header}
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.map((user) => (
                                    <tr key={user._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">{user.username}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap capitalize">{user.role}</td>
                                        <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                            {currentUser?.role === 'admin' && (
                                                <>
                                                    <Link
                                                        to={`/users/edit/${user._id}`}
                                                        className="inline-block px-3 py-1 text-sm text-white bg-indigo-600 rounded hover:bg-indigo-700 transition"
                                                    >
                                                        Modifier
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(user._id)}
                                                        className="inline-block px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700 transition"
                                                    >
                                                        Supprimer
                                                    </button>
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

export default UserListPage;