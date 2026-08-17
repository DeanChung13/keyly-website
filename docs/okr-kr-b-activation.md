# KR-B 啟用與留存：使用者流失點分析

建立日期：2026-08-16
上位文件：[Keyly 目標拆解（OKR）](okr.md)
相關：[KR-A 獲客：下載漏斗分析](okr-kr-a-acquisition.md)

---

## O｜~~找出使用者在哪一步停止，並判斷該不該修~~ → 改為結果導向

> **本文的 O 已於 2026-08-17 改寫。**
>
> 原 O 為「找出使用者在哪一步停止，並判斷該不該修」，成功條件為「指出流失發生的位置⋯並列出要補哪些埋點」。
>
> **改寫理由**：該 O 的產出是一份文件，不是外部世界的變化。依新 OKR 的判定規則 1，KR 必須是一個數字從 X 變到 Y，動詞不得是「找出」「確認」。原 O 的所有待辦因此全部落在埋點與報表上——這正是開發者回報「每條路都在補資料」的來源。詳見 [OKR 診斷 §診斷 1](okr-diagnosis-2026-08-17.md)。

**現行 O｜把下載→付費的毛轉換從 1.78% 推到 5.0%，把存活率從 50% 推到 60%**

本文對應新 OKR 的 [KR-3](okr.md) 與 [KR-4](okr.md)，是算式 `活躍訂閱 = 曝光 × (曝光→下載) × (下載→付費，毛) × (存活率)` 的後兩項。

| 目標 | 現值 | 目標值 | 分母 | 停損日 |
|---|---:|---:|---:|---|
| **3a　啟用** `first_open` → `ai_request_sent` | 21.4% | **50%** | 173 | 2026-10-31 |
| **3b　轉換** `ai_request_sent` → `subscription_purchased` | 10.8% | **15%** | 37 | 2026-10-31 |
| **KR-4** 存活率（先行指標 D1） | 7.8% | 20% | 51 | 與 KR-1 綁定 |
| **KR-4** 存活率（先行指標 D7） | 2.2% | 10% | 46 | 與 KR-1 綁定 |

**判定門檻設在子閘門，不設在整體毛轉換 1.78% → 5.0% 上。** 整體數字的分子只有 4，在 KR-1 達成前不可能取得可判讀樣本；子閘門的分母是 173 與 37，現有量級下可讀。

**成功條件**：3a ≥ 35% 或 3b ≥ 13%（2026-10-31 判定）。兩者皆未達 → 宣告轉換乘數封頂，代入算式重算 KR-1 需求。

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

> **更新（2026-08-17）：現為 13 個。** 新增 `step`、`success`、`full_access_enabled`、`keyboard_added`、`is_signed_in`（2026-08-16 註冊，實測自 08-16 起有值）。
>
> **同時發現第二層限制：GA4 事件資料保留期原為 2 個月（免費版預設）。** 這與「維度未註冊」是**不同的機制**，且更嚴重：
>
> | 同一查詢 | 事件數 | 最早日期 |
> |---|---:|---|
> | 只查 `paywall_opened` | 82 | 2026-04 |
> | 加上 `entry_point` 維度 | 16 | 2026-06-20 |
>
> **只要查詢帶任何自訂維度，就只能取回保留期內的資料。** 2026-06 中旬以前的事件（含 4 月的 54 次 `paywall_opened`）已被永久刪除，無法按任何維度拆解——不是 `(not set)`，是整批不存在。
>
> 保留期已於 **2026-08-17 改為 14 個月**（GA4 → 管理 → 資料設定 → 資料保留，24 小時後生效）。**此變更不回復已刪除的資料**，只止血。本文第 3、4 節的既有數字不受影響（那些查詢未帶自訂維度）。

