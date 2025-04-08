import { Code2 } from "lucide-react";
import projects from "../data/projects"; // adjust path if needed

const Projects = () => {
  return (
    <section id="projects" className="py-20 px-6 sm:px-12 bg-white text-gray-900">
      <h2 className="text-4xl font-bold text-center mb-12 tracking-wide text-gray-800">
        Projects
      </h2>

      <div className="max-w-5xl mx-auto space-y-10">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-lg transition duration-300"
          >
            <div className="flex items-center bg-inherit justify-between mb-3">
              <h3 className="text-2xl font-semibold text-gray-800">
                {project.title}
              </h3>
              <Code2 className="text-indigo-500" size={28} />
            </div>

            <div className="mb-3 flex flex-wrap gap-2">
              {project.techStack?.split(',').map((tech, i) => (
                <span
                  key={i}
                  className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full"
                >
                  {tech.trim()}
                </span>
              ))}
            </div>

            <ul className="list-disc list-inside space-y-2 text-gray-700 text-base mb-3">
              {project.description.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-indigo-600 hover:underline font-medium"
              >
                🔗 View Project
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
