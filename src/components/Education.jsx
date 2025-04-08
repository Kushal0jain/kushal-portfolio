import React from "react";
import education from "../data/education";

const Education = () => {
  return (
    <section id="education" className="py-10 px-6 bg-gray-50">
      <h2 className="text-2xl font-bold text-center mb-6">Education</h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {education.map((edu, index) => (
          <div
            key={index}
            className="border p-4 rounded-xl shadow bg-white"
          >
            <h3 className="text-lg font-semibold text-indigo-700">
              {edu.degree}
            </h3>
            <p className="text-sm text-gray-600">{edu.institution}</p>
            <p className="text-sm text-gray-500">
              {edu.year} | {edu.grade}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
