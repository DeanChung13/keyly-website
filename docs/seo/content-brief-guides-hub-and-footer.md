# 內容 Brief：Guides 內容中心與 Footer 資訊架構整理

日期：2026-08-11  
狀態：規劃完成，交由 Claude 實作  
決策：建立 `/guides/` 內容中心，停止在 Footer 逐篇列出 Guide

## 1. 目標

目前首頁、Guide 與中文法務頁的 Footer 重複列出多篇 Guide；文章增加後，導覽會持續變長且缺乏分類。

本輪只解決兩件事：

1. 建立單一的繁體中文 Guide 目錄頁，讓使用者與搜尋引擎能理解內容分類。
2. 將全站 Footer 的逐篇 Guide 連結收斂為一個「使用指南」入口。

這是資訊架構與內部連結整理，不是新增一篇搶排名的長文。不要為了字數加入 FAQ、泛用 SEO 文案或重複關鍵字。

## 2. 頁面規格

- URL：`/guides/`
- Title：`iPhone 鍵盤使用指南：注音、雙拼、設定與 AI 功能｜Keyly`
- Meta description：`整理 Keyly 的 iPhone 鍵盤使用指南，包含注音鍵盤比較、雙拼輸入、選字排查、聲音與震動、完全取用權限，以及 Apple Intelligence 與 AI 鍵盤差異。`
- H1：`iPhone 鍵盤使用指南`
- Canonical：`https://keylyapp.com/guides/`
- hreflang：只設 `zh-TW` 與 `x-default`，皆指向本頁
- OG title／description／URL：與本頁 metadata 同步
- 初始 HTML 必須包含所有標題、摘要與連結，不依賴 JavaScript 掛載
- Schema：沿用既有 `WebPage` 與 `Organization` 模式；不新增 FAQPage、ItemList 或其他 Rich Result 宣稱

## 3. 內容架構

開頭只需一段簡短說明：依「選擇輸入方式、解決鍵盤問題、AI 與寫作功能」三類找到對應指南。

### 3.1 選擇輸入方式

1. `iPhone 注音鍵盤推薦`
   - URL：`/guides/iphone-zhuyin-keyboard/`
   - 摘要：比較內建鍵盤與第三方注音鍵盤的選字方式、離線能力、AI 功能、價格與適合族群。
2. `iPhone 雙拼輸入指南`
   - URL：`/guides/iphone-double-pinyin/`
   - 摘要：說明全拼、微軟雙拼與小鶴雙拼的差異，以及 iPhone 上可用的方式。

### 3.2 解決鍵盤問題

1. `注音選字不準怎麼辦`
   - URL：`/guides/iphone-zhuyin-selection-fixes/`
   - 摘要：依序檢查自動修正、預測字詞、替代文字與鍵盤辭典等可能因素。
2. `iPhone 鍵盤聲音與震動設定`
   - URL：`/guides/iphone-keyboard-haptics/`
   - 摘要：整理聲音與觸覺回饋的開關位置，以及沒有反應時的檢查步驟。
3. `允許完全取用是什麼`
   - URL：`/guides/full-access/`
   - 摘要：說明第三方鍵盤權限實際開放的能力、關閉後的限制與安全判斷方式。

### 3.3 AI 與寫作功能

1. `Apple Intelligence 書寫工具與 AI 鍵盤怎麼選`
   - URL：`/guides/apple-intelligence-vs-ai-keyboard/`
   - 摘要：比較系統書寫工具與 AI 鍵盤的操作方式、支援條件、網路需求與適用情境。

## 4. 介面與語意

- 沿用現有 Guide 的視覺語言、導覽列、字體與色彩，不新增素材或設計系統。
- 每一類使用一個 H2；每篇 Guide 使用 H3 與簡短摘要。
- Guide 項目可做成卡片，但每張卡片只保留一個主要連結，避免巢狀連結。
- 手機單欄，較寬畫面可雙欄；不得造成整頁橫向溢出。
- 使用語意化的 `<main>`、`<section>` 與適當的導覽標籤；鍵盤焦點需清楚可見。
- 不放搜尋、篩選、標籤系統、分頁、文章日期或下載 CTA。

## 5. Footer 整理

### 5.1 中文首頁

