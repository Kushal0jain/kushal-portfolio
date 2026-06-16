import React from 'react';
import { FiExternalLink, FiAward } from 'react-icons/fi';
import certifications from '../data/certifications';

const themes = [
  { bg: 'rgba(20,184,166,.07)',  border: 'rgba(20,184,166,.22)',  color: '#14b8a6', badge: 'rgba(20,184,166,.15)' },
  { bg: 'rgba(139,92,246,.07)', border: 'rgba(139,92,246,.22)', color: '#8b5cf6', badge: 'rgba(139,92,246,.15)' },
  { bg: 'rgba(249,115,22,.07)', border: 'rgba(249,115,22,.22)', color: '#f97316', badge: 'rgba(249,115,22,.15)' },
  { bg: 'rgba(6,182,212,.07)',   border: 'rgba(6,182,212,.22)',  color: '#06b6d4', badge: 'rgba(6,182,212,.15)' },
  { bg: 'rgba(245,158,11,.07)', border: 'rgba(245,158,11,.22)', color: '#f59e0b', badge: 'rgba(245,158,11,.15)' },
];

const Certifications = () => (
  <section id="certificates" className="py-24 px-6 bg-white/[.012]">
    <div className="max-w-6xl mx-auto">

      <div className="text-center mb-16 section-reveal">
        <p className="text-teal-500 text-sm font-semibold tracking-widest uppercase mb-3">My Achievements</p>
        <h2 className="section-title">Certifications</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {certifications.map((cert, idx) => {
          const t = themes[idx % themes.length];
          return (
            <div
              key={idx}
              className="rounded-2xl p-5 flex flex-col hover-lift section-reveal transition-all duration-300"
              style={{
                background:      t.bg,
                border:          `1px solid ${t.border}`,
                transitionDelay: `${(idx % 3) * 80}ms`,
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: t.badge, color: t.color }}
              >
                <FiAward size={22} />
              </div>

              <h3 className="text-base font-bold text-white mb-1 leading-snug">{cert.title}</h3>
              <p className="text-slate-400 text-sm mb-4 flex-1">{cert.issuer} &middot; {cert.year}</p>

              <a
                href={cert.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 hover:gap-2.5"
                style={{ color: t.color }}
              >
                View Certificate <FiExternalLink size={13} />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default Certifications;
