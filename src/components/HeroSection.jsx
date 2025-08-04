import React from 'react'

const HeroSection = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center items-center bg-black text-white px-4 text-center"
    >
      <img
        src="/profile.jpg"
        alt="Kushal Jain"
        className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-teal-400 mb-6"
      />

      <h1 className="text-4xl md:text-6xl font-bold text-teal-400 mb-4">
        Hey, I'm Kushal Jain
      </h1>
      <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
        Passionate about building clean, efficient, and scalable web applications.
        I love turning problems into solutions and learning along the way.
      </p>
      <div className="mt-8 flex gap-4">
        <a
          href="#projects"
          className="bg-teal-400 hover:bg-teal-500 text-black font-semibold px-6 py-3 rounded-full transition"
        >
          View Projects
        </a>
        <a
          href="#contact"
          className="border border-teal-400 hover:bg-teal-400 text-white hover:text-black font-semibold px-6 py-3 rounded-full transition"
        >
          Contact Me
        </a>
      </div>
    </section>
  )
}

export default HeroSection
