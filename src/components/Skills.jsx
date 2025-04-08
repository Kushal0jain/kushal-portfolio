import React from "react";
import skills from "../data/skills";

const Skills = () => {
  return (
    <section id="skills" className="py-10 px-6 bg-gray-50">
      <h2 className="text-2xl font-bold text-center mb-6">Skills</h2>
      <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow p-3 text-center text-sm font-medium text-indigo-700 border border-indigo-200"
          >
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
