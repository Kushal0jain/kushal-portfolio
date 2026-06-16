import React, { useState, useEffect } from 'react';
import { FiArrowDown } from 'react-icons/fi';

/* ── Typewriter ─────────────────────────────────────────── */
const roles = ['Software Developer', 'Frontend Developer', 'Java Developer', 'React Developer', 'Full-Stack Enthusiast'];

const Typewriter = () => {
  const [text,     setText]     = useState('');
  const [wordIdx,  setWordIdx]  = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = roles[wordIdx];
    let timeout;
    if (!deleting) {
      if (text.length < word.length) {
        timeout = setTimeout(() => setText(word.substring(0, text.length + 1)), 100);
      } else {
        timeout = setTimeout(() => setDeleting(true), 2200);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(word.substring(0, text.length - 1)), 55);
      } else {
        setDeleting(false);
        setWordIdx((p) => (p + 1) % roles.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIdx]);

  return (
    <span className="gradient-text font-bold">
      {text}
      <span
        className="animate-blink inline-block align-middle ml-[2px]"
        style={{ borderRight: '2.5px solid #14b8a6' }}
      />
    </span>
  );
};

/* ── Data ───────────────────────────────────────────────── */
const techBadges = [
  { label: 'React',      angle:   0 },
  { label: 'Java',       angle:  72 },
  { label: 'TypeScript', angle: 144 },
  { label: 'Tailwind',   angle: 216 },
  { label: 'MySQL',      angle: 288 },
];

/* ── Component ──────────────────────────────────────────── */
const HeroSection = () => {
  const radius = 155;

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20">

      {/* ── Background ─────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Dot-grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,.028) 1px, transparent 1px)',
            backgroundSize: '38px 38px',
          }}
        />
        {/* Ambient orbs */}
        <div
          className="absolute animate-orb-1 rounded-full w-[520px] h-[520px] top-[5%] left-[10%] blur-[45px]"
          style={{ background: 'radial-gradient(circle, rgba(20,184,166,.14) 0%, transparent 70%)' }}
        />
        <div
          className="absolute animate-orb-2 rounded-full w-[420px] h-[420px] top-[40%] right-[8%] blur-[40px]"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,.13) 0%, transparent 70%)' }}
        />
        <div
          className="absolute animate-orb-3 rounded-full w-[320px] h-[320px] bottom-[10%] left-[35%] blur-[35px]"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,.1) 0%, transparent 70%)' }}
        />
      </div>

      {/* ── Content ────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">

          {/* Left – Text */}
          <div className="flex-1 text-center lg:text-left">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-7 bg-teal-500/10 border border-teal-500/30 text-teal-500">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse shadow-[0_0_6px_#14b8a6]" />
              Open to Work · Software Developer
            </div>

            {/* Name */}
            <h1
              className="font-black leading-tight mb-4"
              style={{ fontSize: 'clamp(2.4rem, 6vw, 4.8rem)' }}
            >
              <span className="text-slate-50">Hi, I'm</span>
              <br />
              <span className="gradient-text">Kushal Jain</span>
            </h1>

            {/* Typewriter role */}
            <div
              className="mb-6 text-slate-400"
              style={{ fontSize: 'clamp(1.2rem, 2.8vw, 1.65rem)', minHeight: '2.4rem' }}
            >
              <Typewriter />
            </div>

            {/* Tagline */}
            <p className="text-slate-400 leading-relaxed mb-9 max-w-lg mx-auto lg:mx-0 text-base">
              Passionate about designing and building robust, scalable software — from
              clean backend logic to pixel-perfect UIs. Currently shipping products at{' '}
              <span className="text-teal-500 font-semibold">Ubuy India</span>.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10">
              <a href="#projects" className="btn-primary">
                <span className="relative z-10">View Projects</span>
              </a>
              <a href="/Resume_kushal.pdf" target="_blank" rel="noreferrer" className="btn-outline">
                Download Resume
              </a>
            </div>

            {/* Social icons */}
            {/* <div className="flex gap-3 justify-center lg:justify-start">
              {socials.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="social-icon">
                  <Icon />
                </a>
              ))}
            </div> */}
          </div>

          {/* Right – Profile image */}
          <div className="relative flex-shrink-0 flex items-center justify-center w-[340px] h-[340px]">

            {/* Outer rotating ring */}
            <div
              className="absolute animate-spin-slow rounded-full border-2 border-dashed border-teal-500/[.28] -inset-7"
            />
            {/* Inner counter ring */}
            <div
              className="absolute animate-spin-reverse rounded-full -inset-2.5"
              style={{ border: '1.5px dashed rgba(139,92,246,.22)' }}
            />

            {/* Glow backdrop */}
            <div
              className="absolute rounded-full -inset-1.5 blur-[20px]"
              style={{ background: 'radial-gradient(circle, rgba(20,184,166,.18) 0%, transparent 70%)' }}
            />

            {/* Profile image */}
            <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden animate-pulse-glow flex-shrink-0 border-[3px] border-teal-500/60">
              <img src="/kushal.jpg" alt="Kushal Jain" className="w-full h-full object-cover" />
            </div>

            {/* Floating tech badges */}
            {techBadges.map(({ label, angle }, i) => {
              const rad = (angle * Math.PI) / 180;
              const x   = Math.round(Math.cos(rad) * radius);
              const y   = Math.round(Math.sin(rad) * radius);
              return (
                <div
                  key={label}
                  className="absolute px-3 py-1.5 rounded-full text-xs font-semibold glass animate-float text-teal-500 whitespace-nowrap"
                  style={{
                    left:           `calc(50% + ${x}px)`,
                    top:            `calc(50% + ${y}px)`,
                    transform:      'translate(-50%, -50%)',
                    border:         '1px solid rgba(20,184,166,.3)',
                    animationDelay: `${i * 0.45}s`,
                    boxShadow:      '0 4px 15px rgba(20,184,166,.15)',
                  }}
                >
                  {label}
                </div>
              );
            })}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-bounce-slow">
          <span className="text-xs text-slate-600 font-medium tracking-widest uppercase">Scroll</span>
          <FiArrowDown className="text-slate-600" size={14} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
