# 全站內容品質與 E-E-A-T 稽核報告（Content Quality & E-E-A-T Findings）

**受測網站**：`https://keylyapp.com`  
**稽核範圍**：全站 23 頁，重點涵蓋 `guides/` 底下 15 篇核心使用指南  
**稽核標準**：Google Search Central 實用內容指南（Helpful Content / 2024 Core Updates）、Google 搜尋品質評分者指南（QRG 2025 年 9 月版）  
**負責 Agent**：agy

---

## 一、 Google "Who / How / Why" 核心準則檢核

| 評估維度 | 核心標準 | 現況診斷 | 判定評級 |
|---|---|---|---|
| **Who（誰寫的）** | 具備透明的作者標籤（Byline）、專家／開發者背景、專業資歷與可追溯性 | 全站 15 篇 Guide **完全沒有作者姓名、個人簡介或技術背景**。JSON-LD 亦僅標記 `publisher: Organization (Keyly)`，無 `author: Person`。 | 🔴 **不合格（High Risk）** |
| **How（如何產出）** | 具備第一手實測紀錄、明確的測試方法論、設備與 iOS 版本標註 | 部分指南有標註「實機資料查核日期（如 2026-08-11）」與比較表，但多數缺乏測試環境（如 iPhone 機型、iOS 版本）、量化測試基準。 | 🟡 **部分符合** |
| **Why（為何存在）** | 以「幫助使用者解決問題」為核心，而非僅為了吸引搜尋點擊 | 大多數 Guides 能直接提供步驟與解法，但後段緊接產品導購。需確保原創解決方案價值高於促銷意圖。 | 🟢 **合格** |

---

## 二、 E-E-A-T 評分矩陣（Score: 68 / 100）

> 依據 Google 官方準則權重：**Trustworthiness 最關鍵（30 分）**，Expertise（25 分）、Authoritativeness（25 分），Experience（20 分）。

| 評分維度 | 分數 | 現況優勢 (Strengths) | 缺失與風險 (Weaknesses) |
|---|---|---|---|
| **Experience（第一手經驗）** | **14 / 20** | 包含多款輸入法實際鍵位對照、LINE 對話實際情境截圖與動畫。 | 缺少客觀量測數據（如打字速度 WPM 實測、選字正確率盲測資料）、缺少真實使用者測試反饋。 |
| **Expertise（專業深度）** | **17 / 25** | 對 iOS 鍵盤限制（如完全取用權限、iOS 16+ 鍵盤回饋開關）說明清晰準確。 | 內容深度不均，部分頁面僅羅列系統步驟，未深入排查邊界狀況（如藍牙耳機、靜音鍵對鍵盤聲的影響）。 |
| **Authoritativeness（權威度）** | **15 / 25** | 在台灣 iPhone 注音鍵盤領域已建立早期排名（排名 1~2 位）。 | 缺乏外部權威引用、科技媒體報導連結，網域權重（DR）與品牌跨平台討論度偏低。 |
| **Trustworthiness（信任度）** | **22 / 30** | 具備完整繁中與英文隱私權政策、服務條款、訂閱條款，全站 HTTPS 與無暗黑轉址。 | 缺少實體公司資訊、無作者署名、缺少 About 關於我們團隊頁面。 |

---

## 三、 核心問題清單（按嚴重度排列）

### 1. 【Critical】全站 15 篇指南「零作者署名（Anonymous Content）」與結構化資料缺漏
- **證據**：
  - 檢視 `guides/*/index.html` 15 篇檔案，全文均無 `<div class="author">` 或任何作者資訊。
  - 所有頁面的 JSON-LD `<script type="application/ld+json">` 僅有：
    ```json
    "publisher": {
      "@type": "Organization",
      "name": "Keyly"
    }
    ```
    缺少 `"author": { "@type": "Person", "name": "..." }`。
- **影響**：在 2024~2025 年歷次 Google 核心演算法更新中，針對軟體教學、工具評測類的「匿名文章」給予較低的 E-E-A-T 評分，容易被認定為 AI 生成或純 SEO 農場頁。
- **具體改善方案**：
  1. 在 Guide 標題下方 `<div class="page-meta">` 加入作者署名與身分，例如：「Keyly iOS 產品團隊」或具名開發者。
  2. 建立 `/about/` 團隊介紹頁，展示 iOS 開發者背景與注音輸入法研發經歷。
  3. 在 JSON-LD 中補上 `author: { "@type": "Person", "name": "...", "jobTitle": "iOS Developer" }`。

---

