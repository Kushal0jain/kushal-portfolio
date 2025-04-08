import React from "react";
import certifications from "../data/certifications";

const Certifications = () => {
  return (
    <section
      id="certifications"
      className="py-20 px-6 sm:px-12 bg-gradient-to-br from-slate-900 to-slate-800 text-white"
    >
      <h2 className="text-4xl font-bold text-center mb-12 tracking-wide">
        Certifications
      </h2>

      <div className="max-w-4xl mx-auto space-y-6">
        {certifications.map((cert, index) => (
          <a
            key={index}
            href={cert.link} // assuming 'link' is the key
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <div className="bg-white/5 border border-white/10 p-5 sm:p-6 rounded-2xl shadow-md hover:shadow-xl backdrop-blur-md transition duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-white/10">
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {cert.title}
                </h3>
                <p className="text-sm text-white/70">{cert.issuer}</p>
              </div>
              <span className="text-sm text-white/50 mt-2 sm:mt-0">
                {cert.year}
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
