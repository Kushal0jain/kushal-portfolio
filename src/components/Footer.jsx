import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const socials = [
  { icon: FaLinkedin,  href: 'https://www.linkedin.com/in/kushal-jain-0a2554204/', label: 'LinkedIn' },
  { icon: FaGithub,    href: 'https://github.com/Kushal0jain',                      label: 'GitHub' },
  { icon: FaEnvelope,  href: 'mailto:jainkushal0909@gmail.com',                     label: 'Email' },
  { icon: FaInstagram, href: 'https://www.instagram.com/kushal._._.jain/',          label: 'Instagram' },
  { icon: FaWhatsapp,  href: 'https://wa.me/917727012340',                           label: 'WhatsApp' },
];

const quickLinks = ['About', 'Skills', 'Experience', 'Projects', 'Contact'];

const Footer = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-black/[.55] border-t border-white/[.06]">
      <div className="max-w-6xl mx-auto px-6 py-12">

        <div className="grid md:grid-cols-3 gap-10 mb-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm bg-gradient-to-br from-teal-500 to-violet-500"
              >
                KJ
              </div>
              <span className="gradient-text font-bold text-lg">Kushal Jain</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Software Developer building scalable, clean-code solutions — from backend logic to pixel-perfect UIs.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <button
                  key={link}
                  onClick={() => scrollTo(link)}
                  className="text-slate-500 hover:text-teal-400 text-sm transition-colors text-left"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Connect</h4>
            <div className="flex flex-wrap gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="social-icon"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/[.06]">
          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} Kushal Jain. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs">
            Built with{' '}
            <span className="text-cyan-500">React</span>
            {' & '}
            <span className="text-teal-500">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
