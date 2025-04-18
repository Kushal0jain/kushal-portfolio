import React from "react";
import certifications from "../data/certifications";

const Certifications = () => {
  return (
    <section id="certificates" className="bg-gray-900 text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-teal-400 text-center mb-12">Certificates</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="bg-gray-800 p-5 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl text-teal-300 font-semibold mb-1">{cert.title}</h3>
              <p className="text-gray-400">{cert.issuer} • {cert.year}</p>
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-400 text-sm mt-2 inline-block hover:underline"
              >
                View Certificate →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
