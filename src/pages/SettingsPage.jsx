import React, { useState } from 'react';
import FormInput from '../components/FormInput'; // Import du composant FormInput

const SettingsPage = () => {
  const [appName, setAppName] = useState('Gestion Parc Info');
  const [notificationEmail, setNotificationEmail] = useState('admin@example.com');
  const [theme, setTheme] = useState('light');
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    // Ici, vous enverriez les paramètres à votre backend
    console.log('Paramètres sauvegardés:', { appName, notificationEmail, theme });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000); // Réinitialiser le message après 3 secondes
  };

  return (
    <div>
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900">Paramètres</h1>

      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Paramètres Généraux de l'Application</h2>

        {isSaved && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Succès !</strong>
            <span className="block sm:inline ml-2">Les paramètres ont été sauvegardés.</span>
          </div>
        )}

        <form onSubmit={handleSaveSettings}>
          <FormInput
            label="Nom de l'Application"
            id="appName"
            name="appName"
            value={appName}
            onChange={(e) => setAppName(e.target.value)}
            className="max-w-md"
          />

          <FormInput
            label="Email de Notification"
            id="notificationEmail"
            name="notificationEmail"
            type="email"
            value={notificationEmail}
            onChange={(e) => setNotificationEmail(e.target.value)}
            description="Les notifications système seront envoyées à cette adresse."
            className="max-w-md"
          />

          <div className="mb-6">
            <label htmlFor="theme" className="block text-lg font-medium text-gray-700 mb-2">Thème de l'Interface</label>
            <select
              id="theme"
              name="theme"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            >
              <option value="light">Clair</option>
              <option value="dark">Foncé (non implémenté)</option>
            </select>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center shadow-md transition-colors"
            >
              <i className="material-icons mr-2">save</i>
              Sauvegarder les Paramètres
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;