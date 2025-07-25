// src/App.jsx
import { HashRouter } from 'react-router-dom';
import AppRoutes from './router';

// Global Tailwind CSS styles
import './styles/Index.css';

function App() {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
}

export default App;
