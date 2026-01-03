// src/api/client.js
const API_BASE =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';


export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem('token'); // <--- match AuthProvider

  // Check if body is FormData - if so, don't set Content-Type (browser will set it with boundary)
  const isFormData = options.body instanceof FormData;
  
  const headers = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Token ${token}` } : {}),
  };

  // Remove Content-Type if FormData (browser will set it automatically)
  if (isFormData && headers['Content-Type']) {
    delete headers['Content-Type'];
  }

  // Normalize URL to avoid double slashes
  const base = API_BASE.endsWith('/') ? API_BASE.slice(0, -1) : API_BASE;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = `${base}${normalizedPath}`;

  const res = await fetch(url, {
    ...options,
    headers,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || data.detail || 'API error');
  }

  return data;
}