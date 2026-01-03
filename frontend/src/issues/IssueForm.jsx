//project_dir/frontend/src/issues/IssueForm.jsx
import { useState } from 'react';
import { createIssue } from '../api/issues.api';
import { useI18n } from '../i18n/I18nContext';
export default function IssueForm({ location, onSuccess }) {
  const { t } = useI18n();
  const [form, setForm] = useState({
    description: '',
    category: 'road',
    priority: 'medium',
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  async function submit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const payload = new FormData();
      payload.append('description', form.description);
      payload.append('category', form.category);
      payload.append('priority', form.priority);
      payload.append('latitude', location.lat);
      payload.append('longitude', location.lng);
      if (form.image) payload.append('image', form.image);

      await createIssue(payload);

      // Reset form
      setForm({
        description: '',
        category: 'road',
        priority: 'medium',
        image: null,
      });

      onSuccess();
    } catch (err) {
      setError(err.message || 'Failed to submit issue');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-wrapper">
      <h2>{t.issue.raise}</h2>


      {/* Location Display */}
      <div className="location-display">
        <h3>📍 {t.map.yourLocation}</h3>
        <p>
          <strong>{t.issue.latitude}:</strong> {location.lat.toFixed(6)}<br />
          <strong>{t.issue.longitude}:</strong> {location.lng.toFixed(6)}
        </p>

        <p>{t.map.instruction}</p>
      </div>

      <form onSubmit={submit}>
        <div className="form-group">
          <label htmlFor="description">{t.issue.description} *</label>
          <textarea
            id="description"
            placeholder={t.issue.descriptionPlaceholder}
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            required
            rows="5"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">{t.issue.category} *</label>
          {/* Category select */}
          <select
            id="category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option value="road"> {t.issue.categories.road}</option>
            <option value="water"> {t.issue.categories.water}</option>
            <option value="electricity"> {t.issue.categories.electricity}</option>
            <option value="waste"> {t.issue.categories.waste}</option>
          </select>
        </div>
        
        <div className="form-group">
          {/* Priority select */}
          <label htmlFor="priority">{t.issue.priority} *</label>
          <select
            id="priority"
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
          >
            <option value="low">🟢 {t.issue.priorities.low}</option>
            <option value="medium">🟡 {t.issue.priorities.medium}</option>
            <option value="high">🔴 {t.issue.priorities.high}</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="image">{t.issue.uploadImage} *</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) =>
              setForm({ ...form, image: e.target.files[0] })
            }
            required
          />
          {form.image && (
            <div className="file-preview">
           <strong>{form.image.name}</strong>
            </div>
          )}
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? t.issue.submitting : t.issue.submit}
        </button>
      </form>
    </div>
  );
}