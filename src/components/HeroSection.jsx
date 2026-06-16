import React from 'react';

const HeroSection = () => (
  <section id="home" className="relative min-h-screen flex items-center pt-20">
    <div className="max-w-7xl mx-auto px-6 w-full">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-16">

        {/* Left – Text */}
        <div className="flex-1 text-center lg:text-left">

          <p className="text-teal-500 text-sm font-semibold tracking-widest uppercase mb-5">
            Open to Work
          </p>

          <h1
            className="font-black leading-tight mb-4 text-slate-50"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 4.8rem)' }}
          >
            Hi, I'm<br />
            <span className="text-teal-500">Kushal Jain</span>
          </h1>

          <p
            className="text-slate-400 font-semibold mb-6"
            style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)' }}
          >
            Frontend Developer
          </p>

          <p className="text-slate-400 leading-relaxed mb-9 max-w-lg mx-auto lg:mx-0 text-base">
            I build web interfaces — currently working at{' '}
            <span className="text-teal-500 font-semibold">Ubuy India</span>,
            mostly using React, TypeScript, and Java.
          </p>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <a href="#projects" className="btn-primary">
              <span className="relative z-10">View Projects</span>
            </a>
            <a href="/Resume_kushal.pdf" target="_blank" rel="noreferrer" className="btn-outline">
              Download Resume
            </a>
          </div>
        </div>

        {/* Right – Profile image */}
        <div className="flex-shrink-0">
          <div className="w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border border-teal-500/30">
            <img src="/kushal.jpg" alt="Kushal Jain" className="w-full h-full object-cover" />
          </div>
        </div>

      </div>
    </div>
  </section>
);

export default HeroSection;
