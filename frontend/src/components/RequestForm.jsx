import React, { useState } from 'react';

const RequestForm = ({ onResponse, apiUrl }) => {
  const [userId, setUserId] = useState('');
  const [payload, setPayload] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(`${apiUrl}/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, payload }),
      });

      const data = await response.json();

      setResult({
        status: response.status,
        data,
        success: response.ok
      });

      if (onResponse) onResponse();
    } catch (error) {
      setResult({
        status: 'Error',
        data: { error: 'Failed to connect to server' },
        success: false
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setUserId('');
    setPayload('');
    setResult(null);
  };

  return (
    <div className="card">
      <div className="card-title">🚀 Request Tester</div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>User ID</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="e.g. user123"
          />
        </div>
        <div className="form-group">
          <label>Payload</label>
          <input
            type="text"
            value={payload}
            onChange={(e) => setPayload(e.target.value)}
            placeholder="e.g. hello world"
          />
        </div>
        <div className="button-group">
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? <div className="loading-spinner"></div> : 'Submit Request'}
          </button>
          <button type="button" className="btn-secondary" onClick={handleClear}>
            Clear Form
          </button>
        </div>
      </form>

      {result && (
        <div className={`status-card ${result.success ? 'status-success' : 'status-error'}`}>
          <pre style={{ margin: '0.5rem 0 0 0', whiteSpace: 'pre-wrap', fontSize: '0.75rem' }}>
            {result.success ? 'Request Accepted' : 'Rate Limiting Error'}
          </pre>
        </div>
      )}
    </div>
  );
};

export default RequestForm;
