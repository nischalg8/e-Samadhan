import React from 'react';
import { useI18n } from '../i18n/I18nContext';
import { useAuth } from '../auth/AuthContext';

export default function FooterNav({ active, setActive }) {
  const { t } = useI18n();
  const { user } = useAuth();
  const isGovAdmin = user?.role === 'gov_admin';

  return (
    <footer className="footer-nav">
      {!isGovAdmin && (
        <>
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
        </>
      )}
      <button
        className={`nav-btn ${active === 'issues' ? 'active' : ''}`}
        onClick={() => setActive('issues')}
      >
        {t.nav.issues}
      </button>
       {!isGovAdmin && (<button
        className={`nav-btn ${active === 'forum' ? 'active' : ''}`}
        onClick={() => setActive('forum')}
      >
        {t.nav.forum}
      </button>)}

      <button
        className={`nav-btn ${active === 'profile' ? 'active' : ''}`}
        onClick={() => setActive('profile')}
      >
        {t.nav.profile}
      </button>
    </footer>
  );
}
