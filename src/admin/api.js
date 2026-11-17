export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

const UNAVAILABLE =
  'The admin API is not running. Locally, stop this server and start the site with "npm run dev", then open http://localhost:3000/admin. In production, deploy to Netlify.';

// Keep in step with MAX_UPLOAD_BYTES in netlify/lib/files.mjs.
export const MAX_UPLOAD_MB = 4;

const request = async (path, { method = 'GET', body, rawBody, headers = {} } = {}) => {
  let res;
  try {
    res = await fetch(path, {
      method,
      credentials: 'same-origin',
      headers: body
        ? { 'Content-Type': 'application/json', Accept: 'application/json', ...headers }
        : { Accept: 'application/json', ...headers },
      body: body ? JSON.stringify(body) : rawBody,
    });
  } catch {
    throw new ApiError('Could not reach the server. Check your connection and try again.', 0);
  }

  // Without the functions running, /api/* falls through to index.html.
  if (!(res.headers.get('content-type') || '').includes('application/json')) {
    throw new ApiError(UNAVAILABLE, -1);
  }
  const data = await res.json();
  if (!res.ok) throw new ApiError(data.error || `Request failed (${res.status})`, res.status);
  return data;
};

export const api = {
  session: () => request('/api/session'),
  login: (email, password) => request('/api/login', { method: 'POST', body: { email, password } }),
  logout: () => request('/api/logout', { method: 'POST', body: {} }),
  getContent: () => request('/api/content'),
  saveContent: (content, { baseUpdatedAt = null, force = false } = {}) =>
    request('/api/content', { method: 'PUT', body: { content, baseUpdatedAt, force } }),

  upload: (file) => {
    if (file.size > MAX_UPLOAD_MB * 1024 * 1024) {
      return Promise.reject(new ApiError(`"${file.name}" is larger than ${MAX_UPLOAD_MB} MB.`, 413));
    }
    return request('/api/upload', {
      method: 'POST',
      rawBody: file,
      headers: {
        'Content-Type': file.type || 'application/octet-stream',
        'X-File-Name': encodeURIComponent(file.name),
      },
    });
  },
  listFiles: () => request('/api/files'),
  deleteFile: (key) =>
    request(`/api/files/${encodeURIComponent(key)}`, { method: 'DELETE', headers: { 'X-Requested-With': 'admin' } }),
};
