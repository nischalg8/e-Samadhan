// src/api/issues.api.js
import { apiFetch } from './client';

export function createIssue(formData) {
  return apiFetch('/api/issues/', {
    method: 'POST',
    body: formData, // multipart for image
  });
}

export function fetchMyIssues() {
  return apiFetch('/api/issues/my/');
}
