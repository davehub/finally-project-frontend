import apiClient from './apiClient';

export const getMaintenances = () => apiClient.get('/api/maintenances');
export const getMaintenanceById = (id) => apiClient.get(`/api/maintenances/${id}`);
export const addMaintenance = (maintenanceData) => apiClient.post('/api/maintenances', maintenanceData);
export const updateMaintenance = (id, maintenanceData) => apiClient.put(`/api/maintenances/${id}`, maintenanceData);
export const deleteMaintenance = (id) => apiClient.delete(`/api/maintenances/${id}`);