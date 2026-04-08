import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import AppEn from './AppEn';

export function render(url: string) {
  const app = url === '/en/' ? <AppEn /> : <App />;
  return renderToString(app);
}
