import { FaReact, FaJava, FaHtml5, FaCss3Alt, FaGitAlt, FaGithub, FaDatabase  } from 'react-icons/fa'
import { SiTailwindcss, SiMysql, SiMongodb, SiJavascript, SiTypescript, SiPostgresql } from 'react-icons/si'

export const skills = [
  { name: 'React', icon: <FaReact className="text-cyan-400" /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-teal-300" /> },
  { name: 'Java', icon: <FaJava className="text-orange-400" /> },
  { name: 'TypeScript', icon: <SiTypescript className="text-blue-400" /> },
  { name: 'HTML', icon: <FaHtml5 className="text-orange-500" /> },
  { name: 'CSS', icon: <FaCss3Alt className="text-blue-500" /> },
  { name: 'SQL', icon: <FaDatabase  className="text-yellow-400" /> },
  { name: 'MySQL', icon: <SiMysql className="text-blue-300" /> },
  { name: 'MongoDB', icon: <SiMongodb className="text-green-400" /> },
  { name: 'GitHub', icon: <FaGithub className="text-white" /> },
]
