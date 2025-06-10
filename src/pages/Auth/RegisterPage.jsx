import React, { useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post('/api/register', {username, email, password, role}
      .then(result => {console.log(result.data);
        // Rediriger vers la page login après l'inscription réussie
        navigate('/login');
      })
      .catch(err => {
        console.error(err);
        setError(err.response?.data?.message || 'Erreur lors de l\'inscription.');
      })
    )}
   


  // const submitHandler = async (e) => {
  //   e.preventDefault();
  //   setError('');
  //   try {
  //     await register(username, email, password, role);
  //     // Pas besoin de naviguer ici, le useEffect s'en charge
  //   } catch (err) {
  //     // Afficher message d'erreur si possible
  //     setError(err.response?.data?.message || 'Erreur lors de l\'inscription.');
  //   }
  // };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Inscription</h2>
      {error && <p className="text-red-600 mb-4 text-sm text-center">{error}</p>}
      <form onSubmit={submitHandler} className="space-y-4">
        <div>
          <label htmlFor="username" className="block font-medium mb-1">Nom d'utilisateur</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-medium mb-1">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="block font-medium mb-1">Mot de passe</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="role" className="block font-medium mb-1">Rôle</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="user">Utilisateur</option>
            <option value="technician">Technicien</option>
            <option value="admin">Admin</option>
            <option value="viewer">Observateur</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          S'inscrire
        </button>
      </form>
      <p className="mt-4 text-sm text-center">
        Déjà inscrit ? <Link href="/login" className="text-blue-600 hover:underline">Se connecter</Link>
      </p>
      <p className="mt-2 text-sm text-center">
        Mot de passe oublié ? <Link href="/reset-password" className="text-blue-600 hover:underline">Réinitialiser</Link>
      </p>
    </div>
  );
};


export default RegisterPage;
