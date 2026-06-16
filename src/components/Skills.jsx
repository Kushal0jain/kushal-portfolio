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

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {skills.map((skill, idx) => {
            const color     = accentColors[idx] || '#14b8a6';
            const isHovered = hovered === idx;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl p-5 flex flex-col items-center text-center section-reveal skill-card cursor-pointer"
                style={{ transitionDelay: `${(idx % 4) * 70}ms` }}
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
              >
                <div
                  className="text-4xl mb-3 transition-all duration-300"
                  style={{
                    transform: isHovered ? 'scale(1.25) rotate(-6deg)' : 'scale(1)',
                    filter:    isHovered ? `drop-shadow(0 0 8px ${color}80)` : 'none',
                  }}
                >
                  {skill.icon}
                </div>

                <h3 className="font-bold text-sm text-white mb-2">{skill.name}</h3>

                <div
                  className="overflow-hidden w-full transition-all duration-300"
                  style={{ maxHeight: isHovered ? '80px' : '0', opacity: isHovered ? 1 : 0 }}
                >
                  <p className="text-xs text-slate-400 leading-relaxed">{skill.description[0]}</p>
                </div>

                <div
                  className="mt-3 h-0.5 rounded-full transition-all duration-500"
                  style={{
                    width:      isHovered ? '65%' : '0%',
                    background: `linear-gradient(90deg, ${color}, transparent)`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
