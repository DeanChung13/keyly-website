# KR-1 曝光：三個未評估零成本管道的量級判定

建立日期：2026-08-17
上位文件：[Keyly 目標拆解（OKR）](okr.md) → KR-1
起因：KR-1 需要曝光從 1,436／月 推到 186,000／月（**130 倍**）。既有四個管道（ASO 關鍵字、SEO、Threads、台灣媒體）加總不到 5 倍。本文評估僅存的三個候選。

---

## O｜判定這三個管道各能把曝光推幾倍，並指出哪一個值得佔用 09-15 前的開發時間

**判定標準**（沿用 [okr.md](okr.md) 判定規則 4）：一個管道若無法回答「能把曝光乘幾倍」，就不能列入 KR-1。**「有機會」「值得試試」不構成量級。**

---

## 結論（先講）

| 管道 | 能推幾倍 | 判定 |
|---|---|---|
| **產品內分享循環** | **上限 < 2 倍** | ❌ **數學上不可能達成 130 倍。** 它是乘數，不是來源 |
| **App Store 分類排名** | **不適用** | ❌ **因果方向相反。** 排名是下載量的結果，不是來源 |
| **Apple Featuring Nomination** | **10–100 倍（若成立）／ 0（若不成立）** | ⚠️ **唯一有正確量級者**，但有一個未實測的技術阻塞條件 |

**KR-1 只剩一條路，而且那條路有一道尚未通過的技術驗證關卡。** 這個結論應直接進入 11-15 總停損的判斷。

---

## 1. 產品內分享循環

### 為什麼原本被寄予厚望

鍵盤天然在別人的對話框裡運作，是唯一有機會自我複利的零成本機制。`okr-kr-a-competitor-channels.md:79,199` 記錄過「競品是否有產品內分享機制」為未驗證。

### 判定：數學上不可能

分享循環的總量是等比級數：

```
總使用者 = 基數 × 1/(1 − k)      k = 每位使用者平均帶來的新使用者
```

`1/(1−k)` 的上界完全由 k 決定：

| k | 放大倍數 |
|---:|---:|
| 0.3 | 1.43 倍 |
| 0.5 | 2 倍 |
| 0.8 | 5 倍 |
| 0.9 | 10 倍 |
| **0.992** | **130 倍** |

**要達到 130 倍需要 k > 0.99**——即平均每位使用者都要再帶進一位使用者。沒有任何產品長期維持這種係數，而 Keyly 目前 D7 留存 2.2%、40% 註冊者從未使用過產品。

**現實的樂觀值 k ≈ 0.3–0.5，對應 1.4–2 倍。**

### 這不代表不該做

**它是乘數，不是來源。** 若 Featuring 成功把曝光推上去，分享循環會讓那波流量多留下 40–100%。**但它自己啟動不了任何東西**，因為 `基數 × 1/(1−k)` 的基數目前是 26 次下載／月。

**建議**：不列入 KR-1 的達成路徑，改列為 Featuring 成功後的放大器。**不佔用 09-15 前的開發時間。**

---

## 2. App Store 分類排名

### 事實

Keyly 的分類（iTunes Lookup API，`country=tw`，2026-08-17 查詢）：

| 欄位 | 值 |
|---|---|
| 主要分類 | **Utilities（工具程式，genreId 6002）** |
| 次要分類 | **Productivity（生產力工具，genreId 6007）** |
| 版本 | 1.1.1（2026-08-15） |
| 評分 | 5.0（4 則） |

兩個都是 App Store 最擁擠的分類。

### 判定：因果方向相反

**排行榜是下載量的函數，不是下載量的來源。** 進榜需要短期內大量下載；Keyly 目前 26 次／月。以榜單作為獲取下載的手段，等於用結果去產生它自己的原因。

分類本身另有一個**確實有效但量級不同**的作用——Apple 官方明文：

> "Your primary category and optional secondary category are indexed by our search algorithm."
> —— https://developer.apple.com/app-store/search/

**分類是搜尋索引欄位**，這一點值得處理（已列為 [SUGGESTIONS 第 4 項](SUGGESTIONS.md)），但它屬於 ASO 的量級（< 2 倍），不是 130 倍的來源。

**建議**：從 KR-1 的候選中移除。分類調整改歸入 ASO Round 2，且受 09-05 前的 metadata 凍結限制。

---

## 3. Apple Featuring Nomination

**唯一有正確量級的管道。** 本節是全文重點。

