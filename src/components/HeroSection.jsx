import React from 'react';
import { useContent } from '../content/ContentContext';
import RichText from '../content/RichText';

const HeroSection = () => {
  const { profile, ui } = useContent();
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">

          {/* Left – Text */}
          <div className="flex-1 text-center lg:text-left">

            {profile.availability && (
              <p className="text-teal-500 text-sm font-semibold tracking-widest uppercase mb-5">
                {profile.availability}
              </p>
            )}

            <h1
              className="font-black leading-tight mb-4 text-slate-50"
              style={{ fontSize: 'clamp(2.4rem, 6vw, 4.8rem)' }}
            >
              {ui.heroGreeting && <>{ui.heroGreeting}<br /></>}
              <span className="text-teal-500">{profile.name}</span>
            </h1>

            {profile.role && (
              <p
                className="text-slate-400 font-semibold mb-6"
                style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)' }}
              >
                {profile.role}
              </p>
            )}

            {profile.intro && (
              <p className="text-slate-400 leading-relaxed mb-9 max-w-lg mx-auto lg:mx-0 text-base">
                <RichText text={profile.intro} emClassName="text-teal-500 font-semibold" />
              </p>
            )}

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              {ui.showProjects !== false && ui.heroPrimaryCta && (
                <a href="#projects" className="btn-primary">
                  <span className="relative z-10">{ui.heroPrimaryCta}</span>
                </a>
              )}
              {profile.resume && ui.heroResumeCta && (
                <a href={profile.resume} target="_blank" rel="noreferrer" className="btn-outline">
                  {ui.heroResumeCta}
                </a>
              )}
            </div>
          </div>

          {/* Right – Profile image */}
          {profile.photo && (
            <div className="flex-shrink-0">
              <div className="w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden p-1.5 border border-[var(--border-strong)]">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img
                    src={profile.photo}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                    fetchPriority="high"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
