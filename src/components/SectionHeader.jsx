import React from 'react';

// Small label + section title, each hidden when left empty in the admin panel.
const SectionHeader = ({ eyebrow, title, className = 'mb-16', children }) => {
  if (!eyebrow && !title && !children) return null;
  return (
    <div className={`text-center section-reveal ${className}`}>
      {eyebrow && <p className="text-teal-500 text-sm font-semibold tracking-widest uppercase mb-3">{eyebrow}</p>}
      {title && <h2 className="section-title">{title}</h2>}
      {children}
    </div>
  );
};

export default SectionHeader;
