# KR-B 啟用與留存：使用者流失點分析

建立日期：2026-08-16
上位文件：[Keyly 目標拆解（OKR）](okr.md)
相關：[KR-A 獲客：下載漏斗分析](okr-kr-a-acquisition.md)

---

## O｜找出使用者在哪一步停止，並判斷該不該修

**成功條件**：指出流失發生的位置，區分「有資料可證」與「資料不足只能推測」，並列出要補哪些埋點。

**重要修正（2026-08-16）**：本文初版曾主張「沒有人碰到過 Paywall，因此 Paywall 與定價優化無關」，並將 40% 零使用稱為「已證明的故障」。**兩項結論皆已撤回**，理由見〈已撤回的結論〉。

---

## 資料來源

| 來源 | 內容 | 條件 |
|---|---|---|
| Supabase（`keyly-backend` 已 link） | 註冊、額度、逐日 AI 使用、訂閱狀態 | `supabase db query --linked`，2026-08-16 執行；`auth.users`、`ai_usage`、`daily_user_ai_usage`、`subscriptions` |
| GA4 property `525557787`（`keyly-b9b15`） | App 端事件 | 2026-04-01 ～ 08-15；iOS 資料流 `13890102012`（此 property 同時含網站資料流，已過濾） |
| iOS 程式碼 `~/Documents/keyly` | 事件定義與觸發位置 | `KeylyCore/Shared/Models/AnalyticsEvent.swift` |

分析樣本為 **52 位**（原始 54 位，排除開發者本人帳號 2 個，註冊於 2026-03-11、03-20，開發者確認）。

---

## 1. App 端 Analytics 事件清冊

事件定義集中在 `KeylyCore/Shared/Models/AnalyticsEvent.swift`（21 個 case）。Keyboard Extension 不 import Firebase，改用 AppGroup 佇列回傳主 App 發送。

| 事件 | 參數 | 觸發位置 |
|---|---|---|
| `app_opened` | — | `Keyly/KeylyApp.swift:18,34`（經 `logAppOpenedIfNeeded()` 節流） |
| `screen_view` | `screen_name`, `screen_class` | `Keyly/Models/AnalyticsScreen.swift:17` |
| `home_hero_impression` | `hero_variant`, **`keyboard_added`**, **`full_access_enabled`**, **`is_signed_in`**, `subscription_status`, `remaining_quota_bucket` | `MainTabContainerView.swift:465` |
| `home_hero_cta_tapped` | `hero_variant`, `cta_type`, `current_step` | `MainTabContainerView.swift:482` |
| `onboarding_step_completed` | **`step`**, `source` | `MainTabContainerView.swift:409`（`step=keyboard_added`）、`:415`（`full_access_enabled`）、`:421`（`sign_in_completed`） |
| `onboarding_completed` | `source` | `MainTabContainerView.swift:426` |
| `paywall_opened` | `entry_point`, `source_screen`, `hero_variant`, `default_plan` | `MainTabContainerView.swift:251` |
| `paywall_plan_selected` | `plan`, `entry_point`, `has_trial` | `MainTabContainerView.swift:186` |
| `paywall_purchase_started` | `plan`, `entry_point`, `is_signed_in`, `has_trial` | `MainTabContainerView.swift:497` |
| `purchase_result` | `result`, `stage`, `reason`, `plan`, `entry_point`, `has_trial`, `is_signed_in` | `MainTabContainerView.swift:508` |
| `subscription_purchased` | `plan`, `entry_point`, `has_trial`, `is_signed_in` | `MainTabContainerView.swift:540` |
| `keyboard_size_changed` | `size` | `SettingsHubView.swift:227` |
| `keyboard_session_started` | — | `KeylyKeyboard/KeyboardViewController.swift:122` |
| `keyboard_input_chars` | `count` | `KeyboardViewController.swift:185` |
| `ai_request_sent` | — | `KeylyKeyboard/Logic/AIService.swift:210` |
| `ai_request_completed` | **`success`**, `prompt_type` | `AIService.swift:242,254`（失敗）、`:283`（成功） |
| `ai_prompt_type_selected` | `prompt_type` | 定義存在，**未在程式碼中找到觸發點** |
| `input_mode_switched` | `to_mode` | 定義存在，**未找到觸發點** |
| `subscription_view_opened` / `subscription_cta_tapped` / `subscription_restored` | — | 定義存在，**未找到觸發點** |

