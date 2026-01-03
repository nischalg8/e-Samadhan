import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';

// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Translations
const translations = {
  en: {
    appName: 'e-Samadhan',
    appSubtitle: 'Citizen Issue Reporting',
    nidLabel: 'NID Number:',
    nidPlaceholder: 'Enter your NID',
    dobLabel: 'Date of Birth:',
    loginBtn: 'Login',
    logoutBtn: 'Logout',
    raiseIssueTitle: 'Raise an Issue',
    addressLabel: 'Address:',
    addressPlaceholder: 'Enter the address',
    phoneLabel: 'Phone Number:',
    phonePlaceholder: 'Enter your phone number',
    priorityLabel: 'Priority:',
    imageLabel: 'Upload Image:',
    lowPriority: 'Low',
    mediumPriority: 'Medium',
    highPriority: 'High',
    submitBtn: 'Submit Issue',
    mapBtn: 'Map',
    raiseBtn: 'Raise Issue',
    raisedBtn: 'Raised Issues',
    profileBtn: 'Profile',
    raisedIssuesTitle: 'Raised Issues',
    noIssues: 'No issues raised yet',
    myProfile: 'My Profile',
    nidNumberLabel: 'NID Number:',
    dobLabelProfile: 'Date of Birth:',
    totalIssuesLabel: 'Total Issues Raised:',
    locationLabel: 'Current Location:',
    successMsg: 'Issue raised successfully!',
    clickMapMsg: 'Click to select issue location',
    yourLocation: 'Your Current Location',
    latitude: 'Lat:',
    longitude: 'Lng:',
    language: 'Language:',
    english: 'English',
    nepali: 'नेपाली',
  },
  ne: {
    appName: 'ई-समाधान',
    appSubtitle: 'नागरिक समस्या रिपोर्टिङ्ग',
    nidLabel: 'नेपाली नागरिकता नम्बर:',
    nidPlaceholder: 'आफ्नो नागरिकता नम्बर प्रविष्ट गर्नुहोस्',
    dobLabel: 'जन्म मिति:',
    loginBtn: 'लगइन गर्नुहोस्',
    logoutBtn: 'लगआउट गर्नुहोस्',
    raiseIssueTitle: 'समस्या रिपोर्ट गर्नुहोस्',
    addressLabel: 'पता:',
    addressPlaceholder: 'पता प्रविष्ट गर्नुहोस्',
    phoneLabel: 'फोन नम्बर:',
    phonePlaceholder: 'आफ्नो फोन नम्बर प्रविष्ट गर्नुहोस्',
    priorityLabel: 'प्राथमिकता:',
    imageLabel: 'तस्वीर अपलोड गर्नुहोस्:',
    lowPriority: 'कम',
    mediumPriority: 'मध्यम',
    highPriority: 'उच्च',
    submitBtn: 'समस्या जमा गर्नुहोस्',
    mapBtn: 'नक्सा',
    raiseBtn: 'समस्या रिपोर्ट गर्नुहोस्',
    raisedBtn: 'रिपोर्ट गरिएका समस्याहरू',
    profileBtn: 'प्रोफाइल',
    raisedIssuesTitle: 'रिपोर्ट गरिएका समस्याहरू',
    noIssues: 'अझै कुनै समस्या रिपोर्ट गरिएको छैन',
    myProfile: 'मेरो प्रोफाइल',
    nidNumberLabel: 'नागरिकता नम्बर:',
    dobLabelProfile: 'जन्म मिति:',
    totalIssuesLabel: 'कुल रिपोर्ट गरिएका समस्याहरू:',
    locationLabel: 'वर्तमान स्थान:',
    successMsg: 'समस्या सफलतापूर्वक रिपोर्ट गरिएको छ!',
    clickMapMsg: 'स्थान चयन गर्न क्लिक गर्नुहोस्',
    yourLocation: 'आपको वर्तमान स्थान',
    latitude: 'अक्षांश:',
    longitude: 'देशान्तर:',
    language: 'भाषा:',
    english: 'English',
    nepali: 'नेपाली',
  },
};

