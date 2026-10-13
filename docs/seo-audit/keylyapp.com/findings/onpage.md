# On-Page SEO（Claude，2026-10-14）

資料來源：線上 23 頁的 title／description／H1／內部連結；GSC 2026-09-14～10-12 頁面 × 查詢數據。

**分數：70 / 100**

## 運作良好
- 每頁都有唯一 title、description、單一 H1，H2 結構完整（5–11 個）。
- 主力頁 `iphone-zhuyin-keyboard` 在「iphone 輸入法推薦」「iphone 鍵盤推薦」排名 1–2，CTR 21–50%，標題與意圖吻合。
- og:title、twitter:card 全站都有。

## Findings

### High — 兩篇高曝光 guide 的標題沒對上主要查詢
`iphone-keyboard-haptics`（1,053 曝光、CTR 0.85%）與 `iphone-zhuyin-selection-fixes`（1,102 曝光、CTR 1.81%）。已在 `.agents/messages/20261014-001-seo-ctr-optimization-proposal-response.md` 提出修改版，這裡不重複。重點：haptics 要先補「打字沒聲音／靜音模式」段落再改標題；selection-fixes 要在 description 直接回答「iOS 沒有『自動選字』開關」。

### High — `iphone-ai-leave-request`：「請假訊息怎麼打」排名 3.8，CTR 只有 3.9%
- 證據：此查詢 204 次台灣曝光（全站單一最大查詢）、8 點擊。排名前 4 的 CTR 通常應該在 10% 以上。
- 判讀：搜尋者要的是**範例文字**，目前標題「請假訊息不知道怎麼寫？iPhone 鍵盤 AI 幫你寫出得體請假訊息」讀起來像產品頁。
- 修法：標題改為以範例為主，例如 `請假訊息怎麼打？病假、事假、臨時請假範例（可直接複製）— Keyly`；description 前段先列出有哪幾種範例，再帶到 AI 改寫。內文要確認真的有可複製的範例區塊（請 agy 在 SXO 報告一起確認）。

### Medium — 長標題會被截斷，核心詞後段失效
| 頁面 | 標題字數 | 問題 |
|---|---|---|
| `iphone-custom-ai-prompt` | 57 | 「【教學】」佔開頭；H1 也照抄整串 |
| `apple-intelligence-vs-ai-keyboard` | 60 | 「繁中支援與差異比較」會被截掉 |
| `iphone-ai-elderly-reply` | 47 | 「｜長輩、同事、朋友都適用」重複在 H1 |
- 修法：核心詞放前 20 字，去掉「【教學】」「【2026】」這類前綴；H1 不必和 title 一字不差。

### Medium — 站內連結：`haptics`、`selection-fixes` 幾乎沒有入站連結
- 證據（排除 hub 與自我連結後的入站數）：`full-access` 13、`iphone-zhuyin-keyboard` 10、`how-to-use-keyly-ai-rewrite` 8；**`iphone-keyboard-haptics` 只有 1（來自 full-access）**，`iphone-zhuyin-selection-fixes` 只有 1（來自 zhuyin-keyboard），`iphone-double-pinyin` 3。
- `iphone-custom-ai-prompt` 只有 1 個出站連結。`line-translation` 與 `iphone-translation-keyboard-comparison` 只互連，主力頁 zhuyin-keyboard 沒連到翻譯比較。
- 修法（不需新內容，加上下文連結即可）：
  - zhuyin-keyboard「第三方鍵盤沒震動」相關段落 → haptics
  - full-access、zhuyin-keyboard → selection-fixes（「選字亂跳先排查」）
  - zhuyin-keyboard 比較表的翻譯欄 → translation-keyboard-comparison
  - custom-ai-prompt → polite-refusal、leave-request、line-translation（當作範本實例）

### Low — 品牌分隔符號不一致
`— Keyly` 與 `｜Keyly` 混用。挑一種統一即可，不影響排名。

### Low — `/terms/` description 只有「Keyly 服務條款。」（11 字）
英文版是完整句子，中文版補齊即可。
