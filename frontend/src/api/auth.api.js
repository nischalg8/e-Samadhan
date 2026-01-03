// src/api/auth.api.js
import { apiFetch } from './client';

export function citizenLogin(nid, dateOfBirth) {
  return apiFetch('/api/users/login/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nid, dateOfBirth }),
  });
}

export function agencyLogin(agencyId, password) {
  return apiFetch('/api/users/agency-login/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ agencyId, password }),
  });
}
