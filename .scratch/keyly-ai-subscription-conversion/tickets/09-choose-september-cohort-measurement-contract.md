# 選定 9 月 cohort 的量測契約

Type: `wayfinder:grilling`
Status: resolved
Assignee: codex
Parent: `.scratch/keyly-ai-subscription-conversion/MAP.md`
Blocked by: `.scratch/keyly-ai-subscription-conversion/tickets/08-audit-ai-value-measurement-contract.md`

## Question

在 iOS 無法確認第三方文字欄位實際接受回填、GA4 安裝身分又無法與後端帳號直接 join 的限制下，9/2 cohort 應採用哪些可觀察代理指標、身份粒度與雙軌資料來源，才能誠實判斷 Tutorial＋activation 的效果而不把 `ai_request_sent` 誤稱為首次 AI 價值時刻？

## Resolution

### 三條並列資料線

9/2 分析採用三條不可逐人串接的資料線，不虛構完整端到端漏斗：

1. **GA4 安裝層漏斗**：以 `app_instance_id` 去重，觀察 Tutorial、onboarding、`ai_request_sent`、付費牆與 StoreKit 購買行為。它回答新版介面是否改變安裝實例的行為路徑。
2. **後端帳號層漏斗**：以 Keyly `user_id` 去重，觀察註冊、後端 AI 結果成功、7 天跨日使用與帳號訂閱。它回答帳號是否形成重複需求及付費。
3. **App Store Connect 商業結果**：觀察新增訂閱、有效訂閱、取消與續訂，作為最終商業真相。

GA4 與後端沒有共同身份鍵，只能並列比較趨勢；禁止宣稱某位完成 Tutorial 的人後來訂閱。

### 可觀察代理指標

- `ai_request_sent` 命名為 **AI 使用意圖**，只表示按下 AI 鍵。
- 後端成功產生 AI 結果命名為 **AI 價值交付代理**，表示雲端處理成功，但不證明第三方輸入框接受回填。
- 7 天內至少兩個成功使用日、累計至少三次 AI 價值交付代理的帳號，命名為 **訂閱合格代理帳號**。

報告不得把上述代理省略成「首次 AI 價值時刻」「回填成功」或「AI 訂閱合格使用者」。

### 對稱 cohort

- 改版前：2026-08-05～2026-08-11 首次開啟／註冊，逐人追蹤後續 7 天至 2026-08-18。
- 改版後：2026-08-19～2026-08-25 首次開啟／註冊，逐人追蹤後續 7 天至 2026-09-01。

比較 `first_open → onboarding_completed`、`onboarding_completed → AI 使用意圖`、註冊 → AI 價值交付代理、註冊 → 訂閱合格代理帳號、paywall → StoreKit 購買，以及 ASC 新增／有效訂閱。

Tutorial 於 8/17 才存在，只報告改版後完成率；改版前沒有可比較的 Tutorial 指標。樣本量小，所有結果同時報告人數與比例，不設定任意百分比門檻，也不把前後觀察直接宣稱為因果。
