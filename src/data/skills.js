import {
  FaReact,
  FaJava,
  FaHtml5,
  FaCss3Alt,
  FaGithub,
  FaDatabase,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiMysql,
  SiMongodb,
  SiTypescript,
} from "react-icons/si";

export const skills = [
  {
    name: "React",
    icon: <FaReact className="text-cyan-400" />,
    description: [
      "Built responsive and dynamic user interfaces for web applications using React components.",
      "Implemented reusable UI elements to streamline development and enhance user experience.",
    ],
  },
  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss className="text-teal-300" />,
    description: [
      "Created visually stunning and responsive user interfaces using Tailwind CSS.",
      "Implemented custom CSS classes to style components and elements for a clean and modern design.",
    ],
  },
  {
    name: "Java",
    icon: <FaJava className="text-orange-400" />,
    description: [
      "Developed backend logic for banking and ATM systems using Core Java.",
      "Applied OOP principles to structure and maintain scalable backend applications.",
    ],
  },
  {
    name: "TypeScript",
    icon: <SiTypescript className="text-blue-400" />,
    description: [
      "Used TypeScript with React to write type-safe, error-free frontend code.",
      "Improved project maintainability and code readability with strict typing.",
    ],
  },
  {
    name: "HTML",
    icon: <FaHtml5 className="text-orange-500" />,
    description: [
      "Structured content across multiple web projects using semantic HTML elements.",
      "Ensured accessibility and SEO-friendliness by following best practices.",
    ],
  },
  {
    name: "CSS",
    icon: <FaCss3Alt className="text-blue-500" />,
    description: [
      "Styled custom components and added animations to enhance UI aesthetics.",
      "Maintained consistency across webpages with modular and responsive CSS.",
    ],
  },
  {
    name: "SQL",
    icon: <FaDatabase className="text-yellow-400" />,
    description: [
      "Wrote optimized queries for CRUD operations in relational databases.",
      "Created and managed schemas, constraints, and stored procedures for projects.",
    ],
  },
  {
    name: "MySQL",
    icon: <SiMysql className="text-blue-300" />,
    description: [
      "Integrated MySQL for data persistence in Java-based backend systems.",
      "Handled user authentication and transactions with secure MySQL queries.",
    ],
  },
  {
    name: "MongoDB",
    icon: <SiMongodb className="text-green-400" />,
    description: [
      "Used MongoDB to manage unstructured data in MERN stack projects.",
      "Designed schemas with Mongoose to support dynamic and scalable data models.",
    ],
  },
  {
    name: "GitHub",
    icon: <FaGithub className="text-white" />,
    description: [
      "Collaborated on multiple projects using GitHub for version control and code sharing.",
      "Managed repositories, pull requests, and project documentation efficiently.",
    ],
  },
  {
    name: "VS Code",
    icon: (
      <svg width="48" height="48" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        <path d="M180.8 252.6c4 1.6 8.6 1.5 12.7-.5l52.5-25.3c5.5-2.7 9-8.2 9-14.4V41.2c0-6.1-3.5-11.7-9-14.4L193.5 1.6c-5.3-2.5-11.6-2.1-16.5 1.1L3.5 161.5c-4.6 4.2-4.6 11.5 0 15.7l14.1 12.8c3.8 3.4 9.5 3.7 13.6.6l207-152.9" fill="#0066B8"/>
        <path d="M180.8 3.4c4-1.6 8.6-1.5 12.7.5l52.5 25.3c5.5 2.7 9 8.2 9 14.4v171.3c0 6.1-3.5 11.7-9 14.4l-52.5 25.3c-5.3 2.5-11.6 2.1-16.5-1.1L3.5 94.5c-4.6-4.2-4.6-11.5 0-15.7l14.1-12.8c3.8-3.4 9.5-3.7 13.6-.6l207 152.9" fill="#0098FF"/>
        <path d="M175.5 249c-4.8-4.8-4.8-12.5 0-17.3l50-50c4.8-4.8 12.5-4.8 17.3 0s4.8 12.5 0 17.3l-50 50c-4.8 4.8-12.5 4.8-17.3 0z" fill="#0066B8"/>
        <path d="M175.5 7.1c-4.8 4.8-4.8 12.5 0 17.3l50 50c4.8 4.8 12.5 4.8 17.3 0s4.8-12.5 0-17.3l-50-50c-4.8-4.8-12.5-4.8-17.3 0z" fill="#0066B8"/>
      </svg>
    ),
    description: [
      "Efficiently worked with VS Code for coding and debugging.",
      "Utilized extensions like ESLint, Prettier, and Live Server for enhanced development experience.",
    ],
  },
  {
    name: "OOPS Concepts",
    icon:(
      <svg width="64" height="64" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="128" height="128" rx="12" fill="#1F2937"/>
        <rect x="18" y="16" width="92" height="72" rx="10" fill="#0EA5B7" stroke="#000" stroke-width="4"/>
        <rect x="18" y="16" width="92" height="18" rx="10" fill="#22C1F1" stroke="#000" stroke-width="4"/>
        <circle cx="30" cy="25" r="3" fill="#0B5563"/>
        <circle cx="40" cy="25" r="3" fill="#0B5563"/>
        <circle cx="50" cy="25" r="3" fill="#0B5563"/>
        <rect x="26" y="36" width="76" height="44" rx="6" fill="#F3F4F6" stroke="#000" stroke-width="4"/>
        <text x="64" y="62" font-family="monospace" font-size="20" font-weight="700" text-anchor="middle" fill="#111">&lt;OOP&gt;</text>
        <line x1="42" y1="68" x2="86" y2="68" stroke="#111" stroke-width="4"/>
        <rect x="54" y="88" width="20" height="10" fill="#9CA3AF" stroke="#000" stroke-width="4"/>
        <rect x="42" y="98" width="44" height="10" rx="4" fill="#6B7280" stroke="#000" stroke-width="4"/>
      </svg>

    ),
    description: [
      "Used Git for version control and collaboration in multiple projects.",
      "Managed branches, commits, and pull requests effectively.",
    ],
  }
];
