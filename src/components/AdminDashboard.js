import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [data, setData] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('adminToken');
      try {
        const response = await axios.get('http://localhost:4000/api/admin/protected', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Access denied');
      }
    };
    fetchData();
  }, []);

  const logout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/login';
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Dashboard</h1>
      {error ? <p style={{ color: 'red' }}>{error}</p> : <p>{data}</p>}
      <button onClick={logout} style={{ marginTop: '20px', padding: '10px' }}>Logout</button>
      <div>
        <h1>HEY</h1>
      </div>
    </div>
  );
};

export default AdminDashboard;
