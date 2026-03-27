import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppEn from './AppEn.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppEn />
  </StrictMode>,
);
