// The page's sections in display order. `show` and `nav` name fields in the
// admin-editable `ui` content.
export const SECTION_ORDER = [
  { id: 'about',        show: 'showAbout',          nav: 'navAbout' },
  { id: 'skills',       show: 'showSkills',         nav: 'navSkills' },
  { id: 'experience',   show: 'showExperience',     nav: 'navExperience' },
  { id: 'education',    show: 'showEducation',      nav: 'navEducation' },
  { id: 'projects',     show: 'showProjects',       nav: 'navProjects' },
  { id: 'certificates', show: 'showCertifications', nav: 'navCertifications' },
  { id: 'contact',      show: 'showContact',        nav: 'navContact' },
];

// Menu / footer links: sections that are shown AND have a label. Clearing a
// label in the admin panel hides that link while keeping the section itself.
export const visibleSections = (ui) =>
  SECTION_ORDER
    .filter((s) => ui[s.show] !== false && String(ui[s.nav] || '').trim())
    .map((s) => ({ id: s.id, label: ui[s.nav] }));
