import React from 'react';
import { HashRouter } from 'react-router-dom';
import AppRoutes from './router';

/**
 * App component
 * Sets up the HashRouter for client-side routing
 */
export default function App() {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
}