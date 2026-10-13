# keylyapp.com SEO 稽核總報告

- 日期：2026-10-14
- 範圍：sitemap 全部 23 頁（15 篇 guide）
- 數據：線上爬取、GSC 2026-09-14～10-12、URL Inspection
- 分工：Claude（技術、On-Page、Schema、效能、圖片）／agy（內容、GEO、SXO）
- 細節：`findings/*.md`

## SEO 健康分數：70 / 100

| 類別 | 權重 | 分數 |
|---|---|---|
| Technical SEO | 22% | 78 |
| Content Quality | 23% | 68 |
| On-Page SEO | 20% | 70 |
| Schema | 10% | 60 |
| Performance | 10% | 70（估計，PSI 額度用完沒測到） |
| AI Search Readiness | 10% | 78 |
| Images | 5% | 60 |

**一句話**：技術底子好（SSR、canonical、轉址都乾淨），問題集中在**幾篇高曝光頁的內容沒回答搜尋者要的東西**。修好這幾頁，比全站大改有效得多。

## 最重要的 5 個問題

1. **請假訊息頁沒有可複製的範例**（`iphone-ai-leave-request`）。「請假訊息怎麼打」是全站單一最大查詢（204 次曝光，排名 3.8），CTR 只有 3.9%。內文完全沒有範例文字，唯一的一段範例藏在 JS 動畫的 JSON 裡，搜尋引擎不會當成內文。Claude 和 agy 各自獨立得出同一個結論。
2. **兩篇 guide 有千次曝光，CTR 卻不到 2%**（`haptics` 0.85%、`selection-fixes` 1.81%）。haptics 內文完全沒寫「打字沒聲音」；selection-fixes 沒說明「iOS 沒有自動選字開關」。修法見 `.agents/messages/20261014-001-*-response.md`。
3. **新頁 `iphone-translation-keyboard-comparison` Google 還不知道它存在**。sitemap 最後被讀取是 10-04，這頁 10-07 才上線。
4. **`iphone-double-pinyin` 從 8 月起一直「已發現、未建立索引」**，0 曝光。站內入站連結只有 3 條。
5. **sitemap lastmod 全部過期**（19／23 頁），而且是手動維護。

## 最快見效的 5 件事

1. GSC 重新提交 sitemap，並對 translation-comparison、double-pinyin 要求建立索引（5 分鐘）。
2. 在請假訊息頁補上 4 組靜態 HTML 範例（病假、事假、臨時急事、半天），標題改成以範例為主。
3. 補 5 條站內連結：zhuyin-keyboard → haptics、selection-fixes、translation-comparison；full-access → selection-fixes；custom-ai-prompt → 情境頁。
4. 更新 `llms.txt`、`llms-full.txt`，補上漏掉的 5 篇 AI 情境 guide。
5. 首頁影片：把 mp4（814 KB）的 `<source>` 放到 webm（1.1 MB）前面。

## agy 報告中我修正過的結論

agy 的主要發現大多成立，以下幾點跟證據不符，已調整嚴重度或排除：

| agy 原結論 | 調整 | 理由 |
|---|---|---|
| 作者署名為 **Critical** | → Medium | Critical 指會阻擋索引或導致懲罰的問題，匿名不會。值得做，但不是最優先。 |
| llms.txt 漏頁為 **Critical**、robots.txt 的 `LLMs:` 行為 **High** | → Low ／ Info | Google 不使用 llms.txt；非標準欄位會被忽略，但無害。 |
| 互搶排名組 C：zhuyin-keyboard 與 selection-fixes「同時爭搶 7–10 名」 | 不成立 | GSC 中兩頁的查詢幾乎沒有重疊，zhuyin-keyboard 不出現在「選字」相關查詢。 |
| 互搶排名組 A：兩篇翻譯頁 | 目前不成立 | translation-comparison 還沒被 Google 收錄，不可能互搶。收錄後再觀察。 |
| selection-fixes 開頭是情緒性問句、沒有答案段 | 部分不成立 | agy 引用的是 meta description。頁面開頭其實有「30 秒排查順序」答案區塊，只是缺「沒有自動選字開關」這句。 |
| SXO：缺 `HowTo` schema | 排除 | HowTo 複合式結果 2023 年已停止顯示。 |
| polite-refusal 標題缺「範例」 | 排除 | 標題已經有「5 種…回覆範例」。 |
| zhuyin-keyboard 比較表 min-width 760px | 修正數字，結論成立 | 實際是 1000px，而且沒有左右滑動提示，問題更明顯。行動流量占 75%（GSC 驗證）。 |
| 翻譯比較頁薄內容，擴到 2,200 字 | 保留方向，不設字數目標 | 字數不是排名因素。該補的是每款的實測差異，不是篇幅。 |
| 「44% 引用來自頁面前 30%」等數據 | 不採用 | 沒有來源。 |

## 仍需上機或補資料確認

- 靜音模式、藍牙耳機對 iPhone 鍵盤按鍵聲的實際影響，寫進 haptics 前要在目前的 iOS 上確認。
- Core Web Vitals 實測值：請看 GSC「網站使用體驗」，或設定 PSI API key 後重跑。
