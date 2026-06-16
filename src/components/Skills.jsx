import React, { useState } from 'react';
import { skills } from '../data/skills';

const accentColors = [
  '#06b6d4', '#14b8a6', '#f97316', '#3b82f6',
  '#f97316', '#60a5fa', '#eab308', '#93c5fd',
  '#22c55e', '#e2e8f0', '#007acc', '#0ea5e9',
];

const Skills = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="skills" className="py-24 px-6 bg-white/[.012]">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16 section-reveal">
          <p className="text-teal-500 text-sm font-semibold tracking-widest uppercase mb-3">What I Know</p>
          <h2 className="section-title">Skills & Technologies</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {skills.map((s, idx) => {
            const color     = accentColors[idx] || '#14b8a6';
            const isHovered = hovered === idx;
            return (
              <div
                key={idx}
                className="relative"
                style={{ zIndex: isHovered ? 20 : 1 }}
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Base card — fixed height so all cards are uniform */}
                <div className="glass-card rounded-xl flex flex-col items-center justify-center text-center cursor-pointer" style={{ height: '96px' }}>
                  <div className="text-3xl mb-2">{s.icon}</div>
                  <h3 className="font-semibold text-xs text-white">{s.name}</h3>
                </div>

                {/* Popup — expands from top of card downward */}
                {isHovered && (
                  <div
                    className="absolute top-0 left-0 right-0 rounded-xl p-4"
                    style={{
                      background: 'rgba(10,15,25,0.97)',
                      border: `1px solid ${color}55`,
                      boxShadow: `0 8px 32px rgba(0,0,0,.7), 0 0 20px ${color}22`,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="text-2xl flex-shrink-0">{s.icon}</div>
                      <div>
                        <p className="text-white font-bold text-xs leading-tight">{s.name}</p>
                        <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color }}>
                          {s.level}
                        </p>
                      </div>
                    </div>
                    <ul className="space-y-1.5">
                      {s.description.map((line, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-slate-300 text-[11px] leading-snug">
                          <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: color }} />
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
