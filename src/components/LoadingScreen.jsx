import React, { useEffect, useState, useCallback } from 'react';

const LoadingScreen = ({ onDone }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut,  setFadeOut]  = useState(false);

  const finish = useCallback(() => {
    setFadeOut(true);
    setTimeout(onDone, 600);
  }, [onDone]);

  useEffect(() => {
    const duration = 2000;
    const start    = performance.now();
    let raf;

    const tick = (now) => {
      const pct = Math.min(((now - start) / duration) * 100, 100);
      setProgress(Math.round(pct));
      if (pct < 100) { raf = requestAnimationFrame(tick); }
      else           { setTimeout(finish, 200); }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [finish]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#070b14] flex flex-col items-center justify-center gap-8 font-poppins pointer-events-auto transition-opacity duration-[600ms] ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      {/* KJ Logo */}
      <div
        className="w-[90px] h-[90px] rounded-[24px] flex items-center justify-center text-white font-black text-[2.2rem] tracking-tight select-none animate-gradient animate-pulse-glow shadow-[0_0_60px_rgba(20,184,166,.5)] [background-size:200%_200%]"
        style={{ background: 'linear-gradient(135deg, #14b8a6, #8b5cf6, #06b6d4)' }}
      >
        KJ
      </div>

      {/* Name & role */}
      <div className="text-center">
        <p className="gradient-text text-[1.4rem] font-bold mb-1">Kushal Jain</p>
        <p className="text-slate-500 text-[0.73rem] tracking-[0.18em] uppercase">Software Developer</p>
      </div>

      {/* Progress bar */}
      <div className="w-[180px] h-[2px] bg-white/[.08] rounded-[1px] overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-teal-500 to-violet-500 rounded-[1px] transition-[width] duration-[40ms] ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-slate-700 text-[0.7rem] tracking-[0.06em]">
        {progress < 100 ? 'Loading portfolio…' : 'Ready!'}
      </p>
    </div>
  );
};

export default LoadingScreen;
