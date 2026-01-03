


//project_dir/frontend/src/issues/MyIssues.jsx
import { useEffect, useState } from 'react';
import { fetchMyIssues } from '../api/issues.api';

export default function MyIssues() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadIssues() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMyIssues();
        setIssues(data);
      } catch (err) {
        setError(err.message || 'Failed to load issues');
        console.error('Error fetching issues:', err);
      } finally {
        setLoading(false);
      }
    }
    
    loadIssues();
  }, []);

  if (loading) {
    return (
      <div className="issues-container">
        <p>Loading your issues...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="issues-container">
        <div className="error-message">
          ⚠️ {error}
        </div>
        <button onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  if (!issues.length) {
    return (
      <div className="issues-container">
        <div className="no-issues">
          <h3>No Issues Yet</h3>
          <p>You haven't reported any issues yet.</p>
          <p>Go to the "Raise" tab to report an issue.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="issues-container">
      <h2>My Issues ({issues.length})</h2>
      <div className="issues-list">
        {issues.map((issue) => (
          <div key={issue.id} className="issue-card">
            <div className="issue-header">
              <span className={`priority-badge ${issue.priority}`}>
                {issue.priority.toUpperCase()}
              </span>
              <span className={`status-badge ${issue.status}`}>
                {issue.status}
              </span>
            </div>
            
            <h3>{issue.category}</h3>
            <p className="issue-description">{issue.description}</p>
            
            <div className="issue-meta">
              <p>📍 Location: {issue.latitude}, {issue.longitude}</p>
              {issue.created_at && (
                <p> Reported: {new Date(issue.created_at).toLocaleDateString()}</p>
              )}
            </div>
            
            {issue.image && (
              <img 
                src={issue.image} 
                alt="Issue" 
                className="issue-image"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}