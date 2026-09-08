# 2026-09-09 曝光成效檢查：待辦任務

查詢日期：2026-09-09
資料期間：2026-08-12 ～ 2026-09-08（請求 28 天），對照期 2026-07-15 ～ 2026-08-11（28 天）
**GSC 實際只回傳到 2026-09-06**：09-07、09-08 兩天尚無資料（GSC 約 2 天延遲），
因此本期 GSC 數字是 **26 天**，對照期為完整 28 天。兩期不同長度，成長幅度若有偏差是**低估**。
資料來源：GSC `sc-domain:keylyapp.com`（Web）、GA4 property 525557787（keyly-b9b15）
上位文件：[okr.md](../okr.md) → KR-1、[GSC 曝光基準](2026-08-11-gsc-exposure-baseline.md)

---

> **重要讀數限制**：`ebdbe56 feat(growth): optimize search snippets and guide CTAs`
> 於 **2026-09-04** 進版，距資料截止（09-08）只有 4 天。本文第 1、2 項所測的 28 天窗口
> **有 24 天在該次優化之前**。因此「CTA 沒有點擊」與「snippet CTR 偏低」都不能當成
> 該次優化無效的證據；要判定成效，最早應在 **2026-10-04**（改版後滿 28 天，再加 GSC 的 2 天延遲）重讀同一組指標。

---

## 現況：整條漏斗

| 階段 | 數字 | 來源 |
|---|---:|---|
| GSC 曝光（全球） | 2,767 | GSC 全站彙總 |
| GSC 曝光（台灣） | 2,065 | GSC country=twn |
| GSC 點擊 | 55 | CTR 1.99%、平均排名 7.7 |
| GA4 web sessions | 98 | platform=web 全管道 |
| GA4 organic sessions | 61 | platform=web + Organic Search |
| **`download_click` 事件** | **7** | 首頁 6、`/guides/iphone-zhuyin-keyboard/` 1 |

對照期（前 28 天）：曝光 364、點擊 1、organic sessions 1。

**曝光與點擊都起來了，但轉到 App Store 的動作是 7 次，其中來自 Guide 頁的只有 1 次。**

---

## 1. Guide 頁的下載 CTA 幾乎不產生點擊（最高優先）

**現況**：28 天內 11 個 Guide 頁合計產生 **1 次** `download_click`（來自 `/guides/iphone-zhuyin-keyboard/`）。
其餘 6 次全部來自首頁 `/`。

`docs/ga-events.md:44-52` 顯示每個 Guide 頁都已埋 CTA 事件，包含三段式 CTA 的
`iphone-ai-polite-refusal` 與 `how-to-use-keyly-ai-rewrite`。**追蹤沒有缺，是點擊本身不存在。**

**為什麼是最高優先**：這是 SEO 與 KR-1 之間唯一的接點。Guide 頁把人帶進來了
（organic 61 sessions），但沒有把人送到 App Store。在這一段修好之前，
再多曝光都不會變成 [okr.md](../okr.md) `:124` 的 App Store 曝光。

**待決**：先驗證是「CTA 沒被看到」還是「看到了不想點」。`scroll` 事件 28 天只有 28 次，
無法判斷 Guide 頁的觸底率。需要先確認是否要為 Guide 頁補 CTA 曝光事件
（類似 App 內的 `home_hero_impression`）。

---

## 2. `/guides/iphone-keyboard-haptics/` 吃掉一半曝光、零點擊

**現況**：1,434 曝光（全站 52%）→ 6 點擊，CTR 0.42%，平均排名 7.9。
拆到裝置：mobile 315 曝光 0 點擊（pos 8.5）、desktop 17 曝光 0 點擊（pos 10.9）。

> 註：GSC 加上 `device` 維度後總量會少於單維度彙總（低量列被匿名化隱藏），
> 兩組數字不可互相加總比對，只能各自看趨勢。

該頁承接的 query 全部 0 點擊：
`iphone 鍵盤聲音` 36、`iphone 打字震動` 22、`iphone 打字聲音` 20、
`iphone 打字 聲音 關閉` 12、`iphone 鍵盤 聲音 怎麼 調` 11、`iphone 鍵盤震動` 6。

**不是意圖錯配**。[content-brief-iphone-keyboard-sound-haptics.md](content-brief-iphone-keyboard-sound-haptics.md)
在 2026-08-11 就把這頁定位成同時承接聲音與震動的系統設定意圖，且已上線：

