import React from 'react';
import {
  FaReact, FaJava, FaHtml5, FaCss3Alt, FaGithub, FaDatabase, FaJs, FaNodeJs, FaPython,
  FaGitAlt, FaBootstrap, FaDocker, FaFigma, FaNpm, FaCode, FaAws, FaLinux, FaSass,
  FaAngular, FaVuejs, FaPhp,
} from 'react-icons/fa';
import {
  SiTailwindcss, SiMysql, SiMongodb, SiTypescript, SiNextdotjs, SiRedux, SiSpringboot,
  SiPostman, SiExpress, SiPostgresql, SiFirebase, SiVite, SiJquery, SiNetlify, SiVercel,
} from 'react-icons/si';

const VsCodeIcon = () => (
  <svg width="48" height="48" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
    <path d="M180.8 252.6c4 1.6 8.6 1.5 12.7-.5l52.5-25.3c5.5-2.7 9-8.2 9-14.4V41.2c0-6.1-3.5-11.7-9-14.4L193.5 1.6c-5.3-2.5-11.6-2.1-16.5 1.1L3.5 161.5c-4.6 4.2-4.6 11.5 0 15.7l14.1 12.8c3.8 3.4 9.5 3.7 13.6.6l207-152.9" fill="#0066B8" />
    <path d="M180.8 3.4c4-1.6 8.6-1.5 12.7.5l52.5 25.3c5.5 2.7 9 8.2 9 14.4v171.3c0 6.1-3.5 11.7-9 14.4l-52.5 25.3c-5.3 2.5-11.6 2.1-16.5-1.1L3.5 94.5c-4.6-4.2-4.6-11.5 0-15.7l14.1-12.8c3.8-3.4 9.5-3.7 13.6-.6l207 152.9" fill="#0098FF" />
    <path d="M175.5 249c-4.8-4.8-4.8-12.5 0-17.3l50-50c4.8-4.8 12.5-4.8 17.3 0s4.8 12.5 0 17.3l-50 50c-4.8 4.8-12.5 4.8-17.3 0z" fill="#0066B8" />
    <path d="M175.5 7.1c-4.8 4.8-4.8 12.5 0 17.3l50 50c4.8 4.8 12.5 4.8 17.3 0s4.8-12.5 0-17.3l-50-50c-4.8-4.8-12.5-4.8-17.3 0z" fill="#0066B8" />
  </svg>
);

const OopIcon = () => (
  <svg width="64" height="64" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="128" height="128" rx="12" fill="#1F2937" />
    <rect x="18" y="16" width="92" height="72" rx="10" fill="#0EA5B7" stroke="#000" strokeWidth="4" />
    <rect x="18" y="16" width="92" height="18" rx="10" fill="#22C1F1" stroke="#000" strokeWidth="4" />
    <circle cx="30" cy="25" r="3" fill="#0B5563" />
    <circle cx="40" cy="25" r="3" fill="#0B5563" />
    <circle cx="50" cy="25" r="3" fill="#0B5563" />
    <rect x="26" y="36" width="76" height="44" rx="6" fill="#F3F4F6" stroke="#000" strokeWidth="4" />
    <text x="64" y="62" fontFamily="monospace" fontSize="20" fontWeight="700" textAnchor="middle" fill="#111">&lt;OOP&gt;</text>
    <line x1="42" y1="68" x2="86" y2="68" stroke="#111" strokeWidth="4" />
    <rect x="54" y="88" width="20" height="10" fill="#9CA3AF" stroke="#000" strokeWidth="4" />
    <rect x="42" y="98" width="44" height="10" rx="4" fill="#6B7280" stroke="#000" strokeWidth="4" />
  </svg>
);

// Key → { label, render }. Skills store only the key, so content stays JSON
// and the admin panel can offer these as a dropdown.
export const SKILL_ICONS = {
  react:      { label: 'React',        render: () => <FaReact className="text-cyan-400" /> },
  tailwind:   { label: 'Tailwind CSS', render: () => <SiTailwindcss className="text-teal-300" /> },
  java:       { label: 'Java',         render: () => <FaJava className="text-orange-400" /> },
  typescript: { label: 'TypeScript',   render: () => <SiTypescript className="text-blue-400" /> },
  javascript: { label: 'JavaScript',   render: () => <FaJs className="text-yellow-300" /> },
  html:       { label: 'HTML',         render: () => <FaHtml5 className="text-orange-500" /> },
  css:        { label: 'CSS',          render: () => <FaCss3Alt className="text-blue-500" /> },
  sass:       { label: 'Sass',         render: () => <FaSass className="text-pink-400" /> },
  bootstrap:  { label: 'Bootstrap',    render: () => <FaBootstrap className="text-violet-500" /> },
  jquery:     { label: 'jQuery',       render: () => <SiJquery className="text-blue-400" /> },
  nextjs:     { label: 'Next.js',      render: () => <SiNextdotjs className="text-white" /> },
  redux:      { label: 'Redux',        render: () => <SiRedux className="text-violet-400" /> },
  angular:    { label: 'Angular',      render: () => <FaAngular className="text-red-500" /> },
  vue:        { label: 'Vue',          render: () => <FaVuejs className="text-green-400" /> },
  vite:       { label: 'Vite',         render: () => <SiVite className="text-violet-400" /> },
  nodejs:     { label: 'Node.js',      render: () => <FaNodeJs className="text-green-500" /> },
  express:    { label: 'Express',      render: () => <SiExpress className="text-white" /> },
  springboot: { label: 'Spring Boot',  render: () => <SiSpringboot className="text-green-500" /> },
  python:     { label: 'Python',       render: () => <FaPython className="text-yellow-400" /> },
  php:        { label: 'PHP',          render: () => <FaPhp className="text-indigo-400" /> },
  database:   { label: 'Database / SQL', render: () => <FaDatabase className="text-yellow-400" /> },
  mysql:      { label: 'MySQL',        render: () => <SiMysql className="text-blue-300" /> },
  postgresql: { label: 'PostgreSQL',   render: () => <SiPostgresql className="text-sky-400" /> },
  mongodb:    { label: 'MongoDB',      render: () => <SiMongodb className="text-green-400" /> },
  firebase:   { label: 'Firebase',     render: () => <SiFirebase className="text-amber-400" /> },
  github:     { label: 'GitHub',       render: () => <FaGithub className="text-white" /> },
  git:        { label: 'Git',          render: () => <FaGitAlt className="text-orange-500" /> },
  npm:        { label: 'npm',          render: () => <FaNpm className="text-red-500" /> },
  docker:     { label: 'Docker',       render: () => <FaDocker className="text-sky-400" /> },
  aws:        { label: 'AWS',          render: () => <FaAws className="text-amber-400" /> },
  linux:      { label: 'Linux',        render: () => <FaLinux className="text-white" /> },
  netlify:    { label: 'Netlify',      render: () => <SiNetlify className="text-[#32e6e2]" /> },
  vercel:     { label: 'Vercel',       render: () => <SiVercel className="text-white" /> },
  postman:    { label: 'Postman',      render: () => <SiPostman className="text-orange-500" /> },
  figma:      { label: 'Figma',        render: () => <FaFigma className="text-pink-400" /> },
  vscode:     { label: 'VS Code',      render: () => <VsCodeIcon /> },
  oop:        { label: 'OOP',          render: () => <OopIcon /> },
  code:       { label: 'Generic (code)', render: () => <FaCode className="text-teal-400" /> },
};

export const renderSkillIcon = (key) => (SKILL_ICONS[key] || SKILL_ICONS.code).render();
