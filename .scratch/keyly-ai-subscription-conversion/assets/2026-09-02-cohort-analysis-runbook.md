# 2026-09-02 Keyly AI 啟用 Cohort 分析規格與執行清單

## Executive Summary

本分析用來判斷 2026-08-19 發布的 Tutorial 與 activation Hero 是否改善 Keyly 的 AI 啟用與訂閱路徑。分析必須分成 GA4 安裝層、後端帳號層與 App Store Connect 商業結果三條資料線；三者沒有共同身份鍵，不得逐人串接或宣稱因果。

真正可執行的 7 天 cohort 以後端 `user_id` 為準：比較 2026-08-05～08-11 註冊並追蹤至 08-18 的改版前帳號，與 2026-08-19～08-25 註冊並追蹤至 09-01 的改版後帳號。Admin Dashboard 目前只能提供日期視窗內的 GA4 closed funnel，不能鎖定某批 `first_open` 後逐人追蹤，因此其結果必須標為「視窗比較」，不是 cohort。

最早在 2026-09-02 執行初查；若 GA4 顯示資料延遲，應在 09-03 使用強制刷新重跑。分析完成前繼續凍結 30 次免費額度、試用、價格、方案與付費牆時機。

## 1. 分析問題

回答以下問題，並只選出第一個有足夠證據的漏斗斷點：

1. 改版後有多少安裝實例開始並完成 Tutorial？
2. 改版後 onboarding 與 AI 使用意圖是否出現方向性改善？
3. 改版後註冊帳號達成 AI 價值交付代理的比例是否提高？
4. 改版後形成訂閱合格代理帳號的比例是否提高？
5. 付費牆、StoreKit 購買及 ASC 有效付費訂閱是否出現一致方向？
6. 下一個實驗應改善 Tutorial、設定橋接、AI 重複價值，還是商業化機制？

## 2. 固定定義

- **有效付費訂閱者**：ASC 顯示訂閱有效；試用開始或 client 購買事件不算最終成功。
- **AI 使用意圖**：GA4 `ai_request_sent`；只代表按下 AI 鍵。
- **AI 價值交付代理**：後端成功產生一次雲端 AI 結果；不代表第三方文字欄位確認回填。
- **訂閱合格代理帳號**：註冊後 7 天內至少兩個成功使用日、累計至少三次 AI 價值交付代理。
- **GA4 安裝層漏斗**：以 `app_instance_id` 去重，不能視為帳號或自然人。
- **後端帳號層漏斗**：以 `user_id` 去重，沒有 Tutorial 行為。

禁止使用下列替代說法：

- 不把 `ai_request_sent` 稱為 AI 成功、回填成功或首次 AI 價值時刻。
- 不把後端成功產生結果稱為確認回填。
- 不把訂閱合格代理帳號稱為已證實的 AI 訂閱合格使用者。
- 不把 GA4 與後端數字相減、相除或逐人 join。

## 3. 分析期間

### 後端精確 cohort

| Cohort | 註冊區間 | 每位帳號觀察截止 | 觀察長度 |
| --- | --- | --- | --- |
| 改版前 | 2026-08-05～2026-08-11 | 註冊日後第 7 日，最晚 08-18 | D0＋後續 7 日 |
| 改版後 | 2026-08-19～2026-08-25 | 註冊日後第 7 日，最晚 09-01 | D0＋後續 7 日 |

日期與 `daily_user_ai_usage.usage_date` 一律依 `Asia/Taipei` 解讀。

### GA4 視窗比較

現有 `/admin/analytics/subscription-funnel` 只接受 `from` 與 `to`，沒有 cohort enrollment 或逐人 follow-up 條件。因此執行兩種視窗，並明確標示用途：

| 視窗 | 改版前 | 改版後 | 用途 |
| --- | --- | --- | --- |
| 加入週視窗 | 08-05～08-11 | 08-19～08-25 | 比較同長度一週內的 first open、onboarding 與 AI 意圖 |
| 完整觀察視窗 | 08-05～08-18 | 08-19～09-01 | 查看 closed funnel 的整體方向；不是 enrollment cohort |

Tutorial 只從 2026-08-17 存在。改版前 Tutorial 數字不做比較，也不得把零解讀為流失。

## 4. 資料來源與責任邊界

