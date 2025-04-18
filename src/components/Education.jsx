import React from 'react'
import education from '../data/education'

const Education = () => {
  return (
    <section id="education" className="bg-gray-900 text-white py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-teal-400 text-center mb-12">Education</h2>
        <div className="space-y-8">
          {education.map((edu, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-xl shadow">
              <h3 className="text-xl font-semibold text-teal-300">{edu.degree}</h3>
              <p className="text-gray-300">{edu.institution}</p>
              <p className="text-gray-400 text-sm">{edu.year}</p>
              <p className="text-gray-400 text-sm">Result: {edu.grade}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Education
