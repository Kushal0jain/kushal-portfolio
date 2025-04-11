import React from 'react'
import { FaLinkedin, FaGithub, FaEnvelope, FaInstagram } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 text-center border-t border-gray-800">
      <div className="flex justify-center gap-6 text-2xl mb-4">
        <a
          href="https://www.linkedin.com/in/kushal-jain-0a2554204/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-teal-400 transition"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/Kushal0jain"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-teal-400 transition"
        >
          <FaGithub />
        </a>
        <a
          href="mailto:jainkushal0909@gmail.com"
          className="hover:text-teal-400 transition"
        >
          <FaEnvelope />
        </a>
        <a
          href="https://www.instagram.com/kushal._._.jain/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-teal-400 transition"
        >
          <FaInstagram />
        </a>
      </div>

      <p className="text-sm text-gray-400">
        © {new Date().getFullYear()} Kushal Jain. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
