# keylyapp.com SEO 行動計畫（2026-10-14）

依「預期效果 ÷ 工作量」排序。來源見 `findings/` 對應檔案。

## 第 1 週：不用寫新內容

| # | 項目 | 嚴重度 | 工作量 | 來源 |
|---|---|---|---|---|
| 1 | GSC 重新提交 sitemap；對 `iphone-translation-keyboard-comparison`、`iphone-double-pinyin` 要求建立索引 | High | 5 分鐘 | technical |
| 2 | 補站內上下文連結：zhuyin-keyboard → haptics、selection-fixes、translation-comparison；full-access → selection-fixes；custom-ai-prompt → polite-refusal、leave-request、line-translation（selection-fixes → double-pinyin 原本就有，不用加） | Medium | 1 小時 | onpage |
| 3 | `llms.txt`、`llms-full.txt` 補 5 篇 AI 情境 guide | Low | 15 分鐘 | geo |
| 4 | zhuyin-keyboard 比較表加「左右滑動」提示與右側漸層 | Medium | 30 分鐘 | sxo |
| 5 | 首頁影片 `<source>` 改成 mp4 在前（或重新壓縮 webm） | Medium | 10 分鐘 | performance |
| 6 | `/terms/` 補 description；`<html lang>` 統一為 `zh-TW` | Low | 15 分鐘 | onpage／technical |

## 第 2–3 週：高曝光頁的內容修補

| # | 項目 | 嚴重度 | 來源 |
|---|---|---|---|
| 7 | **請假訊息頁**：加 4 組靜態 HTML 範例（病假、事假、臨時急事、半天）並附複製按鈕；標題改為「請假訊息怎麼打？病假、事假、臨時請假範例（可直接複製）」 | **High** | onpage + sxo |
| 8 | **haptics**：新增「打字沒聲音？」H2（先上機確認靜音模式的行為），再換標題與 description | High | onpage + sxo + 001 review |
| 9 | **selection-fixes**：「30 秒排查順序」前加一句「iOS 沒有『自動選字』開關，對應的是自動修正與預測字詞」，再換標題與 description | High | onpage + geo + 001 review |
| 10 | 縮短過長標題：custom-ai-prompt、apple-intelligence、elderly-reply（去掉「【教學】」前綴、核心詞放前 20 字） | Medium | onpage |

> 7–9 建議分開上線，並在 GSC 加註記，上線 28 天後比較同一組查詢的 CTR，才分得出是哪項改動帶來效果。

## 第 2 個月：結構化資料與信任訊號

| # | 項目 | 嚴重度 | 來源 |
|---|---|---|---|
| 11 | `scripts/prerender.mjs` 建置時自動產生 sitemap，lastmod 取各頁的 `dateModified` | Medium | technical |
| 12 | guide 的 JSON-LD 從 `WebPage` 改成 `Article`（含 datePublished、dateModified、author、image）；補 `full-access` 的日期 | Medium | schema + content |
| 13 | 首頁加 `WebSite`、完整的 `Organization`（logo、sameAs）；可加 `BreadcrumbList` | Medium | schema |
| 14 | 作者署名（具名作者或「Keyly 團隊」）＋ `/about/` 頁 | Medium | content |
| 15 | 首頁 AggregateRating：頁面補上評價數，建置時從 App Store 同步 | Medium | schema |
| 16 | 前三名曝光頁做專屬 OG 圖 | Medium | images |
| 17 | 8 月版的 4 篇 guide 重新查核並更新日期（haptics、zhuyin-keyboard、double-pinyin、apple-intelligence） | Medium | content |

## 持續進行

- 每次新增 guide：sitemap、llms.txt、hub 頁、至少 2 條站內入站連結、GSC 要求建立索引。
- 每月看 GSC 頁面 × 查詢，找「排名 ≤ 8 但 CTR < 3%」的組合優先處理。
- double-pinyin 若 60 天後仍未收錄，評估併入 zhuyin-keyboard。
- 用 `seo-drift` 建立基準線，改版後比對有沒有意外弄壞 title、canonical 或 schema。

## 不建議做

- FAQPage、HowTo schema（Google 已不顯示這兩種複合式結果）
- 為了湊字數擴寫文章
- 封鎖 AI 爬蟲（目前全開，對被 AI 搜尋引用有利）

## 執行狀態（2026-10-14 更新）

- 第 1 週 #2–#6：已上線（commit `2cdd94e`～`4b78844`）。#1 需使用者在 GSC 操作。
- #7–#13、#16、#17：已完成（Claude：#7–#13；agy：#16 OG 圖、#17 事實複查）。
- #15 首頁評分：已用 iTunes Lookup API 確認目前為 5.0／4 則，與 JSON-LD 一致；未做建置時自動同步（僅 4 則評價，效益低，且會讓 CI 建置依賴外部 API）。
- #14 作者與 `/about/` 頁：已在所有 guide 加上「作者：Keyly 團隊」署名與 JSON-LD `author`；`/about/` 頁需要團隊與公司資訊，**待使用者提供**。
