# 稽核 AI 價值時刻的追蹤能力

Type: `wayfinder:research`
Status: resolved
Assignee: claude
Parent: `.scratch/keyly-ai-subscription-conversion/MAP.md`
Blocked by: none

## Question

目前 App、鍵盤 extension、GA4 與後端資料是否能以獨立使用者及 cohort 證明：Tutorial 完成、真實第三方 App 的鍵盤內雲端 AI 文字轉換成功並回填、使用日期、功能／模板分類、付費牆路徑與有效訂閱？哪些欄位可直接使用，哪些定義混淆，哪些是 9/2 cohort 分析前必須知道的追蹤缺口？

## Resolution

跨 repo 查核範圍：`keyly-admin-dashboard`（`src/components/SubscriptionAnalytics.tsx`、`src/lib/api.ts:325-337`）、`keyly-backend`（`src/routes/admin-subscription-analytics.ts`、`src/lib/ga4.ts`、`src/lib/daily-user-ai-usage.ts`、`src/routes/generate-ai-text.ts`）、`keyly` App/鍵盤原始碼（`KeylyKeyboard/Logic/AIService.swift`、`KeylyCore/Shared/Models/AnalyticsEvent.swift`）、本 repo `docs/okr-kr-b-activation.md`。

### 核心結論：「回填成功」查不到，只有「AI 請求送出」與「AI 回應成功」，兩者都不等於「文字真的寫回第三方 App」

- `ai_request_sent`（`KeylyKeyboard/Logic/AIService.swift:210`）在呼叫 AI provider **之前**就送出，只代表使用者按下 AI 鍵，不代表任何結果。所有既有漏斗（`ACTIVATION_FUNNEL`、`ACTIVATION_MAIN_FUNNEL`、`ENTRY_FUNNEL` 之外的 `AI_TO_PURCHASE_FUNNEL`、`ONBOARDING_COMPLETED_TO_AI_REQUEST_FUNNEL`）在 `keyly-backend/src/routes/admin-subscription-analytics.ts:88-134` 全部用這個事件當「用過 AI」的判準——這正是 ticket 03 與先前研究裡把 `ai_request_sent` 當價值時刻的來源，證據不足。
- `ai_request_completed(success: Bool, promptType: String)`（`AIService.swift:283`）是目前最接近「回填」的事件：它在 `delegate?.insertText(optimized)` **之後**才 enqueue（`AIService.swift:278-286`），語意是「AI 結果已呼叫寫回鍵盤 delegate」。但這只證明 App 呼叫了 `insertText`，**不能證明第三方 App 的文字欄位真的接受了這次寫入**——`UITextDocumentProxy.insertText` 在部分第三方輸入框（尤其是自訂 view 或 WebView）已知會靜默失敗，程式碼裡沒有任何回呼或後續驗證去確認寫入結果，這一段全 repo 查不到。
- 更嚴重的斷點：`ai_request_completed` 這個事件**完全沒有被用在任何漏斗定義、後端 API 或 dashboard 元件裡**（`grep ai_request_completed` 在 `keyly-backend/src` 與 `keyly-admin-dashboard/src` 皆為零筆）。唯一引用它的地方是 `docs/okr-kr-b-activation.md:69,104-105,135-136,144`——該文件本身已經記錄「`success` 參數未註冊，只能用 `ai_request_sent` 對 `ai_request_completed` 的事件數差值『近似』85% 成功率」，等於現有分析本來就知道這是近似值而非真值，但 ticket 03／01 先前的結論沒有把這個既有警告帶進來。

### 獨立使用者／cohort 能力：GA4 漏斗步驟本身沒問題，但跟後端使用者身份對不起來

- `keyly-backend/src/lib/ga4.ts:85-99` 的 `parseFunnelResponse` 明確要求 metric 是 `activeUsers`（GA4 原生漏斗探索的去重使用者數），不是 `eventCount`——七條主要漏斗（tutorial/onboarding/activation/entry/purchase/aiToPurchase/…）都是**真的去重使用者數**，這點是可信的。事件計數（`eventCount`）只用在兩個輔助分布（`buildCurrentStepRequest`、`buildPurchaseResultRequest`，`admin-subscription-analytics.ts:403-441`），且沒有被誤標成使用者數。
- 但 GA4 去重使用者是 Firebase `app_instance_id`（裝置/安裝層級），`Keyly/Services/AnalyticsService.swift` 全檔案沒有呼叫 `Analytics.setUserID`——代表 GA4 側的「獨立使用者」跟後端資料庫的 `user_id`（帳號層級，訂閱、Supabase `daily_user_ai_usage` 都用這個鍵）**是兩套不同的身份系統，無法直接 join**。同一人換裝置、重裝、或用不同帳號登入會在 GA4 側被算成不同使用者，但在後端訂閱表是同一人；反之亦然。9/2 cohort 分析如果要把「GA4 漏斗行為」跟「後端訂閱結果」對到同一個人身上，目前沒有橋接欄位。
- Supabase `daily_user_ai_usage`（`keyly-backend/src/lib/daily-user-ai-usage.ts`、寫入點在 `generate-ai-text.ts:191-196`）才是唯一真正用 `user_id` 鍵值、可跟訂閱表直接 join、天然去重可做 cohort 的 AI 使用紀錄；但它是在後端拿到 LLM 回應成功之後才寫入（`generate-ai-text.ts` 第 6 步），本質仍是「後端幫你把 AI 請求跑成功了」，跟前面講的「client 端有沒有真的把結果寫回第三方 App 文字框」是同一個斷點——這個表也證明不了回填成功。

