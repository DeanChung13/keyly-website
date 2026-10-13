# Schema / Structured Data（Claude，2026-10-14）

**分數：55 / 100**

## 現況
- 首頁、`/en/`：`SoftwareApplication` + `Offer`（price 0）+ `AggregateRating`（5.0／4 則）。
- 其他所有頁：只有 `WebPage` + `publisher: Organization{name}`。
- `dateModified`：15 篇 guide 只有 9 篇有；`full-access` 連 `datePublished` 都沒有。

## Findings

### Medium — 首頁 `AggregateRating` 是寫死的數字，評價數也沒顯示在頁面上
- 證據：JSON-LD `ratingValue 5.0 / ratingCount 4`；頁面可見「5.0 · App Store 滿分好評」，但沒有「4 則」。
- 風險：評分標記應反映頁面上看得到的內容。數字寫死在原始碼裡，App Store 實際評分變動後就會不一致。
- 修法：在可見文字補上評價數（例如「5.0（4 則評價）」），並在建置時從 App Store 拉最新值，同時更新 JSON-LD 與畫面。只有 4 則評價時，星等也不容易出現在搜尋結果，所以這項不急。

### Medium — Guide 頁用 `WebPage`，建議改為 `Article`（或 `BlogPosting`）
- 修法：每篇加 `headline`、`datePublished`、`dateModified`、`author`（Organization 或具名作者）、`image`、`mainEntityOfPage`。
- 效益：讓 Google 正確讀到日期；同一份 `dateModified` 也能拿來自動產生 sitemap lastmod（見 technical.md）。

### Medium — 首頁缺 `WebSite` 與完整的 `Organization`
- `WebSite { name: "Keyly", url }` 是 Google 決定搜尋結果上「網站名稱」的主要依據。
- `Organization` 補 `logo`、`url`、`sameAs`（App Store、Instagram、Threads、YouTube）。

### Low — 加 `BreadcrumbList`（首頁 › 指南 › 文章）
讓行動版搜尋結果顯示麵包屑，取代原始 URL。

### 不建議做
- `FAQPage`：2023 年起只對政府、醫療網站顯示複合式結果。
- `HowTo`：2023 年已停止顯示複合式結果。
- 兩者加了都不會提高點擊率。
