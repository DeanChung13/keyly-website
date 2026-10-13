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

// sitemap.xml 的網址清單仍由 public/sitemap.xml 手動維護；
// lastmod 改成取各頁 JSON-LD 的 dateModified，避免改版後忘了更新。
// 沒有 dateModified 的頁面（首頁、條款等）保留手動填的值。
const sitemapPath = path.join(distDir, 'sitemap.xml');
const sitemap = await fs.readFile(sitemapPath, 'utf8');
const urlBlocks = [...sitemap.matchAll(/<url>[\s\S]*?<\/url>/g)].map((m) => m[0]);
let updatedSitemap = sitemap;
for (const block of urlBlocks) {
  const loc = block.match(/<loc>https:\/\/keylyapp\.com(\/[^<]*)<\/loc>/)?.[1];
  if (!loc) continue;
  const pageFile = path.join(distDir, loc, 'index.html');
  let pageHtml;
  try {
    pageHtml = await fs.readFile(pageFile, 'utf8');
  } catch {
    continue;
  }
  const modified = pageHtml.match(/"dateModified":\s*"(\d{4}-\d{2}-\d{2})"/)?.[1];
  if (!modified) continue;
  const updatedBlock = block.replace(/<lastmod>[^<]*<\/lastmod>/, `<lastmod>${modified}</lastmod>`);
  updatedSitemap = updatedSitemap.replace(block, updatedBlock);
}
await fs.writeFile(sitemapPath, updatedSitemap);