| 資料線 | 主來源 | 身份粒度 | 能回答 | 不能回答 |
| --- | --- | --- | --- | --- |
| GA4 | Admin Dashboard／subscription-funnel API | `app_instance_id` | Tutorial、onboarding、AI 按鍵、paywall、client 購買路徑 | 帳號跨日使用、ASC 有效狀態、確認回填 |
| Backend | Supabase auth、`daily_user_ai_usage`、`subscriptions` | `user_id` | 註冊 cohort、成功 AI 回應、跨日使用、帳號訂閱狀態 | Tutorial、第三方輸入框確認回填 |
| ASC | App Store Connect | Apple 報表聚合 | 新增、有效、取消、續訂與 proceeds | 與 GA4／後端逐人 join |

## 5. 執行前檢查

在填寫任何結果前逐項確認：

- [ ] 現在時間已到 2026-09-02，改版後 cohort 已追蹤至 09-01。
- [ ] Admin Dashboard 顯示 `property_timezone = Asia/Taipei`。
- [ ] Dashboard 回應 `schema_version = 3` 或記錄實際新版號。
- [ ] Dashboard 顯示 Tutorial 與 activation Hero 的 availability 為 2026-08-17。
- [ ] 點擊強制刷新，記錄 `queried_at`。
- [ ] 檢查 GA4 的「今日資料可能延遲」警告；若資料仍延遲，標示 provisional 並安排 09-03 重跑。
- [ ] 後端 cohort 使用帳號 `created_at`，不是查詢期間內曾活動過的所有帳號。
- [ ] 後端成功次數使用 `daily_user_ai_usage.request_count`，不是目前剩餘額度推算。
- [ ] 訂閱表取同一 `user_id` 最新的 source-of-truth 狀態。
- [ ] ASC 報表 coverage date 足以涵蓋 09-01；不足時標示 provisional。
- [ ] 排除已知開發者／測試帳號，並同時保留未排除版本供稽核。

## 6. GA4 安裝層查詢清單

### 6.1 Dashboard 操作

依序查詢四個日期區間，每次都使用 Refresh：

1. 2026-08-05～2026-08-11
2. 2026-08-19～2026-08-25
3. 2026-08-05～2026-08-18
4. 2026-08-19～2026-09-01

對每個區間保存完整 API 回應或截圖，記錄：

- `from`
- `to`
- `queried_at`
- `schema_version`
- `data_notice`
- `event_availability`

### 6.2 必填 GA4 指標

| 區域 | 指標 | 單位 | 備註 |
| --- | --- | --- | --- |
| Tutorial | `tutorial_started` | 去重安裝實例 | 只報改版後 |
| Tutorial | `tutorial_completed` | 去重安裝實例 | 只報改版後 |
| Tutorial | 完成率 | 比例 | completed / started |
| Onboarding | `home_hero_impression:onboarding` | 去重安裝實例 | closed funnel 首步 |
| Onboarding | `onboarding_completed` | 去重安裝實例 | 依序完成漏斗末步 |
| Activation | `home_hero_impression:activation` | 去重安裝實例 | 只在新版存在 |
| Activation | activation CTA | 去重安裝實例 | `hero_variant=activation` 且 `current_step=activation` |
| Activation | `ai_request_sent` | 去重安裝實例 | 報告名稱固定為 AI 使用意圖 |
| Purchase | `paywall_opened` | 去重安裝實例 | 另列 entry point |
| Purchase | `paywall_purchase_started` | 去重安裝實例 | 不以 plan selected 代替 |
| Purchase | `subscription_purchased` | 去重安裝實例 | Client StoreKit 完成事件，非 ASC 最終狀態 |

### 6.3 GA4 檢查規則

- 主要漏斗的 `users` 是 GA4 `activeUsers`，可稱去重安裝實例。
- `current_step_breakdown` 與 `purchase_results` 是 `eventCount`，只能稱事件次數。
- `activation_main_funnel` 是 closed sequential funnel；中間步驟是隱含前置條件，不可拿非相鄰步驟直接當一般母體轉換率。
- 使用 `first_open_to_keyboard_session_funnel` 與 `onboarding_completed_to_ai_request_funnel` 讀取兩個獨立診斷閘門。
- 加入週與完整觀察視窗都不是精確 enrollment cohort，報告標題必須包含「GA4 視窗」。

## 7. 後端帳號層查詢規格

### 7.1 必要資料集

建立唯讀資料集，至少包含：

