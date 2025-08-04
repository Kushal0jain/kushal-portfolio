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
    // icon: <visual-studio className="text-white" />,
    icon: (
      <img
        src="https://img.icons8.com/color/48/000000/visual-studio-code-2019.png"
        alt="Visual Studio Code"
        className="w-12 h-12"
      />
    ),
    description: [
      "Efficiently worked with VS Code for coding and debugging.",
      "Utilized extensions like ESLint, Prettier, and Live Server for enhanced development experience.",
    ],
  },
  {
    name: "OOPS Concepts",
    icon:(
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv2nZppWxb1n29A1HiA-umuOhkQNvXU3ymSdMmZ2M3Zl1PoOPIW-K1bDY&s"
        alt="Object-Oriented Programming"
        className="w-12 h-12"
      />
    ),
    description: [
      "Used Git for version control and collaboration in multiple projects.",
      "Managed branches, commits, and pull requests effectively.",
    ],
  }
];
