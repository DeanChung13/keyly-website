# keylyapp.com SEO 第二輪：修正方案

## Context

> **執行修訂（2026-08-09，實作時採用）**
> 1. 刪除未經測試證實的競品比較宣稱（「比內建注音更準」），首屏改用可證實的描述。
> 2. FAQ 摺疊改用原生 `<details>/<summary>`，而非純 CSS `0fr` 摺疊——後者會讓看不見的連結仍可被鍵盤聚焦。
> 3. 內容頁改為先做 `/guides/full-access/` 一頁的垂直切片；另兩頁需要更多安裝步驟與裝置支援驗證，待第一頁品質確認後再套模板。

第一輪稽核（curl 實測 + 原始碼）確認：robots.txt、sitemap、canonical、hreflang、HTTP 狀態碼、404、預渲染**都沒有封鎖性問題**。流量不足的可修正成因集中在五處，全部有原始碼或 HTTP 證據：

1. 首頁 H1（`src/App.tsx:177`）不含任何目標關鍵字。
2. FAQ 的**答案不在初始 HTML**——只有 8 個問題標題被預渲染，答案字串只存在 `main-*.js`（`src/App.tsx:325` useState + `:358-373` 條件掛載）。
3. 全站僅 4 個中文頁、首頁初始正文 929 字元；內部連結只有 3 條法務頁，中文首頁無任何 `<a>` 指向 `/en/`。
4. GA4 需使用者互動或 8 秒才載入 gtag.js（`index.html:41-61`），無互動即離開的訪客不產生 page_view。
5. 首頁唯一 `<img>` 的 alt 為 "Keyboard"（`src/components/TypingAnimation.tsx:232`）。

本輪只在上述已證實範圍內提改法。**不引入任何新的排名、搜尋量或百分比**。新增頁面的主題取自站內既有 FAQ 素材，不依賴搜尋量估算。

---

## 1. 首頁 H1 與首屏定位

**檔案**：`src/App.tsx:174-185`（中文）、`src/AppEn.tsx` 對應的 Hero。

改法（使用者已選定）：H1 加入關鍵字行，原標語降為 H1 內的第二行、保留現有漸層樣式，視覺幾乎不變。

```
眉標（div，不變）：台灣團隊打造 · iOS 注音輸入體驗

<h1>
  <span class="block text-3xl lg:text-4xl">iPhone AI 注音鍵盤</span>
  指尖上的 AI 智慧，<br/>
  <span class="gradient">文字轉化一鍵完成</span>
</h1>
```

- 關鍵字行字級小於主標語，維持現有視覺層次；`text-5xl` 等既有 class 全部保留在原句上。
- 英文版 `AppEn.tsx` 同步：`AI Zhuyin Keyboard for iPhone` + 原標語。
- 首屏 `<p>`（`App.tsx:183-185`）補一句「比內建注音更準的選字引擎」之類具體差異點，維持一句話長度即可，不擴寫。
- 不動 `<title>` 與 `meta description`（已含關鍵字且各頁不重複）。

---

## 2. FAQ 答案進入初始 HTML

**檔案**：`src/App.tsx:328-378`、`src/AppEn.tsx` 對應區塊。

核心改動：**移除條件掛載**，答案永遠存在於 DOM，改用純 CSS 摺疊。

- 刪掉 `AnimatePresence` + `{openIndex === index && (...)}`（`App.tsx:358-373`）。
- 改為永遠渲染的容器，用 `grid-template-rows: 0fr → 1fr` + `overflow: hidden` 做展開動畫（純 CSS transition，不需 JS 掛載，SSR 輸出即含完整答案文字）。
- 保留 `openIndex` state、`aria-expanded`、`aria-controls`、`trackFaqClick`、`ChevronDown` 旋轉——互動行為與現在完全相同。
- **不要**在收合狀態加 `display:none` / `hidden` / `aria-hidden`；摺疊面板內的內容維持在 DOM 中。
- `motion-reduce:` 變體照現有寫法補上。

驗證：`npm run build` 後 `grep -c '這是開啟 AI 魔法的技術門票' dist/index.html` 應為 1（目前為 0）。

**選配、需你決定（本輪未包含）**：加 `FAQPage` 結構化資料。它能讓搜尋引擎更明確地理解問答對應關係，但依 Google Search Central 現行政策，FAQ rich results 只對少數權威網站顯示，一般商業網站不應預期取得；也不會直接影響排名。要不要加請你決定。

---

## 3. 第一批內容頁與內部連結架構

### 3.1 三個新頁面

全部沿用**法務頁的模板**（純靜態 HTML + inline `<style>`，無 React），理由：內容全在初始 HTML、無 JS 依賴、載入成本最低。範本檔 `privacy/index.html`（head 結構見 `:1-54`，樣式 `:55` 起）。

