import React from "react";
import { Mail, Phone, MapPin, User, Briefcase } from "lucide-react";
import about from "../data/about";

const About = () => {
  return (
    <section id="about" className="py-20 px-6 sm:px-12 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
      <h2 className="text-5xl font-extrabold text-center mb-14 tracking-tight drop-shadow-md">
        Who I Am
      </h2>

      <div className="max-w-6xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-lg p-10 sm:p-16 transition-all duration-300">
        <div className="grid md:grid-cols-2 gap-12 text-sm sm:text-base">
          <div className="space-y-6 text-white/90">
            <InfoRow icon={<User className="text-yellow-300" size={22} />} label="Name" value={about.name} />
            <InfoRow icon={<Briefcase className="text-green-300" size={22} />} label="Role" value={about.role} />
            <InfoRow icon={<MapPin className="text-pink-300" size={22} />} label="Location" value={about.location} />
            <InfoRow icon={<Mail className="text-cyan-300" size={22} />} label="Email" value={about.email} />
            <InfoRow icon={<Phone className="text-orange-300" size={22} />} label="Phone" value={about.phone} />
          </div>

          <div className="flex items-center">
            <p className="text-white/80 text-lg sm:text-xl font-serif italic tracking-wide leading-relaxed">
              {about.summary}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 hover:scale-[1.02] transition-all duration-300">
    {icon}
    <strong className="min-w-[90px] font-medium text-white">{label}:</strong>
    <span className="text-white/80">{value}</span>
  </div>
);

export default About;
