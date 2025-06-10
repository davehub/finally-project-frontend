import React from 'react';
import { Link } from 'react-router-dom';

function HomePage({ currentUser }) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4 text-center drop-shadow">
                Bienvenue sur le Système de Gestion des Équipements
            </h1>
            
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl text-center">
                Cette application permet la gestion des équipements, des maintenances,
                des urgences et des utilisateurs selon les rôles attribués.
            </p>

            {!currentUser ? (
                <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center gap-4 w-full max-w-md">
                    <p className="text-gray-600 text-center">
                        Veuillez vous connecter pour accéder au tableau de bord.
                    </p>
                    <Link 
                        to="/login" 
                        className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
                    >
                        Se connecter
                    </Link>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center gap-4 w-full max-w-md">
                    <p className="text-gray-600 text-center">
                        Vous êtes connecté en tant que <strong className="text-blue-700">{currentUser.role}</strong>.
                    </p>
                    <Link 
                        to="/dashboard" 
                        className="w-full text-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
                    >
                        Accéder au tableau de bord
                    </Link>
                </div>
            )}
        </div>
    );
}

export default HomePage;