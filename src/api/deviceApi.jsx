import apiClient from './apiClient';

export const getDevices = () => apiClient.get('/api/devices');
export const getDeviceById = (id) => apiClient.get(`/api/devices/${id}`);
export const addDevice = (deviceData) => apiClient.post('/api/devices', deviceData);
export const updateDevice = (id, deviceData) => apiClient.put(`/api/devices/${id}`, deviceData);
export const deleteDevice = (id) => apiClient.delete(`/api/devices/${id}`);