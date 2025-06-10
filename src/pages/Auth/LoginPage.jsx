import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

const submitHandler = (e) => {
    e.preventDefault();
    axios.post('/api/login', {email, password}
      .then(result => {console.log(result.data);
        // Rediriger vers le dashboard après l'inscription réussie
        navigate('/dashboard');
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
  //     await login(email, password);
  //     // Pas besoin de navigate ici, le useEffect s’en charge

  //   } catch (err) {
  //     setError(err.message || 'Erreur lors de la connexion');
  //   }
  // };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Connexion</h2>
      {error && <p className="text-red-600 mb-4 text-sm text-center">{error}</p>}
      <form onSubmit={submitHandler} className="space-y-4">
        <div>
          <label htmlFor="email" className="block font-medium mb-1">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="block font-medium mb-1">Mot de passe</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Se connecter
        </button>
      </form>
      <p className="mt-4 text-sm text-center">
        Pas encore de compte ? <Link href="/register" className="text-blue-600 hover:underline">S'inscrire</Link>
      </p>
      <p className="mt-2 text-sm text-center">
        Mot de passe oublié ? <Link href="/reset-password" className="text-blue-600 hover:underline">Réinitialiser</Link>
      </p>
    </div>
  );
};

export default LoginPage;
