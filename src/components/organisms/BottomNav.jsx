import { useNavigate, useLocation } from 'react-router-dom';
import { HiHome, HiShoppingBag, HiShoppingCart, HiClipboardList, HiUser } from 'react-icons/hi';

const navItems = [
  { icon: HiHome, label: 'Home', path: '/home' },
  { icon: HiShoppingBag, label: 'Shops', path: '/shops' },
  { icon: HiShoppingCart, label: 'Cart', path: '/cart' },
  { icon: HiClipboardList, label: 'Orders', path: '/orders' },
  { icon: HiUser, label: 'Profile', path: '/profile' },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-1/2 w-full max-w-[375px] -translate-x-1/2 bg-white/80 backdrop-blur-md shadow-[0_-2px_8px_rgba(0,0,0,0.05)] border-t border-gray-200 flex justify-around py-2 z-50 rounded-t-xl">
      {navItems.map(({ icon: IconComponent, label, path }) => {
        const Icon = IconComponent;
        const active = location.pathname === path;
        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={`flex flex-col items-center gap-0.5 text-xs font-medium px-2 ${active ? 'text-primary' : 'text-gray-500 hover:text-primary'}`}
          >
            <Icon className="text-xl" />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