粗體參數是重建漏斗的關鍵，但多數未註冊為自訂維度（見下節）。

---

## 2. 八個步驟能否重建

**GA4 已註冊的自訂維度只有 8 個**：`entry_point`、`event_label`、`hero_variant`、`plan`、`reason`、`result`、`size`、`stage`。**未註冊的事件參數無法作為 Data API 的 dimension**，且 GA4 註冊自訂維度**不回溯補資料**。

| 步驟 | 可否重建 | 依據 |
|---|---|---|
| 開啟 App | ✅ **可以** | `first_open`、`app_opened` |
| 開始註冊 | ❌ **不行** | 沒有「開始」事件，只有完成 |
| 完成註冊 | ⚠️ **間接可以** | `onboarding_step_completed` 的 `step=sign_in_completed`，但 `step` 未註冊 → API 讀不到。可用 Supabase `auth.users` 代替 |
| 啟用鍵盤 | ⚠️ **部分可以** | `keyboard_session_started` 可讀（代表已裝且使用）；`step=keyboard_added` 不可讀 |
| 開啟完全取用 | ❌ **不行** | 只存在於 `step=full_access_enabled` 與 `home_hero_impression` 的 `full_access_enabled` 參數，兩者皆未註冊 |
| 第一次 AI 改寫 | ⚠️ **間接可以** | `ai_request_sent` 可讀但無法辨識「第一次」。已改用 Supabase `daily_user_ai_usage` 的 `MIN(usage_date)` 重建 |
| AI 成功／失敗 | ⚠️ **只能近似** | `success` 參數未註冊。以 `ai_request_sent` 對 `ai_request_completed` 的差值近似 |
| 開啟 Paywall | ✅ **可以** | `paywall_opened`。`entry_point` 雖已註冊，但實測 90% 為 `(not set)` |
| 開始訂閱 | ✅ **可以** | `paywall_purchase_started`、`subscription_purchased` |

### 要補什麼

**不需要新增埋點，需要註冊自訂維度**。以下五個參數已在送出、只是讀不到：

`step`、`success`（`ai_request_completed`）、`full_access_enabled`、`keyboard_added`、`is_signed_in`（後三者在 `home_hero_impression`）

**唯一真正缺少的事件是「開始註冊」**，目前只有完成沒有開始，無法得知有多少人點了註冊卻中途放棄。

另需確認 `ai_prompt_type_selected`、`input_mode_switched`、`subscription_view_opened`、`subscription_cta_tapped`、`subscription_restored` 五個事件為何有定義卻無觸發點 —— 是尚未接上，還是我漏找。

---

## 3. GA4 實際漏斗（iOS 資料流，2026-04-01 ～ 08-15）

以 `totalUsers` 計：

| 階段 | 使用者 | 佔 first_open | 該段流失 |
|---|---:|---:|---:|
| App Store 首次下載（04-07～08-09） | 225 | — | — |
| `first_open` | 173 | 100% | ↓ 23%（未開啟或未同意追蹤） |
| `keyboard_session_started` | 88 | 51% | **↓ 49%** |
| `onboarding_completed` | 54 | 31% | ↓ 39% |
| `ai_request_sent` | 37 | 21% | **↓ 31%** |
| `ai_request_completed` | 35 | 20% | ↓ 5% |
| **`paywall_opened`** | **31** | **18%** | ↓ 11% |
| `paywall_plan_selected` | 8 | 4.6% | **↓ 74%** |
| `paywall_purchase_started` | 7 | 4.0% | ↓ 13% |
| `subscription_purchased` | 4 | 2.3% | ↓ 43% |

`onboarding_completed` 的 54 位與 Supabase 的 54 筆註冊互相印證。

**AI 成功率**：`ai_request_sent` 472 次 / `ai_request_completed` 402 次 = **85%**。約 15% 的請求沒有完成事件（失敗、逾時或未回傳）。

---

## 4. Cohort 分析（Supabase，52 位）

### 註冊後首次 AI 使用

| 指標 | 數值 |
|---|---|
| 曾使用過 AI | 31/52 = **60%** |
| 註冊當天即使用 | 30/52 = **58%** |
| 首次使用距註冊 0 天 | **30 人** |
| 首次使用距註冊 1 天 | 1 人 |
| 首次使用距註冊 2 天以上 | **0 人** |

**這是本次最強的訊號**：註冊當天沒有使用 AI 的人，之後幾乎不會回來使用。啟用的時間窗只有註冊當下。

