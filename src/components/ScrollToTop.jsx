import React, { useEffect, useState } from 'react';
import { FiArrowUp } from 'react-icons/fi';

const RADIUS = 20;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const ScrollToTop = () => {
  const [visible,  setVisible]  = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(scrollTop > 300);
      setProgress(docHeight > 0 ? Math.min(1, scrollTop / docHeight) : 0);
    };
    // Batch scroll updates to one per animation frame.
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`icon-btn fixed bottom-6 right-6 z-50 !w-12 !h-12 !rounded-full backdrop-blur-md transition-[opacity,transform,color,border-color] duration-500 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
      style={{ background: 'var(--glass-bg)' }}
      aria-label="Scroll to top"
      tabIndex={visible ? 0 : -1}
    >
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
        <circle
          cx="24" cy="24" r={RADIUS}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
          strokeLinecap="round"
        />
      </svg>
      <FiArrowUp size={16} className="relative" />
    </button>
  );
};

export default ScrollToTop;
