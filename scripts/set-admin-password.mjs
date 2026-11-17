#!/usr/bin/env node
// Sets the admin login for the portfolio admin panel.
//
//   npm run admin:set-password -- <email> <password>
//
// Writes ADMIN_EMAIL, ADMIN_PASSWORD_HASH and a fresh ADMIN_SESSION_SECRET to
// .env (git-ignored) for local `netlify dev`, and prints the same values so
// they can be added in Netlify → Site configuration → Environment variables.
// The plain-text password is never stored anywhere — only its scrypt hash.

import { randomBytes, scryptSync } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const [email, password = process.env.ADMIN_PASSWORD] = process.argv.slice(2);

if (!email || !password) {
  console.error('Usage: npm run admin:set-password -- <email> <password>');
  process.exit(1);
}
if (password.length < 8) {
  console.error('Password must be at least 8 characters.');
  process.exit(1);
}

const salt = randomBytes(16);
const key = scryptSync(password, salt, 64, { N: 16384, r: 8, p: 1, maxmem: 64 * 1024 * 1024 });

const values = {
  ADMIN_EMAIL: email.trim().toLowerCase(),
  ADMIN_PASSWORD_HASH: `scrypt:${salt.toString('hex')}:${key.toString('hex')}`,
  ADMIN_SESSION_SECRET: randomBytes(48).toString('base64url'),
};

const envPath = resolve(process.cwd(), '.env');
const kept = existsSync(envPath)
  ? readFileSync(envPath, 'utf8')
      .split(/\r?\n/)
      .filter((line) => line && !Object.keys(values).some((k) => line.startsWith(`${k}=`)))
  : [];
const out = [...kept, ...Object.entries(values).map(([k, v]) => `${k}=${v}`)].join('\n') + '\n';
writeFileSync(envPath, out);

console.log(`Updated ${envPath}\n`);
console.log('Add these three environment variables to your Netlify site (Site configuration → Environment variables):\n');
for (const [k, v] of Object.entries(values)) console.log(`${k}=${v}`);
console.log('\nA new ADMIN_SESSION_SECRET logs out any existing admin sessions.');
