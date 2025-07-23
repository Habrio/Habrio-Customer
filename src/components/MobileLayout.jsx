import BottomNav from './BottomNav';

export default function MobileLayout({ children }) {
  return (
    <div className="mobile-screen fade-in">
      <div className="screen-container">
        {children}
      </div>
      <BottomNav />
    </div>
  );
}
