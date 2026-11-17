// Brute-force protection for the admin login: at most MAX_ATTEMPTS login
// attempts per key (client IP) per window. A successful login clears the key.

export const MAX_ATTEMPTS = 5;
export const WINDOW_MS = 15 * 60 * 1000;

// Atomically claims one attempt slot *before* the password is checked, using
// Netlify Blobs conditional writes (onlyIfNew / onlyIfMatch) so parallel
// requests can't all read the same count and slip through.
// Returns 0 if the attempt is allowed, otherwise seconds until retry.
export const reserveAttempt = async (store, key, now = () => Date.now()) => {
  for (let tries = 0; tries < 8; tries += 1) {
    const t = now();
    const current = await store.getWithMetadata(key, { type: 'json' });
    let state = current?.data;
    if (!state || typeof state.count !== 'number' || t - state.first > WINDOW_MS) {
      state = { count: 0, first: t };
    }
    if (state.count >= MAX_ATTEMPTS) return Math.max(1, Math.ceil((state.first + WINDOW_MS - t) / 1000));
    const res = await store.setJSON(
      key,
      { count: state.count + 1, first: state.first },
      current ? { onlyIfMatch: current.etag } : { onlyIfNew: true }
    );
    if (res.modified) return 0;
  }
  return 60; // Heavy contention on this key: fail closed.
};
