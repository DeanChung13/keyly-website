/**
 * Tells IndexNow (Bing, and the engines that share it) that every URL in the
 * built sitemap may have changed, so they recrawl instead of waiting. ChatGPT
 * search leans on Bing's index, which is why this matters here.
 *
 * Runs in CI after the Cloudflare Pages deploy, once the key file below is
 * live. The key is public by design: IndexNow checks ownership by fetching
 * public/<key>.txt from the site.
 *
 *   node scripts/indexnow.mjs
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const KEY = '7af3ecb02c6d7fea85cbe26b064c5476';
const HOST = 'keylyapp.com';

const sitemap = await fs.readFile(path.join(rootDir, 'dist', 'sitemap.xml'), 'utf8');
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList,
  }),
});

// 200 and 202 both mean accepted; anything else is worth seeing in the log.
console.log(`IndexNow: ${response.status} for ${urlList.length} URLs`);
if (!response.ok) {
  console.log(await response.text());
  process.exitCode = 1;
}
