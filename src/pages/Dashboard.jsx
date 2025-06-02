// src/pages/Dashboard.jsx
import React from 'react';
import Card from '../components/common/Card';
import { useAuth } from '../context/AuthContext'; // Importer le contexte d'authentification

const Dashboard = () => {
  const { currentUser, userRole, userId } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Tableau de bord</h1>

      {currentUser ? (
        <>
          <Card title="Bienvenue !" className="mb-6">
            <p className="text-gray-700 mb-2">
              Bonjour, <span className="font-semibold">{currentUser.email}</span>!
            </p>
            <p className="text-gray-600">
              Votre rôle: <span className="font-semibold capitalize">{userRole}</span>
            </p>
            <p className="text-gray-600 text-sm mt-1">
              Votre ID utilisateur: <span className="font-mono text-xs">{userId}</span>
            </p>
            {userRole === 'admin' && (
              <p className="mt-4 text-blue-700 font-medium">
                En tant qu'administrateur, vous avez accès à toutes les fonctionnalités de gestion.
              </p>
            )}
            {userRole === 'user' && (
              <p className="mt-4 text-green-700 font-medium">
                En tant qu'utilisateur standard, vous pouvez gérer les matériaux et les catégories.
              </p>
            )}
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card title="Total Utilisateurs" className="bg-blue-100 border-l-4 border-blue-500">
              <p className="text-4xl font-bold text-blue-700">1,234</p>
              <p className="text-gray-600 mt-2">Utilisateurs enregistrés dans le système</p>
            </Card>
            <Card title="Matériaux en Stock" className="bg-green-100 border-l-4 border-green-500">
              <p className="text-4xl font-bold text-green-700">567</p>
              <p className="text-gray-600 mt-2">Différents types de matériaux</p>
            </Card>
            <Card title="Approbations en attente" className="bg-yellow-100 border-l-4 border-yellow-500">
              <p className="text-4xl font-bold text-yellow-700">12</p>
              <p className="text-gray-600 mt-2">Articles en attente de révision</p>
            </Card>
          </div>

          <Card title="Activité Récente" className="mb-6">
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <span className="text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </span>
                <p className="text-gray-700">L'utilisateur <span className="font-medium">Jane Doe</span> a ajouté un nouveau matériau.</p>
                <span className="text-sm text-gray-500 ml-auto">Il y a 2 heures</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9.293 12.293a1 1 0 001.414 1.414L12 11.414l1.293 1.293a1 1 0 001.414-1.414L13.414 10l1.293-1.293a1 1 0 00-1.414-1.414L12 8.586l-1.293-1.293a1 1 0 00-1.414 1.414L10.586 10l-1.293 1.293z" clipRule="evenodd" />
                  </svg>
                </span>
                <p className="text-gray-700">Les permissions du rôle <span className="font-medium">Administrateur</span> ont été mises à jour.</p>
                <span className="text-sm text-gray-500 ml-auto">Hier</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-red-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </span>
                <p className="text-gray-700">La catégorie <span className="font-medium">Électronique</span> a été supprimée.</p>
                <span className="text-sm text-gray-500 ml-auto">Il y a 3 jours</span>
              </li>
            </ul>
          </Card>

          <Card title="Aperçu du système">
            <p className="text-gray-700">
              Ceci est un espace réservé pour un aperçu plus détaillé du système ou des graphiques.
              Vous pouvez intégrer des bibliothèques de graphiques comme Recharts ou Chart.js ici pour visualiser les données.
            </p>
            <div className="mt-4 h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
              [Espace réservé pour le graphique]
            </div>
          </Card>
        </>
      ) : (
        <Card title="Veuillez vous connecter" className="text-center">
          <p className="text-gray-700 mb-4">
            Connectez-vous pour accéder au tableau de bord et aux fonctionnalités de gestion.
          </p>
          <Button onClick={() => window.location.href = '/login'}>
            Aller à la page de connexion
          </Button>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
