// src/api/client.js
const API_BASE =
   process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

export async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: 'include', // important later for sessions
    ...options,
    headers: {
      ...(options.headers || {}),
    },
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || data.detail || 'API error');
  }

  return data;
}