| 步驟 | 可否重建 | 依據 |
|---|---|---|
| 開啟 App | ✅ **可以** | `first_open`、`app_opened` |
| 開始註冊 | ✅ **可以**（2026-08-17 更正） | `home_hero_cta_tapped` 的 `cta_type="sign_in"`，實測 109 次／37 人。`cta_type` 未註冊為維度，註冊後即可讀。見 §10 |
| 完成註冊 | ⚠️ **間接可以** | `onboarding_step_completed` 的 `step=sign_in_completed`，但 `step` 未註冊 → API 讀不到。可用 Supabase `auth.users` 代替 |
| 啟用鍵盤 | ⚠️ **部分可以** | `keyboard_session_started` 可讀（代表已裝且使用）；`step=keyboard_added` 不可讀 |
| 開啟完全取用 | ❌ **不行** | 只存在於 `step=full_access_enabled` 與 `home_hero_impression` 的 `full_access_enabled` 參數，兩者皆未註冊 |
| 第一次 AI 改寫 | ⚠️ **間接可以** | `ai_request_sent` 可讀但無法辨識「第一次」。已改用 Supabase `daily_user_ai_usage` 的 `MIN(usage_date)` 重建 |
| AI 成功／失敗 | ⚠️ **只能近似** | `success` 參數未註冊。以 `ai_request_sent` 對 `ai_request_completed` 的差值近似 |
| 開啟 Paywall | ✅ **可以** | `paywall_opened`。`entry_point` **自 2026-08-15 起有值**（原記載 90% `(not set)` 係維度註冊日之前的資料，非程式問題，見 §7 更正） |
| 開始訂閱 | ✅ **可以** | `paywall_purchase_started`、`subscription_purchased` |

### 要補什麼

**不需要新增埋點，需要註冊自訂維度**。以下五個參數已在送出、只是讀不到：

`step`、`success`（`ai_request_completed`）、`full_access_enabled`、`keyboard_added`、`is_signed_in`（後三者在 `home_hero_impression`）

~~**唯一真正缺少的事件是「開始註冊」**，目前只有完成沒有開始，無法得知有多少人點了註冊卻中途放棄。~~

> **更正（2026-08-17）**：該事件**早就存在**。`OnboardingCardView.swift:165` 送出 `home_hero_cta_tapped`（`cta_type="sign_in"`），近兩個月實測 109 次／37 位使用者。缺的是 `cta_type` 的維度註冊，不是事件。**本文至此已三次把「維度未註冊」誤判為「缺少埋點」**（`entry_point`、`step`、`cta_type`）。完整清單見 §10。

~~另需確認 `ai_prompt_type_selected`、`input_mode_switched`、`subscription_view_opened`、`subscription_cta_tapped`、`subscription_restored` 五個事件為何有定義卻無觸發點 —— 是尚未接上，還是我漏找。~~

> **已於 2026-08-18 判定：五個全部不接。** 見 §11。

---

## 3. GA4 實際漏斗（iOS 資料流，2026-04-01 ～ 08-15）

以 `totalUsers` 計：

| 階段 | 使用者 | 佔 first_open | 該段流失 |
|---|---:|---:|---:|
| App Store 首次下載（04-07～08-09） | 225 | — | — |
| `first_open` | 173 | 100% | ↓ 23%（未開啟；**非追蹤同意**，全專案無 ATT，2026-08-17 查證） |
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

~~`entry_point` 雖已註冊為自訂維度，但實測 90% 為 `(not set)`，因此無法得知使用者從哪裡進入 Paywall——這是決定要不要改 Paywall 之前必須先補的資料。~~

> **更正（2026-08-17）**：上段已撤銷。`entry_point` **自 2026-08-15 起有值**，程式碼自 2026-04-02 起就在正確傳送，`(not set)` 純粹是自訂維度註冊日之前的資料（GA4 不回溯）。詳見 §7 的〈更正：`entry_point` 的 `(not set)` 不是程式問題〉。
>
> **對本節結論的影響**：改 Paywall **不需要**等 `entry_point` 資料。08-15 之後的樣本目前僅 4 次，量太小無法分析進入點分布，但 31 → 8 的 74% 落差本身已足以支持改 Paywall 的決定——那個落差是在 Paywall **內部**發生的，與從哪裡進來無關。

### 撤回二：「已證明是故障」

**過度宣稱。** 40% 註冊後零使用、71% 只用一天，這些是**現象**，不是已證明的故障。要稱為故障，需要至少其一：

- 同類型 App（免費輸入法 + 付費 AI 加值）的留存基準，用以判斷 40% 是否異常
- 使用者卡在哪一步的直接證據

兩者目前都沒有。本文只陳述數字，不判定是否為故障。

---

## 7. 資料限制

