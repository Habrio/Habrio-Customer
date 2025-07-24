const baseUrl = import.meta.env.VITE_BACKEND_URL;

export async function apiRequest(path, options = {}) {
  const token = localStorage.getItem('auth_token');
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (token) headers['Authorization'] = token;

  const res = await fetch(`${baseUrl}${path}`, { ...options, headers });
  return res.json();
}

export const get = (path) => apiRequest(path);
export const post = (path, body) => apiRequest(path, { method: 'POST', body: JSON.stringify(body) });
