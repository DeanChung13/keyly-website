import {StrictMode} from 'react';
import App from './App.tsx';
import {mountApp} from './mountApp.tsx';
import './index.css';

mountApp(document.getElementById('root')!,
  <StrictMode>
    <App />
  </StrictMode>
);
