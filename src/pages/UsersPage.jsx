import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import Modal from '../components/Modal';
import FormInput from '../components/FormInput';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const dummyData = [
          { id: 1, name: 'Alice Dupont', email: 'alice.d@example.com', role: 'Employé', status: 'Actif', equipments: 2 },
          { id: 2, name: 'Bob Martin', email: 'bob.m@example.com', role: 'Employé', status: 'Actif', equipments: 3 },
          { id: 3, name: 'Charlie Brown', email: 'charlie.b@example.com', role: 'Administrateur', status: 'Actif', equipments: 1 },
          { id: 4, name: 'Diana Prince', email: 'diana.p@example.com', role: 'Employé', status: 'Inactif', equipments: 0 },
        ];
        setUsers(dummyData);
      } catch (err) {
        setError("Erreur lors du chargement des utilisateurs.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      setUsers(users.filter(user => user.id !== id));
      console.log(`Supprimer utilisateur avec ID: ${id}`);
    }
  };

  const handleAddEditSubmit = (formData) => {
    if (formData.id) {
      setUsers(users.map(u => u.id === formData.id ? formData : u));
      console.log("Modifier utilisateur:", formData);
    } else {
      const newId = Math.max(...users.map(u => u.id)) + 1;
      setUsers([...users, { ...formData, id: newId }]);
      console.log("Ajouter utilisateur:", { ...formData, id: newId });
    }
    setIsModalOpen(false);
    setCurrentUser(null);
  };

  const openModalForAdd = () => {
    setCurrentUser(null);
    setIsModalOpen(true);
  };

  const openModalForEdit = (user) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
  };

  const userColumns = [
    { header: 'Nom', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Rôle', accessor: 'role' },
    {
      header: 'Statut',
      accessor: 'status',
      render: (status) => (
        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
          ${status === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {status}
        </span>
      )
    },
    { header: 'Nb Équipements', accessor: 'equipments' },
  ];

  const userActions = [
    { label: 'Voir Détails', icon: 'info', className: 'text-blue-600 hover:text-blue-900', onClick: (id) => console.log('Voir détails utilisateur:', id) },
    { label: 'Modifier', icon: 'edit', className: 'text-indigo-600 hover:text-indigo-900', onClick: (user) => openModalForEdit(user) },
    { label: 'Supprimer', icon: 'delete', className: 'text-red-600 hover:text-red-900', onClick: (user) => handleDelete(user.id) },
  ];

  if (loading) return <div className="text-center text-gray-600 text-lg py-10">Chargement des utilisateurs...</div>;
  if (error) return <div className="text-center text-red-500 text-lg py-10">{error}</div>;

  return (
    <div>
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900">Gestion des Utilisateurs</h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <input
          type="text"
          placeholder="Rechercher un utilisateur..."
          className="p-3 border border-gray-300 rounded-lg w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={openModalForAdd}
          className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 flex items-center shadow-md transition-colors"
        >
          <i className="material-icons mr-2">person_add</i>
          Ajouter Utilisateur
        </button>
      </div>

      <Table
        columns={userColumns}
        data={filteredUsers}
        actions={userActions}
        emptyMessage="Aucun utilisateur trouvé."
      />

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={currentUser ? 'Modifier Utilisateur' : 'Ajouter un Nouvel Utilisateur'}
      >
        <UserForm
          initialData={currentUser}
          onSubmit={handleAddEditSubmit}
          onCancel={closeModal}
        />
      </Modal>
    </div>
  );
};

const UserForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    id: initialData?.id || null,
    name: initialData?.name || '',
    email: initialData?.email || '',
    role: initialData?.role || 'Employé',
    status: initialData?.status || 'Actif',
    equipments: initialData?.equipments || 0,
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
    if (!formData.email) newErrors.email = 'L\'email est requis.';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Format d\'email invalide.';
    if (!formData.role) newErrors.role = 'Le rôle est requis.';
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
        label="Nom Complet"
        id="user-name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Ex: John Doe"
        error={errors.name}
        required
      />
      <FormInput
        label="Email"
        id="user-email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Ex: john.doe@example.com"
        error={errors.email}
        required
      />
      <div>
        <label htmlFor="user-role" className="block text-sm font-medium text-gray-700 mb-1">Rôle</label>
        <select
          id="user-role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className={`p-3 border rounded-lg w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm ${errors.role ? 'border-red-500' : 'border-gray-300'}`}
        >
          <option value="Employé">Employé</option>
          <option value="Administrateur">Administrateur</option>
          <option value="Technicien">Technicien</option>
        </select>
        {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role}</p>}
      </div>
      <div>
        <label htmlFor="user-status" className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
        <select
          id="user-status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className={`p-3 border rounded-lg w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm ${errors.status ? 'border-red-500' : 'border-gray-300'}`}
        >
          <option value="Actif">Actif</option>
          <option value="Inactif">Inactif</option>
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
          {formData.id ? 'Sauvegarder les Modifications' : 'Ajouter l\'Utilisateur'}
        </button>
      </div>
    </form>
  );
};

export default UsersPage;