import React from 'react';
import { useContent } from '../content/ContentContext';
import RichText from '../content/RichText';
import SectionHeader from './SectionHeader';
import { statIcon } from '../content/icons';

const About = () => {
  const { profile, stats, experience, ui } = useContent();
  // The "currently at" card follows the Experience entry marked "Present",
  // so it never goes stale when the job changes.
  const current = experience.find((e) => (e.duration || '').includes('Present'));
  const currentSince = current?.duration?.split(/\s+[–-]\s+/)[0];

  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">

        <SectionHeader eyebrow={ui.aboutEyebrow} title={ui.aboutTitle} />

        <div className="grid lg:grid-cols-2 gap-14 items-start">

          {/* Left – Bio */}
          <div className="section-reveal-left space-y-5">
            {profile.aboutParagraphs.map((para, i) => (
              <p key={i} className="text-slate-400 leading-relaxed text-base">
                <RichText text={para} />
              </p>
            ))}
            <div className="flex flex-wrap gap-4 pt-4">
              {ui.showContact !== false && ui.aboutPrimaryCta && (
                <a href="#contact" className="btn-primary text-sm py-3 px-7"><span className="relative z-10">{ui.aboutPrimaryCta}</span></a>
              )}
              {profile.resume && ui.aboutResumeCta && (
                <a href={profile.resume} target="_blank" rel="noreferrer" className="btn-outline text-sm py-3 px-7">{ui.aboutResumeCta}</a>
              )}
            </div>
          </div>

          {/* Right – Stats */}
          <div className="section-reveal-right grid grid-cols-2 gap-4" style={{ '--reveal-delay': '120ms' }}>
            {stats.map(({ icon, label, value }, i) => {
              const Icon = statIcon(icon);
              return (
                <div key={i} className="glass-card rounded-2xl p-6 text-center">
                  <div className="icon-tile w-11 h-11 mx-auto mb-4">
                    <Icon size={18} />
                  </div>
                  <p className="text-3xl font-bold tracking-tight text-white mb-1">{value}</p>
                  <p className="text-slate-500 text-sm font-medium">{label}</p>
                </div>
              );
            })}

            {/* Core Strengths */}
            {profile.strengths.length > 0 && (
              <div className="glass-card col-span-2 rounded-2xl p-5">
                {ui.strengthsLabel && <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-3">{ui.strengthsLabel}</p>}
                <div className="flex flex-wrap gap-2">
                  {profile.strengths.map((s) => (
                    <span key={s} className="chip">{s}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Current role */}
            {current && (
              <div className="glass-card col-span-2 rounded-2xl p-5 flex items-center gap-4">
                <span className="h-2.5 w-2.5 flex-shrink-0 rounded-full bg-teal-500 ring-4 ring-teal-500/15" />
                <div>
                  <p className="text-white font-semibold text-sm">{[ui.currentlyAtLabel, current.company].filter(Boolean).join(' ')}</p>
                  <p className="text-slate-500 text-xs mt-0.5">
                    {[current.role, current.location, currentSince && `${currentSince} – Present`].filter(Boolean).join(' · ')}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