### 功能／模板分類

- `prompt_type` 只掛在 `ai_request_completed`（`AnalyticsEvent.swift:172`）與 `ai_prompt_type_selected`（`:174`）兩個事件上，`ai_request_sent`（實際被漏斗使用的事件）完全沒有帶這個參數。既然沒有漏斗用 `ai_request_completed`，目前所有「哪個功能/模板被使用」的分類能力，在漏斗/cohort 層級上等於不存在——`prompt_type` 資料理論上存在於 GA4 原始事件表，但沒有進到任何現有報表或 API。

### Tutorial 完成、付費牆路徑、有效訂閱

- Tutorial 完成：`tutorial_completed`（`TUTORIAL_FUNNEL` 最後一步）可用，`docs/okr-kr-3-activation-tutorial.md:16` 也明確排除了會灌水的 `tutorial_cta_tapped`，這條可信，但只從 2026-08-17 才存在（`TUTORIAL_SINCE`），更早的區間必然低估。
- 付費牆路徑：`ENTRY_FUNNEL`／`PURCHASE_FUNNEL`／`AI_TO_PURCHASE_FUNNEL` 三條漏斗都用 `activeUsers`，且 `entry_point`／`plan`／`result` 等維度存在（`buildPurchaseResultRequest`），可信度高，這段沒有查到定義混淆。
- 有效訂閱：`subscription_purchased`（`Keyly/Views/Main/MainTabContainerView.swift:557-571`）是在 `subscriptionService.purchase(...)` 的完成回呼裡才觸發，且緊接著呼叫 `accountService.syncSubscriptionStatus()`——不是「按下購買」就發，是 StoreKit 交易真正走完才發，語意可信。但這仍是 client 端事件：沒有查到它跟 Apple Server Notification／後端 receipt 驗證結果做過交叉核對，退款、家庭共享或 App Store 端撤銷的訂閱狀態變化不會反映在這個 GA4 事件上，只能靠 ASC 本身的數字（ticket 01 已用 app-store-data skill 查證過 ASC 即時數字）當作真正的營收基準。

### 9/2 cohort 分析前必須先解決的追蹤缺口（依阻塞程度排序）

1. **沒有任何事件能證明「AI 結果真的寫回第三方 App 文字框」**——`ai_request_completed(success:true)` 只能證明 App 呼叫了 `insertText`，是目前最接近的代理指標，但語意上要清楚標注「呼叫寫入」不是「確認寫入」，且它目前完全沒進任何報表管線，要先接上漏斗/dashboard 才能用。
2. **GA4 使用者身份與後端 `user_id` 沒有橋接**——沒有 `setUserID`，cohort 分析若要把「9/2 這天用過 AI 的人」跟「後來是否訂閱」對應到同一自然人，只能用後端 `daily_user_ai_usage` + 訂閱表（同樣用 `user_id`），不能用 GA4 漏斗的 `activeUsers`；两条路径互不相通，混用會導致同一人被算兩次或漏算。
3. **`prompt_type`／功能分類沒有進任何現有報表**——要先讓某個漏斗改用 `ai_request_completed`（並保留現有 `ai_request_sent` 以免破壞既有 21.4%/50% 的 OKR 基準時間序列），分類才可用。
4. **既有「AI 成功率 85%」是事件計數差值的近似值**（`docs/okr-kr-b-activation.md:144`），不是同一次請求的 success/fail 標記，9/2 cohort 若要精確算「這個使用者這次請求成不成功」，要改用 `ai_request_completed` 的 `success` 參數本身，而不是兩個事件的總數相減。

### 未查證部分

- 沒有查到 Apple Server Notification（App Store Server API）或後端 receipt 驗證與 `subscription_purchased` 事件的交叉比對邏輯；不確定是否存在，本次未在 `keyly-backend` 找到相關 route。
- `keyly-admin-dashboard` 的 UI 呈現方式（畫面上怎麼標示這些指標、有沒有已經誤導使用者的地方）未逐一檢視每個圖表元件，只查了資料來源與 API 定義。
