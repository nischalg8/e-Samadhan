import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import Header from './Header';
import FooterNav from './FooterNav';
import IssueMap from '../map/IssueMap';
import IssueForm from '../issues/IssueForm';
import MyIssues from '../issues/MyIssues';
import AgencyIssues from '../issues/AgencyIssues';
import MyProfile from '../profile/MyProfile';
import ForumPage from '../forum/ForumPage';


export default function MainLayout() {
  const { user } = useAuth();
  const [tab, setTab] = useState(user?.role === 'gov_admin' ? 'issues' : 'map');
  const [location, setLocation] = useState({
    lat: 27.7172,
    lng: 85.324,
  });

  // Define tabs based on role
  const tabs = user?.role === 'gov_admin'
    ? [
      { id: 'issues', label: 'Issues' },
      { id: 'profile', label: 'Profile' },
    ]
    : [
      { id: 'map', label: 'Map' },
      { id: 'raise', label: 'Raise' },
      { id: 'issues', label: 'My Issues' },
      { id: 'profile', label: 'Profile' },
      { id: 'forum', label: 'Forum' },
    ];

  return (
    <div className="App">
      {/* Header */}
      <Header />

      {/* Main content */}
      <div className="app-content">
        {user?.role === 'citizen' && tab === 'map' && (
          <div className="map-container">
            <IssueMap
              userLocation={location}
              selectedLocation={location}
              onLocationSelect={setLocation}
            />
          </div>
        )}

        {user?.role === 'citizen' && tab === 'raise' && (
          <div className="form-wrapper">
            <IssueForm
              location={location}
              onSuccess={() => setTab('issues')}
            />
          </div>
        )}

        {tab === 'issues' && (
          <div className="issues-container">
            {user?.role === 'citizen' ? <MyIssues /> : <AgencyIssues />}
          </div>
        )}
        {tab === 'forum' && (
          <div className="forum-container">
            <ForumPage />
          </div>
        )}


        {tab === 'profile' && (
          <div className="profile-container">
            <MyProfile />
          </div>
        )}
      </div>

      {/* Footer navigation */}
      <FooterNav
        active={tab}
        setActive={setTab}
        tabs={tabs} // send filtered tabs
      />
    </div>
  );
}