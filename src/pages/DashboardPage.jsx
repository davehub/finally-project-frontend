import React from 'react';
import { ShieldCheck, Wrench, Eye } from 'lucide-react';

const DashboardPage = ({ currentUser }) => {
    return (
        <div className="min-h-screen bg-gray-100 px-6 py-10">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center drop-shadow-sm">
                    Tableau de Bord
                </h2>

                {currentUser ? (
                    <div className="bg-white rounded-2xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        {/* Profil utilisateur */}
                        <div className="flex flex-col items-start space-y-4">
                            <h3 className="text-xl font-semibold text-gray-800">
                                Bienvenue, <span className="text-blue-600">{currentUser.username || currentUser.email.split('@')[0]}</span>
                            </h3>
                            <p className="text-gray-600">
                                <span className="font-medium text-gray-800">Email :</span> {currentUser.email}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-medium text-gray-800">Rôle :</span>{' '}
                                <span className="inline-flex items-center gap-2 text-blue-700 font-semibold">
                                    {currentUser.role === 'admin' && (
                                        <>
                                            <ShieldCheck className="w-4 h-4 text-green-600" /> Administrateur
                                        </>
                                    )}
                                    {currentUser.role === 'technician' && (
                                        <>
                                            <Wrench className="w-4 h-4 text-yellow-600" /> Technicien
                                        </>
                                    )}
                                    {currentUser.role === 'user' && (
                                        <>
                                            <Eye className="w-4 h-4 text-blue-500" /> Utilisateur
                                        </>
                                    )}
                                </span>
                            </p>

                            {currentUser.role === 'admin' && (
                                <p className="text-green-700 bg-green-100 rounded-md px-3 py-1 text-sm mt-2">
                                    Vous avez un accès complet à toutes les fonctionnalités.
                                </p>
                            )}
                            {currentUser.role === 'technician' && (
                                <p className="text-yellow-700 bg-yellow-100 rounded-md px-3 py-1 text-sm mt-2">
                                    Vous pouvez gérer les maintenances et urgences signalées.
                                </p>
                            )}
                            {currentUser.role === 'user' && (
                                <p className="text-blue-600 bg-blue-100 rounded-md px-3 py-1 text-sm mt-2">
                                    Vous pouvez visualiser les équipements et signaler des urgences.
                                </p>
                            )}
                        </div>

                        {/* Bloc future fonctionnalité */}
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 shadow-sm">
                            <h4 className="text-lg font-medium text-gray-700 mb-4">Vos accès rapides</h4>
                            <ul className="space-y-3 text-gray-600 text-sm">
                                <li>📊 Statistiques d'utilisation</li>
                                <li>🛠 Historique des interventions</li>
                                <li>⚙️ Paramètres du compte</li>
                                <li>🔔 Notifications urgentes</li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div className="text-center mt-10">
                        <p className="text-red-600 text-lg">Veuillez vous connecter pour accéder au tableau de bord.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardPage;