import React from 'react'
import experience from '../data/experience'

const Experience = () => {
  return (
    <section id="experience" className="bg-black text-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-teal-400 text-center mb-12">Experience</h2>
        <div className="flex flex-col gap-10">
          {experience.map((exp, idx) => (
            <div key={idx} className="relative bg-gray-800 p-6 rounded-xl pl-6 border-l-4 border-teal-400">
              <div className="mb-1 text-teal-300 font-semibold">{exp.duration}</div>
              <h3 className="text-xl font-bold">{exp.title}</h3>
              <p className="italic text-gray-400 mb-1">{exp.company}</p>
              <p className="text-gray-300">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
