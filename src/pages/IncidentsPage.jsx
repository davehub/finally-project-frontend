import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import Modal from '../components/Modal';
import FormInput from '../components/FormInput';
import Navbar from '../components/Navbar';

const IncidentsPage = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIncident, setCurrentIncident] = useState(null);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        setLoading(true);
        const dummyData = [
          { id: 1, title: 'Connexion Wi-Fi instable', description: 'Le Wi-Fi se déconnecte fréquemment dans le bureau A.', reporter: 'Alice Dupont', assignedTo: 'Jean Tech', status: 'En cours', priority: 'Haute', date: '2024-05-20' },
          { id: 2, title: 'Écran noir PC de Bob', description: 'L\'écran du PC de Bob Martin reste noir au démarrage.', reporter: 'Bob Martin', assignedTo: 'Marie Info', status: 'En cours', priority: 'Urgent', date: '2024-05-21' },
          { id: 3, title: 'Problème d\'impression RDC', description: 'L\'imprimante du rez-de-chaussée ne fonctionne plus.', reporter: 'Charlie Brown', assignedTo: 'Jean Tech', status: 'Résolu', priority: 'Moyenne', date: '2024-05-18' },
          { id: 4, title: 'Logiciel X ne démarre pas', description: 'Le logiciel de comptabilité ne se lance pas sur mon poste.', reporter: 'Diana Prince', assignedTo: 'Marie Info', status: 'Nouveau', priority: 'Basse', date: '2024-05-22' },
        ];
        setIncidents(dummyData);
      } catch (err) {
        setError("Erreur lors du chargement des incidents.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchIncidents();
  }, []);

  const filteredIncidents = incidents.filter(incident =>
    (filterStatus === 'all' || incident.status.toLowerCase() === filterStatus) &&
    (incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     incident.reporter.toLowerCase().includes(searchTerm.toLowerCase()) ||
     incident.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'nouveau': return 'bg-blue-100 text-blue-800';
      case 'en cours': return 'bg-yellow-100 text-yellow-800';
      case 'résolu': return 'bg-green-100 text-green-800';
      case 'fermé': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'urgent': return 'text-red-600 font-bold';
      case 'haute': return 'text-orange-600 font-semibold';
      case 'moyenne': return 'text-yellow-600';
      case 'basse': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet incident ?")) {
      setIncidents(incidents.filter(incident => incident.id !== id));
      console.log(`Supprimer incident avec ID: ${id}`);
    }
  };

  const handleAddEditSubmit = (formData) => {
    if (formData.id) {
      setIncidents(incidents.map(i => i.id === formData.id ? formData : i));
      console.log("Modifier incident:", formData);
    } else {
      const newId = Math.max(...incidents.map(i => i.id)) + 1;
      setIncidents([...incidents, { ...formData, id: newId }]);
      console.log("Ajouter incident:", { ...formData, id: newId });
    }
    setIsModalOpen(false);
    setCurrentIncident(null);
  };

  const openModalForAdd = () => {
    setCurrentIncident(null);
    setIsModalOpen(true);
  };

  const openModalForEdit = (incident) => {
    setCurrentIncident(incident);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentIncident(null);
  };

  const incidentColumns = [
    { header: 'Titre', accessor: 'title' },
    { header: 'Demandeur', accessor: 'reporter' },
    { header: 'Assigné à', accessor: 'assignedTo' },
    {
      header: 'Statut',
      accessor: 'status',
      render: (status) => (
        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(status)}`}>
          {status}
        </span>
      )
    },
    {
      header: 'Priorité',
      accessor: 'priority',
      render: (priority) => (
        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(priority)}`}>
          {priority}
        </span>
      )
    },
    {
      header: 'Date',
      accessor: 'date',
      render: (date) => new Date(date).toLocaleDateString()
    },
  ];

  const incidentActions = [
    { label: 'Voir Détails', icon: 'visibility', className: 'text-blue-600 hover:text-blue-900', onClick: (id) => console.log('Voir détails incident:', id) },
    { label: 'Modifier', icon: 'edit', className: 'text-indigo-600 hover:text-indigo-900', onClick: (incident) => openModalForEdit(incident) },
    { label: 'Supprimer', icon: 'delete', className: 'text-red-600 hover:text-red-900', onClick: (incident) => handleDelete(incident.id) },
  ];

  if (loading) return <div className="text-center text-gray-600 text-lg py-10">Chargement des incidents...</div>;
  if (error) return <div className="text-center text-red-500 text-lg py-10">{error}</div>;

  return (
    <div>
      <Navbar />
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900">Gestion des Incidents</h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <input
          type="text"
          placeholder="Rechercher un incident..."
          className="p-3 border border-gray-300 rounded-lg w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="p-3 border border-gray-300 rounded-lg w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">Tous les statuts</option>
          <option value="nouveau">Nouveau</option>
          <option value="en cours">En cours</option>
          <option value="résolu">Résolu</option>
          <option value="fermé">Fermé</option>
        </select>
        <button
          onClick={openModalForAdd}
          className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 flex items-center shadow-md transition-colors"
        >
          <i className="material-icons mr-2">add_alert</i>
          Déclarer Incident
        </button>
      </div>

      <Table
        columns={incidentColumns}
        data={filteredIncidents}
        actions={incidentActions}
        emptyMessage="Aucun incident trouvé."
      />

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={currentIncident ? 'Modifier Incident' : 'Déclarer un Nouvel Incident'}
      >
        <IncidentForm
          initialData={currentIncident}
          onSubmit={handleAddEditSubmit}
          onCancel={closeModal}
        />
      </Modal>
    </div>
  );
};

const IncidentForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    id: initialData?.id || null,
    title: initialData?.title || '',
    description: initialData?.description || '',
    reporter: initialData?.reporter || '',
    assignedTo: initialData?.assignedTo || '',
    status: initialData?.status || 'Nouveau',
    priority: initialData?.priority || 'Moyenne',
    date: initialData?.date || new Date().toISOString().slice(0, 10), // Date du jour par défaut
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.title) newErrors.title = 'Le titre est requis.';
    if (!formData.description) newErrors.description = 'La description est requise.';
    if (!formData.reporter) newErrors.reporter = 'Le demandeur est requis.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormInput
        label="Titre de l'Incident"
        id="incident-title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Ex: Problème de connexion"
        error={errors.title}
        required
      />
      <div className="mb-4">
        <label htmlFor="incident-description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          id="incident-description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Décrivez le problème en détail..."
          rows="4"
          className={`p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
      </div>
      <FormInput
        label="Demandeur"
        id="incident-reporter"
        name="reporter"
        value={formData.reporter}
        onChange={handleChange}
        placeholder="Ex: Alice Dupont"
        error={errors.reporter}
        required
      />
      <FormInput
        label="Assigné à"
        id="incident-assignedTo"
        name="assignedTo"
        value={formData.assignedTo}
        onChange={handleChange}
        placeholder="Ex: Jean Tech (laissez vide si non assigné)"
      />
      <div>
        <label htmlFor="incident-status" className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
        <select
          id="incident-status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className={`p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm ${errors.status ? 'border-red-500' : 'border-gray-300'}`}
        >
          <option value="Nouveau">Nouveau</option>
          <option value="En cours">En cours</option>
          <option value="Résolu">Résolu</option>
          <option value="Fermé">Fermé</option>
        </select>
        {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
      </div>
      <div>
        <label htmlFor="incident-priority" className="block text-sm font-medium text-gray-700 mb-1">Priorité</label>
        <select
          id="incident-priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className={`p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm ${errors.priority ? 'border-red-500' : 'border-gray-300'}`}
        >
          <option value="Basse">Basse</option>
          <option value="Moyenne">Moyenne</option>
          <option value="Haute">Haute</option>
          <option value="Urgent">Urgent</option>
        </select>
        {errors.priority && <p className="mt-1 text-sm text-red-600">{errors.priority}</p>}
      </div>
      <FormInput
        label="Date de Déclaration"
        id="incident-date"
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        error={errors.date}
        required
      />

      <div className="mt-6 flex justify-end space-x-4">
        <button
          type="button"
          className="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          onClick={onCancel}
        >
          Annuler
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {formData.id ? 'Sauvegarder les Modifications' : 'Déclarer l\'Incident'}
        </button>
      </div>
    </form>
  );
};

export default IncidentsPage;