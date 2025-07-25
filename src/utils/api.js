// File: src/utils/api.js
const baseUrl = import.meta.env.VITE_BACKEND_URL;

/**
 * Core API request utility with standardized error handling
 */
export async function apiRequest(path, { method = 'GET', body, headers = {} } = {}) {
  const token = localStorage.getItem('auth_token');
  const commonHeaders = { 'Content-Type': 'application/json', ...headers };
  if (token) commonHeaders['Authorization'] = token;

  let response;
  try {
    response = await fetch(`${baseUrl}${path}`, {
      method,
      headers: commonHeaders,
      body,
    });
  } catch (error) {
    return { ok: false, status: 'error', message: 'Network error', error };
  }

  let data;
  try {
    data = await response.json();
  } catch {
    return { ok: false, status: 'error', message: 'Invalid JSON response', httpStatus: response.status };
  }

  data.httpStatus = response.status;
  data.ok = response.ok;

  if (!response.ok) {
    data.status = 'error';
    data.message = data.message || 'Something went wrong';
  }

  return data;
}

export const get = (path, opts) => apiRequest(path, { ...opts, method: 'GET' });
export const post = (path, body, opts) => apiRequest(path, { ...opts, method: 'POST', body: JSON.stringify(body) });
export const del = (path, opts) => apiRequest(path, { ...opts, method: 'DELETE' });
