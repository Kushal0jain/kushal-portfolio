import React, { useState, useEffect } from 'react';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import { useContent } from '../content/ContentContext';
import { visibleSections } from '../content/navigation';
import { initialTheme } from '../content/accents';

// "Kushal Jain" → "KJ"
export const initials = (name) =>
  String(name || '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');

const Navbar = () => {
  const { profile, ui } = useContent();
  const navLinks = visibleSections(ui);
  const [scrolled,       setScrolled]       = useState(false);
  const [menuOpen,       setMenuOpen]       = useState(false);
  const [activeSection,  setActiveSection]  = useState('');
  const [isDark,         setIsDark]         = useState(() => initialTheme(ui) === 'dark');

  // If content (and so the default theme) arrives after first render, keep
  // the toggle icon in step with the theme App.js applies.
  useEffect(() => {
    setIsDark(initialTheme(ui) === 'dark');
  }, [ui]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navIds = navLinks.map((l) => l.id).join(',');
  useEffect(() => {
    const ids = navIds.split(',');
    const onScroll = () => {
      let current = '';
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        if (el.getBoundingClientRect().top <= 120) current = id;
      });
      setActiveSection(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [navIds]);

  const toggleTheme = () => {
    const next = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Private mode etc. — the toggle still works for this visit.
    }
    document.documentElement.setAttribute('data-theme', next);
  };

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-[padding,background-color,border-color] duration-500 ease-out ${
        scrolled ? 'glass py-3' : 'border-transparent bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm icon-tile">
            {initials(profile.name)}
          </div>
          <span className="text-white font-semibold text-lg tracking-tight hidden sm:block">{profile.name}</span>
        </button>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`nav-link text-sm font-medium transition-colors duration-200 ${activeSection === id ? 'text-teal-500 active' : 'text-slate-400 hover:text-white'}`}
            >
              {label}
            </button>
          ))}

          {/* Theme toggle */}
          <button onClick={toggleTheme} aria-label="Toggle theme" className="icon-btn">
            {isDark ? <FiSun size={15} /> : <FiMoon size={15} />}
          </button>
        </div>

        {/* Mobile row */}
        <div className="lg:hidden flex items-center gap-2">
          <button onClick={toggleTheme} aria-label="Toggle theme" className="icon-btn">
            {isDark ? <FiSun size={15} /> : <FiMoon size={15} />}
          </button>
          <button className="p-2 text-slate-400 hover:text-white transition-colors" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="glass px-6 py-4 space-y-1">
          {navLinks.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`block w-full text-left py-3 px-4 rounded-xl text-sm font-medium transition-colors duration-200 ${
                activeSection === id ? 'text-teal-500 bg-teal-500/10' : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
