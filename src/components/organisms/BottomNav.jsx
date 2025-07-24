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
    <div className="fixed bottom-0 left-1/2 w-full max-w-[375px] -translate-x-1/2 bg-white border-t border-gray-200 flex justify-around py-3 z-50">
      {navItems.map(({ icon: IconComponent, label, path }) => {
        const Icon = IconComponent;
        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            className="flex flex-col items-center gap-1 text-xs focus:outline-none"
          >
            <Icon
              className={`text-xl ${location.pathname === path ? 'text-primary' : 'text-gray-500'}`}
            />
            <span className={location.pathname === path ? 'text-primary' : 'text-gray-500'}>
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
