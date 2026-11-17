import React from 'react';

// Renders text where **double asterisks** mark emphasis. Everything stays a
// React text node, so admin-entered content can never inject HTML.
const RichText = ({ text, emClassName = 'text-white font-medium' }) => {
  const parts = String(text || '').split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className={emClassName}>{part}</span>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );
};

export default RichText;
