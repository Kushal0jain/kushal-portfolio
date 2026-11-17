import React, { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react';
import profile from '../data/profile';
import ui from '../data/ui';
import stats from '../data/stats';
import socials from '../data/socials';
import projects from '../data/projects';
import { skills } from '../data/skills';
import experience from '../data/experience';
import education from '../data/education';
import certifications from '../data/certifications';
import { applyAccent } from './accents';

// The bundled data files are the defaults. Content saved from the admin panel
// replaces them: list sections wholesale, object sections field by field.
export const DEFAULT_CONTENT = {
  profile, ui, stats, skills, experience, education, projects, certifications, socials,
};
export const OBJECT_KEYS = ['profile', 'ui'];
export const LIST_KEYS = ['stats', 'skills', 'experience', 'education', 'projects', 'certifications', 'socials'];

export const mergeContent = (saved) => {
  const merged = { ...DEFAULT_CONTENT };
  OBJECT_KEYS.forEach((key) => {
    merged[key] = { ...DEFAULT_CONTENT[key] };
  });
  if (!saved || typeof saved !== 'object') return merged;
  LIST_KEYS.forEach((key) => {
    if (Array.isArray(saved[key])) merged[key] = saved[key];
  });
  OBJECT_KEYS.forEach((key) => {
    const obj = saved[key];
    if (!obj || typeof obj !== 'object') return;
    Object.keys(DEFAULT_CONTENT[key]).forEach((field) => {
      if (field in obj) merged[key][field] = obj[field];
    });
  });
  return merged;
};

// On Netlify an edge function injects the saved content into the page
// (window.__PORTFOLIO_CONTENT__), so the first paint already shows it.
const injected = typeof window !== 'undefined' ? window.__PORTFOLIO_CONTENT__ : undefined;

const ContentContext = createContext(DEFAULT_CONTENT);

const setFavicon = (href) => {
  document.querySelectorAll('link[rel~="icon"]').forEach((el, i) => {
    if (i === 0) {
      el.setAttribute('href', href);
      el.removeAttribute('type');
    } else {
      el.remove();
    }
  });
};

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(() => mergeContent(injected));

  useEffect(() => {
    if (injected !== undefined) return undefined;
    // No injection (e.g. plain `npm start`): ask the API instead.
    const controller = new AbortController();
    fetch('/api/content', { signal: controller.signal, headers: { Accept: 'application/json' } })
      .then((res) => (res.ok && (res.headers.get('content-type') || '').includes('json') ? res.json() : null))
      .then((data) => {
        if (data?.content) setContent(mergeContent(data.content));
      })
      // No API or offline → keep the bundled defaults.
      .catch(() => {});
    return () => controller.abort();
  }, []);

  // Accent colour before paint, so there's no flash of the default colour.
  const { accent } = content.ui;
  useLayoutEffect(() => {
    applyAccent(accent);
  }, [accent]);

  // Tab title, search description and favicon follow the profile.
  const { siteTitle, siteDescription, favicon } = content.profile;
  useEffect(() => {
    if (siteTitle) document.title = siteTitle;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && siteDescription) meta.setAttribute('content', siteDescription);
    if (favicon && favicon !== DEFAULT_CONTENT.profile.favicon) setFavicon(favicon);
  }, [siteTitle, siteDescription, favicon]);

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
};

export const useContent = () => useContext(ContentContext);
