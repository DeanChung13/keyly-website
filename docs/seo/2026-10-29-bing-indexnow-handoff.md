# 交接：keylyapp.com 設定 Bing Webmaster Tools 與 IndexNow

日期：2026-10-29
參考做法：mimicmic.com 同日已完成同一套設定（`mimic-website` commit `0658b10`、`305d8cc`）

## 為什麼要做

- ChatGPT 搜尋大量使用 Bing 的索引。Bing 沒收錄、或收錄的是舊版本，ChatGPT 就引用不到，或引用錯的內容。
- MimicMic 的實例：近 30 天官網 58 次造訪中，有 39 次來自 chatgpt.com，ChatGPT 是最大的外部流量來源。但 ChatGPT 引用的是 Bing 在 10/25 存下的舊版頁面，說「免費 10 次」（實際是 5 次），還把 App 的舊名稱當成另一個 App。
- keylyapp.com 目前完全沒有設定 Bing（repo 裡沒有任何 Bing 或 IndexNow 的設定）。成本約半小時，風險很低。

## 要做的事

### 1. Bing Webmaster Tools（在瀏覽器操作，不需要改程式）

1. 到 https://www.bing.com/webmasters ，用 Google 帳號登入（wenway13@gmail.com）。
2. 新增網站時選 **Import from Google Search Console**，只勾 keylyapp.com，不要動已經存在的 mimicmic.com。
   - **注意**：這個 Google 帳號在 GSC 對 `sc-domain:keylyapp.com` 的權限是「受限使用者」（siteRestrictedUser），mimicmic.com 則是完整使用者。如果匯入時看不到 keylyapp.com 或匯入失敗，改用手動驗證：Bing 會提供 `BingSiteAuth.xml`，把它放進 `public/`，部署後再按驗證。不要改 DNS。
3. 到 Sitemaps 提交 `https://keylyapp.com/sitemap.xml`。GSC 匯入時不一定會帶入 sitemap，mimicmic.com 就沒有帶入。
4. 用 URL Submission 送出最重要的幾頁，例如首頁、`/en/`、`/translation/`、主要的 guides 頁面。每天額度 100 個。
5. 用 URL Inspection 看首頁是否已收錄、最後爬取日期，並記下 Bing 標出的 SEO 問題（mimicmic.com 當時被標出 meta description 太長）。

### 2. IndexNow（改程式，部署後自動通知 Bing）

照 mimic-website 的做法，有三個地方不一樣：

| 項目 | mimic-website | keyly-website |
|---|---|---|
| sitemap | build 時由 `scripts/prerender.mjs` 產生到 `dist/sitemap.xml` | 靜態檔 `public/sitemap.xml`，build 後會複製到 `dist/sitemap.xml` |
| 測試 | `node --test` | `vitest run` |
| 部署 action | `cloudflare/wrangler-action@v4` | `cloudflare/wrangler-action@v3`，CI 先跑 lint 和 test |

步驟：

1. 產生金鑰：`openssl rand -hex 16`，建立 `public/<key>.txt`，內容只有金鑰本身，不要換行。金鑰本來就是公開的，Bing 會讀這個檔來確認網站擁有權。
2. 新增 `scripts/indexnow.mjs`：讀取 `dist/sitemap.xml` 的所有 `<loc>`，POST 到 `https://api.indexnow.org/indexnow`，內容為 `{ host: 'keylyapp.com', key, keyLocation: 'https://keylyapp.com/<key>.txt', urlList }`。回傳 200 或 202 都代表接受。可以直接複製 `mimic-website/scripts/indexnow.mjs`，只改 `KEY` 和 `HOST`。
3. `.github/workflows/deploy.yml` 在 Cloudflare 部署之後加一步：

   ```yaml
   # The site is already live; a failed ping only means a slower recrawl.
   - name: Notify IndexNow
     continue-on-error: true
     run: node scripts/indexnow.mjs
   ```

4. 加一個 vitest 測試，確認 `scripts/indexnow.mjs` 裡的金鑰，和 build 出來的 `dist/<key>.txt` 內容一致。注意 vitest 跑的時候不一定有 `dist/`，要嘛讀 `public/<key>.txt`，要嘛照現有測試的方式處理。
5. 檢查 `public/_redirects`：確認 `/<key>.txt` 不會被導到別的地方。keyly 有 `_redirects`，mimic 沒有，這是 mimic 那邊沒遇到的風險。

### 3. 驗證（部署後）

- GitHub Actions 的紀錄要出現 `IndexNow: 200` 或 `202 for N URLs`，N 要等於 sitemap 的網址數（目前 25 個）。
- `curl https://keylyapp.com/<key>.txt` 要回傳金鑰本身。
- 約 48 小時後回 Bing Webmaster Tools，確認 sitemap 已讀取、發現的網址數正確。

## 不要做的

- 不要改 DNS。
- 不要動 Bing 裡 mimicmic.com 的設定。
- `public/sitemap.xml` 的 `lastmod` 還停在 2026-08-09，這次先不處理。它跟 IndexNow 無關，但如果之後要靠 `lastmod` 讓搜尋引擎知道頁面更新過，要另外改成 build 時自動產生。

## 之後可以追蹤的

- 照 MimicMic EXP-006 的方式，用 ChatGPT 訪客模式（不登入）固定問幾句跟 Keyly 有關的問題，例如「iPhone 注音輸入法推薦」，每兩週記錄一次 Keyly 有沒有被提到、描述對不對。
- 官網 GA4 的 `sessionSourceMedium` 看 chatgpt.com 帶來的流量。
