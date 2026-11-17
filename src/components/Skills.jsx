import React, { useState } from 'react';
import { useContent } from '../content/ContentContext';
import { renderSkillIcon } from '../content/skillIcons';
import SectionHeader from './SectionHeader';

const Skills = () => {
  const { skills, ui } = useContent();
  const [hovered, setHovered] = useState(null);

  return (
    <section id="skills" className="py-24 px-6 bg-white/[.012]">
      <div className="max-w-6xl mx-auto">

        <SectionHeader eyebrow={ui.skillsEyebrow} title={ui.skillsTitle} />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 section-reveal">
          {skills.map((s, idx) => {
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
                  <div className="h-8 mb-2 flex items-center justify-center text-[1.75rem] [&_svg]:max-h-8 [&_svg]:w-auto">
                    {renderSkillIcon(s.icon)}
                  </div>
                  <h3 className="font-medium text-xs text-white">{s.name}</h3>
                </div>

                {/* Details — fades in over the card on hover */}
                {isHovered && (
                  <div className="popover absolute top-0 left-0 right-0 rounded-xl p-4">
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="h-6 flex items-center flex-shrink-0 text-2xl [&_svg]:max-h-6 [&_svg]:w-auto">
                        {renderSkillIcon(s.icon)}
                      </div>
                      <div>
                        <p className="text-white font-semibold text-xs leading-tight">{s.name}</p>
                        {s.level && (
                          <p className="text-teal-500 text-[10px] font-semibold uppercase tracking-wider">{s.level}</p>
                        )}
                      </div>
                    </div>
                    <ul className="space-y-1.5">
                      {s.description.map((line, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-400 text-[11px] leading-snug">
                          <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0 bg-teal-500/70" />
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
