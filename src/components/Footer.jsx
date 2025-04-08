import React from "react";
import { Github, Linkedin, Instagram } from "lucide-react";


const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-lg font-semibold mb-2">Let's Connect!</p>
        <p className="text-sm mb-4">
          Email: <a href="mailto:jainkushal0909@gmail.com" className="underline hover:text-indigo-400">jainkushal0909@gmail.com</a>
        </p>
        <p className="text-sm mb-4">
          Phone: <a href="tel: +91 7727012340" className="underline hover:text-indigo-400">+91 7727012340</a>
        </p>
        <div className="flex justify-center gap-6 text-sm mb-2">
  <a
    href="https://www.linkedin.com/in/kushal-jain-0a2554204/"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-indigo-400 transition"
  >
    <Linkedin size={20} />
  </a>
  <a
    href="https://github.com/kushal0jain"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-indigo-400 transition"
  >
    <Github size={20} />
  </a>
  <a
    href="https://www.instagram.com/kushal._._.jain/" 
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-indigo-400 transition"
  >
    <Instagram size={20} />
  </a>
</div>

<p className="text-xs text-gray-400 mt-2">
  © {new Date().getFullYear()} Kushal Jain. Built with ❤️
</p>
      </div>
    </footer>
  );
};

export default Footer;
