import React from 'react'
import { skills } from '../data/skills'

const Skills = () => {
  return (
    <section id="skills" className="bg-black text-white py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-teal-400 mb-12">Skills</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 mb-8">
          {skills.map((skill, idx) => (
            <div
              key={idx}
              className="bg-gray-800 hover:bg-gray-700 p-6 rounded-xl shadow-lg flex flex-col items-center transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="text-5xl mb-3 text-teal-400">{skill.icon}</div>
              <p className="text-lg font-semibold">{skill.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
