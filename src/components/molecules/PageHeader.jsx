import React from 'react';
import { HiArrowLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import '../../styles/design-system.css';

export default function PageHeader({ title, back = true }) {
  const navigate = useNavigate();
  return (
    <div className="ds-header">
      {back && (
        <button className="ds-header-back" onClick={() => navigate(-1)}>
          <HiArrowLeft />
        </button>
      )}
      <h2 className="ds-header-title">{title}</h2>
    </div>
  );
}
