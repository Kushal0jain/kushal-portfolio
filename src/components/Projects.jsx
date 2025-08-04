import React from 'react'
import projects from '../data/projects'

const Projects = () => {
  return (
    <section id="projects" className="bg-black text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-teal-400 text-center mb-12">Projects</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="relative bg-gray-800 p-6 rounded-xl border-l-4 border-teal-400"
            >
              <h3 className="text-xl font-semibold text-teal-300 mb-2">{project.title}</h3>
              <p className="text-gray-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 text-sm mb-4">
                {project.tech?.map((t, i) => (
                  <span
                    key={i}
                    className="bg-teal-800 text-white px-2 py-1 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-400 hover:underline"
              >
                View 
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
