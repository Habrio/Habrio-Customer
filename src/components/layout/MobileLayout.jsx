// MobileLayout.jsx
export default function MobileLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-xs bg-white rounded-2xl shadow-lg overflow-hidden">
        {children}
      </div>
    </div>
  );
}