- Title：`iPhone 打字震動怎麼開？鍵盤聲音、觸覺回饋沒反應解法（2026）— Keyly`
- H1：`iPhone 鍵盤聲音與震動怎麼開？設定與沒反應排查`

意圖對、標題對、排名進到第 8 位，CTR 仍是 0.42%。對照組
`/guides/iphone-zhuyin-keyboard/` 在排名 5.5 拿到 13.5% CTR。

**待決**：這批系統設定字的 SERP 上方是 Apple 官方說明與台灣科技媒體。
要決定的是「投資源把排名從 8 推到 3」還是「承認這批字對 Keyly 不值得」——
後者的理由是：想關掉打字聲音的人，需求解決後沒有安裝第三方鍵盤的動機。
這個判斷會決定接下來的內容方向，不該擱著。

---

## 3. `/en/` 曝光高、點擊近乎零

**現況**：342 曝光 → 1 點擊（0.29%）。desktop 83 曝光 0 點擊、平均排名 **3.4**。
排名第 3 卻沒人點。

[2026-08-11-gsc-exposure-baseline.md](2026-08-11-gsc-exposure-baseline.md) 已記錄
「過去曝光主要是英文首頁在全球同名 `keyly` 查詢中的曝光」。品牌詞 `keyly` 本期
275 曝光 3 點擊（CTR 1.09%，排名 3.5）。

**待決**：這 342 次曝光落在非目標市場、且搜尋者要找的多半是別的 Keyly。
要決定是否值得處理（例如英文站 title 加上產品類別詞），或直接接受它是雜訊、
往後所有曝光報告一律以 country=twn 為準。

---

## 4. `okr.md` 的「台灣非品牌曝光現為 0」已過期

**位置**：[okr.md](../okr.md) `:81`「SEO｜目標 100 訪客／日；台灣非品牌曝光現為 0｜大量文件、零成果」
與 `:450` 同樣敘述。[okr-kr-1-exposure-130x.md](../okr-kr-1-exposure-130x.md) 的死因表也把 SEO 記為「無證據」。

**現況推翻此點**：台灣 28 天 2,065 曝光、43 點擊，且非品牌 query 明確可見
（`iphone 鍵盤聲音`、`iphone 打字震動`、`請假訊息怎麼打`、`iphone 輸入法 推薦`、
`iphone 第 三方 鍵盤 推薦`）。基準期同口徑為 28 天 11 曝光。

**但不得寫成「SEO 對 KR-1 有貢獻」**：KR-1 的曝光定義是 App Store Connect 曝光
（[okr.md](../okr.md) `:46`，1,436／月），與 GSC 曝光是不同的面。在第 1 項修好之前，
兩者之間沒有可量化的接點。

**待決**：要更新 `okr.md` 的這兩處敘述，還是等 10-15 KR-1 停損點一併處理。

---

## 5. 高 CTR 的字量太小，低量的字量才大

| Query | 曝光 | 點擊 | CTR | 排名 |
|---|---:|---:|---:|---:|
| `iphone 第 三方 鍵盤 推薦` | 5 | 2 | 40.0% | 1.8 |
| `iphone 輸入法 推薦` | 9 | 2 | 22.2% | 5.1 |
| `請假訊息怎麼打` | 90 | 3 | 3.3% | 10.0 |
| `keyly` | 275 | 3 | 1.1% | 3.5 |
| `iphone 鍵盤聲音` | 36 | 0 | 0% | 7.9 |

**推薦／選擇類**的字 CTR 是 20–40%，但曝光只有個位數。
**系統設定類**的字曝光大，CTR 是 0。

**待決**：目前的內容產能押在哪一類？這關係到 [seo-topics.md](../seo-topics.md) 的下一輪選題，
且與第 2 項是同一個決定。

---

## 6. `/guides/iphone-ai-leave-request/` 進站後留不住

**現況**：GA4 6 sessions，平均停留 **7.7 秒**，engagement rate 33%。
GSC 該頁 120 曝光 4 點擊；對應 query `請假訊息怎麼打` 90 曝光 3 點擊、排名 10.0。

Query 意圖與頁面主題相符，人也進來了，但幾乎立刻離開。

**待決**：需要看實際頁面內容才能判斷是「答案在太下面」還是「答案不是讀者要的」。
本輪未讀該頁內容，不下結論。

---

## 7. GA4 property 混合 App 與 Web 資料流，分析時必須先分 platform

**現況**：`properties/525557787` 同時收 iOS App 與網站事件。
28 天內 iOS 93 sessions、web 98 sessions，量級相當。

