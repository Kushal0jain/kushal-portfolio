import React from 'react';
import { FiCalendar, FiMapPin } from 'react-icons/fi';
import { useContent } from '../content/ContentContext';
import SectionHeader from './SectionHeader';

const Experience = () => {
  const { experience, ui } = useContent();
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">

        <SectionHeader eyebrow={ui.experienceEyebrow} title={ui.experienceTitle} />

        <div className="relative pl-[52px]">

          {/* Vertical line */}
          <div className="timeline-line absolute left-[18px] top-3 bottom-3 w-px" />

          <div className="space-y-8">
            {experience.map((exp, idx) => {
              const current = (exp.duration || '').includes('Present');
              const badge = current ? ui.currentBadge : ui.previousBadge;
              return (
                <div key={idx} className="relative section-reveal" style={{ '--reveal-delay': `${idx * 120}ms` }}>

                  {/* Dot */}
                  <div className="timeline-dot absolute -left-[40px] top-[26px] w-[13px] h-[13px] z-[1]" />

                  {/* Card */}
                  <div className="glass-card rounded-2xl p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{exp.role}</h3>
                        <p className="text-teal-500 font-medium mt-0.5">{exp.company}</p>
                      </div>
                      {badge && (
                        <span className={`${current ? 'chip-accent' : 'chip'} flex-shrink-0`}>{badge}</span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-5">
                      {exp.duration && <span className="flex items-center gap-1.5"><FiCalendar size={13} /> {exp.duration}</span>}
                      {exp.location && <span className="flex items-center gap-1.5"><FiMapPin size={13} /> {exp.location}</span>}
                    </div>

                    <ul className="space-y-2">
                      {exp.description.map((point, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-slate-400 text-sm leading-relaxed">
                          <span className="mt-2 w-1 h-1 rounded-full flex-shrink-0 bg-teal-500/70" />
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
};

export default Experience;
