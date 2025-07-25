import { useNavigate } from 'react-router-dom';
import MobileLayout from '../components/layout/MobileLayout';
import StatusBar from '../components/atoms/StatusBar';
import Button from '../components/atoms/Button';

export default function TitleScreen() {
  const navigate = useNavigate();

  return (
    <MobileLayout>
      <StatusBar />
      <div className="flex flex-col items-center text-center px-6 pt-12">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-primary to-primary-dark flex items-center justify-center mb-6 shadow-lg">
          <span className="text-3xl text-white">🏘️</span>
        </div>
        <h1 className="text-2xl font-semibold mb-2">Welcome to Habrio</h1>
        <p className="text-sm text-gray-500 mb-8">Your society’s very own super app</p>
        <Button className="mb-6" onClick={() => navigate('/login')}>
          Get Started
        </Button>
        <p className="text-xs text-gray-400">Built with ❤️ for your neighbourhood</p>
      </div>
    </MobileLayout>
  );
}
