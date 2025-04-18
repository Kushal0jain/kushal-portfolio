import React, { useState } from 'react'
import { skills } from '../data/skills'

const Skills = () => {
  const [selectedSkill, setSelectedSkill] = useState(null)
  const [showAll, setShowAll] = useState(false)

  const visibleSkills = showAll ? skills : skills.slice(0, 5)

  return (
    <section id="skills" className="bg-black text-white py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-teal-400 mb-12">Skills</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 mb-8">
          {visibleSkills.map((skill, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedSkill(skill)}
              className="cursor-pointer bg-gray-800 hover:bg-gray-700 p-6 rounded-xl shadow-lg flex flex-col items-center transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="text-5xl mb-3 text-teal-400">{skill.icon}</div>
              <p className="text-lg font-semibold">{skill.name}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => setShowAll(!showAll)}
          className="text-teal-400 underline text-lg hover:text-teal-200 transition"
        >
          {showAll ? 'Show Less' : 'View More'}
        </button>
      </div>

      {/* Modal */}
      {selectedSkill && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setSelectedSkill(null)}
        >
          <div
            className="bg-white text-black rounded-xl p-8 w-11/12 max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedSkill(null)}
              className="absolute top-2 right-3 text-2xl text-gray-600 hover:text-black"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold text-teal-500 mb-4">
              {selectedSkill.name}
            </h3>
            <p className="text-base">{selectedSkill.description}</p>
          </div>
        </div>
      )}
    </section>
  )
}

export default Skills
