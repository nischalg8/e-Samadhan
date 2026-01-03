import React from 'react';
import { useI18n } from '../i18n/I18nContext';

export default function FooterNav({ active, setActive }) {
  const { t } = useI18n(); // MOVE THIS INSIDE THE COMPONENT
  
  return (
    <footer className="footer-nav">
      <button
        className={`nav-btn ${active === 'map' ? 'active' : ''}`}
        onClick={() => setActive('map')}
      >
        {t.nav.map}
      </button>
      <button
        className={`nav-btn ${active === 'raise' ? 'active' : ''}`}
        onClick={() => setActive('raise')}
      >
        {t.nav.raise}
      </button>
      <button
        className={`nav-btn ${active === 'issues' ? 'active' : ''}`}
        onClick={() => setActive('issues')}
      >
        {t.nav.issues}
      </button>
          <button
        className={`nav-btn ${active === 'profile' ? 'active' : ''}`}
        onClick={() => setActive('profile')}
      >
        {t.nav.profile}
      </button>
    </footer>
  );
}