| 項目 | 狀態 |
|---|---|
| `step`、`success`、`full_access_enabled`、`keyboard_added`、`is_signed_in` | ~~未註冊~~ → **2026-08-16 已註冊**，自該日起有值。`step` 至 08-17 僅收到 2 筆 |
| 「開始註冊」事件 | **不存在** |
| ~~`paywall_opened` 的 `entry_point` 90% 為 `(not set)`~~ | **已更正，見下** |
| **GA4 事件資料保留期** | 原為 2 個月，**2026-08-17 改為 14 個月**。約 2026-06 中旬以前的事件已永久刪除，無法按任何自訂維度拆解 |
| `daily_user_ai_usage` 起始日 | 2026-03-29（migration 建立日） |
| 下載數與註冊數期間不一致 | 下載 04-07～08-09；註冊 03-11～08-15 |
| 樣本規模 | 52 位。所有比率的絕對人數在個位到二十幾之間 |
| 同類 App 留存基準 | **無**。無法判斷本文任何比率是高是低 |
| ~~五個有定義無觸發點的事件~~ | **已判定不接（2026-08-18），見 §11** |

### 更正：`entry_point` 的 `(not set)` 不是程式問題（2026-08-17）

本文原記載「`entry_point` 90% 為 `(not set)`⋯這是決定要不要改 Paywall 之前必須先補的資料」，並將「修 `entry_point`」列為需改程式的待辦。**該診斷錯誤，待辦已撤銷。**

查證 iOS 程式碼（`~/Documents/keyly`）：

| 檢查 | 結果 |
|---|---|
| 參數何時開始送 | **2026-04-02**（v1.0.0 於 04-06 上線前即存在） |
| 是否可能為空 | 否。`PaywallEntryPoint` 為 `String` enum，四個 case 全有非空 rawValue；`.manual` 由 Swift 自動帶 `"manual"`（`AppRoutingState.swift:5-10`） |
| 是否每條路徑都傳 | 是。全部經過 `resolvedPaywallPresentationContext()`（`MainTabContainerView.swift:619-632`） |

GA4 實測分界正好落在 **2026-08-15**：06-20～08-13 全為 `(not set)`（12 次），08-15 起為 `home_hero_quota_upgrade`（4 次）。

**成因是自訂維度於 08-14/15 才註冊，GA4 不回溯。資料自 08-15 起已正確，不需任何程式改動。**

**教訓**：「欄位沒值」有三種完全不同的成因——參數漏傳（要改 code）、維度未註冊（只要等）、保留期已過（無藥可救）。三者外觀相同，分不開就會修錯東西。本文初版把第二種誤判為第一種。

---

## 8. 待辦

**2026-08-17 重新分類。** 依新 OKR 判定規則 2：埋點、報表、研究**不得列為 KR**，只能是帶 ≤ 7 天期限的前置；逾期未完成，該行動即視為放棄，不順延。

### 前置（產出是資料，不是結果）

| 項目 | 期限 | 狀態 |
|---|---|---|
| 註冊五個自訂維度（`step`、`success`、`full_access_enabled`、`keyboard_added`、`is_signed_in`） | — | **2026-08-16 已完成** |
| GA4 事件資料保留期改 14 個月 | — | **2026-08-17 已完成**（24 小時後生效，不回復已刪除資料） |
| ~~修 `paywall_opened` 的 `entry_point`~~ | — | **已撤銷**，程式碼無問題，見 §7 更正 |
| ~~補「開始註冊」事件~~ | — | **已撤銷**，事件早就存在，見 §10 |
| **註冊 §10 的三個 Tier 1 自訂維度** | **2026-08-24** | 未做。**GA4 設定，不需改程式** |
| ~~確認五個有定義無觸發點的事件是否漏接~~ | — | **已於 2026-08-18 結案，五個全部不接，見 §11** |

### 主行動（產出是數字的變化）

| 項目 | 推哪個閘門 | 期限 |
|---|---|---|
| **新增第四個 hero 狀態 `activation`**（見 §9） | 3a：21.4% → 50% | **2026-09-15** |
| 改 paywall 進入時機、方案呈現、試用設計 | 3b：10.8% → 15%（先做上一項再評估，31 → 8 的落差可能是 3a 的後果） | 2026-10-10 |
| 針對「啟用時間窗只有註冊當下」設計留存機制 | KR-4 先行指標 D1、D7 | 2026-10-10 |

### 判定

| 日期 | 事項 |
|---|---|
| 2026-08-24 | 註冊 `current_step` 自訂維度。其餘前置皆已結案 |
| 2026-10-31 | KR-3 停損：3a ≥ 35% 或 3b ≥ 13% |
| 2026-11-15 | 總停損，見 [okr.md](okr.md) |