不加 `platform` 維度會直接誤讀：
- `sessionDefaultChannelGroup` 的 Direct 117 sessions，其中 **90 是 iOS App**，只有 27 是網站。
- `landingPagePlusQueryString` 的最大一列 `(not set)` 90 sessions，拆開後 **86 是 iOS App**
  （本來就沒有 landing page），只有 **4 是 web**。整列不能當成網站的歸因遺失，
  但那 4 筆 web 的 `(not set)` 仍是真的歸因遺失，量小、暫不處理。

**待決**：是否要在 [docs/analytics/ga4-research-and-monitoring.md](../analytics/ga4-research-and-monitoring.md)
明文寫入「所有網站報表一律加 `platform == web` 篩選」，避免往後重複踩到。

---

---

## 8. App Store 曝光已查：8 月確有成長，但成長不在 SEO 這一側

**補查日期**：2026-09-09，來源 App Store Connect Analytics
`App Store Discovery and Engagement Standard`（app id `6759639348`）。

### 月曝光（Impression）

| 月份 | App Store search | App Store browse | 合計 |
|---|---:|---:|---:|
| 2026-04 | 1,725 | 154 | 1,879 |
| 2026-05 | 1,141 | 16 | 1,157 |
| 2026-06 | 1,459 | 71 | 1,530 |
| 2026-07 | 1,470 | 152 | 1,622 |
| **2026-08** | **2,362** | **204** | **2,566** |

5–7 月三個月平均 1,436，與 [okr.md](../okr.md) `:46` 的 KR-1 基準完全吻合，
確認這份報表就是 KR-1 的口徑。

**8 月 2,566 = 基準的 1.79 倍**，較 7 月 +58%。

### 但增量全部在 App Store search

同期各來源的產品頁瀏覽（Page view）：

| 來源 | 2026-07 | 2026-08 |
|---|---:|---:|
| App Store search | 116 | 146 |
| App Store browse | 60 | 57 |
| App referrer | 2 | 12 |
| **Web referrer** | **3** | **11** |

**`Web referrer` 是網站導向 App Store 的唯一證據，8 月整月 11 次。**

同期網站側：GSC 曝光 2,767、點擊 55、GA4 `download_click` 7 次。
兩邊量級一致，互相佐證——**SEO 這波曝光成長（364 → 2,767）在 App Store 那一面
只換到約 11 次產品頁瀏覽。**

### 結論

- 8 月 App Store 曝光成長是**真的**，但**不能歸因於 SEO**。增量 +892 全在 App Store search，
  web referrer 只動了 +8。合理的歸因對象是同期的 ASO Round 2，本文未查證，不下定論。
- 第 4 項的判斷因此要收緊：「台灣非品牌曝光現為 0」在 **GSC 口徑**上已過期，
  但在 **KR-1 的 App Store 口徑**上，SEO 的貢獻仍然接近零。兩者不可混用。
- [okr.md](../okr.md) `:392` 的 10-15 停損門檻是「30 天曝光 ≥ 3,000」。8 月 2,566 未達標。
  9 月 02–07 共 6 天 354 次曝光（日均 59.0），低於 8 月日均 82.8；若維持此速率，
  9 月約 1,770，**距門檻更遠**。

### 資料限制

- 9 月只有 **09-02 ～ 09-07** 六天的 DAILY 資料（ONGOING 請求 09-05 才開始產出），
  09-01、09-08 缺；月度資料最新只到 8 月。因此無法產出與 GSC 相同的 08-12～09-08 窗口。
- 4–7 月來自 `ONE_TIME_SNAPSHOT` 請求（processingDate 08-09），
  8 月起來自 `ONGOING` 請求（processingDate 09-05）。兩者為不同請求，本文未交叉驗證同一月份的一致性。
- `Impression` 事件在本報表中只有 `App Store search` 與 `App Store browse` 兩個來源，
  **web referrer 不產生 Impression，只產生 Page view**。因此「網站帶來多少 App Store 曝光」
  這個問法本身不成立，正確的問法是「網站帶來多少產品頁瀏覽」。

## 本輪未查、可能影響上述判斷的項目

- Guide 頁的實際觸底率／CTA 曝光率（第 1 項的關鍵證據，目前沒有事件可查）。
- `/guides/iphone-ai-leave-request/` 的頁面內容（第 6 項）。
- 09-04 snippet／CTA 優化後的乾淨 28 天讀數（最早 2026-10-04）。
- GSC `page` × `query` 交叉，用以確認各 Guide 頁實際承接的 query（本輪只取了全站 query）。
