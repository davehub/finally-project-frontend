import React, { useState, useEffect } from 'react';
import Table from '../components/Table';       // Import du composant Table
import Modal from '../components/Modal';       // Import du composant Modal
import FormInput from '../components/FormInput'; // Import du composant FormInput

const EquipmentsPage = () => {
  const [equipments, setEquipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEquipment, setCurrentEquipment] = useState(null); // Pour l'édition ou l'ajout

  // Simuler une récupération de données depuis une API
  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        setLoading(true);
        const dummyData = [
          { id: 1, name: 'Laptop Dell XPS 15', type: 'Portable', user: 'Alice Dupont', location: 'Bureau 101', status: 'Actif', serial: 'SN-001-A' },
          { id: 2, name: 'Serveur HP ProLiant DL380', type: 'Serveur', user: 'N/A', location: 'Salle Serveur', status: 'Actif', serial: 'SN-002-B' },
          { id: 3, name: 'Imprimante HP LaserJet Pro', type: 'Imprimante', user: 'Tous', location: 'Open Space', status: 'Actif', serial: 'SN-003-C' },
          { id: 4, name: 'Switch Cisco Catalyst 2960', type: 'Réseau', user: 'N/A', location: 'Salle Serveur', status: 'Actif', serial: 'SN-004-D' },
          { id: 5, name: 'Moniteur LG UltraWide', type: 'Périphérique', user: 'Bob Martin', location: 'Bureau 102', status: 'Actif', serial: 'SN-005-E' },
          { id: 6, name: 'PC de bureau Lenovo ThinkCentre', type: 'Bureau', user: 'Charlie Brown', location: 'Bureau 103', status: 'Maintenance', serial: 'SN-006-F' },
        ];
        setEquipments(dummyData);
      } catch (err) {
        setError("Erreur lors du chargement des équipements.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEquipments();
  }, []);

  const filteredEquipments = equipments.filter(eq =>
    eq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    eq.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    eq.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    eq.serial.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet équipement ?")) {
      setEquipments(equipments.filter(eq => eq.id !== id));
      // Logique pour appeler l'API de suppression ici
      console.log(`Supprimer équipement avec ID: ${id}`);
    }
  };

  const handleAddEditSubmit = (formData) => {
    if (formData.id) {
      // Logique de modification
      setEquipments(equipments.map(eq => eq.id === formData.id ? formData : eq));
      console.log("Modifier équipement:", formData);
    } else {
      // Logique d'ajout
      const newId = Math.max(...equipments.map(eq => eq.id)) + 1; // ID simple pour l'exemple
      setEquipments([...equipments, { ...formData, id: newId, status: 'Actif' }]); // Statut par défaut
      console.log("Ajouter équipement:", { ...formData, id: newId, status: 'Actif' });
    }
    setIsModalOpen(false);
    setCurrentEquipment(null);
  };

  const openModalForAdd = () => {
    setCurrentEquipment(null); // Pas de données initiales pour l'ajout
    setIsModalOpen(true);
  };

  const openModalForEdit = (equipment) => {
    setCurrentEquipment(equipment); // Charger les données pour l'édition
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentEquipment(null);
  };

  const equipmentColumns = [
    { header: 'Nom', accessor: 'name' },
    { header: 'Type', accessor: 'type' },
    { header: 'Numéro de série', accessor: 'serial' },
    { header: 'Utilisateur', accessor: 'user' },
    { header: 'Localisation', accessor: 'location' },
    {
      header: 'Statut',
      accessor: 'status',
      render: (status) => (
        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
          ${status === 'Actif' ? 'bg-green-100 text-green-800' :
            status === 'Maintenance' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
          {status}
        </span>
      )
    },
  ];

  const equipmentActions = [
    { label: 'Voir Détails', icon: 'info', className: 'text-blue-600 hover:text-blue-900', onClick: (id) => console.log('Voir détails équipement:', id) }, // Vous pouvez naviguer vers une page de détail
    { label: 'Modifier', icon: 'edit', className: 'text-indigo-600 hover:text-indigo-900', onClick: (equipment) => openModalForEdit(equipment) },
    { label: 'Supprimer', icon: 'delete', className: 'text-red-600 hover:text-red-900', onClick: (equipment) => handleDelete(equipment.id) },
  ];

  if (loading) return <div className="text-center text-gray-600 text-lg py-10">Chargement des équipements...</div>;
  if (error) return <div className="text-center text-red-500 text-lg py-10">{error}</div>;

  return (
    <div>
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900">Gestion du Matériel Informatique</h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <input
          type="text"
          placeholder="Rechercher par nom, utilisateur, localisation..."
          className="p-3 border border-gray-300 rounded-lg w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={openModalForAdd}
          className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 flex items-center shadow-md transition-colors"
        >
          <i className="material-icons mr-2">add</i>
          Ajouter Équipement
        </button>
      </div>

      <Table
        columns={equipmentColumns}
        data={filteredEquipments}
        actions={equipmentActions}
        emptyMessage="Aucun équipement trouvé."
      />

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={currentEquipment ? 'Modifier Équipement' : 'Ajouter un Nouvel Équipement'}
      >
        <EquipmentForm
          initialData={currentEquipment}
          onSubmit={handleAddEditSubmit}
          onCancel={closeModal}
        />
      </Modal>
    </div>
  );
};

// Sous-composant pour le formulaire d'équipement, pour une meilleure lisibilité
const EquipmentForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    id: initialData?.id || null,
    name: initialData?.name || '',
    type: initialData?.type || '',
    serial: initialData?.serial || '',
    user: initialData?.user || '',
    location: initialData?.location || '',
    status: initialData?.status || 'Actif', // Définir un statut par défaut pour l'ajout
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
    if (!formData.name) newErrors.name = 'Le nom est requis.';
    if (!formData.type) newErrors.type = 'Le type est requis.';
    if (!formData.serial) newErrors.serial = 'Le numéro de série est requis.'; // Ajout d'une validation
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
        label="Nom de l'équipement"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Ex: Laptop Dell XPS 15"
        error={errors.name}
        required
      />
      <FormInput
        label="Type d'équipement"
        id="type"
        name="type"
        value={formData.type}
        onChange={handleChange}
        placeholder="Ex: Portable, Serveur, Imprimante"
        error={errors.type}
        required
      />
      <FormInput
        label="Numéro de série"
        id="serial"
        name="serial"
        value={formData.serial}
        onChange={handleChange}
        placeholder="Ex: SN-ABC-123"
        error={errors.serial}
        required
      />
      <FormInput
        label="Utilisateur attribué"
        id="user"
        name="user"
        value={formData.user}
        onChange={handleChange}
        placeholder="Ex: Alice Dupont"
      />
      <FormInput
        label="Localisation"
        id="location"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Ex: Bureau 101, Salle Serveur"
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
          {formData.id ? 'Sauvegarder les Modifications' : 'Ajouter l\'Équipement'}
        </button>
      </div>
    </form>
  );
};

export default EquipmentsPage;