import apiClient from './apiClient';

export const getUsers = () => apiClient.get('/api/users');
export const getUserById = (id) => apiClient.get(`/api/users/${id}`);
export const updateUser = (id, userData) => apiClient.put(`/api/users/${id}`, userData);
export const deleteUser = (id) => apiClient.delete(`/api/users/${id}`);
// Note: La création d'utilisateur se fait via `authApi.js` (register)