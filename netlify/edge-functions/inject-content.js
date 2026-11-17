// Injects the saved portfolio content into the home page HTML, so visitors
// see edited content on first paint (no flash of the built-in defaults), and
// the <title>, meta description and photo preload match the admin settings —
// which also makes them right for search engines and link previews.
import { getStore } from '@netlify/blobs';

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

// JSON that is safe inside a <script> element.
const scriptJson = (value) =>
  JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(new RegExp(String.fromCharCode(0x2028), 'g'), '\\u2028')
    .replace(new RegExp(String.fromCharCode(0x2029), 'g'), '\\u2029');

const SAFE_URL = /^(https?:\/\/[^\s"'<>]+|\/(?!\/)[^\s"'<>]*)$/i;

export default async (request, context) => {
  const response = await context.next();
  if (!(response.headers.get('content-type') || '').includes('text/html')) return response;

  let saved = null;
  try {
    saved = await getStore('portfolio').get('content', { type: 'json' });
  } catch {
    return response; // Store unavailable: the page falls back to fetching /api/content.
  }

  let html = await response.text();
  const profile = saved?.profile || {};

  // Every replacement uses a function: with a plain replacement string,
  // "$$", "$&", "$'" etc. in saved content would be expanded by replace().
  if (profile.siteTitle) {
    html = html.replace(/<title>[\s\S]*?<\/title>/i, () => `<title>${escapeHtml(profile.siteTitle)}</title>`);
  }
  if (profile.siteDescription) {
    html = html.replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
      () => `<meta name="description" content="${escapeHtml(profile.siteDescription)}"/>`
    );
  }
  if (profile.favicon && profile.favicon !== '/favicon.svg' && SAFE_URL.test(profile.favicon)) {
    html = html
      .replace(/<link\s+rel="icon"[^>]*>/i, () => `<link rel="icon" href="${escapeHtml(profile.favicon)}"/>`)
      .replace(/<link\s+rel="alternate icon"[^>]*>/i, () => '');
  }
  if (profile.photo && SAFE_URL.test(profile.photo)) {
    html = html.replace(
      /(<link\s+rel="preload"\s+as="image"\s+href=")[^"]*(")/i,
      (m, start, end) => `${start}${escapeHtml(profile.photo)}${end}`
    );
  }

  // null tells the page "no saved content" so it doesn't need to ask again.
  const script = `<script>window.__PORTFOLIO_CONTENT__=${scriptJson(saved)}</script>`;
  html = html.replace('</head>', () => `${script}</head>`);

  // The body was decoded by response.text(), so drop encoding/length headers
  // or the browser would try to gunzip plain text.
  const headers = new Headers(response.headers);
  headers.delete('content-encoding');
  headers.delete('content-length');
  headers.delete('etag');
  headers.set('cache-control', 'public, max-age=0, must-revalidate');
  return new Response(html, { status: response.status, statusText: response.statusText, headers });
};

export const config = {
  path: ['/', '/index.html'],
  onError: 'bypass',
};
