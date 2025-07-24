// src/App.jsx
import { HashRouter } from 'react-router-dom';
import AppRoutes from './router';

// Global styles
import './styles/reset.css';
import './styles/variables.css';
import './styles/common.css';
import './styles/App.css';
import './styles/design-system.css';

function App() {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
}

export default App;
