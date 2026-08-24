# 提升 Keyly AI 訂閱轉換率

Label: `wayfinder:map`

## Destination

找出 Keyly 從首次安裝、首次 AI 成功體驗、免費額度、付費牆、試用到正式付款的主要流失點，決定最值得優先測試的訂閱轉換機制，並定義實驗順序、成功門檻與追蹤方式，形成可交付執行的決策方案。

最終成功指標是新增有效付費訂閱者；免費試用只算中間轉換。新下載使用者與既有免費使用者都納入，但使用不同漏斗分析。

## Notes

- 本地 issue tracker 規則：`docs/agents/issue-tracker.md`
- 規劃範圍包含 onboarding、首次 AI 體驗、免費額度、付費牆、試用、價格、方案包裝與既有免費使用者升級。
- SEO 與 AI 改寫工具頁是既定獲客方向；本地圖聚焦進站／安裝之後如何提高有效付費訂閱，不重新決定自然流量策略。
- 第一層在 1～2 週判斷付費牆觀看、AI 啟用、試用開始與立即訂閱等領先指標；第二層在完整試用／續訂週期判斷實際付費與續訂。
- Wayfinder 只做決策，不修改網站或 App；完成後另行交付執行。
- Grilling tickets 應同時使用 domain-modeling，並把已確認的核心詞彙寫入 `CONTEXT.md`。

## Decisions so far

- [盤點現行方案與付費機制的決策限制](tickets/03-audit-offer-and-monetization-mechanics.md)：目前只有 NT$150 月訂閱，無有效試用或年方案；App 已有 activation Hero 與多方案程式基礎，而最強機制訊號是 50 次免費額度從未被外部使用者耗盡，價格與付費牆因果仍待漏斗證據。
- [建立目前 AI 訂閱漏斗基準](tickets/01-establish-current-subscription-funnel.md)：歷史漏斗顯示註冊後零 AI 使用、單日使用及付費牆選擇落差，但研究引用的舊版 Hero 狀態已由 activation Hero 修正；目前有效付費訂閱僅 2 位且沒有試用，需以新版 cohort 重新驗證流失原因。
- [定義 AI 價值時刻與合格訂閱對象](tickets/02-define-ai-value-moment.md)：首次價值必須在真實鍵盤內完成並回填一次雲端 AI 文字轉換；7 天內至少兩個使用日、累計三次成功才算合格，所有情境納入但按類型分群比較。
- [選定第一個訂閱轉換機制](tickets/04-choose-primary-conversion-mechanism.md)：先把 8/19 上線的 Tutorial＋activation 視為第一個實驗，凍結額度、試用、價格與付費牆到 9/2 cohort 成熟，再按實際斷點選下一個機制。
- [稽核 AI 價值時刻的追蹤能力](tickets/08-audit-ai-value-measurement-contract.md)：`ai_request_sent` 在呼叫 AI 前就送出、不能代表價值；最接近回填的 `ai_request_completed(success:true)` 完全沒進任何漏斗或 dashboard，且只證明呼叫了 `insertText`、不證明第三方 App 真的接受寫入；GA4 使用者身份（`app_instance_id`）與後端 `user_id`（訂閱、`daily_user_ai_usage`）無橋接，9/2 cohort 若要對到同一自然人只能走後端 `user_id` 路徑，不能用 GA4 漏斗 `activeUsers`。
- [選定 9 月 cohort 的量測契約](tickets/09-choose-september-cohort-measurement-contract.md)：採 GA4 安裝、後端帳號與 ASC 三線並列，以 AI 使用意圖、AI 價值交付代理及訂閱合格代理帳號誠實命名，對比 8/5～8/11 與 8/19～8/25 的對稱 7 天 cohort。

## Not yet specified

- 免費額度、試用、月訂閱與其他方案如何組合，需等現行方案與行為證據清楚後再拆成具體決策。
- 付費牆的觸發時機、訊息層級、價格呈現與社會證明，需等使用者分群及升級理由確定後再具體化。
- 既有免費使用者應採用額度耗盡、成功改寫後、功能鎖定或回訪情境中的哪種升級入口，需等漏斗研究後再決定。
- 訂閱後的價值持續與續訂風險可能影響方案設計，但只有在前置研究顯示它會改變首購決策時才畢業成 ticket。

## Out of scope

- 付費廣告、社群投放與非自然獲客渠道：本輪使用者限定自然流量／SEO。
- 直接實作網站或 App 改動：本地圖的終點是可執行的決策方案。
- 以總下載量取代訂閱成功：免費下載不是本地圖的最終商業指標。
