import React from "react";
import profile from "../assets/profile.jpg";

const Hero = () => {
  return (
    <section id="home" className="bg-gray-100 py-10 pt-20 px-6 text-center">
      <img
        src={profile}
        alt="Kushal Jain"
        className="w-32 h-32 rounded-full mx-auto border-4 border-indigo-500"
      />
      <h1 className="text-3xl font-bold mt-4">Kushal Jain</h1>
      <p className="text-indigo-600 font-semibold mt-1">
        Java & Front-End Developer efsve
      </p>
      <p className="mt-2 text-gray-600 max-w-xl mx-auto">
        Passionate about building clean, efficient, and scalable web applications.
        I love turning problems into solutions and learning along the way.
      </p>
    </section>
  );
};

export default Hero;