移除 Footer 中 6 個個別 Guide 連結，改為單一連結：

- 顯示文字：`使用指南`
- URL：`/guides/`
- GA4 label：`guides_hub`

隱私權政策、服務條款、訂閱說明、技術支援與 English 等既有必要連結保留。

### 5.2 六個中文 Guide

所有 Guide Footer 統一只保留：

1. `所有使用指南` → `/guides/`
2. `回首頁` → `/`
3. `隱私權政策` → `/privacy/`
4. `技術支援` → `mailto:support@keylyapp.com`

Footer 不再列出其他個別 Guide，也不列出自己。

### 5.3 中文法務頁

`/privacy/`、`/terms/`、`/subscriptions/` Footer 中的個別 Guide 連結全部移除，改為一個 `使用指南` → `/guides/`。其餘法務互連、首頁、語言或支援連結維持原狀。

英文頁目前沒有英文 Guide 內容中心，本輪不新增 `/en/guides/`，也不要在英文頁加入繁中 Guide 入口。

### 5.4 正文情境連結

各篇文章正文內的相關 Guide 連結全部保留。這些連結用來補充當下問題，與 Footer 導覽用途不同；不要因本輪 Footer 精簡而刪除或改成一律指向 Hub。

## 6. GA4

沿用既有 `link_click`，不新增事件種類。

- 所有前往 `/guides/` 的新連結：label `guides_hub`
- Hub 內各 Guide 連結沿用既有 label：
  - `guide_zhuyin_comparison`
  - `guide_double_pinyin`
  - `guide_selection_fixes`
  - `guide_keyboard_haptics`
  - `guide_full_access`
  - `guide_apple_intelligence`
- 只在正式網域送出 GA4，沿用現有 hostname 判斷。
- 同步更新 `docs/ga-events.md`。

## 7. 技術與索引更新

實作需同步：

- `guides/index.html`
- `vite.config.ts` 新增 `/guides/` entry
- `public/sitemap.xml` 新增 `https://keylyapp.com/guides/`
- `public/llms.txt` 與 `public/llms-full.txt` 新增 Hub
- `README.md` 加入本 Brief 連結
- 重建既有建置產物

不要變更現有 Guide URL、canonical、hreflang、Title、H1、內容或發布日期。

## 8. 非目標

- 不新增文章或英文 Hub
- 不建立 Blog、CMS、搜尋或標籤功能
- 不重構所有靜態頁為共用模板
- 不新增 Schema 類型或 FAQ
- 不改首頁主內容、Guide 正文或產品宣稱
- 不用 Footer 連結數量當作關鍵字排名技巧

## 9. MVP 驗收

部署前：

1. `/guides/` 的 Title、description、canonical、hreflang 與單一 H1 符合本 Brief。
2. 初始 HTML 包含 3 個分類、6 篇 Guide 與正確 URL。
3. 首頁 Footer 只有 1 個 Guide 入口，不再逐篇列出 6 個 Guide。
4. 六個 Guide Footer 都只有本 Brief 指定的 4 個連結，沒有其他 Guide 清單。
5. 三個中文法務頁只保留單一 `使用指南` 入口，不再列個別 Guide。
6. 文章正文既有情境式內部連結未被刪除。
7. Hub 連結與六個 Guide 連結使用既有 `link_click` 並有可辨識 label。
8. sitemap、llms、Vite entry、GA 文件與 README 已同步。
9. `npm run lint` 與 `npm run build` 通過。
10. 手機版無橫向溢出，所有連結可由鍵盤操作。

部署後：

1. `https://keylyapp.com/guides/` 回 200；無斜線版本回正常導向。
2. 六個 Guide 卡片與 Footer 連結皆無 404。
3. 正式 HTML 的 canonical 與 metadata 正確。
4. 在 GSC 重新提交既有 sitemap，對 `/guides/` 執行網址檢查並要求建立索引。

## 10. 成效判定

本輪主要成功標準是資訊架構清楚、Guide 可從首頁兩次點擊內抵達、Footer 不再隨文章數量膨脹。

索引後第 14 與第 28 天再看 GSC 的 `/guides/` 與各 Guide 是否獲得曝光。Hub 本身不是預期的大流量頁，不因短期沒有點擊就擴寫內容。
