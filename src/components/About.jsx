import React from 'react';
import { FaBriefcase, FaCode, FaBuilding, FaGraduationCap } from 'react-icons/fa';

const stats = [
  { icon: FaBriefcase,     label: 'Years Experience', value: '1.5+', color: 'teal'   },
  { icon: FaCode,          label: 'Projects Built',   value: '4+',   color: 'violet' },
  { icon: FaBuilding,      label: 'Companies',        value: '2',    color: 'cyan'   },
  { icon: FaGraduationCap, label: 'CGPA (MCA)',       value: '6.8',  color: 'amber'  },
];

const colorMap = {
  teal:   { text: 'text-teal-500',   bg: 'bg-teal-500/10',   hex: '#14b8a6' },
  violet: { text: 'text-violet-500', bg: 'bg-violet-500/10', hex: '#8b5cf6' },
  cyan:   { text: 'text-cyan-500',   bg: 'bg-cyan-500/10',   hex: '#06b6d4' },
  amber:  { text: 'text-amber-400',  bg: 'bg-amber-400/10',  hex: '#f59e0b' },
};

const strengths = ['OOP & Design Patterns', 'Clean Architecture', 'REST APIs', 'Responsive UI', 'SQL & NoSQL', 'Git & Version Control'];

const About = () => (
  <section id="about" className="py-24 px-6 relative">
    <div className="max-w-6xl mx-auto">

      <div className="text-center mb-16 section-reveal">
        <p className="text-teal-500 text-sm font-semibold tracking-widest uppercase mb-3">Get To Know</p>
        <h2 className="section-title">About Me</h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-14 items-start">

        {/* Left – Bio */}
        <div className="section-reveal-left space-y-5">
          <p className="text-slate-300 leading-relaxed text-base">
            I'm a <span className="text-teal-500 font-semibold">Software Developer</span> with a strong command of both
            frontend and backend technologies — including{' '}
            <span className="text-teal-500 font-semibold">Java</span>,{' '}
            <span className="text-teal-500 font-semibold">React.js</span>,{' '}
            <span className="text-teal-500 font-semibold">TypeScript</span>,{' '}
            <span className="text-teal-500 font-semibold">Tailwind CSS</span>, and{' '}
            <span className="text-teal-500 font-semibold">MySQL</span>. I specialize in building responsive, scalable,
            and maintainable applications backed by solid Object-Oriented Design and database architecture.
          </p>
          <p className="text-slate-300 leading-relaxed text-base">
            Currently working as a <span className="text-violet-400 font-semibold">Frontend Developer</span> at{' '}
            <span className="text-white font-semibold">Ubuy India</span>, contributing to the UI of a global
            e-commerce platform — building responsive interfaces, optimizing performance, and collaborating with
            cross-functional teams to ship high-quality software.
          </p>
          <p className="text-slate-300 leading-relaxed text-base">
            Previously at <span className="text-white font-semibold">ZPLYS.AI</span>, I built interactive,
            production-grade UI components using React.js, TypeScript, and Tailwind CSS for an AI-powered platform
            — focusing on reusable architecture, performance, and cross-browser compatibility.
          </p>
          <p className="text-slate-300 leading-relaxed text-base">
            I enjoy solving real problems through code — whether it's designing a{' '}
            <span className="text-teal-500 font-semibold">Banking System</span> in Java, building a{' '}
            <span className="text-teal-500 font-semibold">dynamic React app</span>, or optimizing database queries.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <a href="#contact" className="btn-primary text-sm py-3 px-7"><span className="relative z-10">Let's Talk</span></a>
            <a href="/Resume_kushal.pdf" target="_blank" rel="noreferrer" className="btn-outline text-sm py-3 px-7">My Resume</a>
          </div>
        </div>

        {/* Right – Stats */}
        <div className="section-reveal-right grid grid-cols-2 gap-5">
          {stats.map(({ icon: Icon, label, value, color }) => {
            const c = colorMap[color];
            return (
              <div key={label} className="glass-card rounded-2xl p-6 text-center">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${c.bg} ${c.text}`}>
                  <Icon size={22} />
                </div>
                <p className={`text-3xl font-black mb-1 ${c.text}`}>{value}</p>
                <p className="text-slate-400 text-sm font-medium">{label}</p>
              </div>
            );
          })}

          {/* Core Strengths */}
          <div className="col-span-2 rounded-2xl p-5 bg-violet-500/[.06] border border-violet-500/20">
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">Core Strengths</p>
            <div className="flex flex-wrap gap-2">
              {strengths.map((s) => (
                <span key={s} className="px-3 py-1 rounded-full text-xs font-medium bg-violet-500/[.12] text-violet-400 border border-violet-500/25">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Live status */}
          <div className="col-span-2 rounded-2xl p-5 flex items-center gap-4 bg-teal-500/[.06] border border-teal-500/20">
            <div className="w-3 h-3 rounded-full bg-teal-400 flex-shrink-0" />
            <div>
              <p className="text-white font-semibold text-sm">Currently at Ubuy India</p>
              <p className="text-slate-400 text-xs mt-0.5">Frontend Developer · Jaipur, India · Aug 2025 – Present</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About;
