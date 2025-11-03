import React, { useEffect, useState, useContext } from 'react';
import API from '../../services/api';
import { AuthContext } from '../../context/AuthContext';

export default function TodoDashboard() {
  const [todos, setTodos] = useState([]);
  const { user } = useContext(AuthContext);

  const load = async () => {
    try {
      const res = await API.get('/todos');
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Todos ({user?.role})</h2>
      <div className="grid gap-3">
        {todos.map(t => (
          <div key={t._id} className="p-3 border rounded">
            <div className="font-semibold">{t.title}</div>
            <div className="text-sm">{t.description}</div>
            <div className="text-xs text-gray-600">{t.category} • {t.completed ? 'Done' : 'Open'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
