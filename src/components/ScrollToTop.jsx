import React, { useEffect, useState } from 'react';
import { FiArrowUp } from 'react-icons/fi';

const ScrollToTop = () => {
  const [visible,  setVisible]  = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(scrollTop > 300);
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  const circumference = 2 * Math.PI * 20;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 bg-gradient-to-br from-teal-500 to-violet-500 shadow-scroll-btn"
      aria-label="Scroll to top"
    >
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="2.5" />
        <circle
          cx="24" cy="24" r="20"
          fill="none"
          stroke="rgba(255,255,255,.65)"
          strokeWidth="2.5"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress / 100)}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset .18s ease' }}
        />
      </svg>
      <FiArrowUp size={16} color="white" className="relative z-10" />
    </button>
  );
};

export default ScrollToTop;
