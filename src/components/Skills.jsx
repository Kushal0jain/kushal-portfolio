import React from 'react'
import { skills } from '../data/skills'

const Skills = () => {
  return (
    <section id="skills" className="bg-black text-white py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-teal-400 mb-12">Skills</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {skills.map((skill, idx) => (
            <div
              key={idx}
              className="bg-gray-800 hover:bg-gray-700 p-6 rounded-xl shadow-md flex flex-col items-center transition transform hover:-translate-y-1"
            >
              <div className="text-4xl mb-2">{skill.icon}</div>
              <p className="text-lg font-medium">{skill.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