### 3.1 提名機制（已查證）

| 項目 | 內容 | 來源 |
|---|---|---|
| 提交方式 | App Store Connect → Featuring Nominations 儀表板；亦可 CSV 批次或 API | [manage-featuring-nominations](https://developer.apple.com/help/app-store-connect/manage-featuring-nominations/nominate-your-app-for-featuring/) |
| **最短前置期** | **2–3 週** | [getting-featured](https://developer.apple.com/app-store/getting-featured/) |
| 較大規模 featuring | 建議提前 **最多 3 個月** | 同上 |
| Story 類型 | 約 **8 週** | 同上 |
| 提名類別 | New Content／**App Enhancements**／App Launch | [nominations-template](https://developer.apple.com/help/app-store-connect/reference/nominations/nominations-template/) |

> **更正前次記載**：`okr.md` 曾寫「我記得是 6–8 週，未查證」。**實際最短為 2–3 週**，8 週是 story 類型。09-15 提交 → **最快 10 月初可能落地**，比先前推估樂觀。
>
> 但「最多 3 個月」的較大規模 featuring 窗口，以年底為期限**已經來不及**。

Keyly 適用的類別是 **App Enhancements**（重大功能更新）。

### 3.2 Apple 目前的技術主線（WWDC 2026，2026-06-09）

**本節全部為查證所得。撰寫本文的助理知識截止於 2026-05，對 WWDC 2026 之後的內容無既有認知。**

| 主線 | 內容 | 與 Keyly 的關聯 |
|---|---|---|
| **次世代 Apple Foundation Models** | 與 Google Gemini 合作的新架構，可理解影像、世界知識、裝置上資料與螢幕內容 | **高** |
| Siri 重新設計 | 更對話化；**不再把查詢轉交第三方 AI（如 ChatGPT）** | 中（顯示 Apple 正在收回 AI 入口） |
| 兒少保護／年齡 API | 開放第三方 App 使用 | 無 |
| Wallet 的 Visual Intelligence | 掃描實體卡片轉為數位票證 | 無 |
| **iOS 27 鍵盤更新** | 新增十餘種鍵盤語言（**無中文相關**）；**Advanced Dictation Preview**：裝置端 LLM 轉錄，自動標點與格式化，完全離線 | **中，且部分為威脅** |

來源：[TechCrunch WWDC 2026 總整理](https://techcrunch.com/2026/06/09/wwdc-2026-everything-announced-on-siri-ai-os-27-apple-intelligence-and-more/)、[9to5Mac iOS 27 鍵盤](https://9to5mac.com/2026/06/12/ios-27-brings-new-keyboards-and-typing-improvements-across-multiple-languages/)

### 3.3 候選鉤子：Foundation Models × 繁體中文

**Foundation Models framework**（自 iOS 26 起開放，[Apple Newsroom](https://www.apple.com/newsroom/2025/09/apples-foundation-models-framework-unlocks-new-intelligent-app-experiences/)）讓開發者直接呼叫 Apple Intelligence 的裝置端 LLM，**免費、離線、不傳出裝置**。

**繁體中文支援已具備**：Apple Intelligence 已擴展至繁體中文（[Apple Newsroom, 2025-11](https://www.apple.com/hk/en/newsroom/2025/11/apple-intelligence-expands-to-new-languages-including-traditional-chinese/)），台灣購買的裝置可使用。

**鉤子敘事**：*Keyly 是第一款以 Apple 裝置端 Foundation Models 進行繁體中文改寫的注音輸入法——AI 不離開裝置，鍵盤擁有完全取用權限卻不上傳任何輸入內容。*

這同時對上 Apple 三件正在推的事：裝置端智慧、隱私、繁中市場擴張。**符合「與 Apple 即將推出的技術相輔相成」的判準。**

**附帶的商業效果**：目前 50 次免費額度的存在，是因為雲端 AI 有推論成本。改用裝置端模型後該成本歸零。**但這也同時瓦解了現有的付費理由**——需要重新設計要賣什麼（例如雲端模型的更高品質、跨裝置同步、進階範本）。**此議題超出本文範圍，但不得忽略。**

### 3.4 阻塞條件：鍵盤擴充內的 rate limit（**未實測，最高風險**）

Apple 開發者論壇有一則明確回報：

> "Overly strict foundation model rate limit when used in app extension" —— 在 app extension（如 Safari Web Extension）中使用 Foundation Models 時，rate limiting 使其**無法用於回應使用者輸入**。裝置接電時不會觸發限制；**電池供電且行程在背景執行時**會觸發。
> —— https://developer.apple.com/forums/thread/789788

**這對鍵盤擴充是致命問題**：鍵盤永遠在電池供電下使用，且系統對鍵盤擴充的行程狀態認定未知。

**兩項有利因素**：

- 記憶體不是阻礙。Apple 說明模型與推論資源由作業系統集中管理、跨 Apple Intelligence 功能共用，**App 自身記憶體增幅極小**。這對記憶體上限嚴苛的鍵盤擴充是好消息（Keyly 目前因此不在擴充內 import Firebase）。
- 上下文窗口 4,096 tokens，iOS 26.4 新增 `contextSize` 供追蹤。改寫單句的用量遠低於此。

**必須實測**：在真機、電池供電、鍵盤擴充內連續呼叫 `LanguageModelSession`，量測是否觸發 rate limit、以及延遲是否可接受。**這一項不通過，整個鉤子不成立，KR-1 歸零。**

### 3.5 同時存在的威脅

同一條技術主線對 Keyly 是雙面的：

| 威脅 | 說明 |
|---|---|
| Apple 自家 Writing Tools 已支援繁中改寫 | 使用者可免費取得基本改寫，Keyly 的差異必須在「輸入法品質 + 鍵盤內免切換」，不能只在「有 AI」 |
| iOS 27 Advanced Dictation | 裝置端 LLM 轉錄含自動標點格式化，離線 —— 侵蝕「AI 幫你把話寫好」這塊 |
| Siri 不再轉交第三方 AI | 顯示 Apple 正在收回 AI 入口，長期對第三方 AI 工具不利 |

`seo/content-brief-apple-intelligence-vs-ai-keyboard.md` 已經在處理這個對比，但那是行銷角度，不是產品角度。

### 3.6 量級與時程

| 項目 | 判定 |
|---|---|
| 能推幾倍 | **10–100 倍（若獲選）／ 0（若未獲選）**。無中間值 |
| 可控性 | **低**。Apple 決定 |
| 成本 | **在產品端**，不在提名端。需先做出 Foundation Models 整合 |
| 最快落地 | 09-15 提交 → **10 月初**（最短前置 2–3 週） |
| 年底前可行性 | 存在，但需 9 月完成整合、提名獲選、且 10–12 月三個月內累積 998 位訂閱 |

---

## 4. 待辦（依序）

1. **實測 Foundation Models 在鍵盤擴充內的 rate limit**（§3.4）。真機、電池供電、連續呼叫。**這是整個 KR-1 的閘門，最高優先。**
2. 若通過 → 09-15 前完成裝置端改寫整合，以 **App Enhancements** 類別提交 Featuring Nomination
3. 若不通過 → **KR-1 沒有任何有量級的路徑**，直接進入 [okr.md](okr.md) 的總停損程序，不必等 11-15
4. 分享循環與分類排名**移出 KR-1**：前者改列 Featuring 成功後的放大器，後者併入 ASO Round 2
5. 另案處理：裝置端 AI 若成本歸零，付費理由需重新設計（§3.3）

---

## 5. 未驗證與限制

| 項目 | 狀態 |
|---|---|
| **Foundation Models 在鍵盤擴充內可用性** | **未實測。全文最關鍵的未知。** 論壇回報針對 Safari Web Extension，鍵盤擴充是否適用同一限制未知 |
| 裝置端模型的繁中改寫品質 | **未實測**。是否足以取代現有雲端 AI 未知 |
| Apple 是否偏好此類鉤子 | **推論**。依「與 Apple 技術相輔相成」的判準推導，無 Keyly 實測，亦無同類 App 案例 |
| 分享循環的 k 值 | **無實測**。§1 的 0.3–0.5 為一般產品經驗值，非 Keyly 資料 |
| WWDC 2026 內容 | 取自二手科技媒體（TechCrunch、9to5Mac），**未逐項比對 Apple 官方發佈** |
| 「最短前置 2–3 週」 | 取自搜尋摘要引述的 Apple 官方頁面，**未逐字核對原文** |
| Apple Intelligence 繁中的實際涵蓋範圍 | 已確認支援，但**哪些功能、台灣是否全部可用未逐項確認** |
| 分類排名的實際曝光貢獻 | 未量化。§2 的判定基於因果方向，非數值估算 |
