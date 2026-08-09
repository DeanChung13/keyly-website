# Keyly GA4 研究與定期監測方式

更新日期：2026-08-09

## 目的

用 GA4 判斷使用者進站後的行為與 App Store 導流，並避免把 iOS App、正式網站與測試環境混成同一組數據。自然搜尋曝光、查詢與索引狀態仍以 GSC 為準。

目前透過本機 `analytics-mcp` 以唯讀權限查詢 GA4。憑證、私鑰與本機路徑不得寫入 repo 或研究報告。

## 固定研究流程

### 1. 先確認量測範圍

1. 用 `platform` 分開 `web` 與 `iOS`。
2. 網站研究固定篩選 `platform = web`。
3. 再用 `hostName` 區分正式站與測試流量；正式站只採用 `keylyapp.com`。
4. `localhost`、`keyly-website.pages.dev`、空白 hostname 與 `(not set)` 另列為資料品質問題，不併入正式站成效。

全資源彙總只能用來檢查資料是否持續送入，不可直接當成網站流量或網站轉換率。

### 2. 依序回答三個問題

1. **獲客量**：正式站的 users、sessions、page views 有多少；來源看 `sessionSourceMedium`。
2. **站內行為**：使用者進入哪些 `pagePath`，是否產生必要互動。
3. **主要轉換**：`download_click` 的事件數、使用者數及 CTA 位置。

完成這三步後若樣本不足，就以「未知」結案，不用更多切分製造假精度。

### 3. 日期與比較

- 即時驗證使用 Realtime report，確認 `page_view` 與指定事件正在送入。
- 趨勢使用最近完整 28 天對前一個 28 天；避開仍可能更新的最近 2 天。
- 每次記錄日期範圍、filters、dimensions 與 metrics。
- 2026-08-09 是量測斷點：網站由互動／8 秒延遲載入改為官方 async 載入。斷點前後不可直接解讀為純流量成長。

## MVP 必查報表

每次只需查以下四組：

| 目的 | Dimensions | Metrics | 必要篩選 |
|---|---|---|---|
| App／網站分流 | `platform` | `activeUsers`, `sessions`, `screenPageViews`, `keyEvents` | 無 |
| 正式站流量 | `hostName`, `pagePath` | `activeUsers`, `sessions`, `screenPageViews` | `platform = web` |
| 獲客來源 | `sessionSourceMedium` | `sessions`, `engagedSessions` | `platform = web`, 正式站範圍 |
| 下載轉換 | `eventName` | `eventCount`, `activeUsers` | `platform = web`, `eventName = download_click` |

需要判斷不同 CTA 表現時才查 CTA 位置。`event_label` 已於 2026-08-09 註冊為事件範圍自訂維度；只有註冊後的新資料能可靠拆分 `navbar`、`hero` 與 `cta_section`。

## 2026-08-09 基準與限制

查詢範圍：`28daysAgo` 至 `today`，包含量測方式改動日，只作資料品質基準，不作後續成長目標。

| 觀察 | 數值 | 判讀 |
|---|---:|---|
| Web 活躍使用者 | 23 | 網站樣本很小 |
| Web sessions | 25 | 不足以判定轉換率優劣 |
| Web page views | 28 | 包含正式站與測試環境 |
| Google organic sessions | 1 | 當前主要問題是自然搜尋獲客不足 |
| `download_click` | 1 次／1 位使用者 | 事件可收到，但樣本不足 |
| Web key events | 0 | 查詢當時 `download_click` 尚未設為重要事件；已於同日完成設定，歷史資料不回填 |
| iOS key events | 39 | 全部來自 App，不得當成網站轉換 |
| 測試流量 | Pages.dev 5 page views、localhost 2 page views | 必須與正式站分開 |
| GA4 自訂維度 | 查詢當時為 0 | 同日已新增 `event_label`；只適用於後續事件 |

因此目前可以證實「網站流量少」，不能證實「網站轉換率差」。

## 決策規則

| 觀察結果 | 判定／下一步 |
|---|---|
| Web 流量很少 | 先處理獲客；不以少量點擊改版 |
| `download_click` 有資料但 key events 為 0 | 在 GA4 將 `download_click` 設為重要事件 |
| 正式站以外 hostname 出現流量 | 報表排除，並評估停止測試環境送出正式 GA 資料 |
| 有足夠正式站 sessions，但下載事件仍少 | 再檢查 CTA 可見度、裝置差異與到達頁；此時才研究轉換問題 |
| GSC clicks 明顯高於 GA4 organic sessions | 檢查同一日期範圍、時區、consent、標籤載入與來源歸因 |
| GA4 organic sessions 少，GSC impressions 也少 | 判定為搜尋能見度／獲客問題，不是 GA 漏記證據 |

## GA4 與 GSC 的分工

- **GA4**：使用者進站後做了什麼、是否點擊 App Store、App 內事件。
- **GSC**：Google 搜尋曝光、點擊、query、page、country、device 與索引狀態。
- 搜尋漏斗應以同期 `GSC clicks → GA4 web organic sessions → download_click` 檢查，但三者口徑不同，不要求數字完全相等。

## 報告規則

- 每個結論標示為「已證實」、「合理推論」或「未知」。
- 同時列出絕對數量；低樣本時不只報百分比。
- 明確寫出是否已套用 `platform` 與 `hostName` 篩選。
- App Store 點擊只是導流事件，不等於安裝、啟用或付費。
- GA4 的 `keyEvents` 必須確認事件定義與平台，不能把所有重要事件合併成網站轉換。
