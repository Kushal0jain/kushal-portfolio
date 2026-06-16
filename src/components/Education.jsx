import React from 'react';
import { FiCalendar } from 'react-icons/fi';
import { FaGraduationCap } from 'react-icons/fa';
import education from '../data/education';

const degreeColors = ['#14b8a6', '#8b5cf6', '#06b6d4', '#f59e0b'];

const Education = () => (
  <section id="education" className="py-24 px-6 bg-white/[.012]">
    <div className="max-w-4xl mx-auto">

      <div className="text-center mb-16 section-reveal">
        <p className="text-teal-500 text-sm font-semibold tracking-widest uppercase mb-3">Academic Background</p>
        <h2 className="section-title">Education</h2>
      </div>

      <div className="relative pl-[52px]">

        {/* Vertical line */}
        <div
          className="absolute left-[18px] top-2 bottom-2 w-[2px] rounded-[1px]"
          style={{ background: 'linear-gradient(180deg, #14b8a6, #8b5cf6 40%, #06b6d4 70%, #f59e0b)' }}
        />

        <div className="space-y-8">
          {education.map((edu, idx) => {
            const color = degreeColors[idx];
            return (
              <div key={idx} className="relative section-reveal" style={{ transitionDelay: `${idx * 100}ms` }}>

                {/* Dot */}
                <div
                  className="absolute -left-[42px] top-5 w-5 h-5 rounded-full flex items-center justify-center z-[1]"
                  style={{ background: color, boxShadow: `0 0 16px ${color}55` }}
                >
                  <FaGraduationCap size={9} color="white" />
                </div>

                {/* Card */}
                <div className="glass-card rounded-2xl p-5">
                  <div className="flex flex-wrap gap-3 items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-white leading-snug">{edu.degree}</h3>
                      <p className="text-slate-400 text-sm mt-1">{edu.institution}</p>
                    </div>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold flex-shrink-0"
                      style={{ background: `${color}18`, color, border: `1px solid ${color}35` }}
                    >
                      {edu.grade}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs mt-3">
                    <FiCalendar size={12} /> {edu.year}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

export default Education;
