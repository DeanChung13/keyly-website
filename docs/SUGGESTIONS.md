# 建議清單

做事過程中發現、但**未經批准不執行**的項目。往下追加，不改舊項目。

格式：日期 ／ 一句話描述 ／ 發現位置 ／ 為什麼值得做。

---

## 2026-08-17

### 1. 撰寫 `docs/okr-kr-1-exposure-130x.md`，評估三個從未評估的高天花板零成本管道

> **狀態：2026-08-17 已批准並完成。** 產出：[`okr-kr-1-exposure-130x.md`](okr-kr-1-exposure-130x.md)
>
> **結論：三個候選只剩一個。**
>
> - **產品內分享循環** → 排除。`基數 × 1/(1−k)` 要達 130 倍需 k > 0.99；現實 k ≈ 0.3–0.5 只有 1.4–2 倍。是乘數不是來源
> - **App Store 分類排名** → 排除。榜單是下載量的結果，不是來源，因果方向相反
> - **Apple Featuring Nomination** → 唯一有量級。鉤子已找到（裝置端 Foundation Models × 繁體中文），但有一道未實測的阻塞條件：Foundation Models 在 app extension 內的 rate limit
>
> **衍生的新最高優先項**：實測鍵盤擴充內的 rate limit（08-24）。不通過則 KR-1 歸零，直接進總停損。

**發現位置**：[okr.md](okr.md) KR-1 前置（期限 2026-08-24）、[OKR 診斷 §零成本管道的量級](okr-diagnosis-2026-08-17.md)

**為什麼值得做**：KR-1 需要曝光成長 79–130 倍。全 `docs/` 30 餘份文件服務的四個管道（ASO、SEO、Threads、媒體）加總不到 5 倍。唯一有正確量級的三條路，恰好是唯一三條從未被寫過的路：

| 管道 | 全 docs 出現次數 |
|---|---|
| Apple Featuring Nomination | 1 次（`okr-kr-a-aso-round-2.md:33`，寫「需各自獨立評估」後無下文） |
| 產品內分享循環 | 2 次（`okr-kr-a-competitor-channels.md:79,199`，皆為「競品是否有」） |
| App Store 分類排名 | 0 次 |

不寫等於放棄三個候選中的兩個，KR-1 只剩不受開發者控制的 Apple Featuring。**這是一個決定，不是預設值。**

> **2026-08-17 補充：Featuring 一節的性質已改變。**
>
> 開發者指出：**Apple 推薦通常給「與 Apple 即將推出的技術或產品相輔相成」的 App 功能。** 不是送出表單就進抽獎池。
>
> 因此這份研究的 Featuring 一節**必須先回答「Keyly 能對上哪一個 Apple 技術主線」**，否則提名不成立、整個 KR-1 沒有支點。候選方向：Apple Intelligence 的中文能力、裝置端處理與隱私、繁中在地化、當年度 iOS 新版的輸入法相關 API。
>
> **查證要求**：撰寫此節的助理知識截止於 2026-05，**WWDC 2026（6 月）之後 Apple 發表的內容一概不知**。此節必須全部以第一手來源查證，不得沿用助理的既有印象。

**狀態**：已列為 KR-1 前置，期限 2026-08-24，尚未批准撰寫。

---

### 2. 重新評估「暫緩外部推廣」的決定

**發現位置**：[`seo/2026-08-11-earned-media-opportunities.md`](seo/2026-08-11-earned-media-opportunities.md)、[`seo/2026-08-11-next-task-prioritization.md:5`](seo/2026-08-11-next-task-prioritization.md)

**為什麼值得做**：該決定訂於 2026-08-11，**早於** 08-15/16 才產出的漏斗數據——與零成本硬限制是同一天、同一份文件、同樣依當時假設所做的判斷。零成本限制已於 08-17 在看過算式後重新確認並維持；「暫緩外部推廣」則**尚未經過同樣的重新檢視**。

