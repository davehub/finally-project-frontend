import apiClient from './apiClient';

export const getEmergencies = () => apiClient.get('/api/emergencies');
export const getEmergencyById = (id) => apiClient.get(`/api/emergencies/${id}`);
export const addEmergency = (emergencyData) => apiClient.post('/api/emergencies', emergencyData);
export const updateEmergency = (id, emergencyData) => apiClient.put(`/api/emergencies/${id}`, emergencyData);
export const deleteEmergency = (id) => apiClient.delete(`/api/emergencies/${id}`);