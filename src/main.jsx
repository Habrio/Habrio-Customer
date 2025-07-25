import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Import global styles including Tailwind base, components, and utilities
import './styles/index.css';

/**
 * Entry point: renders the App into the root DOM node
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