該文件已列出具體對象（塔科女子等台灣科技媒體），且 `okr-kr-a-competitor-channels.md` 已證實瘋先生刊登過同類 AI 鍵盤的編輯評測（2024-02-20，非業配，含 App Store 連結）。

**注意**：即使重啟，媒體投稿的量級仍屬「單篇導流未知」，不足以達成 KR-1 的 130 倍。應以管道學習定位，不得列為 KR-1 的解方。

---

### 3. 查證「Apple App Store 不索引 description」

> **狀態：2026-08-17 已查證結案。**
>
> 結果：Apple 明列索引欄位為 **title / subtitle / keywords / primary category**（另明文說主要與次要分類都被索引），description 不在其中；但**從未明文說 description 不被索引**——屬間接證據。
>
> **據此的決定**：不接受殘餘風險。description 改回凍結至 09-05 Round 1 Review 之後（09-06 再改），截圖／圖示／影片照原訂日期。已寫入 `okr.md` KR-2 與 `okr-kr-a-aso-round-2.md`。

**發現位置**：[`okr-kr-a-aso-round-2.md` 凍結範圍收窄區塊](okr-kr-a-aso-round-2.md)

**為什麼值得做**：這條假設**正在承載一個已生效的決定**——它是把 metadata 凍結範圍從「全部欄位」收窄到「只凍結名稱／副標題／關鍵字」的唯一依據，而該收窄直接讓 KR-2 得以在 09-05 Round 1 Review 之前修改 description。

目前的依據等級是「業界公認的 ASO 行為」，本 repo **尚未以 Apple 第一手文件驗證**。依 CLAUDE.md 的查證原則，承載決定的陳述必須指得到來源。

若查證推翻此點：KR-2 的 description 項需退出、等 Round 1 Review 之後再做；截圖、預覽影片、圖示三項不受影響（這三項本來就不進入搜尋索引）。

**查證方向**：Apple 官方 App Store Connect 說明中關於搜尋與 metadata 欄位的段落。

---

### 4. 評估 App Store 主要／次要分類的選擇

**發現位置**：2026-08-17 查證 Apple 官方文件時順帶發現（[developer.apple.com/app-store/search](https://developer.apple.com/app-store/search/)）

**為什麼值得做**：Apple 明文寫

> "Your primary category and optional secondary category are indexed by our search algorithm."

**分類是進搜尋索引的欄位，而全部 30 餘份 `docs/` 從未討論過 Keyly 的分類選擇。** ASO 的注意力全部集中在名稱、副標題、關鍵字三個欄位上，漏掉了第四個。

分類同時影響「App Store 瀏覽」的曝光來源（目前佔 6.1%），以及分類排行榜的進榜可能——後者是 [SUGGESTIONS 第 1 項](#1-撰寫-docsokr-kr-1-exposure-130xmd評估三個從未評估的高天花板零成本管道) 中三個未評估管道之一。

**注意**：分類已比照關鍵字欄位納入 09-05 前的凍結範圍（見 `okr-kr-a-aso-round-2.md`），因此本項最早也要 Round 1 Review 之後才能動。

---

### 5. 移除或接上 `openOnboardingCompletionPaywallIfNeeded()` 死碼

**發現位置**：`~/Documents/keyly` 的 `MainTabContainerView.swift:602-612`

**為什麼值得做**：該函式定義完整但**全專案沒有任何呼叫點**，`PaywallEntryPoint.homeHeroOnboardingComplete` 因此永遠不會出現在資料裡。

它目前沒造成傷害——反而該慶幸，因為它會在使用者剛拿到 50 次免費額度的同一秒彈出 paywall，正是 [§9 根因](okr-kr-b-activation.md) 要避免的行為。

**建議**：直接刪除，不要接上。若保留，未來有人「修好」它會直接惡化 3a。刪除時一併移除 `homeHeroOnboardingComplete` enum case，避免它繼續出現在 `PaywallEntryPoint` 的選項裡誤導人。
