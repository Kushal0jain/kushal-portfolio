// Validates and normalises portfolio content before it is stored.
// Unknown fields are dropped; anything malformed is rejected with a message.

const MAX_ITEMS = 50;

const text = (max, { required = false } = {}) => ({ kind: 'text', max, required });
const lines = (maxLines, maxLen) => ({ kind: 'lines', maxLines, maxLen });
const link = ({ required = false, mailto = false } = {}) => ({ kind: 'link', max: 500, required, mailto });
const email = () => ({ kind: 'email', max: 120 });
const digits = (min, max) => ({ kind: 'digits', min, max });
const oneOf = (values, { required = true } = {}) => ({ kind: 'oneOf', values, required });
const bool = () => ({ kind: 'bool' });

export const STAT_ICONS = ['briefcase', 'code', 'building', 'graduation', 'award', 'users', 'star', 'rocket', 'heart', 'globe'];
export const SOCIAL_PLATFORMS = ['linkedin', 'github', 'email', 'instagram', 'whatsapp', 'x', 'youtube', 'facebook', 'website', 'other'];
export const ACCENTS = ['teal', 'blue', 'indigo', 'violet', 'emerald', 'rose'];

// Interface text: field → max length.
const UI_TEXT = {
  navAbout: 40, navSkills: 40, navExperience: 40, navEducation: 40, navProjects: 40, navCertifications: 40, navContact: 40,
  heroGreeting: 60, heroPrimaryCta: 40, heroResumeCta: 40,
  aboutEyebrow: 60, aboutTitle: 80, aboutPrimaryCta: 40, aboutResumeCta: 40, strengthsLabel: 60, currentlyAtLabel: 40,
  skillsEyebrow: 60, skillsTitle: 80,
  experienceEyebrow: 60, experienceTitle: 80, currentBadge: 30, previousBadge: 30,
  educationEyebrow: 60, educationTitle: 80,
  projectsEyebrow: 60, projectsTitle: 80, projectsEmpty: 120,
  certificationsEyebrow: 60, certificationsTitle: 80, certificateLinkLabel: 40,
  contactEyebrow: 60, contactTitle: 80, contactIntro: 300, contactInfoHeading: 80,
  emailLabel: 30, phoneLabel: 30, locationLabel: 30,
  whatsappCta: 40, whatsappGreeting: 200, formHeading: 80,
  namePlaceholder: 60, emailPlaceholder: 60, otherDomainLabel: 30, customEmailPlaceholder: 80, messagePlaceholder: 80,
  sendWhatsappLabel: 40, sendEmailLabel: 40, successWhatsapp: 160, successEmail: 160,
  quickLinksHeading: 40, connectHeading: 40, copyright: 160, builtWith: 160,
};
const UI_BOOLS = ['showAbout', 'showSkills', 'showExperience', 'showEducation', 'showProjects', 'showCertifications', 'showContact'];

// Single-object sections.
export const OBJECTS = {
  profile: {
    name: text(80, { required: true }),
    availability: text(40),
    role: text(80),
    intro: text(400),
    photo: link(),
    resume: link(),
    aboutParagraphs: lines(8, 1200),
    strengths: lines(16, 60),
    email: email(),
    phone: text(40),
    location: text(120),
    whatsapp: digits(8, 15),
    footerTagline: text(300),
    favicon: link(),
    siteTitle: text(120),
    siteDescription: text(300),
  },
  ui: {
    accent: oneOf(ACCENTS),
    defaultTheme: oneOf(['dark', 'light']),
    emailDomains: lines(10, 60),
    ...Object.fromEntries(Object.entries(UI_TEXT).map(([k, max]) => [k, text(max)])),
    ...Object.fromEntries(UI_BOOLS.map((k) => [k, bool()])),
  },
};

