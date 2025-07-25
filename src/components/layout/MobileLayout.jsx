// src/components/layout/MobileLayout.jsx
export default function MobileLayout({ children }) {
  return (
    <div className="w-full max-w-[375px] min-h-screen mx-auto flex flex-col bg-white fade-in">
      <div className="flex-1 overflow-y-auto pb-20">{children}</div>
    </div>
  );
}
