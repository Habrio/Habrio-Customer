import React from 'react';
import '../../styles/common.css';

export default function Input({ className = '', ...props }) {
  return <input className={`form-input ${className}`} {...props} />;
}
