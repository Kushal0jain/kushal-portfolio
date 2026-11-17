import { getSession } from '../lib/auth.mjs';
import { checkSameOrigin, json, methodNotAllowed } from '../lib/http.mjs';
import {
  MAX_UPLOAD_BYTES, cleanDisplayName, detectType, fileUrl, makeKey, uploadsStore,
} from '../lib/files.mjs';

// POST /api/upload — admin only. Body is the raw file; the original file
// name is sent URL-encoded in the X-File-Name header.
export default async (req) => {
  if (req.method !== 'POST') return methodNotAllowed(['POST']);
  // X-File-Name is a custom header, so a cross-site page can't send this
  // request without a CORS preflight; also require a same-origin Origin.
  const rejected = checkSameOrigin(req);
  if (rejected) return rejected;
  const rawName = req.headers.get('x-file-name');
  if (!rawName) return json(400, { error: 'Missing file name' });
  if (!getSession(req)) return json(401, { error: 'Your session has expired. Please log in again.' });

  const declared = Number(req.headers.get('content-length') || 0);
  if (declared > MAX_UPLOAD_BYTES) return json(413, { error: `Files must be ${MAX_UPLOAD_BYTES / 1024 / 1024} MB or smaller.` });

  const bytes = new Uint8Array(await req.arrayBuffer());
  if (bytes.length === 0) return json(400, { error: 'The file is empty.' });
  if (bytes.length > MAX_UPLOAD_BYTES) return json(413, { error: `Files must be ${MAX_UPLOAD_BYTES / 1024 / 1024} MB or smaller.` });

  const detected = detectType(bytes);
  if (!detected) return json(415, { error: 'Only PDF, JPG, PNG and WebP files can be uploaded.' });

  let name;
  try {
    name = cleanDisplayName(decodeURIComponent(rawName));
  } catch {
    name = 'file';
  }

  const key = makeKey(name, detected.ext);
  const metadata = {
    name,
    contentType: detected.type,
    size: bytes.length,
    uploadedAt: new Date().toISOString(),
  };
  await uploadsStore().set(key, bytes, { metadata });

  return json(201, { ok: true, key, url: fileUrl(key), ...metadata });
};

export const config = { path: '/api/upload' };
