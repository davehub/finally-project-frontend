// src/components/DashboardLayout.js
import React from "react";
import Navbar from "./Navbar"; 
// Assurez-vous que votre Navbar est bien dans ce chemin
import Card from "./Card"; // Assurez-vous que votre composant Card est bien dans ce chemin

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
      <Navbar /> {/* La barre de navigation */}
      <main className="flex-grow p-6">
        <div className="container mx-auto">
          {children}{" "}
          {/* Ici seront rendus les composants de page (DashboardPage, EquipmentsPage, etc.) */}
        </div>
      </main>
      <div>
        <h1 className="text-4xl font-extrabold mb-8 text-gray-900">
          Tableau de Bord
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Utilisation du composant Card pour les statistiques */}
          <Card
            title="Total Équipements"
            value="125"
            icon="computer"
            iconColor="text-blue-600"
            description="Nombre total d'appareils"
          />
          <Card
            title="Incidents en Cours"
            value="7"
            icon="warning"
            iconColor="text-yellow-600"
            description="Problèmes non résolus"
          />
          <Card
            title="Licences Expirées"
            value="3"
            icon="receipt_long"
            iconColor="text-red-600"
            description="Nécessite une action immédiate"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Section: Incidents Récents (peut être améliorée avec un composant plus générique si nécessaire) */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Incidents Récents
            </h2>
            <ul>
              <li className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                <span className="text-gray-700">Connexion Wi-Fi instable</span>
                <span className="text-sm text-yellow-600 font-semibold">
                  En cours
                </span>
              </li>
              <li className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                <span className="text-gray-700">
                  Écran noir sur PC de bureau
                </span>
                <span className="text-sm text-yellow-600 font-semibold">
                  En cours
                </span>
              </li>
              <li className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                <span className="text-gray-700">
                  Impossible d'imprimer (imprimante RDC)
                </span>
                <span className="text-sm text-green-600 font-semibold">
                  Résolu
                </span>
              </li>
            </ul>
          </div>

          {/* Section: Activité Récente (peut être améliorée avec un composant plus générique si nécessaire) */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Activité Récente
            </h2>
            <ul>
              <li className="py-2 border-b border-gray-200 last:border-b-0">
                <span className="font-semibold">Alice Dupont</span> a ajouté un
                nouveau laptop.
                <span className="block text-xs text-gray-500">
                  il y a 2 heures
                </span>
              </li>
              <li className="py-2 border-b border-gray-200 last:border-b-0">
                Mise à jour du logiciel "Microsoft Office" effectuée.
                <span className="block text-xs text-gray-500">
                  il y a 1 jour
                </span>
              </li>
              <li className="py-2 border-b border-gray-200 last:border-b-0">
                <span className="font-semibold">Bob Martin</span> a signalé un
                incident.
                <span className="block text-xs text-gray-500">
                  il y a 3 jours
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Vous pouvez ajouter un footer ici si nécessaire */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; {new Date().getFullYear()} Mon Parc Info</p>
      </footer>
    </div>
  );
};

export default DashboardLayout;
