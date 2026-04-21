import React from 'react';

const StatsTable = ({ stats, onRefresh, loading }) => {
  const userIds = Object.keys(stats);

  return (
    <div className="card" style={{ gridColumn: '1 / -1' }}>
      <div className="card-title" style={{ justifyContent: 'space-between' }}>
        <span>📊 Stats Dashboard</span>
        <button className="btn-secondary" onClick={onRefresh} disabled={loading} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
          {loading ? <div className="loading-spinner"></div> : 'Refresh Stats'}
        </button>
      </div>

      {userIds.length === 0 ? (
        <div className="empty-state">
          No statistics available yet. Send some requests to see data!
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Total Requests</th>
                <th>Success</th>
                <th>Blocked</th>
              </tr>
            </thead>
            <tbody>
              {userIds.map((uid) => (
                <tr key={uid}>
                  <td><strong>{uid}</strong></td>
                  <td><span className="badge badge-blue">{stats[uid].totalRequests}</span></td>
                  <td><span className="badge badge-green">{stats[uid].successRequests}</span></td>
                  <td><span className="badge badge-red">{stats[uid].blockedRequests}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StatsTable;
