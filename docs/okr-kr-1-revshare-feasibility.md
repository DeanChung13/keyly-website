# KR-1｜iOS 分潤軌道可行性

建立日期：2026-08-19
上位文件：[Keyly 目標拆解（OKR）](okr.md) → KR-1
相關：[創作者貼文 CTR 最小實驗](okr-kr-1-creator-ctr-experiment.md)、[KR-3 啟用：首次啟動 Tutorial](okr-kr-3-activation-tutorial.md)（邀請機制規劃）

---

## O｜判定「創作者純分潤」在零現金限制下能不能實際執行

「零現金支出」不等於「不能付錢買流量」，只是**不能預付**。純分潤把獲客從固定成本變成變動成本，這個結構判斷成立。本文查的是它能不能落地。

---

## 結論（先講）

| 問題 | 答案 |
|---|---|
| Apple 有原生分潤機制嗎 | ❌ **沒有**。App 佣金已於 2018-10-01 終止 |
| 能用 Campaign Link 算分潤嗎 | ❌ **不能**。需 ≥ 5 次 attributed App Units 才顯示，全站首次下載僅 16 次／月 |
| 有可行做法嗎 | ✅ **有**。每位創作者一組專屬 custom offer code，月結手動撥款 |
| 有規則風險嗎 | ⚠️ **有，但不在分潤上**。Guideline 3.2.2 會卡住既有的「邀請機制」規劃，見 §2 |

---

## 1. Apple 沒有原生分潤軌道（已查證）

App Store Affiliate Program 對 **iOS 與 Mac App 及 App 內購的佣金於 2018-10-01 終止**；音樂、影片、書籍、電視節目保留在該計畫內。此前佣金已於 2017-04 由 7% 調降至 2.5%。

**目前沒有任何官方的 App 分潤機制。** 要做分潤，只能自建歸因與撥款，或使用第三方服務。

---

## 2. Guideline 3.2.2：不得獎勵「被邀請者」（已查證）

App Review Guidelines 的實務判例是：

- 獎勵**分享者**（點數、數位內容）——可以
- 獎勵**收到邀請的人**（因下載或註冊而獲得好處）——**會被拒**

理由是這直接影響 App Store 的評論與排行榜。

**這條不影響創作者分潤**（創作者是被付錢的一方，不是被邀請的使用者），但**直接影響 [KR-3 Tutorial 文件 §227](okr-kr-3-activation-tutorial.md) 已規劃的邀請機制**——「邀請朋友獲得免費次數」若同時獎勵被邀請的一方，設計本身就違規。

> **建議工作（未執行，等你決定）**：邀請機制定案前確認獎勵只給邀請者。這一項不阻擋本文結論。

---

## 3. Offer Code 額度遠超需求（已查證）

| 限制 | 值 |
|---|---|
| 每 App 每季兌換上限 | 100 萬次 |
| 每個訂閱 SKU 同時有效的 offer | 最多 10 個 |
| 一次性代碼有效期 | 建立後最長 6 個月 |

原提案的「50 組 Pro 序號」完全在範圍內，且 custom code 與 one-time-use code 共用同一組季度額度。

---

## 4. 為什麼不能用 Campaign Link 歸因

Apple Campaign Link 提供的是 attributed downloads、sales 與 usage，**且需至少 5 次 attributed App Units 才顯示資料**（依 [競品獲客來源研究 §5.1](okr-kr-a-competitor-channels.md) 引用的 Apple 官方定義）。

Keyly 全站首次下載為 **16 次／月**（2026-07-17～08-09，未經二次查證）。單一創作者的 campaign 幾乎不可能跨過 5 次門檻。

**歸因不出來，就算不出該付多少分潤。** 在目前量級下，Campaign Link 只能用來看「這個管道整體有沒有動靜」，不能用來結帳。

---

## 5. 可行做法：每位創作者一組專屬 custom offer code

兌換數按代碼分別回報，歸因精確到個位數，**原生、免費、不需 SDK，量級再小都能運作**。月結時依兌換數手動撥款。

兩個代價，都要接受：

1. **Offer code 本身是折扣**，會先讓渡一部分收入，實際分潤基數低於全價
2. **撥款是人工作業**。以目前每月個位數訂閱來說完全可負擔；量級上來後需重新設計

---

## 6. 第三方方案：未查證，且很可能撞上零現金限制

Appfiliate（創作者歸因 SDK）、Reef Referral（訂閱 App 推薦系統）、RevenueCat promotional entitlements 皆存在且宣稱支援此情境，**但本文未查證其定價**。若收費即違反零現金硬限制。

在 §5 的自建 offer code 方案已足夠的情況下，不建議先往這個方向查。

---

## 7. 未驗證與限制

- 首次下載 16 次／月來自 App Store Connect，經 Gemini 於 2026-08-18 取數，本專案未二次查證。
- Guideline 3.2.2 的判定來自開發者論壇案例與第三方整理，**非 Apple 官方逐字條文**。邀請機制定案前應直接讀 Apple 原文確認。
- 未查證：創作者是否願意在無保底費的純分潤條件下推廣小眾工具。這是 [CTR 實驗](okr-kr-1-creator-ctr-experiment.md)之後才需要回答的問題。
- 未查證第三方分潤服務的定價與 Apple 合規性。

---

## 來源

- [TechCrunch — Apple is ending its App Store Affiliate Program in October](https://techcrunch.com/2018/08/01/apple-is-ending-its-app-store-affiliate-program-in-october/)
- [AppleInsider — Apple to end App Store Affiliate Program in October](https://appleinsider.com/articles/18/08/01/apple-to-remove-apps-from-itunes-affiliate-program-in-october)
- [Apple — App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [RevenueCat — How to build a referral program for your app](https://www.revenuecat.com/blog/growth/how-to-build-a-referral-program-for-mobile-apps)
- [App Store Connect Help — Set up subscription offer codes](https://developer.apple.com/help/app-store-connect/manage-subscriptions/set-up-subscription-offer-codes)
