import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { api, ApiError } from './api';
import Login from './Login';
import Dashboard from './Dashboard';
import { SECTIONS, LIST_SECTION_KEYS, OBJECT_SECTION_KEYS, findError, sectionFields, cleanValue } from './sections';
import { DEFAULT_CONTENT, mergeContent } from '../content/ContentContext';

const SECTION_KEYS = Object.keys(SECTIONS);
// Server accepts up to 256 KB per save (content.mjs); leave room for the wrapper.
const MAX_SAVE_KB = 250;

// Editor-only ids so list items keep stable React keys while reordering.
// They are stripped before saving.
let idCounter = 0;
const newId = () => `item-${(idCounter += 1)}`;
const withIds = (content) => ({
  ...Object.fromEntries(OBJECT_SECTION_KEYS.map((k) => [k, { ...content[k] }])),
  ...Object.fromEntries(LIST_SECTION_KEYS.map((k) => [k, content[k].map((item) => ({ ...item, _id: newId() }))])),
});

const cleanItem = (sectionKey, item) =>
  Object.fromEntries(sectionFields(sectionKey).map((f) => [f.key, cleanValue(f, item[f.key])]));

const toSavable = (draft) => ({
  ...Object.fromEntries(OBJECT_SECTION_KEYS.map((k) => [k, cleanItem(k, draft[k])])),
  ...Object.fromEntries(LIST_SECTION_KEYS.map((k) => [k, draft[k].map((item) => cleanItem(k, item))])),
});

// Where in the draft a URL is used, e.g. ["Profile → Resume (PDF)", "Certifications #2"].
const usageOf = (draft, url) => {
  if (!draft || !url) return [];
  const found = [];
  SECTION_KEYS.forEach((k) => {
    const cfg = SECTIONS[k];
    const fields = sectionFields(k);
    if (cfg.kind === 'object') {
      fields.forEach((f) => {
        if (draft[k][f.key] === url) found.push(`${cfg.label} → ${f.label}`);
      });
    } else {
      draft[k].forEach((item, i) => {
        if (fields.some((f) => item[f.key] === url)) found.push(`${cfg.label} #${i + 1}`);
      });
    }
  });
  return found;
};

const Centered = ({ children }) => (
  <div className="flex min-h-screen items-center justify-center px-4 text-center">{children}</div>
);

