// src/App.jsx
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './router';

// Global styles
import './styles/reset.css';      // ⬅️ Make sure this is now included
import './styles/variables.css';  // ⬅️ Required for design tokens
import './styles/common.css';
import './styles/App.css';

function App() {
  return (
    <div className="mobile-screen fade-in">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
