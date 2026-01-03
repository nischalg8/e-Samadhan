// frontend/src/api/issues.api.js
import { apiFetch } from './client';

export function createIssue(formData) {
  return apiFetch('/api/issues/', {
    method: 'POST',
    body: formData,
  });
}

export function listCitizenIssues() {
  const token = localStorage.getItem('token'); // ✅ add this
  return apiFetch('/api/issues/list/', {
    headers: { Authorization: `Token ${token}` }, // ✅ send token
  });
}
