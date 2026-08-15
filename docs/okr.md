# Keyly 目標拆解（OKR）

建立日期：2026-08-15

## 為什麼有這份文件

`docs/` 底下已有 30 份研究、策略與 brief，但**沒有一份寫了最上層目標**。結果是每輪研究都在回答「哪些關鍵字有量」，而不是「這件事對達成目標有沒有幫助」。

這份文件是所有 SEO／ASO／內容工作的上位文件。**任何任務若無法對應到下面某一個 KR，就不該做。**

---

## O｜最上層目標

**Keyly 靠訂閱營收活下來並成長。**

### 現況（App Store Connect API，2026-08-15 查詢）

| 項目 | 數值 | 來源 |
|---|---|---|
| 目前付費訂閱數 | **1** | 訂閱狀態報表 2026-08-13 |
| 目前 MRR | **NT$121**（售價 NT$150，扣 Apple 抽成後實拿） | 財務報表 |
| 已結算總營收 | 約 **NT$200**（訂閱 NT$121 + 日本單筆 ¥386） | 財務報表 3/29–5/2 期間 |
| 目標訂閱數 | 待填 | — |
| 達成期限 | 待填 | — |

**App 資訊**：Keyly，App ID `6759639348`，Bundle `com.dc.Keyly`，訂閱商品 `com.dc.Keyly.pro.monthly`（Keyly Pro Monthly，NT$150／月）。

**注意**：訂閱報表會出現兩列同 App ID 但不同 App 名稱，那是因為 App 改過名，Apple 保留歷史名稱。以財務報表的 Quantity 為準，實際是 1 筆。

**目標數值仍待你填。** 沒有目標，KR 只能衡量現況、無法判斷進度。

---

## 為什麼「每天 100 個自然搜尋訪客」不是最上層目標

那是一個中間指標，不是目的。

訪客 → 下載 → 啟用 → 付費，中間三層轉換率目前**全部未知**。就算真的做到 100 訪客／日，也可能一個訂閱都沒有。

它應該掛在 KR-A 底下，不是頂層。

---

## 三個 KR

以下三件事必須同時成立，缺任何一個，其他兩個做再好都沒有意義。

### KR-A｜有人知道產品存在（獲客）

**現況**：網站台灣非品牌曝光為 0（GSC，2026-08-14 查詢，近 3 個月點擊 5、曝光 733，查詢字全是品牌變體）。App 端無已知獲客管道。

| 可執行方向 | 證據狀態 | 對應文件 |
|---|---|---|
| SEO：既有 6 篇 Guide + 首頁 | 2026-08-12 索引，尚無曝光，等訊號 | [零成本策略](seo/2026-08-11-zero-cost-google-exposure-strategies.md)、[round-2](seo/2026-08-11-keyword-opportunity-research-round-2.md) |
| ASO：App Store 搜尋 | 已有審計，未知成效 | [ASO 審計](aso/2026-08-11-app-store-metadata-audit.md) |
| Threads 改寫前後對照 | **未驗證**，僅為推測 | [淘汰紀錄](seo-topics.md) |
| 找第一批種子使用者 | 未執行 | — |

**中間指標**：台灣自然搜尋每天 100 個進站訪客（現況約 0.05 人／日）。

### KR-B｜下載的人真的開始用（啟用／留存）

**已查（2026-08-16）。詳見 [KR-B 啟用與留存：使用者流失點分析](okr-kr-b-activation.md)。**

> **更正**：本節初版曾記載「App 內沒有任何埋點」。**該記載錯誤。** iOS App 有 Firebase Analytics（21 個事件，定義於 `KeylyCore/Shared/Models/AnalyticsEvent.swift`），後端 Supabase 也有逐日使用資料。`docs/ga-events.md` 只涵蓋網站事件，不代表 App 沒有埋點。

**漏斗現況**（GA4 property `525557787` iOS 資料流，2026-04-01 ～ 08-15，以 `totalUsers` 計）

| 階段 | 使用者 | 佔 first_open |
|---|---:|---:|
| App Store 首次下載 | 225 | — |
| `first_open` | 173 | 100% |
| `keyboard_session_started` | 88 | 51% |
| `onboarding_completed` | 54 | 31% |
| `ai_request_sent` | 37 | 21% |
| `paywall_opened` | 31 | 18% |
| `paywall_plan_selected` | 8 | 4.6% |
| `subscription_purchased` | 4 | 2.3% |

**留存**（Supabase，52 位，已排除開發者本人 2 個帳號）

| 指標 | 數值 |
|---|---|
| 曾使用過 AI | 60% |
| 註冊當天即使用 | 58% |
| **首次使用距註冊 2 天以上** | **0 人** |
| D1 | 7.8% |
| D7 | 2.2% |

**最強訊號**：31 位用過 AI 的人裡，30 位是註冊當天使用，1 位隔天，之後掛零。**啟用的時間窗只有註冊當下。**

