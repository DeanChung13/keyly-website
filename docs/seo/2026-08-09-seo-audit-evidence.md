# keylyapp.com SEO 稽核 — 第一輪證據報告

稽核日期：2026-08-09（HTTP `date` header：Sun, 09 Aug 2026 07:34:33 GMT）
方法：對 https://keylyapp.com 直接發 HTTP 請求（curl）+ 本地原始碼檢查
**未取得的資料**：Search Console、GA4、Keyword Planner／Ahrefs／Semrush、PageSpeed Insights／CrUX、條件受控的 Google TW SERP

本文只記錄證據與分級，修正方案見 `docs/superpowers/plans/2026-08-09-seo-audit-fixes.md`。

---

## 1. 已證實（有 HTTP 回應或原始碼行號）

### 1.1 首頁初始 HTML 正文極短（929 字元）
`curl https://keylyapp.com/` → 移除 script 與標籤後可讀文字共 **929 字元**（含導覽列與頁尾）。

同樣量法的全站字數：

| 頁面 | 可讀文字長度 |
|---|---|
| `/` | 929 |
| `/en/` | 2169 |
| `/privacy/` | 2591 |
| `/terms/` | 2546 |
| `/subscriptions/` | 670 |

### 1.2 FAQ 的「答案」不在伺服器輸出的 HTML 裡，只存在於 JS
- 首頁 HTML 中 `允許完全取用` 只出現 **1 次**（問題標題）；答案字串出現在 `/assets/main-C0rYMbeb.js`，不在 `index-CjezfIgz.js`，也不在預渲染 HTML。
- 原始碼：`src/App.tsx:273-323`（`faqs` 陣列）、`src/App.tsx:325`（`openIndex` useState）、`src/App.tsx:358-373`（`{openIndex === index && <motion.div>}` 條件掛載）。
- 結論：預渲染輸出只含 8 個問題標題，**沒有任何答案文字**。Google 是否透過 JS 算繪取得屬未知（見 §3）。

### 1.3 無 FAQPage 結構化資料；唯一 Schema 為 SoftwareApplication
`index.html:31-40` 的 `ld+json` 僅 `SoftwareApplication`。全站無 FAQPage、Organization、BreadcrumbList、WebSite。

註：依 Google Search Central，FAQ rich results 目前僅對少數權威網站顯示，一般商業網站不應預期取得；FAQ Schema 也非 Google 讀取 FAQ 文字的必要條件。此處僅記錄「缺少」的事實，不主張排名或 CTR 效果。

### 1.4 圖片 alt 幾乎不存在
首頁 HTML 僅 **1 個 `<img>`**，alt="Keyboard"（英文、非描述性）。原始碼：`src/components/TypingAnimation.tsx:232`。其餘視覺皆為 inline SVG。

### 1.5 內部連結極少，中英版之間無可爬取連結
- 首頁 HTML 內部 `href` 僅 `/privacy/`、`/terms/`、`/subscriptions/`（+ 資產檔）。原始碼：`src/App.tsx:405-412`。
- 中文首頁**沒有任何 `<a>` 指向 `/en/`**（`grep 'href="/en/"' src/App.tsx` 無結果）。hreflang 存在，但無使用者可見的語言切換連結。

### 1.6 H1 不含任何目標關鍵字
`src/App.tsx:177` → H1 =「指尖上的 AI 智慧，文字轉化一鍵完成」。
關鍵字（注音鍵盤 / iPhone 注音輸入法）只出現在 H2（`App.tsx:243`、`App.tsx:387`）與 title / description。

### 1.7 GA4 載入被延後，可能漏記無互動的訪客
- `index.html:41-61`。`gtag('config', ...)`（`:46`）在 gtag.js 尚未載入時執行，只推入 dataLayer；真正載入需 scroll / mousemove / touchstart / keydown 其中之一，或 `setTimeout(loadGtag, 8000)`（`:61`）。
- 直接後果：使用者若在 8 秒內離開且未產生任何上述互動，gtag.js 從未載入，該次瀏覽不會送出 page_view。
- 同一段程式碼存在於 9 個 HTML：`index.html`、`en/index.html`、`404.html`、`privacy/index.html`、`privacy/en/index.html`、`terms/index.html`、`terms/en/index.html`、`subscriptions/index.html`、`subscriptions/en/index.html`。
- 只影響 GA4，不影響 Search Console 的曝光／點擊。

### 1.8 技術面正常、無問題的項目（一併記錄，避免誤判）