**每月重跑本文的 SQL 與 GA4 查詢**追蹤上述四個數字——此項為前置的持續作業，不佔用 KR 判定。

---

## 9. 根因：Hero 沒有「已設定完成、尚未使用」這個狀態（2026-08-17）

本節取代先前對 40% 零使用與 -74% paywall 落差的分開處理——**兩者共用同一個根因。**

### 事實

`MainTabContainerView.swift:435-440`：

```swift
private func heroVariant() -> String {
  if !isKeyboardAdded || !isFullAccessEnabled || !accountService.authState.isSignedIn {
    return "onboarding"
  }
  return routingState.subscriptionStatus == .active ? "pro_welcome" : "quota_upgrade"
}
```

首頁 Hero 只有三個狀態：`onboarding` → `quota_upgrade` → `pro_welcome`。

四步 onboarding 的第 4 步是「首次登入領取 50 次免費額度」。**登入完成的那一瞬間，Hero 從「完成設定」直接跳成「解鎖更多次數」**，中間沒有任何狀態引導使用者去用那 50 次。

`remainingQuotaBucket()`（`:442-447`）已算出 `0`／`1_2`／`3_plus`，**但只作為 `home_hero_impression` 的參數送出，`heroVariant()` 完全沒有使用它**。剩 50 次的人與剩 0 次的人看到相同的升級提示。

配合 §5 既有事實「**沒有任何人耗盡過額度**」，可得：

> **上線至今每一次「解鎖更多次數」提示，都是顯示給還有免費額度沒用的人。**

### 這解釋了什麼

| 現象 | 原本的解釋 | 修正後 |
|---|---|---|
| 21 位註冊後零使用（40%） | 未知，需訪談 | 完成設定後沒有任何東西叫他去用 |
| `paywall_opened` 31 → `paywall_plan_selected` 8（-74%） | 定價或 paywall 文案問題 | 向尚未體驗過價值的人推銷 |
| `entry_point` 只觀察到 `home_hero_quota_upgrade` | 未解 | 這是唯一會實際觸發的入口（另見下方死碼） |

### 附帶發現

**`openOnboardingCompletionPaywallIfNeeded()`（`:602-612`）定義了但全專案沒有任何呼叫點。** 完成 onboarding 後的 paywall 是死碼，`PaywallEntryPoint.homeHeroOnboardingComplete` 永遠不會出現在資料裡。這是第六個「有定義無觸發」的項目，§1 只記錄了五個。

（這反而是好事——若它有被呼叫，會在使用者拿到額度的同一秒直接彈 paywall。）

### 行動

新增第四個 hero 狀態 `activation`，卡在 `onboarding` 與 `quota_upgrade` 之間：

- **沒用過 AI** → 推他去打字試一次（素材已存在：首頁「AI 優化範例／立即試用」卡片、鍵盤預覽頁的練習輸入區）
- **用過了** → 才進 `quota_upgrade`

判斷所需資料已經存在，只是目前沒接到決策上。期限 **2026-09-15**，對應 3a：21.4% → 50%。

### 未驗證

| 項目 | 狀態 |
|---|---|
| 「paywall 太早」是 -74% 落差的主因 | **推論**。有機制與時序支持，但未實測。改完 `activation` 狀態後才能驗證 |
| GA4 `hero_variant` 的實際分布 | **不可用**。301 個 `home_hero_impression` 為 `(not set)`，有值的僅 34 個事件／4 位使用者 |
| 21 位零使用者的實際原因 | **未訪談**。本節是程式碼與時序推論，不是使用者證言 |

---

## 10. 缺少的自訂維度清單（2026-08-17）

### 「補『開始註冊』事件」已撤銷

§2 曾寫「**唯一真正缺少的事件是「開始註冊」**，目前只有完成沒有開始」。**該診斷錯誤。**

事件早就存在：`OnboardingCardView.swift:165` 的 `onTrackCTA("sign_in", "sign_in")` → `trackHeroCTA()`（`MainTabContainerView.swift:480-488`）→ 送出 `home_hero_cta_tapped`，`cta_type = "sign_in"`。

**實測運作正常**：2026-06-18 ～ 08-17 共 **109 次事件／37 位使用者**。

問題與 `entry_point` 完全相同：**`cta_type` 未註冊為 GA4 自訂維度，Data API 拆不出來。** 修法是註冊維度，不是改程式。

