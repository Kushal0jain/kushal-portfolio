import { getStore } from '@netlify/blobs';
import { checkCredentials, createSessionToken, getConfig, sessionCookie } from '../lib/auth.mjs';
import { checkMutationRequest, json, methodNotAllowed, readJsonBody } from '../lib/http.mjs';
import { reserveAttempt } from '../lib/rateLimit.mjs';

export default async (req, context) => {
  if (req.method !== 'POST') return methodNotAllowed(['POST']);
  const rejected = checkMutationRequest(req);
  if (rejected) return rejected;

  const cfg = getConfig();
  if (!cfg.configured) {
    return json(503, { error: 'Admin login is not configured on the server (missing environment variables).' });
  }

  let body;
  try {
    body = await readJsonBody(req, 4 * 1024);
  } catch (err) {
    return json(err.status || 400, { error: err.message });
  }

  const store = getStore({ name: 'admin-security', consistency: 'strong' });
  const key = `login-attempts/${context.ip || 'unknown'}`;
  const retryAfter = await reserveAttempt(store, key);
  if (retryAfter) {
    return json(
      429,
      { error: `Too many failed attempts. Try again in ${Math.ceil(retryAfter / 60)} minute(s).` },
      { 'Retry-After': String(retryAfter) }
    );
  }

  if (!checkCredentials(body?.email, body?.password)) {
    return json(401, { error: 'Incorrect email or password.' });
  }

  // Successful login clears the failure count for this IP.
  await store.delete(key);
  return json(
    200,
    { ok: true, email: cfg.email },
    { 'Set-Cookie': sessionCookie(createSessionToken(cfg.email)) }
  );
};

export const config = { path: '/api/login' };
