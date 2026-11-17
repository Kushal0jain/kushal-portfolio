// Field definitions for each editable section. Keep the limits in step with
// netlify/lib/schema.mjs, which is what the server actually enforces.
import { STAT_ICONS, SOCIAL_PLATFORMS } from '../content/icons';
import { ACCENTS, THEMES } from '../content/accents';

const options = (map) => Object.entries(map).map(([value, { label }]) => ({ value, label }));

// Shorthand for the many interface-text fields (limits match schema.mjs UI_TEXT).
const t = (key, label, max, extra = {}) => ({ key, label, type: 'text', max, ...extra });
const show = (key, label) => ({ key, label, type: 'toggle', wide: true });
const TEMPLATE_HINT = '{name}, {firstName} and {year} are filled in automatically.';

const EMPHASIS_HINT = 'Wrap words in **double asterisks** to highlight them.';
const IMAGE_TYPES = 'image/jpeg,image/png,image/webp';
const DOC_TYPES = 'application/pdf,image/jpeg,image/png,image/webp';

export const SECTIONS = {
  profile: {
    kind: 'object',
    label: 'Profile',
    description: 'Your name, intro, bio, contact details and how the site appears in search results.',
    groups: [
      {
        title: 'Hero',
        fields: [
          { key: 'name', label: 'Name', type: 'text', required: true, max: 80 },
          { key: 'role', label: 'Title / role', type: 'text', max: 80, placeholder: 'Frontend Developer' },
          { key: 'availability', label: 'Status label', type: 'text', max: 40, placeholder: 'Open to Work', hint: 'Small label above your name. Leave empty to hide it.' },
          { key: 'intro', label: 'Intro line', type: 'textarea', max: 400, hint: EMPHASIS_HINT, wide: true },
          { key: 'photo', label: 'Profile photo', type: 'link', max: 500, upload: IMAGE_TYPES, hint: 'Upload a square photo (JPG, PNG or WebP), or paste a link.' },
          { key: 'resume', label: 'Resume (PDF)', type: 'link', max: 500, upload: 'application/pdf', hint: 'Used by the "Download Resume" buttons. Leave empty to hide them.' },
        ],
      },
      {
        title: 'About',
        fields: [
          { key: 'aboutParagraphs', label: 'Bio paragraphs', type: 'lines', maxLines: 8, maxLen: 1200, hint: `One paragraph per line. ${EMPHASIS_HINT}`, rows: 10 },
          { key: 'strengths', label: 'Core strengths', type: 'lines', maxLines: 16, maxLen: 60, hint: 'One per line.' },
        ],
      },
      {
        title: 'Contact',
        fields: [
          { key: 'email', label: 'Email', type: 'email', max: 120 },
          { key: 'phone', label: 'Phone (as displayed)', type: 'text', max: 40, placeholder: '+91 77270 12340' },
          { key: 'location', label: 'Location', type: 'text', max: 120 },
          { key: 'whatsapp', label: 'WhatsApp number', type: 'digits', min: 8, max: 15, placeholder: '917727012340', hint: 'With country code, digits only. The contact form sends to this number; leave empty to send by email instead.' },
        ],
      },
      {
        title: 'Footer',
        fields: [
          { key: 'footerTagline', label: 'Footer tagline', type: 'textarea', max: 300, wide: true },
        ],
      },
      {
        title: 'Search & sharing',
        fields: [
          { key: 'favicon', label: 'Site icon (favicon)', type: 'link', max: 500, upload: IMAGE_TYPES, hint: 'A square PNG works best (at least 64×64).' },
          { key: 'siteTitle', label: 'Browser tab title', type: 'text', max: 120, wide: true },
          { key: 'siteDescription', label: 'Description', type: 'textarea', max: 300, wide: true, hint: 'Shown by Google and in link previews.' },
        ],
      },
    ],
  },
  ui: {
    kind: 'object',
    label: 'Site text & layout',
    description: 'Every heading, label and button on the site, which sections are shown, and the colour scheme. Leave a text field empty to hide it.',
    groups: [
      {
        title: 'Look',
        fields: [
          { key: 'accent', label: 'Accent colour', type: 'select', options: options(ACCENTS), swatch: true },
          { key: 'defaultTheme', label: 'Default theme', type: 'select', options: options(THEMES), hint: 'Visitors can still switch; their choice is remembered.' },
        ],
      },
      {
        title: 'Menu labels',
        fields: [
          t('navAbout', 'About', 40), t('navSkills', 'Skills', 40), t('navExperience', 'Experience', 40),
          t('navEducation', 'Education', 40), t('navProjects', 'Projects', 40), t('navCertifications', 'Certifications', 40),
          t('navContact', 'Contact', 40),
        ],
      },
      {
        title: 'Hero',
        fields: [
          t('heroGreeting', 'Greeting above your name', 60, { placeholder: "Hi, I'm" }),
          t('heroPrimaryCta', 'Main button', 40, { hint: 'Scrolls to Projects.' }),
          t('heroResumeCta', 'Resume button', 40),
        ],
      },
      {
        title: 'About section',
        fields: [
          show('showAbout', 'Show the About section'),
          t('aboutEyebrow', 'Small label', 60), t('aboutTitle', 'Heading', 80),
          t('aboutPrimaryCta', 'Main button', 40, { hint: 'Scrolls to Contact.' }), t('aboutResumeCta', 'Resume button', 40),
          t('strengthsLabel', 'Strengths box label', 60), t('currentlyAtLabel', '"Currently at" label', 40),
        ],
      },
      {
        title: 'Skills section',
        fields: [show('showSkills', 'Show the Skills section'), t('skillsEyebrow', 'Small label', 60), t('skillsTitle', 'Heading', 80)],
      },
      {
        title: 'Experience section',
        fields: [
          show('showExperience', 'Show the Experience section'),
          t('experienceEyebrow', 'Small label', 60), t('experienceTitle', 'Heading', 80),
          t('currentBadge', 'Badge on current role', 30), t('previousBadge', 'Badge on past roles', 30),
        ],
      },
      {
        title: 'Education section',
        fields: [show('showEducation', 'Show the Education section'), t('educationEyebrow', 'Small label', 60), t('educationTitle', 'Heading', 80)],
      },
      {
        title: 'Projects section',
        fields: [
          show('showProjects', 'Show the Projects section'),
          t('projectsEyebrow', 'Small label', 60), t('projectsTitle', 'Heading', 80),
          t('projectsEmpty', 'Text when there are no projects', 120, { wide: true }),
        ],
      },
      {
        title: 'Certifications section',
        fields: [
          show('showCertifications', 'Show the Certifications section'),
          t('certificationsEyebrow', 'Small label', 60), t('certificationsTitle', 'Heading', 80),
          t('certificateLinkLabel', 'Certificate link text', 40),
        ],
      },
      {
        title: 'Contact section',
        fields: [
          show('showContact', 'Show the Contact section'),
          t('contactEyebrow', 'Small label', 60), t('contactTitle', 'Heading', 80),
          { key: 'contactIntro', label: 'Intro text', type: 'textarea', max: 300, wide: true },
          t('contactInfoHeading', 'Contact details heading', 80), t('formHeading', 'Form heading', 80),
          t('emailLabel', 'Email label', 30), t('phoneLabel', 'Phone label', 30), t('locationLabel', 'Location label', 30),
          t('whatsappCta', 'WhatsApp button', 40),
          { key: 'whatsappGreeting', label: 'WhatsApp starter message', type: 'textarea', max: 200, wide: true, hint: TEMPLATE_HINT },
          t('namePlaceholder', 'Name field placeholder', 60), t('emailPlaceholder', 'Email field placeholder', 60),
          t('customEmailPlaceholder', 'Full-email field placeholder', 80), t('otherDomainLabel', '"Other" domain option', 30),
          t('messagePlaceholder', 'Message field placeholder', 80),
          { key: 'emailDomains', label: 'Email domains offered', type: 'lines', maxLines: 10, maxLen: 60, hint: 'One per line, e.g. gmail.com. Leave empty to ask for the full email address.' },
          t('sendWhatsappLabel', 'Send button (WhatsApp)', 40), t('sendEmailLabel', 'Send button (email)', 40),
          t('successWhatsapp', 'Sent message (WhatsApp)', 160, { wide: true }), t('successEmail', 'Sent message (email)', 160, { wide: true }),
        ],
      },
      {
        title: 'Footer',
        fields: [
          t('quickLinksHeading', 'Links heading', 40), t('connectHeading', 'Social heading', 40),
          t('copyright', 'Copyright line', 160, { wide: true, hint: TEMPLATE_HINT }),
          t('builtWith', 'Small print', 160, { wide: true }),
        ],
      },
    ],
  },
  stats: {
    label: 'Stats',
    singular: 'stat',
    titleField: 'value',
    subtitleField: 'label',
    description: 'The number tiles in the About section.',
    fields: [
      { key: 'value', label: 'Value', type: 'text', required: true, max: 20, placeholder: '1.5+' },
      { key: 'label', label: 'Label', type: 'text', required: true, max: 60, placeholder: 'Years Experience' },
      { key: 'icon', label: 'Icon', type: 'select', options: options(STAT_ICONS) },
    ],
  },
  skills: {
    label: 'Skills',
    singular: 'skill',
    titleField: 'name',
    subtitleField: 'level',
    fields: [
      { key: 'name', label: 'Name', type: 'text', required: true, max: 60 },
      { key: 'level', label: 'Level', type: 'text', max: 40, placeholder: 'Expert / Intermediate / Beginner' },
      { key: 'icon', label: 'Icon', type: 'icon' },
      { key: 'description', label: 'Description', type: 'lines', maxLines: 6, maxLen: 500, hint: 'One bullet per line. Shown when hovering the skill card.' },
    ],
  },
  experience: {
    label: 'Experience',
    singular: 'role',
    titleField: 'role',
    subtitleField: 'company',
    fields: [
      { key: 'role', label: 'Role', type: 'text', required: true, max: 120 },
      { key: 'company', label: 'Company', type: 'text', required: true, max: 120 },
      { key: 'duration', label: 'Duration', type: 'text', max: 80, placeholder: 'August 2025 – Present', hint: 'Include "Present" to mark this as your current role (it also appears in the About section).' },
      { key: 'location', label: 'Location', type: 'text', max: 80 },
      { key: 'description', label: 'Description', type: 'lines', maxLines: 12, maxLen: 500, hint: 'One bullet per line.' },
    ],
  },
  education: {
    label: 'Education',
    singular: 'entry',
    titleField: 'degree',
    subtitleField: 'institution',
    fields: [
      { key: 'degree', label: 'Degree', type: 'text', required: true, max: 160 },
      { key: 'institution', label: 'Institution', type: 'text', max: 160 },
      { key: 'year', label: 'Years', type: 'text', max: 80, placeholder: 'August 2022 – June 2024' },
      { key: 'grade', label: 'Grade', type: 'text', max: 40, placeholder: '6.8 CGPA' },
    ],
  },
  projects: {
    label: 'Projects',
    singular: 'project',
    titleField: 'title',
    subtitleField: 'techStack',
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true, max: 120 },
      { key: 'category', label: 'Category', type: 'text', max: 40, placeholder: 'React' },
      { key: 'techStack', label: 'Tech stack', type: 'text', max: 300, hint: 'Comma-separated, e.g. React, TypeScript, Tailwind CSS' },
      { key: 'link', label: 'Link', type: 'link', max: 500, placeholder: 'https://…' },
      { key: 'description', label: 'Description', type: 'lines', maxLines: 10, maxLen: 500, hint: 'One bullet per line. The first 3 appear on the card.' },
    ],
  },
  certifications: {
    label: 'Certifications',
    singular: 'certificate',
    titleField: 'title',
    subtitleField: 'issuer',
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true, max: 160 },
      { key: 'issuer', label: 'Issuer', type: 'text', max: 120 },
      { key: 'year', label: 'Year', type: 'text', max: 20 },
      { key: 'link', label: 'Certificate file or link', type: 'link', max: 500, upload: DOC_TYPES, placeholder: 'Upload a PDF/image, or paste https://…' },
    ],
  },
  socials: {
    label: 'Social links',
    singular: 'link',
    titleField: 'platform',
    subtitleField: 'url',
    description: 'The icons in the footer.',
    fields: [
      { key: 'platform', label: 'Platform', type: 'select', options: options(SOCIAL_PLATFORMS) },
      { key: 'url', label: 'URL', type: 'link', required: true, max: 500, mailto: true, placeholder: 'https://… or mailto:you@example.com' },
    ],
  },
};

