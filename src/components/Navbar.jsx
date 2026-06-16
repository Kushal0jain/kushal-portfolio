import React, { useState, useEffect } from 'react';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';

const navLinks = [
  { label: 'About',          id: 'about' },
  { label: 'Skills',         id: 'skills' },
  { label: 'Experience',     id: 'experience' },
  { label: 'Education',      id: 'education' },
  { label: 'Projects',       id: 'projects' },
  { label: 'Certifications', id: 'certificates' },
  { label: 'Contact',        id: 'contact' },
];

const Navbar = () => {
  const [scrolled,       setScrolled]       = useState(false);
  const [menuOpen,       setMenuOpen]       = useState(false);
  const [activeSection,  setActiveSection]  = useState('');
  const [isDark,         setIsDark]         = useState(
    () => (localStorage.getItem('theme') || 'dark') === 'dark'
  );

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      let current = '';
      navLinks.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return;
        if (el.getBoundingClientRect().top <= 120) current = id;
      });
      setActiveSection(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => {
    const next = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    localStorage.setItem('theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass shadow-xl shadow-black/30 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg bg-gradient-to-br from-teal-500 to-violet-500 shadow-glow-teal-sm">
            KJ
          </div>
          <span className="gradient-text font-bold text-lg hidden sm:block">Kushal Jain</span>
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
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${
              isDark
                ? 'bg-amber-400/[.12] border border-amber-400/30 text-amber-400'
                : 'bg-violet-500/10 border border-violet-500/30 text-violet-500'
            }`}
          >
            {isDark ? <FiSun size={15} /> : <FiMoon size={15} />}
          </button>
        </div>

        {/* Mobile row */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
              isDark
                ? 'bg-amber-400/[.12] border border-amber-400/30 text-amber-400'
                : 'bg-violet-500/10 border border-violet-500/30 text-violet-500'
            }`}
          >
            {isDark ? <FiSun size={15} /> : <FiMoon size={15} />}
          </button>
          <button className="p-2 text-slate-400 hover:text-white transition-colors" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="glass border-t border-white/5 px-6 py-4 space-y-1">
          {navLinks.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`block w-full text-left py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
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
