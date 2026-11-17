import { clearedSessionCookie } from '../lib/auth.mjs';
import { checkMutationRequest, json, methodNotAllowed } from '../lib/http.mjs';

export default async (req) => {
  if (req.method !== 'POST') return methodNotAllowed(['POST']);
  const rejected = checkMutationRequest(req);
  if (rejected) return rejected;
  return json(200, { ok: true }, { 'Set-Cookie': clearedSessionCookie() });
};

export const config = { path: '/api/logout' };
