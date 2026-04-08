import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const ssrEntryPath = path.join(rootDir, 'dist-ssr', 'entry-server.js');

const { render } = await import(pathToFileURL(ssrEntryPath).href);

const pages = [
  { file: 'index.html', url: '/' },
  { file: path.join('en', 'index.html'), url: '/en/' },
];

for (const page of pages) {
  const filePath = path.join(distDir, page.file);
  const html = await fs.readFile(filePath, 'utf8');
  const appHtml = render(page.url);
  const rendered = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  await fs.writeFile(filePath, rendered);
}
