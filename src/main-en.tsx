import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import AppEn from './AppEn.tsx';
import './index.css';

hydrateRoot(document.getElementById('root')!,
  <StrictMode>
    <AppEn />
  </StrictMode>
);
