import React from 'react';
import { FiArrowUpRight, FiAward } from 'react-icons/fi';
import { useContent } from '../content/ContentContext';
import SectionHeader from './SectionHeader';

const Certifications = () => {
  const { certifications, ui } = useContent();
  return (
    <section id="certificates" className="py-24 px-6 bg-white/[.012]">
      <div className="max-w-6xl mx-auto">

        <SectionHeader eyebrow={ui.certificationsEyebrow} title={ui.certificationsTitle} />

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {certifications.map((cert, idx) => (
            <div key={idx} className="section-reveal" style={{ '--reveal-delay': `${(idx % 3) * 80}ms` }}>
              <div className="glass-card rounded-2xl p-5 h-full flex flex-col">
                <div className="icon-tile w-11 h-11 mb-4">
                  <FiAward size={19} />
                </div>

                <h3 className="text-base font-semibold text-white mb-1 leading-snug">{cert.title}</h3>
                <p className="text-slate-500 text-sm mb-5 flex-1">{[cert.issuer, cert.year].filter(Boolean).join(' · ')}</p>

                {cert.link && ui.certificateLinkLabel && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1 text-sm font-medium text-teal-500"
                  >
                    {ui.certificateLinkLabel}
                    <FiArrowUpRight
                      size={14}
                      className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
