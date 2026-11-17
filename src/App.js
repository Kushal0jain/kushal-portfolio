import React, { useEffect, useLayoutEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { useContent } from './content/ContentContext';
import { initialTheme } from './content/accents';

const SECTIONS = [
  { show: 'showAbout',          Component: About },
  { show: 'showSkills',         Component: Skills },
  { show: 'showExperience',     Component: Experience },
  { show: 'showEducation',      Component: Education },
  { show: 'showProjects',       Component: Projects },
  { show: 'showCertifications', Component: Certifications },
  { show: 'showContact',        Component: Contact },
];

function App() {
  const content = useContent();
  const { ui } = content;

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', initialTheme(ui));
  }, [ui]);

  // Re-run when content changes so newly rendered cards are observed too
  // (already revealed ones keep their `revealed` class).
  useEffect(() => {
    const sel = '.section-reveal:not(.revealed), .section-reveal-left:not(.revealed), .section-reveal-right:not(.revealed)';
    const targets = document.querySelectorAll(sel);
    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('revealed'));
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0, rootMargin: '0px 0px -8% 0px' }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [content]);

  return (
    <div style={{ background: 'var(--bg-page)', fontFamily: "'Poppins', sans-serif" }}>
      <Navbar />
      <HeroSection />
      {SECTIONS.filter((s) => ui[s.show] !== false).map(({ show, Component }) => (
        <Component key={show} />
      ))}
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
