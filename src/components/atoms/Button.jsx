import React from 'react';
export default function Button({ children, className = '', ...props }) {
  return (
    <button
      className={`w-full h-11 rounded-lg bg-primary text-white font-medium flex items-center justify-center ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
