import React, { useState, useEffect } from 'react';
import RequestForm from './components/RequestForm';
import StatsTable from './components/StatsTable';
import './index.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function App() {
  const [stats, setStats] = useState({});
  const [loadingStats, setLoadingStats] = useState(false);

  const fetchStats = async () => {
    setLoadingStats(true);
    try {
      const response = await fetch(`${API_URL}/stats`);
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="dashboard">
      <header className="header">
        <h1>API Rate Limiter Dashboard</h1>
      </header>
      <RequestForm onResponse={fetchStats} apiUrl={API_URL} />
      <StatsTable stats={stats} onRefresh={fetchStats} loading={loadingStats} />
    </div>
  );
}

export default App;
