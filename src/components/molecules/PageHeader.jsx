import React from 'react';
import { HiArrowLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';


export default function PageHeader({ title, back = true }) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-4 mb-5">
      {back && (
        <button
          className="text-2xl text-primary hover:text-primary-dark"
          onClick={() => navigate(-1)}
        >
          <HiArrowLeft />
        </button>
      )}
      <h2 className="flex-1 m-0 text-lg font-semibold text-text-primary">
        {title}
      </h2>
    </div>
  );
}
