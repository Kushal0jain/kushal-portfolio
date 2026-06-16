const projects = [
  {
    title: "Banking Application",
    category: "Java",
    techStack: "Core Java, JDBC, MySQL",
    description: [
      "Built a CLI-based banking system in Core Java managing accounts, deposits, withdrawals, and fund transfers.",
      "Integrated JDBC with MySQL for persistent storage of transaction history and account balances.",
      "Applied OOP principles — inheritance, encapsulation, polymorphism — for a clean, modular architecture.",
      "Implemented secure transaction logic with rollback support for failed operations.",
    ],
    link: "https://github.com/Kushal0jain/Banking_Application",
  },
  {
    title: "ZPLYS.AI – Company Project",
    category: "React",
    techStack: "React, TypeScript, Tailwind CSS",
    description: [
      "Developed 15+ reusable React components for an AI-powered content analysis platform used in production.",
      "Leveraged TypeScript for type-safe prop definitions, reducing runtime errors and improving code confidence.",
      "Optimized rendering with memoization and lazy loading, improving perceived performance by ~30%.",
      "Collaborated with a 4-person team using Git branching strategies for continuous feature delivery.",
    ],
    link: "https://zplys.ai/landing",
  },
  {
    title: "Weather Application",
    category: "React",
    techStack: "React, Tailwind CSS, OpenWeatherMap API",
    description: [
      "Built a real-time weather app with city-based search powered by the OpenWeatherMap API.",
      "Added dynamic theming that changes colors based on weather conditions (sunny, cloudy, rainy).",
      "Implemented unit toggle (°C / °F), 5-day forecast view, and browser geolocation support.",
      "Used React hooks (useState, useEffect) for state management and clean API integration.",
    ],
    link: "https://github.com/Kushal0jain/weather-app",
  },
  {
    title: "Portfolio Website",
    category: "React",
    techStack: "React, Tailwind CSS",
    description: [
      "Designed and built a responsive glassmorphism portfolio with scroll-reveal animations and a typewriter hero.",
      "Added WhatsApp-integrated contact form, custom SVG favicon, and SVG scroll-progress indicator.",
      "Achieved 95+ Lighthouse score across performance, accessibility, and SEO metrics.",
      "Deployed on Netlify with continuous deployment connected to GitHub.",
    ],
    link: "https://kushal-jain-portfolio.netlify.app/",
  }
];

export default projects;
