// src/layout/MainLayout.jsx
import { useState } from 'react';
import Header from './Header';
import FooterNav from './FooterNav';
import IssueMap from '../map/IssueMap';
import IssueForm from '../issues/IssueForm';
import MyIssues from '../issues/MyIssues';

export default function MainLayout() {
  const [tab, setTab] = useState('map');
  const [location, setLocation] = useState({
    lat: 27.7172,
    lng: 85.324,
  });

  return (
    <div className="App">
      {/* Header */}
      <Header />

      {/* Main content */}
      <div className="app-content">
        {tab === 'map' && (
          <div className="map-container">
            <IssueMap
              userLocation={location}
              selectedLocation={location}
              onLocationSelect={setLocation}
            />
          </div>
        )}

        {tab === 'raise' && (
          <div className="form-wrapper">
            <IssueForm
              location={location}
              onSuccess={() => setTab('issues')}
            />
          </div>
        )}

        {tab === 'issues' && (
          <div className="issues-container">
            <MyIssues />
          </div>
        )}
      </div>

      {/* Footer navigation */}
      <FooterNav active={tab} setActive={setTab} />
    </div>
  );
}
