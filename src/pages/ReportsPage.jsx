import React, { useState } from 'react';
import FormInput from '../components/FormInput'; // Import du composant FormInput

const ReportsPage = () => {
  const [reportType, setReportType] = useState('equipment_summary');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [generatedReport, setGeneratedReport] = useState(null);

  const generateReport = () => {
    let reportData = null;
    switch (reportType) {
      case 'equipment_summary':
        reportData = {
          title: 'Résumé du Parc Matériel',
          data: [
            { label: 'Total Laptops', value: 55 },
            { label: 'Total Desktops', value: 40 },
            { label: 'Total Serveurs', value: 10 },
            { label: 'Total Imprimantes', value: 15 },
          ],
          type: 'summary',
        };
        break;
      case 'incident_trends':
        reportData = {
          title: `Tendances des Incidents (${startDate} à ${endDate})`,
          data: [
            { month: 'Jan', count: 12 },
            { month: 'Fév', count: 15 },
            { month: 'Mar', count: 10 },
            { month: 'Avril', count: 18 },
            { month: 'Mai', count: 7 },
          ],
          type: 'chart',
        };
        break;
      case 'license_expirations':
        reportData = {
          title: 'Licences Expirant Bientôt',
          data: [
            { software: 'Antivirus McAfee', expiry: '2024-07-01' },
            { software: 'Suite Graphique Pro', expiry: '2024-09-15' },
          ],
          type: 'list',
        };
        break;
      case 'user_equipment_allocation':
        reportData = {
          title: 'Allocation des Équipements par Utilisateur',
          data: [
            { user: 'Alice Dupont', equipments: ['Laptop Dell XPS 15', 'Moniteur LG'] },
            { user: 'Bob Martin', equipments: ['PC de bureau Lenovo', 'Souris sans fil'] },
          ],
          type: 'complex_list',
        };
        break;
      default:
        reportData = null;
    }
    setGeneratedReport(reportData);
  };

  return (
    <div>
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900">Rapports & Statistiques</h1>

      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Générer un Rapport</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          <div>
            <label htmlFor="reportType" className="block text-sm font-medium text-gray-700 mb-2">Type de Rapport</label>
            <select
              id="reportType"
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="equipment_summary">Résumé du Parc Matériel</option>
              <option value="incident_trends">Tendances des Incidents</option>
              <option value="license_expirations">Licences Expirant Bientôt</option>
              <option value="user_equipment_allocation">Allocation Équipements par Utilisateur</option>
            </select>
          </div>
          <FormInput
            label="Date de Début"
            id="startDate"
            name="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <FormInput
            label="Date de Fin"
            id="endDate"
            name="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <div className="md:col-span-3 text-right">
            <button
              onClick={generateReport}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 flex items-center justify-center md:inline-flex shadow-md transition-colors"
            >
              <i className="material-icons mr-2">analytics</i>
              Générer Rapport
            </button>
          </div>
        </div>
      </div>

      {generatedReport && (
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">{generatedReport.title}</h2>
          {generatedReport.type === 'summary' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {generatedReport.data.map((item, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-lg font-semibold text-gray-700">{item.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{item.value}</p>
                </div>
              ))}
            </div>
          )}
          {generatedReport.type === 'list' && (
            <ul>
              {generatedReport.data.map((item, index) => (
                <li key={index} className="py-2 border-b border-gray-200 last:border-b-0">
                  <span className="font-semibold">{item.software}</span> - Expire le: {new Date(item.expiry).toLocaleDateString()}
                </li>
              ))}
            </ul>
          )}
          {generatedReport.type === 'complex_list' && (
            <div className="space-y-4">
              {generatedReport.data.map((item, index) => (
                <div key={index} className="border border-gray-200 p-4 rounded-lg bg-gray-50">
                  <h3 className="font-semibold text-lg text-gray-800">{item.user}</h3>
                  <ul className="list-disc list-inside mt-2 text-gray-700">
                    {item.equipments.map((eq, eqIndex) => (
                      <li key={eqIndex}>{eq}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
          {generatedReport.type === 'chart' && (
            <div className="text-gray-600 italic">
              {/* Ici, vous intégreriez une bibliothèque de graphiques comme Chart.js ou Recharts */}
              <p>Un graphique serait affiché ici pour les tendances des incidents.</p>
              <pre className="bg-gray-100 p-4 rounded-md mt-4 text-sm overflow-auto">
                {JSON.stringify(generatedReport.data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReportsPage; 