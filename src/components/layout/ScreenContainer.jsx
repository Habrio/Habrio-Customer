// src/components/layout/ScreenContainer.jsx
export default function ScreenContainer({ children, className = '' }) {
  return (
    <div className={`px-4 py-6 space-y-6 ${className}`}>
      {children}
    </div>
  );
}
