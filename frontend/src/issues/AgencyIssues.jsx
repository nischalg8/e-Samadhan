import { useEffect, useState } from "react";
import { fetchAgencyIssues, updateIssueStatus } from "../api/agencies.api";
import IssueMap from "../map/IssueMap";
import { useI18n } from '../i18n/I18nContext';

export default function AgencyIssues() {
  const { t } = useI18n();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [viewingMap, setViewingMap] = useState(false);
  const [mapLocation, setMapLocation] = useState({ lat: 0, lng: 0 });
  const [viewingImage, setViewingImage] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [imageZoom, setImageZoom] = useState(1);

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function loadIssues() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchAgencyIssues(token);
        setIssues(data);
      } catch (err) {
        setError(err.message || "Failed to load issues");
      } finally {
        setLoading(false);
      }
    }

    loadIssues();
  }, [token]);

  const handleStatusChange = async (issueId, newStatus, currentStatus) => {
    // Prevent changing back from resolved status
    if (currentStatus === 'resolved' && newStatus !== 'resolved') {
      alert(t.issue.cannotChangeStatusMessage || "⚠️ Cannot change status of a resolved issue.\n\nOnce an issue is marked as resolved, it cannot be reverted.");
      return;
    }

    // Show confirmation for in_progress
    if (newStatus === 'in_progress') {
      const confirmed = window.confirm(
        t.issue.confirmInProgressMessage || 
        "Are you sure you want to mark this issue as IN PROGRESS?\n\n" +
        "This indicates that your agency has started working on resolving this issue."
      );
      if (!confirmed) return;
    }

    // Show confirmation for resolved
    if (newStatus === 'resolved') {
      const confirmed = window.confirm(
        t.issue.confirmResolveMessage ||
        "⚠️ ARE YOU SURE YOU WANT TO MARK THIS ISSUE AS RESOLVED?\n\n" +
        "This action indicates that:\n" +
        "• The issue has been completely fixed\n" +
        "• The project/work is completed\n" +
        "• Points will be awarded to your agency and the citizen\n" +
        "• This status CANNOT be changed back\n\n" +
        "Please confirm that the issue is fully resolved."
      );
      if (!confirmed) return;
    }

    // Perform the update
    setUpdating(true);
    try {
      await updateIssueStatus(issueId, newStatus, token);
      setIssues(prev =>
        prev.map(issue =>
          issue.id === issueId ? { ...issue, status: newStatus } : issue
        )
      );
      
      if (newStatus === 'resolved') {
        alert(t.issue.resolvedSuccessMessage || "✅ Issue marked as RESOLVED!\n\nPoints have been awarded to your agency and the citizen reporter.");
      }
    } catch (err) {
      alert("❌ " + (t.issue.updateError || "Error") + ": " + (err.message || 'Failed to update status'));
    } finally {
      setUpdating(false);
    }
  };

  const viewOnMap = (lat, lng) => {
    setMapLocation({ lat: parseFloat(lat), lng: parseFloat(lng) });
    setViewingMap(true);
  };

  const closeMap = () => {
    setViewingMap(false);
  };

  const viewImage = (src) => {
    setImageSrc(src);
    setViewingImage(true);
  };

  const closeImage = () => {
    setViewingImage(false);
    setImageZoom(1);
  };

  const handleZoom = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setImageZoom(prev => Math.max(0.5, Math.min(3, prev + delta)));
  };

  if (loading) return <p>{t.loading}</p>;
  if (error) return <p style={{ color: "red" }}>⚠️ {error}</p>;
  if (!issues.length) return <p>{t.issue.noIssuesAssigned}</p>;

  return (
    <div className="issues-container">
      <h2>{t.issue.assignedIssues} ({issues.length})</h2>
      <div className="issues-list">
        {issues.map(issue => (
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
              <p>📍 <button className="location-link" onClick={() => viewOnMap(issue.latitude, issue.longitude)}>{t.issue.location}: {issue.latitude}, {issue.longitude}</button></p>
              <p>{t.issue.reporter}: {issue.reporter}</p>
              {issue.created_at && (
                <p>{t.issue.reported}: {new Date(issue.created_at).toLocaleDateString()}</p>
              )}
            </div>

            {issue.photo && (
              <img
                src={issue.photo}
                alt="Issue"
                className="issue-image"
                onClick={() => viewImage(issue.photo)}
              />
            )}

            <div className="update-status">
              <label>{t.issue.updateStatus}:</label>
              <select
                className="status-select"
                value={issue.status}
                disabled={updating || issue.status === 'resolved'}
                onChange={e => handleStatusChange(issue.id, e.target.value, issue.status)}
              >
                <option value="submitted">{t.issue.submitted}</option>
                <option value="in_progress">{t.issue.inProgress}</option>
                <option value="resolved">{t.issue.resolved}</option>
              </select>
              {issue.status === 'resolved' && (
                <p style={{ fontSize: '11px', color: '#27ae60', marginTop: '5px', fontWeight: '600' }}>
                 {t.issue.cannotChangeStatus}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {viewingMap && (
        <div className="map-modal" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', zIndex: 1000 }} onClick={closeMap}>
          <div style={{ position: 'relative', width: '90%', height: '80%', margin: '5% auto', background: 'white', padding: '10px' }} onClick={(e) => e.stopPropagation()}>
            <button onClick={closeMap} style={{ position: 'absolute', top: 10, right: 10 }}>Close</button>
            <IssueMap
              userLocation={mapLocation}
              selectedLocation={mapLocation}
              onLocationSelect={() => {}}
              readOnly={true}
            />
          </div>
        </div>
      )}

      {viewingImage && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={closeImage}>
          <div style={{ position: 'relative', width: '600px', height: '400px', background: 'white', borderRadius: '10px', padding: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }} onClick={(e) => e.stopPropagation()}>
            <button onClick={closeImage} style={{ position: 'absolute', top: 5, right: 5, background: 'red', color: 'white', border: 'none', borderRadius: '50%', width: '25px', height: '25px', cursor: 'pointer', fontSize: '14px', lineHeight: '1' }}>×</button>
            <img src={imageSrc} alt="Issue" style={{ width: '100%', height: '100%', objectFit: 'contain', transform: `scale(${imageZoom})`, transformOrigin: 'center', transition: 'transform 0.1s' }} onWheel={handleZoom} />
          </div>
        </div>
      )}
    </div>
  );
}