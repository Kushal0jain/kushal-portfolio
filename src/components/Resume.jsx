import React from 'react'

const Resume = () => {
  return (
    <section id="resume" className="bg-gray-900 text-white py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-teal-400 mb-6">Resume</h2>
        <p className="text-gray-400 mb-6">
          Click below to download or view my latest resume in PDF format.
        </p>
        <div className="flex justify-center gap-6 flex-wrap">
          <a
            href="/Resume_kushal.pdf"
            download
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-xl transition-all"
          >
            Download
          </a>
        </div>
      </div>
    </section>
  )
}

export default Resume
