import React from 'react';
import '../../styles/common.css';

export default function Button({ children, className = '', ...props }) {
  return (
    <button className={`btn btn-primary btn-full ${className}`} {...props}>
      {children}
    </button>
  );
}
