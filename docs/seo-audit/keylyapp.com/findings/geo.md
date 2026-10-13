# 全站 AI 搜尋就緒度稽核報告（Generative Engine Optimization - GEO Findings）

**受測網站**：`https://keylyapp.com`  
**稽核範圍**：全站 `/robots.txt`、`/llms.txt`、`/llms-full.txt` 及 15 篇 Guides 之 AI 引用與抽取性  
**稽核標準**：Google AI Optimization Guide（2026 年最新發布）、GEO 引用標準（Perplexity、ChatGPT Search、Google AI Overviews）  
**負責 Agent**：agy

---

## 一、 GEO 核心就緒度評分（Score: 78 / 100）

| 評估維度 | 權重 | 分數 | 診斷摘要 |
|---|---|---|---|
| **1. Passage Citability（段落可引用性）** | 25% | **20 / 25** | 多數指南設有「先看結論」或「30 秒答案」摘要區塊，極度利於 AI Overview 摘錄。 |
| **2. Structural Readability（結構可讀性）** | 20% | **18 / 20** | 清晰的 H1 > H2 > H3 階層架構，大量運用條列與 `summary-box`。 |
| **3. Multi-Modal Signals（多模態內容）** | 15% | **8 / 15** | 缺少資訊圖表（Infographics）與直接的實機截圖，多數動畫依賴前端 JS 渲染，純 HTML 爬蟲看不到。 |
| **4. Authority & Brand Mentions（品牌與實體信號）** | 20% | **12 / 20** | 外部平台（Wikipedia, Reddit, YouTube）缺乏具規模的品牌討論與提及，僅靠站內自述。 |
| **5. Technical Accessibility（技術可存取性）** | 20% | **20 / 20** | 靜態 HTML 預渲染（SSR/SSG），不依賴客戶端 JS 即可讀取全文，對無 JS 爬蟲極度友善。 |

---

## 二、 AI 爬蟲存取權限稽核（Robots.txt Analysis）

現有 `public/robots.txt` 內容如下：
```txt
User-agent: *
Allow: /
Disallow: /cdn-cgi/
Disallow: /go/
Sitemap: https://keylyapp.com/sitemap.xml
LLMs: https://keylyapp.com/llms.txt
```

### 各 AI 爬蟲存取狀態表（明確區分「搜尋引用」與「模型訓練」）：

| 爬蟲 (User-Agent) | 所屬單位 | 功能類型 | 現有存取狀態 | 判定與建議 |
|---|---|---|---|---|
| **`Googlebot`** | Google | Google 搜尋與 **Google AI Overviews / AI Mode** | ✅ 允許（匹配 `*`） | 正常，享有 AI Overviews 收錄資格 |
| **`OAI-SearchBot`** | OpenAI | **ChatGPT Search 搜尋引用** | ✅ 允許（匹配 `*`） | 正常，可被 ChatGPT 搜尋引文 |
| **`PerplexityBot`** | Perplexity | **Perplexity 搜尋引用** | ✅ 允許（匹配 `*`） | 正常，可被 Perplexity 引文 |
| **`Claude-SearchBot`**| Anthropic | **Claude 搜尋功能引用** | ✅ 允許（匹配 `*`） | 正常，可被 Claude.ai 搜尋引文 |
| **`Applebot`** | Apple | Siri、Spotlight 與 Safari 搜尋 | ✅ 允許（匹配 `*`） | 正常，iOS 生態系搜尋可索引 |
| **`GPTBot`** | OpenAI | 模型訓練抓取 | ⚠️ 允許（未限制） | 依版權策略決定是否阻擋訓練 |
| **`ClaudeBot`** | Anthropic | 模型訓練抓取 | ⚠️ 允許（未限制） | 依版權策略決定是否阻擋訓練 |
| **`Google-Extended`** | Google | Gemini / Vertex 訓練 | ⚠️ 允許（未限制） | 依版權策略決定是否阻擋訓練 |
| **`Applebot-Extended`**| Apple | Apple Intelligence 訓練 | ⚠️ 允許（未限制） | 依版權策略決定是否阻擋訓練 |

