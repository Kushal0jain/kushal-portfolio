// Small helpers shared by the admin API functions.

export const json = (status, body, headers = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      ...headers,
    },
  });

export const methodNotAllowed = (allowed) =>
  json(405, { error: 'Method not allowed' }, { Allow: allowed.join(', ') });

// Mutating requests must be JSON and same-origin. Together with the
// SameSite=Strict session cookie this blocks cross-site request forgery.
export const checkMutationRequest = (req) => {
  const type = req.headers.get('content-type') || '';
  if (!type.toLowerCase().startsWith('application/json')) {
    return json(415, { error: 'Expected application/json' });
  }
  return checkSameOrigin(req);
};

// Rejects requests whose Origin header names a different site.
export const checkSameOrigin = (req) => {
  const origin = req.headers.get('origin');
  if (origin) {
    let same = false;
    try {
      same = new URL(origin).host === new URL(req.url).host;
    } catch {
      same = false;
    }
    if (!same) return json(403, { error: 'Cross-origin request rejected' });
  }
  return null;
};

// Reads a JSON body, refusing anything larger than maxBytes.
export const readJsonBody = async (req, maxBytes) => {
  const text = await req.text();
  if (Buffer.byteLength(text, 'utf8') > maxBytes) {
    const err = new Error('Request body too large');
    err.status = 413;
    throw err;
  }
  try {
    return JSON.parse(text);
  } catch {
    const err = new Error('Invalid JSON');
    err.status = 400;
    throw err;
  }
};