export const LIST_SECTION_KEYS = Object.keys(SECTIONS).filter((k) => SECTIONS[k].kind !== 'object');
export const OBJECT_SECTION_KEYS = Object.keys(SECTIONS).filter((k) => SECTIONS[k].kind === 'object');

// All fields of a section, flattening profile groups.
export const sectionFields = (key) => {
  const cfg = SECTIONS[key];
  return cfg.kind === 'object' ? cfg.groups.flatMap((g) => g.fields) : cfg.fields;
};

// Matches MAX_ITEMS in netlify/lib/schema.mjs.
export const MAX_ITEMS = 50;

export const SAFE_LINK = /^(https?:\/\/[^\s]+|\/(?!\/)[^\s]*)$/i;
const MAILTO = /^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/i;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const blankItem = (sectionKey) =>
  Object.fromEntries(
    sectionFields(sectionKey).map((f) => [
      f.key,
      f.type === 'lines' ? [] : f.type === 'icon' ? 'code' : f.type === 'select' ? f.options[0].value : f.type === 'toggle' ? true : '',
    ])
  );

// Normalises a value the way the server will store it.
export const cleanValue = (field, v) => {
  if (field.type === 'toggle') return v !== false;
  if (field.type === 'lines') return (v || []).map((l) => l.trim()).filter(Boolean);
  const s = (v || '').trim();
  return field.type === 'digits' ? s.replace(/[\s+()-]/g, '') : s;
};

