import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { skills } from '../data/skills';

const accentColors = [
  '#06b6d4', '#14b8a6', '#f97316', '#3b82f6',
  '#f97316', '#60a5fa', '#eab308', '#93c5fd',
  '#22c55e', '#e2e8f0', '#007acc', '#0ea5e9',
];

const Skills = () => {
  const [selected, setSelected] = useState(null);

  const skill   = selected !== null ? skills[selected]       : null;
  const color   = selected !== null ? (accentColors[selected] || '#14b8a6') : '#14b8a6';

  return (
    <section id="skills" className="py-24 px-6 bg-white/[.012]">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16 section-reveal">
          <p className="text-teal-500 text-sm font-semibold tracking-widest uppercase mb-3">What I Know</p>
          <h2 className="section-title">Skills & Technologies</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {skills.map((s, idx) => {
            const c = accentColors[idx] || '#14b8a6';
            return (
              <button
                key={idx}
                onClick={() => setSelected(idx)}
                className="glass-card rounded-xl p-3.5 flex flex-col items-center text-center skill-card cursor-pointer focus:outline-none"
                style={{ transitionDelay: `${(idx % 4) * 70}ms` }}
              >
                <div className="text-3xl mb-2">{s.icon}</div>
                <h3 className="font-semibold text-xs text-white mb-1.5">{s.name}</h3>
                <div
                  className="h-0.5 rounded-full w-8"
                  style={{ background: c }}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {skill && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,.6)', backdropFilter: 'blur(6px)' }}
          onClick={() => setSelected(null)}
        >
          <div
            className="glass-card rounded-2xl p-7 max-w-sm w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <FiX size={18} />
            </button>

            <div className="text-5xl mb-4">{skill.icon}</div>
            <h3 className="text-xl font-bold text-white mb-1">{skill.name}</h3>
            <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color }}>
              {skill.level}
            </p>
            <ul className="space-y-2">
              {skill.description.map((line, i) => (
                <li key={i} className="flex items-start gap-2.5 text-slate-300 text-sm leading-relaxed">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};

export default Skills;