| 項目 | 實測結果 |
|---|---|
| robots.txt | `User-agent: * / Allow: /`，含 Sitemap 與 LLMs 宣告，未封鎖任何路徑 |
| sitemap.xml | 8 個 URL，與 llms.txt 清單一致 |
| HTTP 狀態 | `/` `/en/` `/privacy/` `/privacy/en/` `/terms/` `/terms/en/` `/subscriptions/` `/subscriptions/en/` `/llms.txt` 皆 **200** |
| 404 | `/this-page-does-not-exist-abc/` 正確回傳 **404** |
| canonical | 8 頁皆自我指向，無錯指 |
| hreflang | 8 頁皆有 zh-TW / en / x-default，且互相對應（含 `/terms/`，見 `terms/index.html:8-11`） |
| noindex | 8 頁皆無 `<meta name="robots">`，全站無 noindex |
| title / description | 8 頁皆有，且各頁不重複 |
| 標題階層 | 首頁 H1×1 → H2×3 → H3×4，結構正確無跳級 |
| SSR / 預渲染 | 確實有預渲染（`scripts/prerender.mjs`），主要區塊 HTML 存在（僅 FAQ 答案除外，見 §1.2） |
| viewport | `width=device-width, initial-scale=1.0` 存在 |
| 伺服器 | Cloudflare，HTTP/2 + h3，`cache-control: public, max-age=0, must-revalidate` |

---

## 2. 合理推論（有證據支持，但尚未以工具驗證）

| 推論 | 為什麼可能成立 | 需要什麼資料才能確認 |
|---|---|---|
| 主要瓶頸是「可競爭的內容不存在」，而非技術阻擋 | robots / sitemap / canonical / hreflang / HTTP 全部乾淨（§1.8），但全站僅 4 個中文頁、首頁正文 929 字（§1.1），其中 3 個是法務頁 | Search Console 查詢報表：確認曝光是否集中在品牌詞、非品牌詞曝光是否近乎為零 |
| 網站對「iPhone 注音選字不準」「允許完全取用安全嗎」這類問題型查詢有素材但未成頁 | `src/App.tsx:284-322` 的 FAQ 答案已相當完整（權限、離線、模型供應商），卻被埋在摺疊元件且不在初始 HTML（§1.2） | Search Console 查詢報表 + 關鍵字工具搜尋量 |
| 首頁同時想承接品牌詞、產品詞、問題詞，意圖過載 | 唯一的中文行銷頁要涵蓋 8 個 FAQ 主題 + 4 個功能區，H1 又不含關鍵字（§1.6） | 關鍵字對應 + Search Console 各查詢的到達頁面 |
| GA4 數字低於實際流量 | §1.7 的載入條件；跳出型訪客佔比通常不低 | 用 Search Console 點擊數 vs GA4 organic sessions 對比同期落差 |
| Core Web Vitals 存在風險點（非結論） | 有 `blur-[120px]` 大型模糊層（`App.tsx:330`）、motion 動畫、hero 圖 preload；但**無任何實測數據** | PageSpeed Insights + CrUX / Search Console 核心網頁指標報表 |

---

## 3. 未知（現階段不能下結論）

| 問題 | 需要什麼 |
|---|---|
| Google 實際索引了幾頁、哪些頁 | Search Console → Page Indexing／URL Inspection。**`site:` 查詢不是索引報告，不可用來計算收錄頁數**，本輪也未執行 |
| Keyly 在任何關鍵字的排名 | 需在可控條件下（台灣 IP、zh-TW、行動版、登出無痕、記錄時間）實查。本輪**未執行**，因無法控制或確認地區與個人化條件；任何排名陳述現階段都不成立 |
| 目標關鍵字的搜尋量與競爭格局 | Keyword Planner / Ahrefs / Semrush（須註明地區、期間、數值來源）。目前一律為未知 |
| Google 是否已算繪 JS 並索引 FAQ 答案 | URL Inspection 的「已算繪的 HTML」 |
| CWV 是否通過 | PageSpeed Insights + CrUX 實測 |
| GA4 實際漏記比例 | GA4 vs Search Console 同期對比 |
| 外部連結／品牌提及狀況 | 未查，需外連工具 |

---

## 4. 不得根據現有資料宣稱的事項

- 精確索引頁數（未查 Search Console；`site:` 不算數）
- 任何關鍵字的排名，或「有／沒有排上」
- 任何搜尋量數字，或「哪個關鍵字流量最大」
- 任何 CTR 提升百分比
- Core Web Vitals（LCP／INP／CLS）通過或不通過
- FAQ Schema 會帶來 rich result、排名提升或 CTR 提升
- 「頁數越多權重越高」「Domain Authority 依收錄頁數分配」等未經 Google 證實的說法

---

## 5. 執行摘要：三個最可能的流量瓶頸

1. **內容覆蓋面不足** — 全站僅 4 個中文頁、首頁正文 929 字，無資訊型／比較型／問題解決型頁面。【已證實：頁面數與字數】／【合理推論：這是流量不足主因】
2. **既有的高價值 FAQ 內容沒有出現在初始 HTML，也沒有獨立頁面承接問題型查詢**。【已證實：答案不在 SSR HTML】／【未知：Google 是否已算繪索引】
3. **GA4 量測可能低估自然流量，導致對現況的判斷本身失真**。【已證實：載入邏輯】／【未知：實際漏記比例】

技術基礎（robots / sitemap / canonical / hreflang / 狀態碼 / 預渲染）**未發現封鎖性問題**。【已證實】