const checkField = (f, raw, where) => {
  if (f.type === 'toggle' || f.type === 'select') return null;
  const v = cleanValue(f, raw);
  if (f.type === 'lines') {
    if (v.length > f.maxLines) return `${where}: at most ${f.maxLines} lines.`;
    if (v.some((l) => l.length > f.maxLen)) return `${where}: a line is over ${f.maxLen} characters.`;
    return null;
  }
  if (f.type === 'digits') {
    if (v && !/^\d+$/.test(v)) return `${where}: digits only.`;
    if (v && (v.length < f.min || v.length > f.max)) return `${where}: must be ${f.min}–${f.max} digits.`;
    return null;
  }
  if (f.required && !v) return `${where} is required.`;
  if (f.max && v.length > f.max) return `${where}: at most ${f.max} characters.`;
  if (f.type === 'email' && v && !EMAIL.test(v)) return `${where} must be a valid email address.`;
  if (f.type === 'link' && v && !SAFE_LINK.test(v) && !(f.mailto && MAILTO.test(v))) {
    return `${where} must start with https://, http://${f.mailto ? ', mailto:' : ''} or /.`;
  }
  return null;
};

// Returns { section, index, message } for the first problem, or null.
// `index` is null for the profile.
export const findError = (content) => {
  for (const [sectionKey, cfg] of Object.entries(SECTIONS)) {
    if (cfg.kind === 'object') {
      for (const f of sectionFields(sectionKey)) {
        const message = checkField(f, content[sectionKey][f.key], `${cfg.label} → ${f.label}`);
        if (message) return { section: sectionKey, index: null, message };
      }
      continue;
    }
    const items = content[sectionKey] || [];
    if (items.length > MAX_ITEMS) {
      return { section: sectionKey, index: null, message: `${cfg.label}: at most ${MAX_ITEMS} items (you have ${items.length}).` };
    }
    for (let i = 0; i < items.length; i += 1) {
      for (const f of cfg.fields) {
        const message = checkField(f, items[i][f.key], `${cfg.label} #${i + 1} → ${f.label}`);
        if (message) return { section: sectionKey, index: i, message };
      }
    }
  }
  return null;
};
