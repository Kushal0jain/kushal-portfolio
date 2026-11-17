// Admin authentication: scrypt password check + HMAC-signed session cookie.
//
// Required environment variables (set them in Netlify → Site configuration →
// Environment variables, and in a local .env for `netlify dev`):
//   ADMIN_EMAIL           the admin login email
//   ADMIN_PASSWORD_HASH   output of `npm run admin:set-password`
//   ADMIN_SESSION_SECRET  long random string used to sign session cookies

import { createHmac, scryptSync, timingSafeEqual } from 'node:crypto';

export const SESSION_COOKIE = 'admin_session';
export const SESSION_TTL_SECONDS = 12 * 60 * 60; // 12 hours

const SCRYPT_PARAMS = { N: 16384, r: 8, p: 1, maxmem: 64 * 1024 * 1024 };
const KEY_LENGTH = 64;

export const getConfig = () => {
  const email = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  const passwordHash = (process.env.ADMIN_PASSWORD_HASH || '').trim();
  const secret = process.env.ADMIN_SESSION_SECRET || '';
  const configured = Boolean(email && passwordHash.startsWith('scrypt:') && secret.length >= 32);
  return { email, passwordHash, secret, configured };
};

const safeEqual = (a, b) => {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) {
    // Compare against itself so the timing doesn't reveal the length mismatch.
    timingSafeEqual(bufA, bufA);
    return false;
  }
  return timingSafeEqual(bufA, bufB);
};

// Stored format: scrypt:<salt hex>:<derived key hex>
export const verifyPassword = (password, stored) => {
  const [scheme, saltHex, keyHex] = String(stored).split(':');
  if (scheme !== 'scrypt' || !saltHex || !keyHex) return false;
  const expected = Buffer.from(keyHex, 'hex');
  const actual = scryptSync(String(password), Buffer.from(saltHex, 'hex'), expected.length || KEY_LENGTH, SCRYPT_PARAMS);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
};

// Always runs the (slow) password check, even for a wrong email, so response
// time doesn't reveal whether the email was right.
export const checkCredentials = (email, password) => {
  const cfg = getConfig();
  const emailOk = safeEqual(String(email || '').trim().toLowerCase(), cfg.email);
  const passwordOk = verifyPassword(password || '', cfg.passwordHash);
  return emailOk && passwordOk;
};

const sign = (payload, secret) => createHmac('sha256', secret).update(payload).digest('base64url');

export const createSessionToken = (email) => {
  const { secret } = getConfig();
  const payload = Buffer.from(
    JSON.stringify({ sub: email, exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS })
  ).toString('base64url');
  return `${payload}.${sign(payload, secret)}`;
};

export const verifySessionToken = (token) => {
  const { secret, email } = getConfig();
  if (!token || !secret) return null;
  const [payload, signature] = token.split('.');
  if (!payload || !signature || !safeEqual(signature, sign(payload, secret))) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (typeof data.exp !== 'number' || data.exp < Date.now() / 1000) return null;
    // A changed ADMIN_EMAIL invalidates existing sessions.
    if (data.sub !== email) return null;
    return data;
  } catch {
    return null;
  }
};

const readCookie = (req, name) => {
  const header = req.headers.get('cookie') || '';
  for (const part of header.split(';')) {
    const idx = part.indexOf('=');
    if (idx === -1) continue;
    if (part.slice(0, idx).trim() === name) return decodeURIComponent(part.slice(idx + 1).trim());
  }
  return null;
};

export const getSession = (req) => verifySessionToken(readCookie(req, SESSION_COOKIE));

export const sessionCookie = (token) =>
  `${SESSION_COOKIE}=${encodeURIComponent(token)}; Path=/api; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_TTL_SECONDS}`;

export const clearedSessionCookie = () =>
  `${SESSION_COOKIE}=; Path=/api; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;
