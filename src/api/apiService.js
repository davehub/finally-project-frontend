import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // URL de base de votre API backend

// Fonction pour définir le token d'authentification pour toutes les requêtes Axios
// Utilisée par le AuthContext après connexion/inscription
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// --- Fonctions pour les Équipements ---
export const getEquipments = async () => {
  return await axios.get(`${API_BASE_URL}/equipments`);
};

export const getEquipmentById = async (id) => {
  return await axios.get(`${API_BASE_URL}/equipments/${id}`);
};

export const createEquipment = async (equipmentData) => {
  return await axios.post(`${API_BASE_URL}/equipments`, equipmentData);
};

export const updateEquipment = async (id, equipmentData) => {
  return await axios.put(`${API_BASE_URL}/equipments/${id}`, equipmentData);
};

export const deleteEquipment = async (id) => {
  return await axios.delete(`${API_BASE_URL}/equipments/${id}`);
};

// --- Fonctions pour les Logiciels ---
export const getSoftwares = async () => {
  return await axios.get(`${API_BASE_URL}/softwares`);
};

export const getSoftwareById = async (id) => {
  return await axios.get(`${API_BASE_URL}/softwares/${id}`);
};

export const createSoftware = async (softwareData) => {
  return await axios.post(`${API_BASE_URL}/softwares`, softwareData);
};

export const updateSoftware = async (id, softwareData) => {
  return await axios.put(`${API_BASE_URL}/softwares/${id}`, softwareData);
};

export const deleteSoftware = async (id) => {
  return await axios.delete(`${API_BASE_URL}/softwares/${id}`);
};

// --- Fonctions pour les Utilisateurs (pour gestion par un admin/responsable IT) ---
export const getUsers = async () => {
  return await axios.get(`${API_BASE_URL}/users`);
};

export const getUserById = async (id) => {
  return await axios.get(`${API_BASE_URL}/users/${id}`);
};

export const registerUser = async (userData) => {
  return await axios.post(`${API_BASE_URL}/users/register`, userData);
}
export const loginUser = async (credentials) => {
  return await axios.post(`${API_BASE_URL}/users/login`, credentials);
}



// Note: create, update, delete user peuvent être fusionnés avec register/login ou gérés via des routes admin dédiées



export const createUser = async (userData) => {
  return await axios.post(`${API_BASE_URL}/users`, userData);
}
 export const updateUser = async (id, userData) => { 
  return await axios.put(`${API_BASE_URL}/users/${id}`, userData);
  }
 export const deleteUser = async (id) => { 
  return await axios.delete(`${API_BASE_URL}/users/${id}`);
  }