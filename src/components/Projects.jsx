import React from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import { useContent } from '../content/ContentContext';
import SectionHeader from './SectionHeader';

const Projects = () => {
  const { projects, ui } = useContent();

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <SectionHeader eyebrow={ui.projectsEyebrow} title={ui.projectsTitle} className="mb-14" />

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((project, idx) => (
            <div
              key={`${idx}-${project.title}`}
              className="section-reveal"
              style={{ '--reveal-delay': `${(idx % 2) * 100}ms` }}
            >
              <article className="glass-card rounded-2xl p-6 h-full flex flex-col">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="min-w-0">
                    {project.category && (
                      <p className="text-teal-500 text-[11px] font-semibold uppercase tracking-widest mb-1.5">
                        {project.category}
                      </p>
                    )}
                    <h3 className="text-lg font-semibold text-white leading-snug">{project.title}</h3>
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="icon-btn flex-shrink-0 hover:!text-teal-500"
                      aria-label={`View ${project.title}`}
                    >
                      <FiArrowUpRight size={16} />
                    </a>
                  )}
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.techStack.split(',').map((t) => t.trim()).filter(Boolean).map((t, i) => (
                    <span key={i} className="chip">{t}</span>
                  ))}
                </div>

                {/* Description bullets */}
                <ul className="space-y-2">
                  {project.description.slice(0, 3).map((point, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-slate-400 text-sm leading-relaxed">
                      <span className="mt-2 w-1 h-1 rounded-full flex-shrink-0 bg-teal-500/70" />
                      {point.trim()}
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          ))}
        </div>

        {projects.length === 0 && ui.projectsEmpty && (
          <p className="text-center text-slate-500 py-12">{ui.projectsEmpty}</p>
        )}
      </div>
    </section>
  );
};

export default Projects;
