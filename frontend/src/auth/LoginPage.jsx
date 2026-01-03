import { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useI18n } from '../i18n/I18nContext';
import { fetchAgencies } from '../api/agencies.api';  // ADD THIS

export default function LoginPage() {
  const { loginCitizen, loginAgency } = useAuth();
  const { t, lang, setLang } = useI18n();

  const [mode, setMode] = useState('citizen');
  const [form, setForm] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [agencies, setAgencies] = useState([]);  // ADD THIS
  const [loadingAgencies, setLoadingAgencies] = useState(false);  // ADD THIS

  // Fetch agencies when switching to agency mode
  useEffect(() => {
    if (mode === 'agency' && agencies.length === 0) {
      setLoadingAgencies(true);
      fetchAgencies()
        .then(setAgencies)
        .catch(err => console.error('Failed to load agencies:', err))
        .finally(() => setLoadingAgencies(false));
    }
  }, [mode, agencies.length]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'citizen') {
        await loginCitizen(form.nid, form.dateOfBirth);
      } else {
        await loginAgency(
          form.agencyName, 
          form.staffId, 
          form.username, 
          form.password
        );
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="language-toggle">
        <label>Language</label>
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          style={{
            padding: '8px 12px',
            borderRadius: '4px',
            border: '2px solid #ddd',
            fontSize: '14px',
            cursor: 'pointer',
            marginBottom: '20px',
          }}
        >
          <option value="en">English</option>
          <option value="ne">नेपाली</option>
        </select>
      </div>

      <div className="login-card">
        <h1>{t.appName}</h1>
        <p>{t.appSubtitle}</p>

        <div className="login-mode-toggle">
          <button
            type="button"
            className={`mode-btn citizen ${mode === 'citizen' ? 'active citizen' : ''}`}
            onClick={() => setMode('citizen')}
          >
            {t.login.citizen}
          </button>
          <button
            type="button"
            className={`mode-btn agency ${mode === 'agency' ? 'active agency' : ''}`}
            onClick={() => setMode('agency')}
          >
            {t.login.agency}
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === 'citizen' ? (
            <>
              <div className="form-group">
                <label>{t.login.nid}</label>
                <input
                  type="text"
                  required
                  value={form.nid || ''}
                  onChange={(e) => setForm({ ...form, nid: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>{t.login.dob}</label>
                <input
                  type="date"
                  required
                  value={form.dateOfBirth || ''}
                  onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })}
                />
              </div>
            </>
          ) : (
            <>
              {/* Agency Dropdown */}
              <div className="form-group">
                <label>{t.login.agency}</label>
                {loadingAgencies ? (
                  <p style={{ fontSize: '12px', color: '#666' }}>Loading agencies...</p>
                ) : (
                  <select
                    required
                    value={form.agencyName || ''}
                    onChange={(e) => setForm({ ...form, agencyName: e.target.value })}
                  >
                    <option value="">Select Agency</option>
                    {agencies.map(agency => (
                      <option key={agency.id} value={agency.name}>
                        {agency.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Staff ID */}
              <div className="form-group">
                <label>{t.login.staffId}</label>
                <input
                  type="text"
                  required
                  value={form.staffId || ''}
                  onChange={(e) => setForm({ ...form, staffId: e.target.value })}
                />
              </div>

              {/* Username */}
              <div className="form-group">
                <label>{t.login.username}</label>
                <input
                  type="text"
                  required
                  value={form.username || ''}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                />
              </div>

              {/* Password */}
              <div className="form-group">
                <label>{t.login.password}</label>
                <input
                  type="password"
                  required
                  value={form.password || ''}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>
            </>
          )}

          {error && <p className="error-text">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? t.login.loggingIn : t.login.loginBtn}
          </button>
        </form>
      </div>
    </div>
  );
}