> **這是本輪第三次同一個模式**（`entry_point`、`step`、`cta_type`）。本 repo 的埋點比文件以為的完整得多——**缺的不是事件，是 GA4 的維度設定。**

### 該註冊什麼

GA4 免費版上限為 50 個事件範圍自訂維度，目前用 13 個，**沒有名額壓力**。

#### Tier 1｜直接服務目前的問題（08-24 前完成）

| 參數 | 所屬事件 | 為什麼要 |
|---|---|---|
| **`cta_type`** | `home_hero_cta_tapped` | 這就是「開始註冊」。可算出「點了登入 → 完成登入」的流失，即 onboarding 第 4 步的放棄率 |
| **`remaining_quota_bucket`** | `home_hero_impression` | **把 §9 的根因從推論變成測量。** 可直接驗證「每一次升級提示都顯示給還有額度的人」 |
| **`current_step`** | `home_hero_cta_tapped` | 使用者在哪一步點 CTA，配合 `step` 可重建完整 onboarding 漏斗 |

#### Tier 2｜服務 KR-3

| 參數 | 所屬事件 | 用途 |
|---|---|---|
| `prompt_type` | `ai_request_completed` | 哪些 AI 風格真的被用，可用於 3a 的啟用設計 |
| `has_trial` | `paywall_plan_selected` 等四個事件 | 試用 vs 直接付費的轉換差異 |
| `source_screen` | `paywall_opened` | paywall 從哪個畫面開啟 |

#### Tier 3｜補完

`subscription_status`（`home_hero_impression`）、`default_plan`（`paywall_opened`）、`source`（`onboarding_step_completed`／`onboarding_completed`）

#### 不適用

`count`（`keyboard_input_chars`）是數值，若要用需註冊為**自訂指標**而非維度。

### 兩項限制

1. **不回溯。** 08-17 註冊 → 只有 08-17 之後的資料。愈晚做損失愈多。
2. **可讀時間取決於事件頻率。** `cta_type` 近兩個月 37 位使用者，數週內可讀；`step` 自 08-16 註冊至今僅 2 筆，需要更久。

### 這件事不改變 KR-1

**修好量測不會生出獲客路徑。** 本節全部屬於 KR-3／KR-4 的前置，[KR-1 的停損時鐘照常計算](okr.md)，不因量測工作暫停。


---

## 11. 五個無觸發點事件的處置（2026-08-18 結案）

**五個全部不接。** 程式搜尋確認它們確實沒有任何觸發點，但**「沒有 caller」不等於「沒有資料」**——本文先前的推論錯在這裡。

### 三個訂閱事件：已被取代，接了會重複計數

`docs/superpowers/specs/2026-04-02-firebase-main-funnel-design.md:247`（keyly repo）明確把前兩者列為 **Replace Or Deprecate**：

| 舊事件 | 取代者 | 觸發位置 |
|---|---|---|
| `subscription_view_opened` | `paywall_opened`（參數更完整） | `MainTabContainerView.swift:251` |
| `subscription_cta_tapped` | `paywall_purchase_started` | `MainTabContainerView.swift:520` |

購買結果另有 `purchase_result` 與 `subscription_purchased`。所以「誰看了、誰點了、成功與否」**都有資料**。

`subscription_restored` 確實有真實觸發路徑，但原始設計明定不納入主漏斗；除非 KR-3 明確需要「還原成功率」，否則沒有決策用途。

### 兩個 AI 事件：沒有對應的決策

| 事件 | 不接的理由 |
|---|---|
| `ai_prompt_type_selected` | `ai_request_completed` 已帶 `prompt_type`，足以分析實際使用與成功率。selected 只多出「選了但沒送出」，目前沒有決策要它支持 |
| `input_mode_switched` | 尚無產品決策或 KR 需要切換頻率，且鍵盤是熱路徑，不該平白增加事件量 |

依 [okr.md](okr.md) 判定規則 4：答不出「能推這個乘數幾倍」就不排進去。

### 建議工作（不阻擋，未執行）

清掉已被取代的 `subscription_view_opened`、`subscription_cta_tapped` 兩個 case，並修正 keyly repo 的 `docs/analytics-events.md:106` 誤標為「已啟用」的狀態。留著的話，下一個讀到的人（包括我）還是會把它們當成漏接。
