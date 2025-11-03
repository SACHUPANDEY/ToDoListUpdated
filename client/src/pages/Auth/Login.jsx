import React, { useState, useContext } from 'react';
import API from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { identifier, password });
      login(res.data);
      navigate('/todos');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to login');
    }
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-bold">Login</h2>
      <input required value={identifier} onChange={e=>setIdentifier(e.target.value)}
        className="block w-full p-2 border" placeholder="Email or username" />
      <input required value={password} onChange={e=>setPassword(e.target.value)} type="password"
        className="block w-full p-2 border" placeholder="Password" />
      <button className="px-4 py-2 bg-indigo-600 text-white">Login</button>
    </form>
  );
}
