import React, { useEffect, useState } from 'react';
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
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [loaded, setLoaded] = useState(false);

  // Init theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  // Scroll-reveal observer
  useEffect(() => {
    const sel = '.section-reveal, .section-reveal-left, .section-reveal-right';
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('revealed'); }),
      { threshold: 0 }
    );
    document.querySelectorAll(sel).forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [loaded]); // re-run after loading screen unmounts so new DOM nodes are observed

  return (
    <div style={{ background: 'var(--bg-page)', fontFamily: "'Poppins', sans-serif" }}>
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      <Navbar />
      <HeroSection />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Projects />
      <Certifications />
      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
