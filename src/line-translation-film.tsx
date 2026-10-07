import { createRoot } from 'react-dom/client';
import LineTranslationFilm from './components/LineTranslationFilm';

const el = document.getElementById('line-translation-film');
if (el) createRoot(el).render(<LineTranslationFilm />);