function App() {
  const [language, setLanguage] = useState('en');
  const t = translations[language];

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({
    nid: '',
    dateOfBirth: '',
  });

  const [activeTab, setActiveTab] = useState('map');

  const [userData, setUserData] = useState({
    nid: '',
    dateOfBirth: '',
    currentLocation: { lat: 28.7041, lng: 77.1025 },
  });

  const [issues, setIssues] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    address: '',
    phoneNumber: '',
    priority: 'medium',
    image: null,
    imagePreview: null,
    latitude: 28.7041,
    longitude: 77.1025,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserData((prev) => ({
            ...prev,
            currentLocation: { lat: latitude, lng: longitude },
          }));
          setFormData((prev) => ({
            ...prev,
            latitude,
            longitude,
          }));
        },
        (error) => console.log('Location error:', error)
      );
    }
  }, []);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.nid && loginData.dateOfBirth) {
      setUserData({
        nid: loginData.nid,
        dateOfBirth: loginData.dateOfBirth,
        currentLocation: userData.currentLocation,
      });
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginData({ nid: '', dateOfBirth: '' });
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: file,
          imagePreview: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMapClick = (e) => {
    setFormData({
      ...formData,
      latitude: e.latlng.lat,
      longitude: e.latlng.lng,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newIssue = {
      id: issues.length + 1,
      ...formData,
      timestamp: new Date().toLocaleString(),
    };
    setIssues([...issues, newIssue]);
    setFormData({
      address: '',
      phoneNumber: '',
      priority: 'medium',
      image: null,
      imagePreview: null,
      latitude: userData.currentLocation.lat,
      longitude: userData.currentLocation.lng,
    });
    setShowForm(false);
    alert(t.successMsg);
  };

  if (!isAuthenticated) {
    return (
      <div className="App">
        <div className="login-container">
          <div className="language-toggle">
            <label>{t.language}</label>
            <div className="lang-buttons">
              <button
                className={`lang-btn ${language === 'en' ? 'active' : ''}`}
                onClick={() => setLanguage('en')}
              >
                {t.english}
              </button>
              <button
                className={`lang-btn ${language === 'ne' ? 'active' : ''}`}
                onClick={() => setLanguage('ne')}
              >
                {t.nepali}
              </button>
            </div>
          </div>
          <h1>{t.appName}</h1>
          <p>{t.appSubtitle}</p>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="nid">{t.nidLabel}</label>
              <input
                type="text"
                id="nid"
                name="nid"
                placeholder={t.nidPlaceholder}
                value={loginData.nid}
                onChange={handleLoginChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="dateOfBirth">{t.dobLabel}</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={loginData.dateOfBirth}
                onChange={handleLoginChange}
                required
              />
            </div>

            <button type="submit">{t.loginBtn}</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="app-header">
        <h1>{t.appName}</h1>
        <button className="logout-btn" onClick={handleLogout}>{t.logoutBtn}</button>
      </div>

      <div className="app-content">
        {activeTab === 'map' && (
          <div className="map-container">
            {showForm && (
              <div className="form-overlay">
                <div className="form-wrapper">
                  <button className="close-form" onClick={() => setShowForm(false)}>×</button>
                  <h2>{t.raiseIssueTitle}</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="address">{t.addressLabel}</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        placeholder={t.addressPlaceholder}
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phoneNumber">{t.phoneLabel}</label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder={t.phonePlaceholder}
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        pattern="[0-9]{10}"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="priority">{t.priorityLabel}</label>
                      <select
                        id="priority"
                        name="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                      >
                        <option value="low">{t.lowPriority}</option>
                        <option value="medium">{t.mediumPriority}</option>
                        <option value="high">{t.highPriority}</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="image">{t.imageLabel}</label>
                      <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                      />
                    </div>

                    {formData.imagePreview && (
                      <div className="image-preview">
                        <img src={formData.imagePreview} alt="Preview" />
                      </div>
                    )}

                    <p className="location-info">
                      {t.latitude} {formData.latitude.toFixed(4)}, {t.longitude} {formData.longitude.toFixed(4)}
                    </p>

                    <button type="submit" className="submit-btn">{t.submitBtn}</button>
                  </form>
                </div>
              </div>
            )}

            <MapContainer
              center={[userData.currentLocation.lat, userData.currentLocation.lng]}
              zoom={15}
              className="terrain-map"
              onClick={(e) => {
                if (showForm) {
                  handleMapClick(e);
                }
              }}
            >
              <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                attribution="&copy; Esri"
              />
              <Marker position={[userData.currentLocation.lat, userData.currentLocation.lng]}>
                <Popup>{t.yourLocation}</Popup>
              </Marker>
              {showForm && (
                <Marker 
                  position={[formData.latitude, formData.longitude]}
                >
                  <Popup>{formData.latitude.toFixed(6)}, {formData.longitude.toFixed(6)}</Popup>
                </Marker>
              )}
            </MapContainer>
          </div>
        )}

        {activeTab === 'issues' && (
          <div className="issues-container">
            <h2>{t.raisedIssuesTitle}</h2>
            {issues.length === 0 ? (
              <p className="no-data">{t.noIssues}</p>
            ) : (
              <div className="issues-list">
                {issues.map((issue) => (
                  <div key={issue.id} className="issue-card">
                    <div className="issue-header">
                      <span className={`priority-badge ${issue.priority}`}>
                        {issue.priority === 'low' ? t.lowPriority : issue.priority === 'medium' ? t.mediumPriority : t.highPriority}
                      </span>
                      <span className="issue-date">{issue.timestamp}</span>
                    </div>
                    <p><strong>{t.addressLabel}</strong> {issue.address}</p>
                    <p><strong>{t.phoneLabel}</strong> {issue.phoneNumber}</p>
                    <p><strong>{t.locationLabel}</strong> {issue.latitude.toFixed(4)}, {issue.longitude.toFixed(4)}</p>
                    {issue.imagePreview && (
                      <img src={issue.imagePreview} alt="Issue" className="issue-image" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="profile-container">
            <h2>{t.myProfile}</h2>
            <div className="profile-info">
              <div className="profile-field">
                <label>{t.nidNumberLabel}</label>
                <p>{userData.nid}</p>
              </div>
              <div className="profile-field">
                <label>{t.dobLabelProfile}</label>
                <p>{userData.dateOfBirth}</p>
              </div>
              <div className="profile-field">
                <label>{t.totalIssuesLabel}</label>
                <p>{issues.length}</p>
              </div>
              <div className="profile-field">
                <label>{t.locationLabel}</label>
                <p>{t.latitude} {userData.currentLocation.lat.toFixed(4)}, {t.longitude} {userData.currentLocation.lng.toFixed(4)}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="footer-nav">
        <button
          className={`nav-btn ${activeTab === 'map' && !showForm ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('map');
            setShowForm(false);
          }}
        >
          📍 {t.mapBtn}
        </button>
        <button
          className={`nav-btn ${activeTab === 'map' && showForm ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('map');
            setShowForm(true);
          }}
        >
          ➕ {t.raiseBtn}
        </button>
        <button
          className={`nav-btn ${activeTab === 'issues' ? 'active' : ''}`}
          onClick={() => setActiveTab('issues')}
        >
          📋 {t.raisedBtn}
        </button>
        <button
          className={`nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          👤 {t.profileBtn}
        </button>
      </footer>
    </div>
  );
}

export default App;
