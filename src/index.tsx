import React from 'react';
import { createRoot } from 'react-dom/client';
import AppRouter from '@/routers/index';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(<AppRouter />);
}
