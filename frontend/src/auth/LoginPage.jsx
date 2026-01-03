import { useState } from 'react';
import { useAuth } from './AuthContext';
import { useI18n } from '../i18n/I18nContext';

export default function LoginPage() {
  const { loginCitizen, loginAgency } = useAuth();
  const { t, lang, setLang } = useI18n();

  const [mode, setMode] = useState('citizen');
  const [form, setForm] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'citizen') {
        await loginCitizen(form.nid, form.dateOfBirth);
      } else {
        await loginAgency(form.agencyId, form.password);
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

        {/* Toggle */}
        {/* Toggle */}
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
                  onChange={(e) =>
                    setForm({ ...form, nid: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>{t.login.dob}</label>
                <input
                  type="date"
                  required
                  value={form.dateOfBirth || ''}
                  onChange={(e) =>
                    setForm({ ...form, dateOfBirth: e.target.value })
                  }
                />
              </div>
            </>
          ) : (
            <>
              <div className="form-group">
                <label>{t.login.agencyId}</label>
                <input
                  type="text"
                  required
                  value={form.agencyId || ''}
                  onChange={(e) =>
                    setForm({ ...form, agencyId: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>{t.login.password}</label>
                <input
                  type="password"
                  required
                  value={form.password || ''}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
              </div>
            </>
          )}

          {error && <p className="error-text">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : t.login.loginBtn}
          </button>
        </form>
      </div>
    </div>
  );
}
