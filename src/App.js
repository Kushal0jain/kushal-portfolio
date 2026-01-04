import React from 'react'
import HeroSection from './components/HeroSection'
import Navbar from './components/Navbar'
import About from './components/About'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Certificates from './components/Certifications'
import Education from './components/Education'
import Resume from './components/Resume'


function App() {
  return (
    <div>
    <div className="bg-black text-white scroll-smooth font-poppins">
      <Navbar />
      {/* Sections below */}
      <HeroSection />
      <About />
      <Skills />
      <Resume />
      <Experience />
      <Education />
      <Projects />
      <Certificates />
      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
    <div>
      

    </div>
    </div>
  )
}

export default App
