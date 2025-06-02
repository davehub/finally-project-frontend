// src/pages/RoleManagement.jsx
import React, { useState } from 'react';
import Table from '../components/common/Table';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import InputField from '../components/common/InputField';
import Card from '../components/common/Card';
import { useAuth } from '../context/AuthContext'; // Importer le contexte d'authentification

const RoleManagement = () => {
  const { userRole } = useAuth(); // Obtenir le rôle de l'utilisateur

  const [roles, setRoles] = useState([
    { id: 1, name: 'admin', permissions: ['manage_users', 'manage_materials', 'manage_categories', 'manage_roles'] },
    { id: 2, name: 'user', permissions: ['view_materials', 'view_categories'] },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    permissions: [],
  });
  const [formErrors, setFormErrors] = useState({});

  // Si l'utilisateur n'est pas un administrateur, afficher un message d'accès refusé
  if (userRole !== 'admin') {
    return (
      <div className="p-6 text-center">
        <Card title="Accès refusé">
          <p className="text-red-600 font-semibold mb-4">
            Vous n'avez pas les permissions nécessaires pour accéder à cette page.
          </p>
          <p className="text-gray-700">
            Seuls les administrateurs peuvent gérer les rôles.
          </p>
        </Card>
      </div>
    );
  }

  // Liste d'exemple de toutes les permissions possibles
  const allPermissions = [
    'manage_users', 'view_users',
    'manage_materials', 'view_materials',
    'manage_categories', 'view_categories',
    'manage_roles', 'view_roles',
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const handlePermissionChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const newPermissions = checked
        ? [...prevData.permissions, value]
        : prevData.permissions.filter((perm) => perm !== value);
      return { ...prevData, permissions: newPermissions };
    });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.name.trim()) errors.name = 'Le nom du rôle est requis.';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddRole = () => {
    setEditingRole(null);
    setFormData({ name: '', permissions: [] });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleEditRole = (role) => {
    setEditingRole(role);
    setFormData({ ...role });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleDeleteRole = (id) => {
    // Remplacer window.confirm par un composant de modale personnalisé si l'application est en production
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce rôle ?')) {
      setRoles(roles.filter((role) => role.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    if (editingRole) {
      setRoles(
        roles.map((role) =>
          role.id === editingRole.id ? { ...role, ...formData } : role
        )
      );
    } else {
      const newRole = { id: roles.length + 1, ...formData };
      setRoles([...roles, newRole]);
    }
    setIsModalOpen(false);
  };

  const tableHeaders = ['ID', 'Nom', 'Permissions', 'Actions'];
  const tableData = roles.map((role) => [
    role.id,
    role.name,
    role.permissions.length > 0 ? (
      <ul key={role.id} className="list-disc list-inside text-sm">
        {role.permissions.map((perm, idx) => (
          <li key={idx}>{perm.replace(/_/g, ' ')}</li> // Formatage pour l'affichage
        ))}
      </ul>
    ) : (
      'Aucune permission'
    ),
    <div key={role.id} className="flex space-x-2">
      <Button size="sm" onClick={() => handleEditRole(role)}>
        Modifier
      </Button>
      <Button size="sm" variant="danger" onClick={() => handleDeleteRole(role.id)}>
        Supprimer
      </Button>
    </div>,
  ]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Gestion des rôles</h1>

      <Card className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Liste des rôles</h2>
          <Button onClick={handleAddRole}>Ajouter un nouveau rôle</Button>
        </div>
        <Table headers={tableHeaders} data={tableData} />
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingRole ? 'Modifier le rôle' : 'Ajouter un nouveau rôle'}
      >
        <form onSubmit={handleSubmit}>
          <InputField
            id="name"
            name="name"
            label="Nom du rôle"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Entrez le nom du rôle"
            required
            error={formErrors.name}
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {allPermissions.map((permission) => (
                <div key={permission} className="flex items-center">
                  <input
                    type="checkbox"
                    id={permission}
                    name="permissions"
                    value={permission}
                    checked={formData.permissions.includes(permission)}
                    onChange={handlePermissionChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={permission} className="ml-2 text-sm text-gray-700">
                    {permission.replace(/_/g, ' ')}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Annuler
            </Button>
            <Button type="submit">
              {editingRole ? 'Mettre à jour le rôle' : 'Créer le rôle'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default RoleManagement;