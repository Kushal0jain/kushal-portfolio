import React from 'react';
import { FiCalendar, FiMapPin } from 'react-icons/fi';
import experience from '../data/experience';

const colors = ['#14b8a6', '#8b5cf6'];

const Experience = () => (
  <section id="experience" className="py-24 px-6">
    <div className="max-w-4xl mx-auto">

      <div className="text-center mb-16 section-reveal">
        <p className="text-teal-500 text-sm font-semibold tracking-widest uppercase mb-3">Work History</p>
        <h2 className="section-title">Experience</h2>
      </div>

      <div className="relative pl-[52px]">

        {/* Vertical line */}
        <div
          className="absolute left-[18px] top-2 bottom-2 w-[2px] rounded-[1px]"
          style={{ background: 'linear-gradient(180deg, #14b8a6, #8b5cf6 60%, transparent)' }}
        />

        <div className="space-y-10">
          {experience.map((exp, idx) => {
            const color      = colors[idx % colors.length];
            const colorNext  = colors[(idx + 1) % colors.length];
            return (
              <div key={idx} className="relative section-reveal" style={{ transitionDelay: `${idx * 150}ms` }}>

                {/* Dot */}
                <div
                  className="absolute -left-[42px] top-[22px] w-5 h-5 rounded-full flex items-center justify-center z-[1]"
                  style={{
                    background: `linear-gradient(135deg, ${color}, ${colorNext})`,
                    boxShadow:  `0 0 18px ${color}55`,
                  }}
                >
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>

                {/* Card */}
                <div className="glass-card rounded-2xl p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                      <p className="font-semibold mt-0.5" style={{ color }}>{exp.company}</p>
                    </div>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0"
                      style={{ background: `${color}18`, color, border: `1px solid ${color}35` }}
                    >
                      {idx === 0 ? 'Current' : 'Previous'}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-5">
                    <span className="flex items-center gap-1.5"><FiCalendar size={13} /> {exp.duration}</span>
                    <span className="flex items-center gap-1.5"><FiMapPin size={13} />   {exp.location}</span>
                  </div>

                  <ul className="space-y-2">
                    {exp.description.map((point, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-slate-300 text-sm leading-relaxed">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
                        {point.trim()}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

export default Experience;
