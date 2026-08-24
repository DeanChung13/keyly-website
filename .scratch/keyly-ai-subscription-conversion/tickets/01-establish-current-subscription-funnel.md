# 建立目前 AI 訂閱漏斗基準

Type: `wayfinder:research`
Status: resolved
Assignee: claude
Parent: `.scratch/keyly-ai-subscription-conversion/MAP.md`
Blocked by: none

## Question

目前新下載使用者與既有免費使用者，從首次開啟、AI 首次使用、額度消耗、付費牆、試用到有效付費訂閱，各階段有哪些可取得的數據、實際基準與追蹤缺口？哪一個流失點有最強證據值得優先處理？

## Resolution

**查證方式**：本 repo（keyly-website）不含 App 端程式碼；App 端漏斗已由既有文件 [`docs/okr-kr-b-activation.md`](../../../docs/okr-kr-b-activation.md)（建立 2026-08-16，最後更新 2026-08-19）與 [`docs/okr-kr-a-acquisition.md`](../../../docs/okr-kr-a-acquisition.md) 完整記錄，資料來源為 Supabase（`keyly-backend`）與 GA4 iOS 資料流。本次另用 App Store Connect API（`app-store-data` skill）即時查證訂閱與下載現況；GA4 App 端 property 因本工作階段 OAuth token 過期（`invalid_grant`）無法即時重查，採用上述文件既有數字，未回溯驗證。

### 一、各階段現況與基準值

| 階段 | 基準值 | 資料來源 |
|---|---:|---|
| App Store 首次下載（04-07～08-09，全球） | 225 | ASC Sales，`docs/okr-kr-a-acquisition.md:36` |
| `first_open` | 173（77% of 首次下載，↓23% 未開啟） | GA4，`docs/okr-kr-b-activation.md:132` |
| `keyboard_session_started`（啟用鍵盤） | 88（51%，↓49%） | 同上 :133 |
| `onboarding_completed`（完成註冊） | 54（31%，↓39%） | 同上 :134，與 Supabase `auth.users` 互證 |
| `ai_request_sent`（首次 AI 使用，KR-3 3a 分母） | 37（21.4%，↓31%） | 同上 :135 |
| `ai_request_completed` | 35（20%）；成功率 85%（472/402 次事件計） | 同上 :136, :144 |
| `paywall_opened` | 31（18%，↓11%） | 同上 :137 |
| `paywall_plan_selected` | 8（4.6%，**↓74%，全漏斗最大單一落差**） | 同上 :138 |
| `paywall_purchase_started` | 7（4.0%） | 同上 :139 |
| `subscription_purchased`（歷史累計） | 4（2.3%） | 同上 :140 |
| **目前即時有效訂閱數**（ASC `subs status`，2026-08-23 報表） | **2**（Standard Price，0 筆試用中——目前無任何 Free Trial 方案在跑） | 本次直接查證 |
| 近兩週新訂閱事件（ASC `sales` IAY，週結 08-16） | 1 筆新訂閱、TWD 121 淨收 | 本次直接查證 |
| 近兩週首次下載（ASC Sales `1F`） | 週結 08-09：4 次；週結 08-16：6 次 | 本次直接查證，與既有文件量級一致 |

**既有免費使用者（Cohort，Supabase 52 位樣本）**：
- 曾使用過 AI：31/52 = 60%；註冊當天即使用：30/52 = 58%
- 首次使用距註冊 0 天：30 人；距 1 天：1 人；**距 2 天以上：0 人**
- D1 留存 7.8%（4/51）、D1–7 累計 17.4%（8/46）、D7 留存 2.2%（1/46）
- 21 位（40%）註冊後從未使用 AI；用過 AI 的 31 人中 22 人（71%）只活躍過 1 天，中位數 3 次
- 排除開發者帳號後最高使用次數 31 次（現有 2 位付費者之一）——沒有任何外部使用者達到重度使用

### 二、追蹤缺口

- **App 端行為資料與程式碼不在本 repo**，事件定義在 `~/Documents/keyly` 的 `KeylyCore/Shared/Models/AnalyticsEvent.swift`（21 個 case），本次未直接查驗，僅採信既有文件的查證結果。
- GA4 App 端 property（`525557787`）本次工作階段因 OAuth token 過期無法查詢，既有文件數字最新至 2026-08-19，距今（2026-08-25）6 天，屬同一組已完成前置工作之後的穩定期，`docs/okr-kr-b-activation.md` 建議「每月重跑」，尚未過期但下次决策前應重查。
- 5 個事件「有定義無觸發點」（`ai_prompt_type_selected`、`input_mode_switched`、`subscription_view_opened`、`subscription_cta_tapped`、`subscription_restored`）已於 2026-08-18 結案：3 個屬已被取代（有替代事件涵蓋同一決策），2 個目前沒有對應決策需求，不補（見 `docs/okr-kr-b-activation.md` §11）。
- 無同類 App（免費輸入法＋付費 AI 加值）的留存/轉換基準可比對，40%／71%／2.2% 等數字目前只能陳述為現象，不能判定是否異常（`docs/okr-kr-b-activation.md` §6）。
- 08-15 之後才有正確的 `entry_point`／`cta_type` 維度可用，樣本仍小（4 次），無法拆解 paywall 進入點分布。

### 三、最強流失點證據（回答「哪一個值得優先處理」）

**根因已有程式碼層級證據，非推論性最強的兩個現象共用同一成因**（`docs/okr-kr-b-activation.md` §9，`MainTabContainerView.swift:435-440`）：

首頁 Hero 只有 `onboarding` → `quota_upgrade` → `pro_welcome` 三個狀態。使用者完成註冊、拿到 50 次免費額度的那一瞬間，Hero 直接跳成「解鎖更多次數」的升級提示，**中間沒有任何狀態引導使用者去用那 50 次額度**。`remainingQuotaBucket()` 已算出額度分桶但完全沒被 `heroVariant()` 使用。配合「沒有任何人耗盡過額度」的既有事實，可得：**上線至今每一次升級提示，都是顯示給還有免費額度沒用的人。**

這解釋了漏斗上最強的兩個流失數字：
1. **40% 註冊後零使用**——完成設定後沒有任何機制引導去用
2. **`paywall_opened` 31 → `paywall_plan_selected` 8（-74%，全漏斗最大單一落差）**——在使用者根本還沒體驗過 AI 價值時就推銷升級

且「啟用視窗只發生在註冊當下」（距註冊 2 天以上首次使用 = 0 人）進一步限縮了修復的時間敏感性——不是慢慢引導，是必須在註冊當下就讓使用者用到 AI。

**證據等級**：Hero 狀態機邏輯與 remainingQuotaBucket 未接線是程式碼事實（非推論）；"-74% 落差主因是 paywall 太早"是有時序與機制支持但**尚未實測驗證**的推論，需等 `docs/okr-kr-b-activation.md` §9 提出的第四個 hero 狀態 `activation`（期限 2026-09-15）上線後才能驗證。

**當前訂閱基期**（供後續 ticket 使用）：即時有效付費訂閱僅 2 位，近兩週僅新增 1 位，**目前完全沒有試用（Free Trial）機制在跑**（ASC `subs status` 所有 Free Trial 相關欄位皆為 0）——這代表 02、03 號 ticket（AI 價值時刻、方案包裝）若要評估試用設計，是从零開始，沒有既有試用轉換率可參考。
