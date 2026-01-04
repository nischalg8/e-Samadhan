import { useState } from 'react';
import { useI18n } from '../i18n/I18nContext';

export default function ForumPage() {
  const { t } = useI18n();

  // Static sample issues for the forum
  const [issues] = useState([
    {
      id: 1,
      title: 'Potholes on Main Street',
      description: 'Several potholes causing traffic issues in the area.',
      upvotes: 12,
      comments: 3,
    },
    {
      id: 2,
      title: 'Streetlights not working',
      description: 'Streetlights on Elm Road are not functioning properly.',
      upvotes: 8,
      comments: 1,
    },
    {
      id: 3,
      title: 'Water leakage near park',
      description: 'Water is leaking continuously near Central Park.',
      upvotes: 15,
      comments: 5,
    },
  ]);

  return (
    <div className="issues-container">
      <h2>{t.forum.title}</h2>
     <p style={{ margin: '10px 0', fontStyle: 'italic', color: '#666' }}>
  {t.forum.placeholder}
</p>

      <div className="issues-list">
        {issues.map((issue) => (
          <div key={issue.id} className="issue-card">
            <h3>{issue.title}</h3>
            <p className="issue-description">{issue.description}</p>
            <div className="issue-meta">
              <button className="status-select">
                👍 {t.forum.upvote} ({issue.upvotes})
              </button>
              <button className="status-select">
                💬 {t.forum.comment} ({issue.comments})
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}