- `auth.users.id`
- `auth.users.created_at`
- `daily_user_ai_usage.user_id`
- `daily_user_ai_usage.usage_date`
- `daily_user_ai_usage.request_count`
- `subscriptions.user_id`
- `subscriptions.status`
- `subscriptions.product_id`
- `subscriptions.source_of_truth_updated_at`
- `subscriptions.expires_at`
- `subscriptions.will_auto_renew`

若目前查詢介面不能安全取得 `auth.users`，停止後端 cohort 分析並回報 blocker；不可用「期間內有 AI 使用的人」代替註冊 cohort。

### 7.2 Cohort 計算程序

對改版前及改版後各執行一次：

1. 以 `auth.users.created_at` 選出註冊帳號。
2. 排除已知開發者與測試帳號，保留排除名單及原因。
3. 對每個帳號建立從註冊日 D0 至註冊日後第 7 日的觀察窗；因資料只有日粒度，這包含 D0～D7 八個日曆日期。
4. 在觀察窗內加總 `daily_user_ai_usage.request_count`。
5. 計算 `request_count > 0` 的不同 `usage_date` 數量。
6. 累計次數至少 1，標為達成 AI 價值交付代理。
7. 不同使用日至少 2 且累計次數至少 3，標為訂閱合格代理帳號。
8. 取得每個帳號最新的 subscription source-of-truth 狀態。
9. 計算觀察窗內成為訂閱者及在分析日仍有效的帳號；兩者分開報告。

### 7.3 參考查詢邏輯

下列為分析邏輯，不應直接在未知 schema 或 production console 未審閱地執行：

```sql
with cohort as (
  select
    id as user_id,
    created_at,
    (created_at at time zone 'Asia/Taipei')::date as signup_date
  from auth.users
  where (created_at at time zone 'Asia/Taipei')::date between :cohort_from and :cohort_to
), usage_7d as (
  select
    c.user_id,
    coalesce(sum(u.request_count), 0) as successful_results,
    count(distinct u.usage_date) filter (where u.request_count > 0) as active_days
  from cohort c
  left join daily_user_ai_usage u
    on u.user_id = c.user_id
   and u.usage_date between c.signup_date and c.signup_date + 7
  group by c.user_id
), latest_subscription as (
  select distinct on (s.user_id)
    s.user_id,
    s.status,
    s.product_id,
    s.source_of_truth_updated_at,
    s.expires_at,
    s.will_auto_renew
  from subscriptions s
  join cohort c on c.user_id = s.user_id
  order by s.user_id, s.source_of_truth_updated_at desc
)
select
  count(*) as registered_accounts,
  count(*) filter (where u.successful_results >= 1) as value_delivery_proxy_accounts,
  count(*) filter (where u.active_days >= 2 and u.successful_results >= 3) as qualified_proxy_accounts,
  count(*) filter (where ls.status = 'active') as active_paid_accounts
from cohort c
join usage_7d u on u.user_id = c.user_id
left join latest_subscription ls on ls.user_id = c.user_id;
```

執行前必須核對實際 `subscriptions.status` 值及「有效」的 source-of-truth 判斷，不可直接假設只有字串 `active`。

### 7.4 後端必填結果

| 指標 | 改版前人數 | 改版前比例 | 改版後人數 | 改版後比例 |
| --- | ---: | ---: | ---: | ---: |
| 註冊帳號 |  | 100% |  | 100% |
| AI 價值交付代理帳號 |  |  |  |  |
| 訂閱合格代理帳號 |  |  |  |  |
| 觀察窗內開始訂閱帳號 |  |  |  |  |
| 分析日仍有效付費帳號 |  |  |  |  |

每個比例的分母固定為該 cohort 註冊帳號。另附：

- 成功結果次數的中位數、P75、最大值。
- 成功使用日數的中位數、P75、最大值。
- 訂閱合格代理帳號依功能／模板分類；若後端沒有分類欄位，標示 unavailable，不以 GA4 `prompt_type` 拼接。

## 8. App Store Connect 查詢清單

查詢至少涵蓋：

- 2026-08-05～2026-08-18
- 2026-08-19～2026-09-01

記錄：

- App Store 首次下載
- 新增訂閱
- 有效標準價格訂閱
- 免費試用中的訂閱
- 取消／未續訂狀態，若報表可得
- proceeds
- ASC processing／coverage date

ASC 是聚合結果，不能歸因到 GA4 安裝或後端帳號。若 ASC coverage 尚未包含 09-01，報告標示 provisional 並在資料成熟後重跑。

