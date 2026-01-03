// src/api/users.api.js
import { apiFetch } from "./client";

export function fetchMyProfile() {
     const token = localStorage.getItem('token'); // get token
  return apiFetch('/api/users/me/', {
    headers: { Authorization: `Token ${token}` }, // send token
  });
  
}
