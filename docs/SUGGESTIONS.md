# 建議清單

做事過程中發現、但**未經批准不執行**的項目。往下追加，不改舊項目。

格式：日期 ／ 一句話描述 ／ 發現位置 ／ 為什麼值得做。

---

## 2026-08-17

### 1. 撰寫 `docs/okr-kr-1-exposure-130x.md`，評估三個從未評估的高天花板零成本管道

**發現位置**：[okr.md](okr.md) KR-1 前置（期限 2026-08-24）、[OKR 診斷 §零成本管道的量級](okr-diagnosis-2026-08-17.md)

**為什麼值得做**：KR-1 需要曝光成長 79–130 倍。全 `docs/` 30 餘份文件服務的四個管道（ASO、SEO、Threads、媒體）加總不到 5 倍。唯一有正確量級的三條路，恰好是唯一三條從未被寫過的路：

| 管道 | 全 docs 出現次數 |
|---|---|
| Apple Featuring Nomination | 1 次（`okr-kr-a-aso-round-2.md:33`，寫「需各自獨立評估」後無下文） |
| 產品內分享循環 | 2 次（`okr-kr-a-competitor-channels.md:79,199`，皆為「競品是否有」） |
| App Store 分類排名 | 0 次 |

不寫等於放棄三個候選中的兩個，KR-1 只剩不受開發者控制的 Apple Featuring。**這是一個決定，不是預設值。**

**狀態**：已列為 KR-1 前置，期限 2026-08-24，尚未批准撰寫。

---

### 2. 重新評估「暫緩外部推廣」的決定

**發現位置**：[`seo/2026-08-11-earned-media-opportunities.md`](seo/2026-08-11-earned-media-opportunities.md)、[`seo/2026-08-11-next-task-prioritization.md:5`](seo/2026-08-11-next-task-prioritization.md)

**為什麼值得做**：該決定訂於 2026-08-11，**早於** 08-15/16 才產出的漏斗數據——與零成本硬限制是同一天、同一份文件、同樣依當時假設所做的判斷。零成本限制已於 08-17 在看過算式後重新確認並維持；「暫緩外部推廣」則**尚未經過同樣的重新檢視**。

該文件已列出具體對象（塔科女子等台灣科技媒體），且 `okr-kr-a-competitor-channels.md` 已證實瘋先生刊登過同類 AI 鍵盤的編輯評測（2024-02-20，非業配，含 App Store 連結）。

**注意**：即使重啟，媒體投稿的量級仍屬「單篇導流未知」，不足以達成 KR-1 的 130 倍。應以管道學習定位，不得列為 KR-1 的解方。

---

### 3. 查證「Apple App Store 不索引 description」

**發現位置**：[`okr-kr-a-aso-round-2.md` 凍結範圍收窄區塊](okr-kr-a-aso-round-2.md)

**為什麼值得做**：這條假設**正在承載一個已生效的決定**——它是把 metadata 凍結範圍從「全部欄位」收窄到「只凍結名稱／副標題／關鍵字」的唯一依據，而該收窄直接讓 KR-2 得以在 09-05 Round 1 Review 之前修改 description。

目前的依據等級是「業界公認的 ASO 行為」，本 repo **尚未以 Apple 第一手文件驗證**。依 CLAUDE.md 的查證原則，承載決定的陳述必須指得到來源。

若查證推翻此點：KR-2 的 description 項需退出、等 Round 1 Review 之後再做；截圖、預覽影片、圖示三項不受影響（這三項本來就不進入搜尋索引）。

**查證方向**：Apple 官方 App Store Connect 說明中關於搜尋與 metadata 欄位的段落。