const AdminApp = () => {
  const [status, setStatus] = useState('loading'); // loading | login | ready | unavailable | unconfigured
  const [fatal, setFatal] = useState('');
  const [email, setEmail] = useState('');
  const [loginNotice, setLoginNotice] = useState('');
  const [draft, setDraft] = useState(null);
  const [savedJson, setSavedJson] = useState('');
  const [updatedAt, setUpdatedAt] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [tab, setTab] = useState(SECTION_KEYS[0]);
  const [openId, setOpenId] = useState(null);
  // Set after a 409: the next Save overwrites the newer version on purpose.
  const [conflict, setConflict] = useState(false);
  const messageTimer = useRef();

  const dirty = useMemo(() => Boolean(draft) && JSON.stringify(toSavable(draft)) !== savedJson, [draft, savedJson]);

  // Page setup: dark theme, no indexing, tab title.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.title = 'Admin · Portfolio';
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  // Warn before leaving with unsaved edits.
  useEffect(() => {
    if (!dirty) return undefined;
    const handler = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [dirty]);

  const flash = (msg) => {
    clearTimeout(messageTimer.current);
    setMessage(msg);
    if (msg?.type === 'success') messageTimer.current = setTimeout(() => setMessage(null), 4000);
  };

  const applyServerContent = useCallback((content, at) => {
    const merged = mergeContent(content);
    setDraft(withIds(merged));
    setSavedJson(JSON.stringify(toSavable(merged)));
    setUpdatedAt(at);
  }, []);

  const loadContent = useCallback(async () => {
    const data = await api.getContent();
    applyServerContent(data.content, data.updatedAt);
  }, [applyServerContent]);

  useEffect(() => {
    (async () => {
      try {
        const s = await api.session();
        if (!s.configured) return setStatus('unconfigured');
        if (!s.authenticated) return setStatus('login');
        setEmail(s.email);
        await loadContent();
        setStatus('ready');
      } catch (err) {
        setFatal(err.message);
        setStatus('unavailable');
      }
    })();
  }, [loadContent]);

  const handleLogin = async (loginEmail, password) => {
    const res = await api.login(loginEmail, password);
    setEmail(res.email);
    setLoginNotice('');
    // After a session timeout, keep the unsaved draft instead of reloading.
    if (!draft) await loadContent();
    setStatus('ready');
  };

  const handleLogout = async () => {
    if (dirty && !window.confirm('You have unsaved changes. Log out anyway and lose them?')) return;
    try {
      await api.logout();
    } catch {
      // The cookie expires on its own; nothing else to do.
    }
    setDraft(null);
    setMessage(null);
    setStatus('login');
  };

  const handleSave = async () => {
    const problem = findError(draft);
    if (problem) {
      setTab(problem.section);
      setOpenId(problem.index === null ? null : draft[problem.section][problem.index]._id);
      flash({ type: 'error', text: problem.message });
      return;
    }
    const payload = toSavable(draft);
    const kb = Math.ceil(new Blob([JSON.stringify({ content: payload })]).size / 1024);
    if (kb > MAX_SAVE_KB) {
      flash({ type: 'error', text: `Your content is ${kb} KB; the limit is ${MAX_SAVE_KB} KB. Shorten some descriptions or remove items.` });
      return;
    }
    setSaving(true);
    try {
      const res = await api.saveContent(payload, { baseUpdatedAt: updatedAt, force: conflict });
      applyServerContent(res.content, res.updatedAt);
      setConflict(false);
      setOpenId(null);
      flash({ type: 'success', text: 'Saved. Changes appear on the site within about a minute.' });
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        setLoginNotice('Your session expired. Sign in again — your unsaved edits are kept.');
        setStatus('login');
      } else if (err instanceof ApiError && err.status === 409) {
        setConflict(true);
        flash({ type: 'error', text: err.message });
      } else {
        flash({ type: 'error', text: err.message });
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDiscard = () => {
    if (!window.confirm('Discard all unsaved changes?')) return;
    setDraft(withIds(JSON.parse(savedJson)));
    setOpenId(null);
    setMessage(null);
  };

  const handleResetDefaults = () => {
    setDraft(withIds(DEFAULT_CONTENT));
    setOpenId(null);
    flash({ type: 'success', text: 'Built-in content loaded. Save to publish it.' });
  };

  const setSection = (key, items) => {
    setDraft((d) => ({ ...d, [key]: items }));
    if (message?.type === 'error') setMessage(null);
  };

  if (status === 'loading') {
    return (
      <Centered>
        <p className="text-sm text-slate-500">Loading…</p>
      </Centered>
    );
  }

  if (status === 'unavailable' || status === 'unconfigured') {
    return (
      <Centered>
        <div className="max-w-md rounded-2xl border border-white/[.08] bg-white/[.03] p-7">
          <FiAlertCircle className="mx-auto mb-3 text-amber-400" size={28} />
          <h1 className="mb-2 text-lg font-bold text-white">
            {status === 'unconfigured' ? 'Admin login is not set up' : 'Admin unavailable'}
          </h1>
          <p className="text-sm leading-relaxed text-slate-400">
            {status === 'unconfigured'
              ? 'Set ADMIN_EMAIL, ADMIN_PASSWORD_HASH and ADMIN_SESSION_SECRET in the Netlify environment variables (generate them with "npm run admin:set-password"), then redeploy.'
              : fatal}
          </p>
          <a href="/" className="mt-5 inline-block text-sm text-teal-400 hover:underline">
            ← Back to portfolio
          </a>
        </div>
      </Centered>
    );
  }

  if (status === 'login') return <Login onLogin={handleLogin} notice={loginNotice} />;

  return (
    <Dashboard
      email={email}
      draft={draft}
      setSection={setSection}
      newId={newId}
      dirty={dirty}
      saving={saving}
      message={message}
      onSave={handleSave}
      onDiscard={handleDiscard}
      onResetDefaults={handleResetDefaults}
      onLogout={handleLogout}
      updatedAt={updatedAt}
      tab={tab}
      setTab={(t) => {
        setTab(t);
        setOpenId(null);
      }}
      findUsage={(url) => usageOf(draft, url)}
      openId={openId}
      setOpenId={setOpenId}
    />
  );
};

export default AdminApp;
