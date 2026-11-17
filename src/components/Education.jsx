import React from 'react';
import { FiCalendar } from 'react-icons/fi';
import { useContent } from '../content/ContentContext';
import SectionHeader from './SectionHeader';

const Education = () => {
  const { education, ui } = useContent();
  return (
    <section id="education" className="py-24 px-6 bg-white/[.012]">
      <div className="max-w-4xl mx-auto">

        <SectionHeader eyebrow={ui.educationEyebrow} title={ui.educationTitle} />

        <div className="relative pl-[52px]">

          {/* Vertical line */}
          <div className="timeline-line absolute left-[18px] top-3 bottom-3 w-px" />

          <div className="space-y-6">
            {education.map((edu, idx) => (
              <div key={idx} className="relative section-reveal" style={{ '--reveal-delay': `${idx * 90}ms` }}>

                {/* Dot */}
                <div className="timeline-dot absolute -left-[40px] top-[24px] w-[13px] h-[13px] z-[1]" />

                {/* Card */}
                <div className="glass-card rounded-2xl p-5">
                  <div className="flex flex-wrap gap-3 items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-white leading-snug">{edu.degree}</h3>
                      {edu.institution && <p className="text-slate-400 text-sm mt-1">{edu.institution}</p>}
                    </div>
                    {edu.grade && <span className="chip flex-shrink-0">{edu.grade}</span>}
                  </div>
                  {edu.year && (
                    <div className="flex items-center gap-1.5 text-slate-500 text-xs mt-3">
                      <FiCalendar size={12} /> {edu.year}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
