import React from 'react';
import '../../styles/design-system.css';

export default function SectionCard({ children, className = '' }) {
  return (
    <div
      className={`bg-[var(--background-soft)] border border-[var(--divider)] rounded-lg p-4 mb-4 ${className}`}
    >
      {children}
    </div>
  );
}
