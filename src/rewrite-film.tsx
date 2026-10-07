import { createRoot } from 'react-dom/client';
import RewriteFilm, { type FilmConfig } from './components/RewriteFilm';
import './components/rewrite-film.css';

// 指南頁的 <div data-rewrite-film> 內放一段 <script type="application/json"> 設定，這裡掛上動畫。
for (const el of document.querySelectorAll<HTMLElement>('[data-rewrite-film]')) {
  const json = el.querySelector('script[type="application/json"]')?.textContent;
  if (!json) continue;
  const config = JSON.parse(json) as FilmConfig;
  createRoot(el).render(<RewriteFilm {...config} />);
}
