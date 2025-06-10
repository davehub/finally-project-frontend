import React, { useState } from 'react';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const AddMaintenancePage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    technician: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await axios.post(`${BACKEND_URL}/api/maintenance`, formData, {
        headers: { 'Content-Type': 'application/json' }
      });

      setMessage('Maintenance ajoutée avec succès.');
      setFormData({ title: '', description: '', date: '', technician: '' });
    } catch (err) {
      setError(err.response?.data?.msg || 'Erreur lors de l’ajout.');
    }
  };

  return (
    <div className="add-maintenance-container">
      <h2>Ajouter une Maintenance</h2>

      <form onSubmit={handleSubmit} className="maintenance-form">
        <div>
          <label>Titre</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Technicien</label>
          <input
            type="text"
            name="technician"
            value={formData.technician}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Ajouter</button>
      </form>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default AddMaintenancePage;
