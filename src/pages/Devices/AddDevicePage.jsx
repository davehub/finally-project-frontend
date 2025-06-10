import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDevice } from '../../api/deviceApi';
import { getUsers } from '../../api/userApi';

const AddDevicePage = ({ currentUser }) => {
    const [formData, setFormData] = useState({
        name: '',
        type: 'ordinateur',
        serialNumber: '',
        status: 'actif',
        assignedTo: '',
        location: '',
        purchaseDate: '',
        warrantyEndDate: '',
        description: ''
    });
    
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getUsers();
                setUsers(response.data);
            } catch (err) {
                console.error('Error fetching users:', err);
                setError('Failed to load users');
            }
        };

        if (currentUser && (currentUser.role === 'admin' || currentUser.role === 'technician')) {
            fetchUsers();
        } else {
            navigate('/');
        }
    }, [currentUser, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Filtrer les champs vides
            const deviceData = Object.fromEntries(
                Object.entries(formData).filter(([ value]) => value !== '')
            );
            
            await addDevice(deviceData);
            setMessage(`Device "${formData.name}" added successfully!`);
            
            // Reset form and redirect after 2 seconds
            setTimeout(() => {
                setFormData({
                    name: '',
                    type: 'ordinateur',
                    serialNumber: '',
                    status: 'actif',
                    assignedTo: '',
                    location: '',
                    purchaseDate: '',
                    warrantyEndDate: '',
                    description: ''
                });
                navigate('/devices');
            }, 2000);
            
        } catch (err) {
            console.error('Error adding device:', err);
            setError(err.response?.data?.message || 'Failed to add device');
        }
    };

    if (!currentUser || !['admin', 'technician'].includes(currentUser.role)) {
        return null; // Or redirect to login
    }

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Device</h2>
            
            {message && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{message}</div>}
            {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full p-2 border rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border rounded-md"
                    >
                        <option value="ordinateur">Computer</option>
                        <option value="imprimante">Printer</option>
                        <option value="reseau">Network</option>
                        <option value="serveur">Server</option>
                        <option value="autre">Other</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Serial Number</label>
                    <input
                        type="text"
                        name="serialNumber"
                        value={formData.serialNumber}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full p-2 border rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border rounded-md"
                    >
                        <option value="actif">Active</option>
                        <option value="en panne">Out of Order</option>
                        <option value="en reparation">Under Repair</option>
                        <option value="stock">In Stock</option>
                        <option value="retire">Retired</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Assigned To</label>
                    <select
                        name="assignedTo"
                        value={formData.assignedTo}
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border rounded-md"
                    >
                        <option value="">-- Select User --</option>
                        {users.map(user => (
                            <option key={user._id} value={user._id}>
                                {user.username || user.email}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="mt-1 w-full p-2 border rounded-md"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Purchase Date</label>
                        <input
                            type="date"
                            name="purchaseDate"
                            value={formData.purchaseDate}
                            onChange={handleChange}
                            className="mt-1 w-full p-2 border rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Warranty End</label>
                        <input
                            type="date"
                            name="warrantyEndDate"
                            value={formData.warrantyEndDate}
                            onChange={handleChange}
                            className="mt-1 w-full p-2 border rounded-md"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="3"
                        className="mt-1 w-full p-2 border rounded-md resize-none"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                >
                    Add Device
                </button>
            </form>
        </div>
    );
};

export default AddDevicePage;