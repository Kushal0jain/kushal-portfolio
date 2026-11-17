import React from 'react';
import { useContent } from '../content/ContentContext';
import { socialPlatform } from '../content/icons';
import { initials } from './Navbar';
import { visibleSections } from '../content/navigation';
import { fillTemplate } from '../content/accents';

const Footer = () => {
  const { profile, socials, ui } = useContent();
  const quickLinks = visibleSections(ui);
  const vars = { name: profile.name, firstName: (profile.name || '').split(' ')[0], year: new Date().getFullYear() };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[var(--glass-bg)] border-t border-[var(--glass-border)] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 py-12">

        <div className="grid md:grid-cols-3 gap-10 mb-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="icon-tile w-9 h-9 font-bold text-sm">
                {initials(profile.name)}
              </div>
              <span className="text-white font-semibold text-lg tracking-tight">{profile.name}</span>
            </div>
            {profile.footerTagline && (
              <p className="text-slate-500 text-sm leading-relaxed">{profile.footerTagline}</p>
            )}
          </div>

          {/* Quick links */}
          {quickLinks.length > 0 && (
            <div>
              {ui.quickLinksHeading && <h4 className="text-white font-semibold text-sm mb-4">{ui.quickLinksHeading}</h4>}
              <div className="flex flex-col gap-2.5">
                {quickLinks.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className="text-slate-500 hover:text-teal-400 text-sm transition-colors text-left"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Social */}
          {socials.length > 0 && (
            <div>
              {ui.connectHeading && <h4 className="text-white font-semibold text-sm mb-4">{ui.connectHeading}</h4>}
              <div className="flex flex-wrap gap-3">
                {socials.map(({ platform, url }, i) => {
                  const { Icon, label } = socialPlatform(platform);
                  const external = !url.startsWith('mailto:');
                  return (
                    <a
                      key={i}
                      href={url}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noreferrer' : undefined}
                      aria-label={label}
                      title={label}
                      className="social-icon"
                    >
                      <Icon />
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[var(--glass-border)]">
          {ui.copyright && <p className="text-slate-600 text-sm">{fillTemplate(ui.copyright, vars)}</p>}
          {ui.builtWith && <p className="text-slate-600 text-xs">{fillTemplate(ui.builtWith, vars)}</p>}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