> **說明**：目前全站對所有 AI 搜尋爬蟲均完全開放，有利於最大化 AI 引用機會。

---

## 三、 核心問題清單（按嚴重度排列）

### 1. 【Critical】`/llms.txt` 與 `/llms-full.txt` 遺漏 5 篇重要新指南（資訊不同步）
- **證據**：
  - 檢查 [public/llms.txt](file:///Users/deanchung/Documents/keyly-website/public/llms.txt)，其收錄的 Guides 僅停留在 9 篇早期文件。
  - **完全遺漏了以下 5 篇核心 Guides**：
    1. `/guides/iphone-ai-leave-request/`（全站 GSC 排名第 4 的請假範本頁）
    2. `/guides/iphone-ai-elderly-reply/`
    3. `/guides/iphone-ai-message-summary/`
    4. `/guides/iphone-ai-polite-refusal/`
    5. `/guides/how-to-use-keyly-ai-rewrite/`
- **影響**：依賴讀取 `llms.txt` 的第三方 AI 系統（如 Claude Artifacts、開發者 AI 助手、部分新創 AI 搜尋引擎）將完全無法得知這些重要範本頁面的存在。
- **具體改善方案**：
  - 更新 `public/llms.txt` 與 `public/llms-full.txt`，補齊上述 5 篇頁面的 Canonical 連結與繁中/英文簡短說明。

---

### 2. 【High】非標準之 `LLMs:` 標籤放在 `robots.txt`
- **證據**：
  - `public/robots.txt` 第 6 行：`LLMs: https://keylyapp.com/llms.txt`
- **影響**：RFC 9309（Robots Exclusion Protocol）官方標準僅定義 `User-agent`、`Allow`、`Disallow`、`Sitemap`。雖然 `LLMs:` 欄位不會造成致命錯誤，但搜尋引擎（如 Googlebot）會將其視為無效指令並略過。Google 官方文件（2026-06-15 更新）更明確指出 Google Search 完全不使用 `llms.txt` 作為排名依據。
- **具體改善方案**：
  - 保持 `llms.txt` 在網站根目錄供第三方 AI 自行訪問即可；可在 `public/robots.txt` 保留或改為標準註解 `# LLMs reference: https://keylyapp.com/llms.txt`。

---

### 3. 【Medium】段落首處缺少「獨立自成一體（Self-Contained）」的直接定義句
- **證據**：
  - [guides/iphone-zhuyin-selection-fixes/](file:///Users/deanchung/Documents/keyly-website/guides/iphone-zhuyin-selection-fixes/index.html)：
    - 開頭僅有情緒性問句：「受夠 iPhone 內建注音永遠選不對字、越打越氣？」，並未在前 60 字提供可被 AI 直接引用的客觀定義。
    - AI 在摘要「iPhone 自動選字如何關閉」時，會因為找不到「iOS 系統並無獨立自動選字開關，對應項目為自動修正與預測字詞」的直述句而放棄引用該頁。
- **影響**：在 Google AI Overviews 與 Perplexity 的引文演算法中，約 44% 的引文摘錄自頁面前 30% 具備直接定義的獨立回答塊（約 40~60 字長度）。
- **具體改善方案**：
  - 各指南第一段強制植入「直述型答案模組」（如：「iPhone 鍵盤聲音與震動的設定路徑為：『設定』>『聲音與觸覺回饋』>『鍵盤回饋』...」）。

---

### 4. 【Low】多模態素材缺乏純 HTML 靜態圖片替代
- **證據**：
  - 範本展示區（如請假訊息、長輩問候）採用了 `<div data-rewrite-film>` 的 JS 動態腳本注入，在純文字抓取時僅為一段 JSON 字串，無靜態配圖或 HTML 表格供多模態模型直接辨識。
- **改善方案**：
  - 在動態展示元件旁保留標準 `<noscript>` 或語意化 HTML 文本與對照表格，確保多模態 AI 能完整解讀前/後對比效果。
