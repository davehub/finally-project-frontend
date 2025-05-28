import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import Modal from '../components/Modal';
import FormInput from '../components/Form';

const SoftwarePage = () => {
  const [softwareList, setSoftwareList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSoftware, setCurrentSoftware] = useState(null);

  useEffect(() => {
    const fetchSoftware = async () => {
      try {
        setLoading(true);
        const dummyData = [
          { id: 1, name: 'Microsoft Office 365', type: 'Suite Bureautique', licenseKey: 'XXXX-XXXX-XXXX-A1', expiryDate: '2025-12-31', devices: 50, available: 10 },
          { id: 2, name: 'Adobe Creative Cloud', type: 'Design', licenseKey: 'YYYY-YYYY-YYYY-B2', expiryDate: '2026-06-15', devices: 15, available: 2 },
          { id: 3, name: 'Visual Studio Code', type: 'IDE', licenseKey: 'N/A (Gratuit)', expiryDate: 'N/A', devices: 30, available: 30 },
          { id: 4, name: 'Antivirus McAfee', type: 'Sécurité', licenseKey: 'ZZZZ-ZZZZ-ZZZZ-C3', expiryDate: '2024-07-01', devices: 80, available: 0 },
          { id: 5, name: 'Slack', type: 'Collaboration', licenseKey: 'N/A (Free Tier)', expiryDate: 'N/A', devices: 60, available: 60 },
        ];
        setSoftwareList(dummyData);
      } catch (err) {
        setError("Erreur lors du chargement des logiciels.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSoftware();
  }, []);

  const filteredSoftware = softwareList.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.licenseKey.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce logiciel ?")) {
      setSoftwareList(softwareList.filter(s => s.id !== id));
      console.log(`Supprimer logiciel avec ID: ${id}`);
    }
  };

  const handleAddEditSubmit = (formData) => {
    if (formData.id) {
      setSoftwareList(softwareList.map(s => s.id === formData.id ? formData : s));
      console.log("Modifier logiciel:", formData);
    } else {
      const newId = Math.max(...softwareList.map(s => s.id)) + 1;
      setSoftwareList([...softwareList, { ...formData, id: newId }]);
      console.log("Ajouter logiciel:", { ...formData, id: newId });
    }
    setIsModalOpen(false);
    setCurrentSoftware(null);
  };

  const openModalForAdd = () => {
    setCurrentSoftware(null);
    setIsModalOpen(true);
  };

  const openModalForEdit = (software) => {
    setCurrentSoftware(software);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentSoftware(null);
  };

  const softwareColumns = [
    { header: 'Nom du Logiciel', accessor: 'name' },
    { header: 'Type', accessor: 'type' },
    { header: 'Clé de Licence', accessor: 'licenseKey' },
    {
      header: 'Date d\'Expiration',
      accessor: 'expiryDate',
      render: (expiryDate) => (
        <>
          {expiryDate === 'N/A' ? 'N/A' : new Date(expiryDate).toLocaleDateString()}
          {expiryDate !== 'N/A' && new Date(expiryDate) < new Date() && (
            <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">Expirée</span>
          )}
        </>
      )
    },
    { header: 'Nb Appareils', accessor: 'devices' },
    {
      header: 'Disponibles',
      accessor: 'available',
      render: (available) => (
        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
          ${available > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {available}
        </span>
      )
    },
  ];

  const softwareActions = [
    { label: 'Modifier', icon: 'edit', className: 'text-indigo-600 hover:text-indigo-900', onClick: (software) => openModalForEdit(software) },
    { label: 'Supprimer', icon: 'delete', className: 'text-red-600 hover:text-red-900', onClick: (software) => handleDelete(software.id) },
  ];

  if (loading) return <div className="text-center text-gray-600 text-lg py-10">Chargement des logiciels...</div>;
  if (error) return <div className="text-center text-red-500 text-lg py-10">{error}</div>;

  return (
    <div>
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900">Gestion des Logiciels & Licences</h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <input
          type="text"
          placeholder="Rechercher un logiciel ou une licence..."
          className="p-3 border border-gray-300 rounded-lg w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={openModalForAdd}
          className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 flex items-center shadow-md transition-colors"
        >
          <i className="material-icons mr-2">add</i>
          Ajouter Logiciel
        </button>
      </div>

      <Table
        columns={softwareColumns}
        data={filteredSoftware}
        actions={softwareActions}
        emptyMessage="Aucun logiciel trouvé."
      />

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={currentSoftware ? 'Modifier Logiciel' : 'Ajouter un Nouveau Logiciel'}
      >
        <SoftwareForm
          initialData={currentSoftware}
          onSubmit={handleAddEditSubmit}
          onCancel={closeModal}
        />
      </Modal>
    </div>
  );
};

const SoftwareForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    id: initialData?.id || null,
    name: initialData?.name || '',
    type: initialData?.type || '',
    licenseKey: initialData?.licenseKey || '',
    expiryDate: initialData?.expiryDate || '',
    devices: initialData?.devices || 0,
    available: initialData?.available || 0,
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
    if (!formData.name) newErrors.name = 'Le nom du logiciel est requis.';
    if (!formData.type) newErrors.type = 'Le type est requis.';
    if (!formData.licenseKey && formData.type !== 'N/A (Gratuit)') newErrors.licenseKey = 'La clé de licence est requise.';
    if (formData.devices <= 0) newErrors.devices = 'Le nombre d\'appareils doit être supérieur à 0.';
    if (formData.available < 0) newErrors.available = 'Le nombre disponible ne peut être négatif.';
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
        label="Nom du Logiciel"
        id="software-name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Ex: Microsoft Office 365"
        error={errors.name}
        required
      />
      <FormInput
        label="Type de Logiciel"
        id="software-type"
        name="type"
        value={formData.type}
        onChange={handleChange}
        placeholder="Ex: Suite Bureautique, Sécurité"
        error={errors.type}
        required
      />
      <FormInput
        label="Clé de Licence"
        id="software-licenseKey"
        name="licenseKey"
        value={formData.licenseKey}
        onChange={handleChange}
        placeholder="Ex: XXXX-XXXX-XXXX-XXXX"
        error={errors.licenseKey}
        required={formData.type !== 'N/A (Gratuit)'}
      />
      <FormInput
        label="Date d'Expiration"
        id="software-expiryDate"
        name="expiryDate"
        type="date"
        value={formData.expiryDate}
        onChange={handleChange}
        error={errors.expiryDate}
      />
      <FormInput
        label="Nombre d'Appareils"
        id="software-devices"
        name="devices"
        type="number"
        value={formData.devices}
        onChange={handleChange}
        error={errors.devices}
        required
      />
      <FormInput
        label="Licences Disponibles"
        id="software-available"
        name="available"
        type="number"
        value={formData.available}
        onChange={handleChange}
        error={errors.available}
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
          {formData.id ? 'Sauvegarder les Modifications' : 'Ajouter le Logiciel'}
        </button>
      </div>
    </form>
  );
};

export default SoftwarePage;