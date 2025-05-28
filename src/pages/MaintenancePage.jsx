import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import Modal from '../components/Modal';
import FormInput from '../components/Form';

const MaintenancePage = () => {
  const [maintenances, setMaintenances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMaintenance, setCurrentMaintenance] = useState(null);

  useEffect(() => {
    const fetchMaintenances = async () => {
      try {
        setLoading(true);
        const dummyData = [
          { id: 1, equipment: 'Laptop Dell XPS 15 (Alice D.)', type: 'Préventive', description: 'Nettoyage interne, vérification système', scheduledDate: '2024-06-10', technician: 'Jean Tech', status: 'Planifiée' },
          { id: 2, equipment: 'Imprimante HP LaserJet Pro', type: 'Curative', description: 'Remplacement du tambour', scheduledDate: '2024-05-25', technician: 'Marie Info', status: 'Terminée' },
          { id: 3, equipment: 'Serveur HP ProLiant', type: 'Préventive', description: 'Mise à jour BIOS et firmware', scheduledDate: '2024-07-01', technician: 'Jean Tech', status: 'Planifiée' },
          { id: 4, equipment: 'PC de bureau Lenovo', type: 'Curative', description: 'Diagnostic et réparation écran noir', scheduledDate: '2024-05-22', technician: 'Marie Info', status: 'En cours' },
        ];
        setMaintenances(dummyData);
      } catch (err) {
        setError("Erreur lors du chargement des maintenances.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMaintenances();
  }, []);

  const filteredMaintenances = maintenances.filter(maint =>
    (filterStatus === 'all' || maint.status.toLowerCase() === filterStatus) &&
    (maint.equipment.toLowerCase().includes(searchTerm.toLowerCase()) ||
     maint.technician.toLowerCase().includes(searchTerm.toLowerCase()) ||
     maint.type.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'planifiée': return 'bg-blue-100 text-blue-800';
      case 'en cours': return 'bg-yellow-100 text-yellow-800';
      case 'terminée': return 'bg-green-100 text-green-800';
      case 'annulée': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette maintenance ?")) {
      setMaintenances(maintenances.filter(maint => maint.id !== id));
      console.log(`Supprimer maintenance avec ID: ${id}`);
    }
  };

  const handleAddEditSubmit = (formData) => {
    if (formData.id) {
      setMaintenances(maintenances.map(m => m.id === formData.id ? formData : m));
      console.log("Modifier maintenance:", formData);
    } else {
      const newId = Math.max(...maintenances.map(m => m.id)) + 1;
      setMaintenances([...maintenances, { ...formData, id: newId }]);
      console.log("Ajouter maintenance:", { ...formData, id: newId });
    }
    setIsModalOpen(false);
    setCurrentMaintenance(null);
  };

  const openModalForAdd = () => {
    setCurrentMaintenance(null);
    setIsModalOpen(true);
  };

  const openModalForEdit = (maintenance) => {
    setCurrentMaintenance(maintenance);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentMaintenance(null);
  };

  const maintenanceColumns = [
    { header: 'Équipement', accessor: 'equipment' },
    { header: 'Type', accessor: 'type' },
    { header: 'Description', accessor: 'description' },
    {
      header: 'Date Prévue',
      accessor: 'scheduledDate',
      render: (date) => new Date(date).toLocaleDateString()
    },
    { header: 'Technicien', accessor: 'technician' },
    {
      header: 'Statut',
      accessor: 'status',
      render: (status) => (
        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(status)}`}>
          {status}
        </span>
      )
    },
  ];

  const maintenanceActions = [
    { label: 'Voir Détails', icon: 'visibility', className: 'text-blue-600 hover:text-blue-900', onClick: (id) => console.log('Voir détails maintenance:', id) },
    { label: 'Modifier', icon: 'edit', className: 'text-indigo-600 hover:text-indigo-900', onClick: (maintenance) => openModalForEdit(maintenance) },
    { label: 'Supprimer', icon: 'delete', className: 'text-red-600 hover:text-red-900', onClick: (maintenance) => handleDelete(maintenance.id) },
  ];

  if (loading) return <div className="text-center text-gray-600 text-lg py-10">Chargement des maintenances...</div>;
  if (error) return <div className="text-center text-red-500 text-lg py-10">{error}</div>;

  return (
    <div>
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900">Planification & Suivi des Maintenances</h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <input
          type="text"
          placeholder="Rechercher par équipement, technicien..."
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
          <option value="planifiée">Planifiée</option>
          <option value="en cours">En cours</option>
          <option value="terminée">Terminée</option>
          <option value="annulée">Annulée</option>
        </select>
        <button
          onClick={openModalForAdd}
          className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 flex items-center shadow-md transition-colors"
        >
          <i className="material-icons mr-2">build</i>
          Planifier Maintenance
        </button>
      </div>

      <Table
        columns={maintenanceColumns}
        data={filteredMaintenances}
        actions={maintenanceActions}
        emptyMessage="Aucune maintenance trouvée."
      />

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={currentMaintenance ? 'Modifier Maintenance' : 'Planifier une Nouvelle Maintenance'}
      >
        <MaintenanceForm
          initialData={currentMaintenance}
          onSubmit={handleAddEditSubmit}
          onCancel={closeModal}
        />
      </Modal>
    </div>
  );
};

const MaintenanceForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    id: initialData?.id || null,
    equipment: initialData?.equipment || '',
    type: initialData?.type || 'Préventive',
    description: initialData?.description || '',
    scheduledDate: initialData?.scheduledDate || new Date().toISOString().slice(0, 10),
    technician: initialData?.technician || '',
    status: initialData?.status || 'Planifiée',
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
    if (!formData.equipment) newErrors.equipment = 'L\'équipement est requis.';
    if (!formData.type) newErrors.type = 'Le type de maintenance est requis.';
    if (!formData.scheduledDate) newErrors.scheduledDate = 'La date prévue est requise.';
    if (!formData.technician) newErrors.technician = 'Le technicien est requis.';
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
        label="Équipement Concerné"
        id="maint-equipment"
        name="equipment"
        value={formData.equipment}
        onChange={handleChange}
        placeholder="Ex: Laptop Dell XPS 15 (Alice D.)"
        error={errors.equipment}
        required
      />
      <div>
        <label htmlFor="maint-type" className="block text-sm font-medium text-gray-700 mb-1">Type de Maintenance</label>
        <select
          id="maint-type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className={`p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm ${errors.type ? 'border-red-500' : 'border-gray-300'}`}
        >
          <option value="Préventive">Préventive</option>
          <option value="Curative">Curative</option>
          <option value="Installation">Installation</option>
        </select>
        {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="maint-description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          id="maint-description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Décrivez la maintenance à effectuer..."
          rows="3"
          className={`p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
      </div>
      <FormInput
        label="Date Prévue"
        id="maint-scheduledDate"
        name="scheduledDate"
        type="date"
        value={formData.scheduledDate}
        onChange={handleChange}
        error={errors.scheduledDate}
        required
      />
      <FormInput
        label="Technicien Assigné"
        id="maint-technician"
        name="technician"
        value={formData.technician}
        onChange={handleChange}
        placeholder="Ex: Jean Tech"
        error={errors.technician}
        required
      />
      <div>
        <label htmlFor="maint-status" className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
        <select
          id="maint-status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className={`p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm ${errors.status ? 'border-red-500' : 'border-gray-300'}`}
        >
          <option value="Planifiée">Planifiée</option>
          <option value="En cours">En cours</option>
          <option value="Terminée">Terminée</option>
          <option value="Annulée">Annulée</option>
        </select>
        {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
      </div>

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
          {formData.id ? 'Sauvegarder les Modifications' : 'Planifier la Maintenance'}
        </button>
      </div>
    </form>
  );
};

export default MaintenancePage;