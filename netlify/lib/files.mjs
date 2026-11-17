// Shared helpers for uploaded files (stored in the "uploads" Netlify Blobs store).
import { getStore } from '@netlify/blobs';
import { randomBytes } from 'node:crypto';

// Netlify Functions accept request bodies up to ~6 MB; leave headroom.
export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

export const uploadsStore = () => getStore({ name: 'uploads', consistency: 'strong' });

// Key format: 16 hex chars + "-" + sanitised file name. Validated on every read.
export const KEY_PATTERN = /^[a-f0-9]{16}-[A-Za-z0-9._-]{1,80}$/;

export const fileUrl = (key) => `/api/files/${key}`;

// Identify the type from the file's first bytes — never trust the name or
// the browser-supplied Content-Type. SVG/HTML are deliberately not allowed.
export const detectType = (bytes) => {
  const b = bytes.subarray(0, 12);
  const ascii = (start, end) => String.fromCharCode(...b.subarray(start, end));
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return { type: 'image/jpeg', ext: 'jpg' };
  if (b[0] === 0x89 && ascii(1, 4) === 'PNG') return { type: 'image/png', ext: 'png' };
  if (ascii(0, 4) === 'RIFF' && ascii(8, 12) === 'WEBP') return { type: 'image/webp', ext: 'webp' };
  if (ascii(0, 5) === '%PDF-') return { type: 'application/pdf', ext: 'pdf' };
  return null;
};

// "My Resume (final).PDF" + "pdf" → "My-Resume-final.pdf"
export const makeKey = (originalName, ext) => {
  const base = String(originalName || 'file')
    .replace(/\.[^.]*$/, '')
    .normalize('NFKD')
    .replace(/[^A-Za-z0-9._-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^[-.]+|[-.]+$/g, '')
    .slice(0, 60) || 'file';
  return `${randomBytes(8).toString('hex')}-${base}.${ext}`;
};

// Display name, kept short and free of control characters.
export const cleanDisplayName = (name) =>
  String(name || 'file').replace(/[\u0000-\u001f\u007f"\\]/g, '').slice(0, 120) || 'file';
