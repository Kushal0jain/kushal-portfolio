const projects = [
  {
    title: "DXYRA – CRM Platform",
    category: "Next.js",
    techStack: "Next.js, React",
    description: [
      "Building a CRM at Deeporion Technology that brings enquiries from website forms, Excel imports and referrals into one lead pipeline with custom stages.",
      "Worked on follow-up tools: per-lead tasks and reminders in a shared calendar, a team WhatsApp inbox with template broadcasts, and email campaigns.",
      "Built reporting views (34 ready-made reports, leads by source, pipeline and team activity) and role-based access for admins, managers and sales.",
      "Includes industry-specific setups for clinics, CA firms, real estate, education, retail and more, plus a public marketing site with demo booking.",
    ],
    link: "https://www.dxyra.com/",
  },
  {
    title: "Taurrus Parts – E-commerce Website",
    category: "Next.js",
    techStack: "Next.js, React, Cloudinary",
    description: [
      "Built an e-commerce storefront for an exporter of excavator and backhoe-loader spare parts, serving buyers in 30+ countries.",
      "Organised a 2000+ product catalogue into 21 categories (hydraulics, seal kits, engine and transmission parts, bearings and more) with sign-in-gated wholesale pricing.",
      "Implemented an inquiry cart: buyers add parts and request a quote, and the team responds with pricing within 24 hours.",
      "Added customer accounts, verified-buyer reviews, a contact form and optimised product images served through Cloudinary.",
    ],
    link: "https://taurrus.in/",
  },
  {
    title: "Pehal – Digital Invitations",
    category: "Next.js",
    techStack: "Next.js, React, Vercel",
    description: [
      "Built a web studio for creating animated digital invitations for weddings, birthdays, festivals, inaugurations and corporate events.",
      "Users pick an animated design, fill in names, dates, venue, photos and music, and see a live preview update as they type.",
      "Each invitation is shared as one link via WhatsApp or QR code; guests open it on their phone with no app or login, including a venue map, calendar reminder and music.",
      "Supports English and Hindi, with user accounts and a design gallery with live try-outs; deployed on Vercel.",
    ],
    link: "https://pehal.vercel.app/",
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
];

export default projects;
