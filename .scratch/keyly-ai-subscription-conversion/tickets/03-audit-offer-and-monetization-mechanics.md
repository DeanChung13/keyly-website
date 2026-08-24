# 盤點現行方案與付費機制的決策限制

Type: `wayfinder:research`
Status: resolved
Assignee: codex
Parent: `.scratch/keyly-ai-subscription-conversion/MAP.md`
Blocked by: none

## Question

Keyly 現行免費額度、AI 功能限制、試用、月訂閱／其他方案、價格、付費牆觸發與 App Store 商品設定實際為何；哪些項目可安全實驗，哪些受商店、技術或既有訂閱者承諾限制？

## Resolution

### 已確認的現況

- App Store Connect 目前只有 `Keyly Pro Monthly` 有效商品：NT$150／月，開發者每期實收約 NT$121；目前 2 位有效標準價格訂閱者。
- ASC 目前沒有有效免費試用、年訂閱、季訂閱、促銷優惠或 win-back offer。
- App 程式碼已預留月訂閱、年訂閱與 180 次額度包的 StoreKit product ID，也能依 StoreKit introductory offer 顯示免費試用；但年方案與額度包目前不是 ASC 的有效商品，不能把程式碼預留誤認為已上線方案。
- 新登入帳號一次取得 50 次雲端 AI 額度。研究 cohort 為 52 位註冊者：21 位從未使用 AI；用過 AI 的 31 位中，22 位只在一天使用；外部使用者使用中位數為 3 次，最高 31 次，沒有外部使用者耗盡 50 次。
- 雲端 AI 每次呼叫有 LLM 邊際成本，因此任何免費機制都需要額度或速率防護。
- 目前 App 程式碼已存在 `activation` Hero：完成鍵盤、完整取用與登入，但尚未使用 AI 的使用者會看到首次 AI 體驗引導；使用至少一次 AI 後才切到 `quota_upgrade`。這由 `HeroCardVariant.make(... hasUsedAI:)` 決定，是 commit `81cb9c9` 已完成的現況。

### 可安全列入後續決策的實驗空間

- 免費 AI 模型：降低一次性 50 次額度，或改成週期性少量額度；必須先決定價值時刻及避免傷害啟用率。
- Offer：為既有月方案配置 introductory free trial，或在 ASC 正式新增年方案／額度包。App 已有部分顯示與購買基礎，但仍需完整商店設定、審核與測試。
- 付費時機：依首次成功改寫、剩餘額度、進階 AI 情境或既有免費使用者回訪觸發升級訊息。
- 價格包裝：維持月方案作為基準，以年方案、額度包或試用降低購買摩擦；任何定價變更都需處理既有 2 位訂閱者與 Apple preserved pricing 行為。

### 不可當成已證實結論

- `paywall_opened = 31`、`paywall_plan_selected = 8` 尚未確認是事件數或獨立使用者，也沒有 cohort、時間窗與後續購買分母；74% 落差只能視為待查漏斗，不能直接歸因為「過早推銷」。
- 研究回覆所稱「所有付費牆都展示給尚未使用 AI 的使用者」與目前程式碼不一致；activation Hero 已阻止未使用 AI 的已完成 onboarding 使用者直接看到 quota upgrade Hero。
- 「Apple 規定離線注音核心必須免費」沒有足夠證據，不能列為商店硬限制。本地圖只保留產品策略上的既定選擇：免費注音不是最終商業指標，AI 訂閱才是。

### 決策含義

目前最強的方案機制證據不是價格過高，而是 50 次免費額度遠高於實際 AI 使用深度，幾乎沒有人走到自然額度耗盡的升級時刻。下一步不能直接把額度砍到任意數字；必須先完成「建立目前 AI 訂閱漏斗基準」與「定義 AI 價值時刻與合格訂閱對象」，再比較免費額度、試用、付費牆與方案包裝哪一個應成為第一個實驗。
