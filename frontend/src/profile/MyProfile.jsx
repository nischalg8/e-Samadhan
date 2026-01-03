import { useEffect, useState } from 'react';
import { fetchMyProfile } from '../api/users.api';
import { useI18n } from '../i18n/I18nContext';

export default function MyProfile() {
  const { t } = useI18n();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMyProfile()
      .then(setProfile)
      .catch(err => setError(err.message));
  }, []);

  if (error) return <p>{error}</p>;
  if (!profile) return <p>{t.loading}</p>;

  return (
  <div className="profile-container">
    <div className="profile-card">
      
      {/* Avatar */}
      <div className="profile-avatar">
        {profile.username?.[0]}
      </div>

      <div className="profile-name">
        {profile.username}
      </div>

      <div className="profile-role">
        {profile.role}
      </div>

      <div className="profile-fields">
        <div className="profile-field">
          <label>{t.profile.points}</label>
          <p>{profile.points}</p>
        </div>

        {profile.role === 'citizen' && (
          <div className="profile-field">
            <label>{t.profile.nid}</label>
            <p>{profile.nid}</p>
          </div>
        )}

        {profile.role === 'gov_admin' && (
          <>
            <div className="profile-field">
              <label>{t.profile.agency}</label>
              <p>{profile.agency}</p>
            </div>

            <div className="profile-field">
              <label>{t.profile.staffId}</label>
              <p>{profile.staff_id}</p>
            </div>
          </>
        )}
      </div>

    </div>
  </div>
);

}
