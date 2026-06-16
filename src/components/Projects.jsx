import React from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import projects from '../data/projects';

const bannerGradients = [
  'linear-gradient(135deg, #14b8a6, #06b6d4)',
  'linear-gradient(135deg, #8b5cf6, #ec4899)',
  'linear-gradient(135deg, #f59e0b, #ef4444)',
  'linear-gradient(135deg, #3b82f6, #8b5cf6)',
];

const Projects = () => {
  const visible = projects;

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10 section-reveal">
          <p className="text-teal-400 text-sm font-semibold tracking-widest uppercase mb-3">My Work</p>
          <h2 className="section-title">Projects</h2>
        </div>

        {/* Filter tabs */}
        {/* <div className="flex justify-center gap-3 mb-12 section-reveal">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300"
              style={
                filter === f
                  ? {
                      background: 'linear-gradient(135deg, #14b8a6, #8b5cf6)',
                      color: '#fff',
                      boxShadow: '0 6px 20px rgba(20,184,166,.3)',
                    }
                  : {
                      background: 'rgba(255,255,255,.05)',
                      color: '#94a3b8',
                      border: '1px solid rgba(255,255,255,.1)',
                    }
              }
            >
              {f}
              {f !== 'All' && (
                <span
                  className="ml-2 px-1.5 py-0.5 rounded-full text-xs"
                  style={{
                    background: filter === f ? 'rgba(255,255,255,.25)' : 'rgba(255,255,255,.08)',
                    fontSize: '0.65rem',
                  }}
                >
                  {projects.filter((p) => p.category === f).length}
                </span>
              )}
            </button>
          ))}
        </div> */}

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {visible.map((project, idx) => {
            const origIdx = projects.indexOf(project);
            const gradient = bannerGradients[origIdx % bannerGradients.length];
            const dotColor = gradient.includes('#14b8a6') ? '#14b8a6' : '#8b5cf6';
            return (
              <div
                key={project.title}
                className="project-card glass-card rounded-2xl overflow-hidden section-reveal"
                style={{
                  transitionDelay: `${(idx % 2) * 100}ms`,
                  animation: 'scaleIn .35s cubic-bezier(.175,.885,.32,1.275) forwards',
                }}
              >
                {/* Gradient banner */}
                <div className="h-2 w-full" style={{ background: gradient }} />

                {/* Body */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 mr-3">
                      <h3 className="text-lg font-bold text-white leading-snug">{project.title}</h3>
                      <span
                        className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-semibold"
                        style={{
                          background: project.category === 'Java'
                            ? 'rgba(249,115,22,.12)' : 'rgba(6,182,212,.12)',
                          color: project.category === 'Java' ? '#f97316' : '#06b6d4',
                          border: `1px solid ${project.category === 'Java' ? 'rgba(249,115,22,.25)' : 'rgba(6,182,212,.25)'}`,
                        }}
                      >
                        {project.category}
                      </span>
                    </div>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 hover:scale-110"
                      style={{
                        background: 'rgba(20,184,166,.1)',
                        color: '#14b8a6',
                        border: '1px solid rgba(20,184,166,.25)',
                      }}
                      aria-label={`View ${project.title}`}
                    >
                      <FiArrowUpRight size={16} />
                    </a>
                  </div>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.techStack.split(', ').map((t, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-full text-xs font-medium"
                        style={{
                          background: 'rgba(20,184,166,.1)',
                          color: '#14b8a6',
                          border: '1px solid rgba(20,184,166,.2)',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Description bullets */}
                  <ul className="space-y-1.5">
                    {project.description.slice(0, 3).map((point, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-slate-400 text-sm leading-relaxed">
                        <span
                          className="mt-2 w-1 h-1 rounded-full flex-shrink-0"
                          style={{ background: dotColor }}
                        />
                        {point.trim()}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {visible.length === 0 && (
          <p className="text-center text-slate-500 py-12">No projects in this category yet.</p>
        )}
      </div>
    </section>
  );
};

export default Projects;
