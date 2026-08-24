# 選定第一個訂閱轉換機制

Type: `wayfinder:grilling`
Status: resolved
Assignee: codex
Parent: `.scratch/keyly-ai-subscription-conversion/MAP.md`
Blocked by: `.scratch/keyly-ai-subscription-conversion/tickets/01-establish-current-subscription-funnel.md`, `.scratch/keyly-ai-subscription-conversion/tickets/02-define-ai-value-moment.md`, `.scratch/keyly-ai-subscription-conversion/tickets/03-audit-offer-and-monetization-mechanics.md`

## Question

根據漏斗基準、AI 價值時刻與現行方案限制，第一個應優先驗證的機制是哪一類：加速首次 AI 成功、改變免費額度、調整付費牆時機、改善試用、重新包裝價格方案，或喚回既有免費使用者？

## Resolution

### 第一個機制

將 2026-08-19 已發布的新版 Tutorial 與 activation Hero 視為第一個正式訂閱轉換機制，先驗證它們能否把「理解 AI 展示價值」轉成「在真實第三方 App 的 Keyly 鍵盤完成首次 AI 價值時刻」，再觀察是否形成跨日重複使用。

Tutorial 使用預先產生的示範，解決的是價值認知；只有自己的文字在真實鍵盤內成功轉換並回填，才算首次 AI 價值時刻。兩者不可混為同一事件。

### 為什麼不先改價格、試用或額度

- 新版只累積約 6 天，尚未形成完整的 14 天 cohort。
- 30 次登入贈送額度本身已是一種按使用量計算的體驗機制；此時再加入 7 天試用會疊加兩種免費邏輯，延後並混淆付費時刻。
- 目前 2 位有效訂閱者皆未退訂，是「付費者可能有持續價值」的正向訊號，但樣本太小，不能據此宣告留存已解決。
- 同時改 Tutorial、額度、試用、價格或付費牆，將無法辨識因果。

### 凍結範圍

在 2026-09-02 左右取得 8/19 上線後完整 14 天 cohort 前，不變更：

- 登入贈送的 30 次免費額度
- 免費試用
- 月訂閱價格或新增年方案
- 付費牆觸發時機

### 下一個決策依據

比較改版前後的 cohort：`first_open → tutorial_completed → onboarding_completed → 首次 AI 價值時刻 → 7 天內 AI 訂閱合格使用者 → paywall → 有效付費訂閱`。

- 若 Tutorial 完成提高，但首次 AI 價值未提高：優先改善 Tutorial 到真實鍵盤使用的橋接。
- 若首次價值提高，但跨日合格沒有提高：優先改善重複價值循環。
- 若合格使用者增加，但付費沒有提高：才進入額度、付費牆、試用或方案包裝決策。
