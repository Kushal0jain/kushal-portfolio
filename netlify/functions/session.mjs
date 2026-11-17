import { getConfig, getSession } from '../lib/auth.mjs';
import { json, methodNotAllowed } from '../lib/http.mjs';

// Tells the admin page whether the current browser is logged in.
export default async (req) => {
  if (req.method !== 'GET') return methodNotAllowed(['GET']);
  const { configured } = getConfig();
  const session = configured ? getSession(req) : null;
  return json(200, {
    configured,
    authenticated: Boolean(session),
    email: session?.sub || null,
    expiresAt: session ? session.exp * 1000 : null,
  });
};

export const config = { path: '/api/session' };