### 2. 【High】內容時效性失真：4 篇早期指南未更新已達 2 個月，1 篇完全無日期
- **證據**：
  - [guides/iphone-keyboard-haptics/](file:///Users/deanchung/Documents/keyly-website/guides/iphone-keyboard-haptics/index.html)：`更新日期：2026 年 8 月 11 日`
  - [guides/iphone-zhuyin-keyboard/](file:///Users/deanchung/Documents/keyly-website/guides/iphone-zhuyin-keyboard/index.html)：`資料查核日期：2026 年 8 月 11 日`
  - [guides/iphone-double-pinyin/](file:///Users/deanchung/Documents/keyly-website/guides/iphone-double-pinyin/index.html)：`資料查核日期：2026 年 8 月 11 日`
  - [guides/apple-intelligence-vs-ai-keyboard/](file:///Users/deanchung/Documents/keyly-website/guides/apple-intelligence-vs-ai-keyboard/index.html)：`Apple 官方資料查核日期：2026 年 8 月 11 日`
  - [guides/full-access/](file:///Users/deanchung/Documents/keyly-website/guides/full-access/index.html)：**頁面上與 JSON-LD 完全沒有任何日期標籤**。
- **影響**：iOS 與輸入法屬於快速變化的科技主題，超過 60 天未註明複查的內容會失去 Freshness 信號，尤其標題帶有「【2026】」卻標示 8 月初查核，在 AI 搜尋與 Google SERP 中會被判別為未維護過期內容。
- **具體改善方案**：
  1. 為 `full-access` 補齊 `datePublished` 與可見的更新日期。
  2. 定期（每 30~45 天）針對 iOS 18 實測複查既有 4 篇早期指南，將日期更新為最近月份，並同步更新 JSON-LD `dateModified`。

---

### 3. 【High】關鍵字互相自噬（Keyword Cannibalization）與主題重疊
- **證據**：
  - **自噬組 A**：[guides/line-translation/](file:///Users/deanchung/Documents/keyly-website/guides/line-translation/index.html) vs [guides/iphone-translation-keyboard-comparison/](file:///Users/deanchung/Documents/keyly-website/guides/iphone-translation-keyboard-comparison/index.html)
    - 兩篇都在 2026-10-07 上線，主題同為「iPhone LINE 輸入即時翻譯」與「翻譯鍵盤推薦」，兩者在「iPhone 翻譯鍵盤」、「LINE 翻譯」等字詞彼此競爭權重。
  - **自噬組 B**：[guides/how-to-use-keyly-ai-rewrite/](file:///Users/deanchung/Documents/keyly-website/guides/how-to-use-keyly-ai-rewrite/index.html) vs [guides/iphone-custom-ai-prompt/](file:///Users/deanchung/Documents/keyly-website/guides/iphone-custom-ai-prompt/index.html)
    - 前者講「AI 改寫怎麼用」，後者講「自訂 AI Prompt 鍵盤實戰」，兩者都鎖定 Keyly AI 改寫操作，造成內部稀釋。
  - **自噬組 C**：[guides/iphone-zhuyin-keyboard/](file:///Users/deanchung/Documents/keyly-website/guides/iphone-zhuyin-keyboard/index.html) vs [guides/iphone-zhuyin-selection-fixes/](file:///Users/deanchung/Documents/keyly-website/guides/iphone-zhuyin-selection-fixes/index.html)
    - 兩篇後半段都在做「第三方注音輸入法推薦比較」，使用者搜尋「iPhone 注音選字」時兩篇同時爭搶第 7~10 名。
- **影響**：分散反向連結權重與使用者點擊，導致兩篇都卡在搜尋結果第二頁（第 7~12 名），無法集中推進到前 3 名。
- **具體改善方案**：
  1. 強化各頁錨定意圖：`iphone-zhuyin-selection-fixes` 聚焦在「排查與設定修復」，將推薦段落精簡並以內部連結導向權威頁 `iphone-zhuyin-keyboard`。
  2. `line-translation` 主打「LINE 單一 App 操作情境」，`iphone-translation-keyboard-comparison` 主打「6 款 App 横向評測」，並在前者置頂引用後者。

---

### 4. 【Medium】薄內容（Thin Content）風險：部分指南字數低於深度門檻
- **證據**：
  - `guides/iphone-translation-keyboard-comparison/index.html`：內文中文字數僅 **1,086 字**（扣除樣式代碼後純文字僅 220 英文詞級距）。
  - 對比競品科技評測（通常 2,500 ~ 4,000 字），該頁 6 款鍵盤各僅用 2~3 句話帶過，缺乏實機打字截圖、翻譯延遲比較或翻譯品質盲測。
- **影響**：Google 爬蟲在評估評測類（Review / Comparison）頁面時，傾向將缺乏深度的簡短比較表降權。
- **具體改善方案**：
  - 擴充 6 款翻譯鍵盤的「實測優缺點詳解」、「免費版每日限制截圖」、「翻譯 API 反應速度實測」，將內文字數擴充至 2,200 字以上。

---

### 5. 【Low】缺少出站權威引用（Outbound Authority Citations）
- **證據**：指南提及 Apple 官方支援（如「Apple 說明此功能適用於 iOS 16 或以上版本」），但未附上 Apple Support 官方技術文件超連結。
- **改善方案**：適度加入 1~2 個指向 Apple 官方支援網頁（`support.apple.com`）的錨點連結，提升資訊源真實度。