### 留存（分母僅計已滿觀察期者）

| 指標 | 數值 |
|---|---|
| D1（註冊隔天有使用） | 4/51 = **7.8%** |
| D1–7（第 1～7 天內有使用） | 8/46 = **17.4%** |
| D7（第 7～13 天有使用） | 1/46 = **2.2%** |

### 依註冊月份

| 月份 | 人數 | 曾用 AI | 註冊當天用 | D1 | D7 |
|---|---:|---:|---:|---:|---:|
| 2026-04 | 10 | 7 | 7 | 2/10 | 0/10 |
| 2026-05 | 11 | 6 | 5 | 1/11 | 0/11 |
| 2026-06 | 15 | 6 | 6 | 0/15 | 0/15 |
| 2026-07 | 10 | 7 | 7 | 1/10 | 1/10 |
| 2026-08 | 6 | 5 | 5 | 0/5 | 觀察期未滿 |

各月「曾用 AI」比例在 40%～70% 間波動，每月人數只有 6～15 位，**單一使用者即可改變數個百分點，不足以判斷趨勢**。

---

## 5. 保留的兩個現象

以下兩項有資料支持，維持不變：

**21 位註冊後從未使用 AI（40%）** —— 主動註冊、獲得 50 次免費額度、`last_used` 為空。

**22 位只使用一天（佔用過 AI 的 71%）** —— 用過 AI 的 31 人中，22 人只活躍過 1 天；中位數 3 次。

排除開發者帳號後，**最高使用次數為 31 次**（該使用者正是現有兩位付費者之一）。沒有任何外部使用者達到重度使用。

---

## 6. 已撤回的結論

### 撤回一：「沒有人碰到過 Paywall，Paywall 與定價優化無關」

**錯誤。** GA4 顯示 **31 位使用者開啟過 Paywall**（`paywall_opened`，80 次事件）。

初版只看了 `ai_usage` 的額度餘額，發現無人耗盡額度，就推論使用者沒走到 Paywall。這是把「沒有因額度用完而停止」錯誤延伸為「沒有看過 Paywall」——Paywall 顯然有其他進入點。

**修正後的觀察**：31 位開啟 Paywall，只有 8 位選擇方案（**流失 74%**）。這反而是漏斗後段最大的單一落差，定價與 Paywall 文案**不應降級**。

`entry_point` 雖已註冊為自訂維度，但實測 90% 為 `(not set)`，因此**無法得知使用者從哪裡進入 Paywall**——這是決定要不要改 Paywall 之前必須先補的資料。

### 撤回二：「已證明是故障」

**過度宣稱。** 40% 註冊後零使用、71% 只用一天，這些是**現象**，不是已證明的故障。要稱為故障，需要至少其一：

- 同類型 App（免費輸入法 + 付費 AI 加值）的留存基準，用以判斷 40% 是否異常
- 使用者卡在哪一步的直接證據

兩者目前都沒有。本文只陳述數字，不判定是否為故障。

---

## 7. 資料限制

| 項目 | 狀態 |
|---|---|
| `step`、`success`、`full_access_enabled`、`keyboard_added`、`is_signed_in` | 有送出，**未註冊為自訂維度，API 讀不到**；註冊後不回溯 |
| 「開始註冊」事件 | **不存在** |
| `paywall_opened` 的 `entry_point` | 90% 為 `(not set)` |
| `daily_user_ai_usage` 起始日 | 2026-03-29（migration 建立日） |
| 下載數與註冊數期間不一致 | 下載 04-07～08-09；註冊 03-11～08-15 |
| 樣本規模 | 52 位。所有比率的絕對人數在個位到二十幾之間 |
| 同類 App 留存基準 | **無**。無法判斷本文任何比率是高是低 |
| 五個有定義無觸發點的事件 | 未確認原因 |

---

## 8. 待辦

1. **註冊五個自訂維度**（`step`、`success`、`full_access_enabled`、`keyboard_added`、`is_signed_in`）。零開發成本，但只對未來資料有效，愈晚做損失愈多。
2. **補「開始註冊」事件**，才能知道註冊流程本身是否流失。
3. **修 `paywall_opened` 的 `entry_point`**，90% `(not set)` 讓 Paywall 分析無法進行。
4. 確認五個有定義無觸發點的事件是否漏接。
5. 每月重跑本文的 SQL 與 GA4 查詢，追蹤「註冊當天使用率」（目前 58%）與 D1（目前 7.8%）。
