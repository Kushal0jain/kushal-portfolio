import React from 'react'

const About = () => {
  return (
    <section
      id="about"
      className="bg-gray-900 text-white py-16 px-6 md:px-12 flex flex-col items-center"
    >
      <h2 className="text-3xl font-bold text-teal-400 mb-6">About Me</h2>

      <p className="max-w-4xl text-center text-lg text-gray-300 leading-relaxed">
        I'm a passionate developer with a background in science, now fully immersed in tech.
        After completing my MCA from Poornima University, I transitioned into software
        development, learning and building with Core Java, React, Tailwind CSS, SQL, and backend tools
        like MySql, MongoDB.
        <br /><br />
        I’ve worked on projects like Banking System and a responsive UI for a
        content analysis platform during my internship at ZPLYS.AI. I love clean code, solving
        logic problems, and turning ideas into reality.
      </p>
    </section>
  )
}

export default About
