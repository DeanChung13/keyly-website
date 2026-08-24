import { StrictMode } from 'react';
import AppEn from './AppEn.tsx';
import { mountApp } from './mountApp.tsx';
import './index.css';

mountApp(document.getElementById('root')!,
  <StrictMode>
    <AppEn />
  </StrictMode>
);
