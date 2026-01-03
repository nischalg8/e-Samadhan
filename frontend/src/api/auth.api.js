// frontend/src/api/auth.api.js
import { apiFetch } from './client';

export function citizenLogin(nid, dob) {
  return apiFetch('/api/users/login/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nid, dob }),
  });
}

export function agencyLogin(agencyName, staffId, username, password) {
  return apiFetch('/api/users/agency-login/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      agency_name: agencyName,
      staff_id: staffId,
      username: username,
      password: password 
    }),
  });
}