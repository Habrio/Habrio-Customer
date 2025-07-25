const baseUrl = import.meta.env.VITE_BACKEND_URL;

// Main API request utility with error handling
export async function apiRequest(path, options = {}) {
  const token = localStorage.getItem('auth_token');
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (token) headers['Authorization'] = token;

  let res;
  try {
    res = await fetch(`${baseUrl}${path}`, { ...options, headers });
  } catch (err) {
    // Network/connection error
    return { status: 'error', message: 'Network error', error: err };
  }

  let data;
  try {
    data = await res.json();
  } catch {
    // Response not JSON
    return { status: 'error', message: 'Invalid server response', code: res.status };
  }

  // Optional: Attach HTTP status
  data.httpStatus = res.status;
  // Attach raw ok/fail
  data.ok = res.ok;

  // Standardize error shape
  if (!res.ok && !data.status) {
    data.status = 'error';
    data.message = data.message || 'Something went wrong';
  }
  return data;
}

// Simple GET/POST wrappers
export const get = (path) => apiRequest(path);

export const post = (path, body) =>
  apiRequest(path, { method: 'POST', body: JSON.stringify(body) });

export const del = (path) =>
  apiRequest(path, { method: 'DELETE' });
