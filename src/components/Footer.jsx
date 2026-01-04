import React from 'react'
import { FaLinkedin, FaGithub, FaEnvelope, FaInstagram, FaWhatsapp } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 text-center border-t border-gray-800">
      <div className="flex justify-center gap-6 text-2xl mb-4">
        <a
          href="https://www.linkedin.com/in/kushal-jain-0a2554204/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-teal-400 transition"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/Kushal0jain"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-teal-400 transition"
          aria-label="GitHub"
        >
          <FaGithub />
        </a>
        <a
           href="mailto:jainkushal0909@gmail.com?subject=Let%27s%20Connect&body=Hi%20Kushal,%0AI%20wanted%20to%20reach%20out%20to%20you!"
           className="hover:text-teal-400 transition"
           target="_blank"
           rel="noopener noreferrer"
           aria-label="Email"
        >
          <FaEnvelope />
        </a>
        <a
          href="https://www.instagram.com/kushal._._.jain/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-teal-400 transition"
          aria-label="Instagram"
        >
          <FaInstagram />
        </a>
        <a
          href="https://wa.me/917727012340?text=Hi%20Kushal!%20I%20want%20to%20connect%20with%20you."
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-teal-400 transition"
          aria-label="WhatsApp"
        >
          <FaWhatsapp />
        </a>
      </div>

      <p className="text-sm text-gray-400">
        © {new Date().getFullYear()} Kushal Jain. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