| 路徑 | H1 / 主題 | 搜尋意圖 | 素材來源 |
|---|---|---|---|
| `/guides/full-access/` | iPhone 鍵盤「允許完全取用」是什麼？安全嗎？ | 問題解決型 | `src/App.tsx:284-290` 已有完整答案 |
| `/guides/third-party-keyboard-setup/` | iPhone 第三方注音鍵盤：怎麼安裝、怎麼挑 | 資訊型 + 商業比較 | `App.tsx:276`、`:302`（引擎、效能） |
| `/guides/offline-ai-keyboard/` | 離線 AI 鍵盤是什麼？哪些 iPhone 能用 | 資訊型 | `App.tsx:294`、`:298`（模型、離線條件） |

每頁要求：
- 獨立且互不重疊的主關鍵字；三頁之間不互相競爭（權限 / 安裝挑選 / 離線）。
- 先回答問題本身、再帶到 Keyly，不是換皮的產品頁。
- 頁尾一句 CTA + App Store 連結，沿用首頁的 `https://apps.apple.com/app/id6759639348`。
- self-canonical；**這批先只做繁中**，暫不出 `/en/`，因此 hreflang 只放 `zh-TW` 與 `x-default` 指向自己（不要放指向不存在頁面的 `en`）。
- `WebPage` ld+json，比照 `privacy/index.html:20-32`。

### 3.2 內部連結

- **首頁 FAQ**：三個對應問題的答案末尾各加一條「延伸閱讀」連結到對應 guide（`src/App.tsx` faqs 陣列內）。這是最自然的連結來源，且答案改成常駐 DOM 後連結也會進初始 HTML。
- **頁尾**（`src/App.tsx:405-412` + 各法務頁頁尾）：新增「使用指南」區塊，列出三頁。
- **語言切換**：頁尾加 `English` 連結指向 `/en/`（英文版對應加 `繁體中文` → `/`）。目前中文首頁完全沒有指向 `/en/` 的 `<a>`。
- guide 頁彼此橫向連結（每頁底部列出另外兩頁）+ 連回首頁。

### 3.3 建置設定

- `vite.config.ts:8-19` 的 `rollupOptions.input` 加三個 entry（`guidesFullAccess` 等）。
- `public/sitemap.xml` 新增三個 URL（`changefreq: monthly`、`priority: 0.6`），`lastmod` 用實際發佈日。
- `public/llms.txt` 與 `public/llms-full.txt` 的頁面清單同步補上。

---

## 4. GA4 載入方式

**檔案**：9 個 HTML —— `index.html`、`en/index.html`、`404.html`、`privacy/index.html`、`privacy/en/index.html`、`terms/index.html`、`terms/en/index.html`、`subscriptions/index.html`、`subscriptions/en/index.html`（各檔的 `<!-- Google tag (gtag.js) deferred -->` 區塊，主檔為 `index.html:41-61`）。

改用 Google 官方標準安裝，移除 `loadGtag` 與所有事件監聽 + 8 秒 fallback：

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-C51YGT0TVX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-C51YGT0TVX');
</script>
```

- 9 個檔案的區塊完全一致，改動可一次套用。
- `src/App.tsx` 內的 `trackFaqClick` / `trackLinkClick` 不需改動（仍走 `window.gtag`）。
- 改完後 GA4 organic 數字會**上升**——那是修好漏記，不是流量增加。第一次比較時要記得這點。

---

## 5. alt 與次要項目

- `src/components/TypingAnimation.tsx:232`：alt 由 `"Keyboard"` 改為描述性繁中，例如 `"Keyly AI 注音鍵盤在 iPhone 上的介面預覽"`；英文版對應改英文。
- 檢查 `AppEn.tsx` 是否也用到同一元件；若共用，alt 需依語言傳入 prop。
- `public/sitemap.xml` 的 `lastmod` 目前是 2026-03-19 / 03-29，本次改動後一併更新為實際日期。
- 純裝飾的 inline SVG（blob、圖示）確認都有 `aria-hidden="true"`；lucide 圖示已自帶。

---

## 驗證

```bash
npm run lint          # tsc --noEmit
npm run build
```

建置後對 `dist/` 檢查：

1. `grep -c '這是開啟 AI 魔法的技術門票' dist/index.html` → 1（FAQ 答案已進 SSR HTML）
2. `grep -o '<h1[^>]*>.*</h1>' dist/index.html` → 含「注音鍵盤」
3. `grep -c 'setTimeout(loadGtag' dist/**/*.html` → 0
4. `grep -o 'alt="[^"]*"' dist/index.html` → 描述性中文
5. `grep 'href="/en/"' dist/index.html` → 有結果
6. 三個 guide 頁存在於 `dist/guides/*/index.html`，且 canonical、title、H1 正確
7. `dist/sitemap.xml` 含 11 個 URL

部署後（`.github/workflows/deploy.yml`）：

8. `curl -sI https://keylyapp.com/guides/full-access/` → 200
9. 用瀏覽器停用 JavaScript 開首頁，FAQ 答案文字應可見（或至少存在於原始碼）
10. GA4 即時報表確認有 page_view（開頁後不做任何互動）
11. 在 Search Console 對三個新頁做 URL Inspection → 要求編入索引；並用「已算繪的 HTML」確認 FAQ 答案存在

無法在本輪驗證、需等資料的：實際排名、索引狀態、Core Web Vitals 影響（GA4 改為標準載入後應以 PageSpeed Insights 重測，不要事前假設會變差或不變）。