// List sections.
export const SECTIONS = {
  stats: {
    value: text(20, { required: true }),
    label: text(60, { required: true }),
    icon: oneOf(STAT_ICONS),
  },
  skills: {
    name: text(60, { required: true }),
    level: text(40),
    icon: text(40),
    description: lines(6, 500),
  },
  experience: {
    role: text(120, { required: true }),
    company: text(120, { required: true }),
    duration: text(80),
    location: text(80),
    description: lines(12, 500),
  },
  education: {
    degree: text(160, { required: true }),
    institution: text(160),
    year: text(80),
    grade: text(40),
  },
  projects: {
    title: text(120, { required: true }),
    category: text(40),
    techStack: text(300),
    description: lines(10, 500),
    link: link(),
  },
  certifications: {
    title: text(160, { required: true }),
    issuer: text(120),
    year: text(20),
    link: link(),
  },
  socials: {
    platform: oneOf(SOCIAL_PLATFORMS),
    url: link({ required: true, mailto: true }),
  },
};

// Only http(s) URLs or site-relative paths — never javascript:, data:, etc.
const SAFE_LINK = /^(https?:\/\/[^\s]+|\/(?!\/)[^\s]*)$/i;
const MAILTO = /^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/i;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

class ValidationError extends Error {}

const fail = (msg) => {
  throw new ValidationError(msg);
};

const cleanField = (value, rule, where) => {
  if (rule.kind === 'lines') {
    if (value == null) return [];
    if (!Array.isArray(value)) fail(`${where} must be a list`);
    const out = value
      .map((line) => (typeof line === 'string' ? line.trim() : fail(`${where} must contain text`)))
      .filter(Boolean);
    if (out.length > rule.maxLines) fail(`${where} has more than ${rule.maxLines} lines`);
    out.forEach((line) => line.length > rule.maxLen && fail(`${where} has a line over ${rule.maxLen} characters`));
    return out;
  }

  if (rule.kind === 'bool') {
    if (typeof value !== 'boolean') fail(`${where} must be true or false`);
    return value;
  }

  if (value == null) value = '';
  if (typeof value !== 'string') fail(`${where} must be text`);
  const v = value.trim();

  if (rule.kind === 'oneOf') {
    if (!rule.values.includes(v)) fail(`${where} must be one of: ${rule.values.join(', ')}`);
    return v;
  }
  if (rule.kind === 'digits') {
    const d = v.replace(/[\s+()-]/g, '');
    if (d && !/^\d+$/.test(d)) fail(`${where} must contain only digits`);
    if (d && (d.length < rule.min || d.length > rule.max)) fail(`${where} must be ${rule.min}–${rule.max} digits`);
    return d;
  }

  if (rule.required && !v) fail(`${where} is required`);
  if (v.length > rule.max) fail(`${where} is longer than ${rule.max} characters`);
  if (rule.kind === 'email' && v && !EMAIL.test(v)) fail(`${where} must be a valid email address`);
  if (rule.kind === 'link' && v && !SAFE_LINK.test(v) && !(rule.mailto && MAILTO.test(v))) {
    fail(`${where} must start with http://, https://${rule.mailto ? ', mailto:' : ''} or /`);
  }
  return v;
};

const cleanObject = (obj, fields, where) => {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) fail(`${where} is invalid`);
  const clean = {};
  for (const [key, rule] of Object.entries(fields)) {
    clean[key] = cleanField(obj[key], rule, `${where} → ${key}`);
  }
  return clean;
};

export const validateContent = (input) => {
  try {
    if (!input || typeof input !== 'object' || Array.isArray(input)) fail('Content must be an object');
    const out = {};
    for (const [section, fields] of Object.entries(OBJECTS)) {
      out[section] = cleanObject(input[section], fields, section);
    }
    for (const [section, fields] of Object.entries(SECTIONS)) {
      const items = input[section];
      if (!Array.isArray(items)) fail(`"${section}" must be a list`);
      if (items.length > MAX_ITEMS) fail(`"${section}" has more than ${MAX_ITEMS} items`);
      out[section] = items.map((item, i) => cleanObject(item, fields, `${section} #${i + 1}`));
    }
    return { ok: true, content: out };
  } catch (err) {
    if (err instanceof ValidationError) return { ok: false, error: err.message };
    throw err;
  }
};
