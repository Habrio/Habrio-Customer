// src/App.jsx
import { HashRouter } from 'react-router-dom';
import AppRoutes from './router';

function App() {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
}

export default App;
