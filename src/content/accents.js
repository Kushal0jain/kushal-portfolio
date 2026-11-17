// Accent colour presets (Tailwind palette, as "R G B" for CSS variables).
// Presets rather than a free colour picker, so buttons and text always keep
// readable contrast in both themes.
export const ACCENTS = {
  teal:    { label: 'Teal',    400: '45 212 191',  500: '20 184 166', 600: '13 148 136', 700: '15 118 110' },
  blue:    { label: 'Blue',    400: '96 165 250',  500: '59 130 246', 600: '37 99 235',  700: '29 78 216' },
  indigo:  { label: 'Indigo',  400: '129 140 248', 500: '99 102 241', 600: '79 70 229',  700: '67 56 202' },
  violet:  { label: 'Violet',  400: '167 139 250', 500: '139 92 246', 600: '124 58 237', 700: '109 40 217' },
  emerald: { label: 'Emerald', 400: '52 211 153',  500: '16 185 129', 600: '5 150 105',  700: '4 120 87' },
  rose:    { label: 'Rose',    400: '251 113 133', 500: '244 63 94',  600: '225 29 72',  700: '190 18 60' },
};

// Sets the --accent-* CSS variables used by Tailwind's teal-* classes and the stylesheet.
export const applyAccent = (key) => {
  const a = ACCENTS[key] || ACCENTS.teal;
  const root = document.documentElement.style;
  [400, 500, 600, 700].forEach((shade) => root.setProperty(`--accent-${shade}`, a[shade]));
};

export const THEMES = { dark: { label: 'Dark' }, light: { label: 'Light' } };

// The visitor's own choice wins; otherwise the default set in the admin panel.
export const initialTheme = (ui) => {
  let saved = null;
  try {
    saved = localStorage.getItem('theme');
  } catch {
    saved = null;
  }
  return saved === 'light' || saved === 'dark' ? saved : ui.defaultTheme || 'dark';
};

// Fills {name}, {firstName} and {year} in admin-editable text.
export const fillTemplate = (text, vars) =>
  String(text || '').replace(/\{(\w+)\}/g, (m, key) => (key in vars ? vars[key] : m));
