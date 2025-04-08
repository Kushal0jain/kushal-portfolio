import { Briefcase } from "lucide-react";
import experience from "../data/experience"; // ensure correct path

const Experience = () => {
  return (
    <section id="experience" className="py-20 px-6 sm:px-12 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <h2 className="text-4xl font-bold text-center mb-12 tracking-wide">
        Experience
      </h2>

      <div className="max-w-5xl mx-auto space-y-10">
        {experience.map((exp, index) => (
          <div
            key={index}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition duration-300 backdrop-blur-md"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-1">
                  {exp.role}
                </h3>
                <p className="text-sm text-gray-300">
                  {exp.company} — {exp.location}
                </p>
              </div>
              <Briefcase size={28} className="text-indigo-400" />
            </div>
            <p className="text-sm text-gray-400 mb-4">{exp.duration}</p>
            <ul className="list-disc list-inside space-y-2 text-gray-200 text-base">
              {exp.description.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
