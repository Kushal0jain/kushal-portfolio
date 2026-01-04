import React, { useState } from 'react'

const navLinks = ['Home', 'About', 'Skills', 'Resume', 'Experience','Certificates']

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = (id) => {
    const el = document.getElementById(id.toLowerCase())
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-950 shadow-lg text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 onClick={() => handleClick('Home')} className="text-2xl font-bold text-teal-400 cursor-pointer font-poppins">
          Kushal Jain
        </h1>

        <div className="hidden md:flex gap-6">
          {navLinks.map((link, i) => (
            <button key={i} onClick={() => handleClick(link)} className="hover:text-teal-300 transition" >
              {link}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="focus:outline-none" aria-hidden="true" onClick={() => setIsOpen(!isOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4">
          {navLinks.map((link, i) => (
            <button key={i} onClick={() => handleClick(link)} className="text-left hover:text-teal-300 transition">
              {link}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Navbar