| 可執行方向 | 狀態 |
|---|---|
| GA4 註冊 5 個自訂維度（`step`、`success` 等） | **2026-08-16 已完成**，資料自當日起可讀 |
| 修 `paywall_opened` 的 `entry_point`（90% 為 `(not set)`） | 未做，需改程式 |
| 補「開始註冊」事件 | 未做，需改程式 |
| 確認 5 個有定義無觸發點的事件 | 未做 |

### KR-C｜用的人會付錢（轉換）

**已查（2026-08-15 初查，2026-08-16 更正）。**

> **更正**：初版記載「1 位活躍訂閱」與「93 次下載」，兩者皆錯。訂閱狀態報表拆成兩列不是重複計算，而是**兩位不同訂閱者**分別在 App 改名前後訂閱；訂閱事件報告可完整還原。下載數則只算了 5–7 月的 Sales units，漏掉 4 月上線的 142 次。

| 項目 | 數值 | 依據 |
|---|---|---|
| **活躍付費訂閱** | **2** | 訂閱者 A 於 04-12 起訂並連續續訂 4 次；訂閱者 B 於 07-20 全價起訂 |
| 活躍免費試用 | 0 | 訂閱狀態報表 2026-08-13 |
| 扣款重試／寬限期中 | 0 | 同上 |

**完整訂閱事件史**（Analytics `App Store Subscription Event Report Standard`，僅 8 筆）

| 日期 | 事件 |
|---|---|
| 04-09 | 免費試用啟動 ×2（3 天期） |
| 04-12 | 試用轉全價 ×1、試用流失 ×1（關閉自動續訂） |
| 05-12 / 06-12 / 07-12 | 全價續訂 ×1／月 |
| 07-20 | 全價起訂 ×1（未經試用） |

**首次下載量**（`App Downloads Standard`，`Download Type = First-time download`）

| 月份 | 首次下載 |
|---|---:|
| 2026-04（自 04-07） | 142 |
| 2026-05 | 32 |
| 2026-06 | 27 |
| 2026-07 | 19 |
| 2026-08（至 08-09） | 5 |
| **合計** | **225** |

4 月為上線高峰，之後**逐月下降**至約 20 次／月。

**實測轉換率**：曝光→下載 3.29%（225/6,848）；下載→付費 **0.89%**（2/225）。

**churn 仍為未知**：付費流失 0 筆（n=1 訂閱者），試用流失 1/2（n=2）。樣本皆不足以估算。

---

## 執行順序（2026-08-16 依實際數據修正）

初版規劃 C → B → A，理由是「先確認轉換沒壞再導流量」。08-15 改為 A → C → B，理由是「樣本太小，KR-B 埋點只會收到雜訊」。

**08-16 查完 App 端埋點後，「B 要等樣本」的理由不成立。** 埋點早就存在，資料也早就在收，而且已經指出兩個不需要更大樣本就看得見的落差：

- `first_open` 173 → `keyboard_session_started` 88（**-49%**）
- `paywall_opened` 31 → `paywall_plan_selected` 8（**-74%**）

修正後：**A 與 B 並行，C 持續觀察。**

- **A**：把量做起來。曝光約 1,700 次／月，是絕對規模的限制。
- **B**：不需要等樣本。上述兩段落差用現有資料就能定位，補完 `entry_point` 後可直接分析。
- **C**：churn 仍未知（n=1）。維持觀察，不做定價決策。

停止條件不變：**累積首次下載達 300–500 次時回頭評估轉換**（目前 225）。

---

## 下一步

1. 填上頂層的目標訂閱數與期限（只有你能決定）
2. **KR-A**：把月下載從約 20 次拉起來 —— 排序依 [零成本策略](seo/2026-08-11-zero-cost-google-exposure-strategies.md)
3. **KR-B**：修 `paywall_opened` 的 `entry_point`、補「開始註冊」事件（詳見 [KR-B 分析](okr-kr-b-activation.md)）
4. 每月用 `app-store-data` skill 複查下載與訂閱
5. 24 小時後驗證新註冊的 5 個自訂維度有無資料進來

### 查詢指令

```bash
uv run ~/.ai_skills/app-store-data/scripts/asc.py subs status
uv run ~/.ai_skills/app-store-data/scripts/asc.py sales --frequency MONTHLY --date YYYY-MM
uv run ~/.ai_skills/app-store-data/scripts/asc.py finance --date YYYY-MM
```

---

## 與其他文件的關係

本文件是上位文件。以下文件都只服務 KR-A：

- [SEO 自然流量改善計劃書](seo-growth-plan.md)
- [零成本提升 Google 曝光策略](seo/2026-08-11-zero-cost-google-exposure-strategies.md) — KR-A 的執行排序以此為準
- [關鍵字機會研究第二輪](seo/2026-08-11-keyword-opportunity-research-round-2.md) — KR-A 的機會評分以此為準
- [搜尋需求與 SERP 機會矩陣](seo/2026-08-11-search-opportunity-matrix.md)
- [關鍵字候選淘汰紀錄](seo-topics.md)
- `seo/content-brief-*.md`（9 份）
- `aso/`（2 份）

**KR-B 與 KR-C 目前沒有任何對應文件。**