## 9. 結果填寫模板

### 9.1 GA4 視窗摘要

| 指標 | 08-05～08-11 | 08-19～08-25 | 方向 | 備註 |
| --- | ---: | ---: | --- | --- |
| First open |  |  |  |  |
| Tutorial started | N/A |  |  | 改版後描述值 |
| Tutorial completed | N/A |  |  | 改版後描述值 |
| Onboarding completed |  |  |  |  |
| AI 使用意圖 |  |  |  | `ai_request_sent` |
| Paywall opened |  |  |  |  |
| StoreKit 購買完成 |  |  |  | Client event |

### 9.2 ASC 摘要

| 指標 | 改版前觀察窗 | 改版後觀察窗 | 方向 | Coverage |
| --- | ---: | ---: | --- | --- |
| 首次下載 |  |  |  |  |
| 新增訂閱 |  |  |  |  |
| 有效訂閱 |  |  |  |  |
| 取消／未續訂 |  |  |  |  |
| Proceeds |  |  |  |  |

## 10. 判讀順序

按照下列順序停止在第一個有證據的斷點，不同時啟動多項產品變更：

1. **Tutorial 完成偏低**：下一步研究 Tutorial 內容、節奏與跳出位置。
2. **Tutorial 可完成，但 onboarding／鍵盤啟用沒有方向性改善**：下一步研究 Tutorial 到設定流程的交接。
3. **Onboarding 改善，但 AI 使用意圖或 AI 價值交付代理沒有改善**：下一步原型化真實鍵盤首次 AI 體驗橋接。
4. **AI 價值交付代理改善，但訂閱合格代理帳號沒有改善**：下一步研究跨日重複價值、情境內容與回訪入口。
5. **訂閱合格代理帳號改善，但 paywall／有效付費沒有改善**：下一步才測試首次體驗額度、付費牆時機、免費試用或方案包裝。
6. **有效付費增加且續訂維持**：維持目前產品機制，優先擴大具有 AI 意圖的自然流量。

若三條資料線方向不一致，不做商業化變更；先記錄矛盾並釐清資料定義或樣本差異。

## 11. 小樣本報告規則

- 每個比例旁必須列出分子／分母，例如 `2/9（22.2%）`。
- cohort 少於 20 個註冊帳號時，結論只能寫「方向性訊號」，不能寫「改善」或「惡化已成立」。
- 不以單一百分點差異決策；同時檢查絕對人數、資料完整性及三條資料線方向。
- 不設定任意成功門檻，不做統計顯著性承諾。
- 保留原始回應、查詢時間、排除名單與計算工作表，讓下一次可以重跑。

## 12. 完成條件

只有同時滿足以下條件，才可關閉「評估 8 月 19 日 AI 啟用 cohort」：

- [ ] 四個 GA4 視窗已查詢並保存原始結果。
- [ ] 兩個後端註冊 cohort 已逐帳號追蹤完整 7 天。
- [ ] ASC coverage 已涵蓋改版後觀察期，或結果清楚標為 provisional。
- [ ] 所有數字同時列出人數、比例、身份粒度與資料期間。
- [ ] 所有代理指標使用正式名稱，沒有誇大為回填或價值達成。
- [ ] 已依判讀順序選出第一個有證據的斷點，或明確記錄因樣本／資料不足而不能決策。
- [ ] 結論只提出下一個決策方向，沒有同時批准多項產品改動。

## Sources

[1] [選定 9 月 cohort 的量測契約](../tickets/09-choose-september-cohort-measurement-contract.md) — 已確認的身份、代理與日期規則

[2] [稽核 AI 價值時刻的追蹤能力](../tickets/08-audit-ai-value-measurement-contract.md) — GA4、後端與 App 事件限制

[3] [`admin-subscription-analytics.ts`](../../../../keyly-backend/src/routes/admin-subscription-analytics.ts) — 現有 GA4 closed funnel、日期參數與事件定義

[4] [`SubscriptionAnalytics.tsx`](../../../../keyly-admin-dashboard/src/components/SubscriptionAnalytics.tsx) — Admin Dashboard 漏斗呈現與資料警告

[5] [`daily-user-ai-usage.ts`](../../../../keyly-backend/src/lib/daily-user-ai-usage.ts) — 後端 AI 成功使用的每日帳號資料

[6] [`CONTEXT.md`](../../../CONTEXT.md) — Keyly Growth 正式量測詞彙
