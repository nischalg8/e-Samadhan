


//project_dir/frontend/src/issues/MyIssues.jsx
import { useEffect, useState } from 'react';
import { listCitizenIssues } from '../api/issues.api';
import IssueMap from '../map/IssueMap';
import { useI18n } from '../i18n/I18nContext';


export default function MyIssues() {
  const { t } = useI18n();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewingMap, setViewingMap] = useState(false);
  const [mapLocation, setMapLocation] = useState({ lat: 0, lng: 0 });
  const [viewingImage, setViewingImage] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [imageZoom, setImageZoom] = useState(1);

  useEffect(() => {
    async function loadIssues() {
      try {
        setLoading(true);
        setError(null);
        const data = await listCitizenIssues();
        setIssues(data);
        console.log("ISSUE SAMPLE:", data[0]);
      } catch (err) {
        setError(err.message || 'Failed to load issues');
        console.error('Error fetching issues:', err);
      } finally {
        setLoading(false);
      }
    }

    loadIssues();
  }, []);

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
    setImageZoom(1); // reset zoom
  };

  const handleZoom = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setImageZoom(prev => Math.max(0.5, Math.min(3, prev + delta)));
  };

  if (loading) {
    return (
      <div className="issues-container">
        <p>{t.loading}</p>
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
          <h3>{t.general.noIssues}</h3>
         
       
        </div>
      </div>
    );
  }

  return (
    <div className="issues-container">
      <h2>{t.nav.issues} ({issues.length})</h2>
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
              <p>📍 <button className="location-link" onClick={() => viewOnMap(issue.latitude, issue.longitude)}>{t.issue.location}: {issue.latitude}, {issue.longitude}</button></p>
              {issue.created_at && (
                <p> {t.issue.reported}: {new Date(issue.created_at).toLocaleDateString()}</p>
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
              onLocationSelect={() => {}} // No-op for read-only
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