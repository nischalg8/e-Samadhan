import { useAuth } from '../auth/AuthContext';
import { useI18n } from '../i18n/I18nContext';

export default function Header() {
  const { logout } = useAuth();
  const { t, lang, setLang } = useI18n();

  return (
    <header className="app-header">
      <h1>{t.appName}</h1>

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
      cursor: 'pointer'
    }}
  >
    <option value="en">English</option>
    <option value="ne">नेपाली</option>
  </select>
</div>

      <button className="logout-btn" onClick={logout}>
        {t.general.logout}
      </button>
    </header>
  );
}
