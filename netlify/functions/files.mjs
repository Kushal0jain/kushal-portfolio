import { getSession } from '../lib/auth.mjs';
import { checkSameOrigin, json, methodNotAllowed } from '../lib/http.mjs';
import { KEY_PATTERN, fileUrl, uploadsStore } from '../lib/files.mjs';

// GET    /api/files        → admin: list uploaded files
// GET    /api/files/:key   → public: serve a file
// DELETE /api/files/:key   → admin: delete a file
export default async (req) => {
  // Parse the key from the path ourselves: anything after /api/files/ is a
  // key request (validated below), and only the bare path lists files.
  const rest = new URL(req.url).pathname.replace(/^\/api\/files\/?/, '');
  let key = null;
  if (rest) {
    try {
      key = decodeURIComponent(rest);
    } catch {
      return json(404, { error: 'Not found' });
    }
  }

  if (key === null) {
    if (req.method !== 'GET') return methodNotAllowed(['GET']);
    if (!getSession(req)) return json(401, { error: 'Your session has expired. Please log in again.' });
    const store = uploadsStore();
    const { blobs } = await store.list();
    const files = (
      await Promise.all(
        blobs.map(async ({ key: k }) => {
          const meta = await store.getMetadata(k);
          return meta ? { key: k, url: fileUrl(k), ...meta.metadata } : null;
        })
      )
    )
      .filter(Boolean)
      .sort((a, b) => String(b.uploadedAt).localeCompare(String(a.uploadedAt)));
    return json(200, { files });
  }

  if (!KEY_PATTERN.test(key)) return json(404, { error: 'Not found' });

  if (req.method === 'GET') {
    const entry = await uploadsStore().getWithMetadata(key, { type: 'arrayBuffer' });
    if (!entry) return json(404, { error: 'Not found' });
    const { contentType, name } = entry.metadata || {};
    // Only ever serve the types we accepted at upload time.
    const safeType = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'].includes(contentType)
      ? contentType
      : 'application/octet-stream';
    return new Response(entry.data, {
      status: 200,
      headers: {
        'Content-Type': safeType,
        'Content-Disposition': `inline; filename="${String(name || key).replace(/[^\x20-\x7e]|"/g, '_')}"`,
        'Cache-Control': 'public, max-age=3600',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  }

  if (req.method === 'DELETE') {
    const rejected = checkSameOrigin(req);
    if (rejected) return rejected;
    if (!getSession(req)) return json(401, { error: 'Your session has expired. Please log in again.' });
    await uploadsStore().delete(key);
    return json(200, { ok: true });
  }

  return methodNotAllowed(['GET', 'DELETE']);
};

export const config = { path: ['/api/files', '/api/files/:key'] };
