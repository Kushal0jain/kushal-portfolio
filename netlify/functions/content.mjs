import { getStore } from '@netlify/blobs';
import { getSession } from '../lib/auth.mjs';
import { checkMutationRequest, json, methodNotAllowed, readJsonBody } from '../lib/http.mjs';
import { validateContent } from '../lib/schema.mjs';

// GET  /api/content  → public; the saved portfolio content (or null if never saved)
// PUT  /api/content  → admin only; replaces the saved content

const KEY = 'content';
const store = () => getStore({ name: 'portfolio', consistency: 'strong' });

export default async (req) => {
  if (req.method === 'GET') {
    const saved = await store().getWithMetadata(KEY, { type: 'json' });
    return json(
      200,
      { content: saved?.data ?? null, updatedAt: saved?.metadata?.updatedAt ?? null },
      { 'Cache-Control': 'no-cache' }
    );
  }

  if (req.method === 'PUT') {
    const rejected = checkMutationRequest(req);
    if (rejected) return rejected;
    if (!getSession(req)) return json(401, { error: 'Your session has expired. Please log in again.' });

    let body;
    try {
      body = await readJsonBody(req, 256 * 1024);
    } catch (err) {
      return json(err.status || 400, { error: err.message });
    }

    const result = validateContent(body?.content);
    if (!result.ok) return json(400, { error: result.error });

    // Optimistic concurrency: the admin panel sends the updatedAt it loaded.
    // If someone saved since (another tab/browser), refuse unless force=true.
    // The conditional write makes check-and-save atomic.
    const conflict = (currentUpdatedAt) =>
      json(409, {
        error: 'These changes were saved from another tab or browser since you opened this page. Click Save again to overwrite them, or reload to see the latest version.',
        conflict: true,
        updatedAt: currentUpdatedAt,
      });

    const current = await store().getMetadata(KEY);
    const currentUpdatedAt = current?.metadata?.updatedAt ?? null;
    const force = body?.force === true;
    if (!force && body && 'baseUpdatedAt' in body && body.baseUpdatedAt !== currentUpdatedAt) {
      return conflict(currentUpdatedAt);
    }

    const updatedAt = new Date().toISOString();
    const condition = force ? {} : current ? { onlyIfMatch: current.etag } : { onlyIfNew: true };
    const write = await store().setJSON(KEY, result.content, { metadata: { updatedAt }, ...condition });
    if (write && write.modified === false) return conflict(currentUpdatedAt);
    return json(200, { ok: true, content: result.content, updatedAt });
  }

  return methodNotAllowed(['GET', 'PUT']);
};

export const config = { path: '/api/content' };
