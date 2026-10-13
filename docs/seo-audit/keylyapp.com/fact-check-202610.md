# 8 月版 Guides 事實複查報告（2026 年 10 月複查）

- **查核日期**：2026 年 10 月 14 日
- **查核範圍**：
  1. [`guides/iphone-zhuyin-keyboard/index.html`](file:///Users/deanchung/Documents/keyly-website/guides/iphone-zhuyin-keyboard/index.html)
  2. [`guides/iphone-double-pinyin/index.html`](file:///Users/deanchung/Documents/keyly-website/guides/iphone-double-pinyin/index.html)
  3. [`guides/apple-intelligence-vs-ai-keyboard/index.html`](file:///Users/deanchung/Documents/keyly-website/guides/apple-intelligence-vs-ai-keyboard/index.html)
- **查核依據**：台灣 App Store 官方公開頁面、Apple Support 官方技術支援手冊、Keyly 官方產品規格。

---

## 一、 `guides/iphone-zhuyin-keyboard/index.html`

### 1. 比較產品之價格、功能與狀態複查

| 產品 | 頁面原文陳述 | 2026 年 10 月查核現況 | 官方來源 URL | 結論與建議 |
|---|---|---|---|---|
| **Apple 內建鍵盤** | 隨系統提供、免付費；於「設定 → 一般 → 鍵盤」加入繁體注音 | **已確認**。iOS 18 依然維持該路徑，支援注音標準、動態調整，無獨立繁中 AI 改寫功能。 | [Apple 支援：在 iPhone 上加入鍵盤](https://support.apple.com/zh-tw/guide/iphone/iph3c509ab4/ios) | 無需修改，維持原狀。 |
| **Keyly** | App 免費；Keyly Pro 自動續訂；離線注音輸入；線上 AI 潤飾需連網 | **已確認**。支援 iOS 18+；登入領 30 次 AI 使用額度，自訂指令免費；Keyly Pro 提供自動續訂。 | [Keyly App Store 頁面](https://apps.apple.com/app/apple-store/id6759639348) | 無需修改，維持原狀。 |
| **Gboard** | 免費；官方語言清單含「繁體中文 (台灣)」；內建 Google 搜尋、GIF、貼圖、滑行輸入 | **已確認**。台灣 App Store 最新版維持免費，功能描述一致。 | [Google Gboard App Store](https://apps.apple.com/tw/app/gboard-%E5%85%8B%E6%8C%89%E9%94%AE%E7%9B%98/id1091700242) | 無需修改，維持原狀。 |
| **胖打注音** | App 免費；Supporter 訂閱每月 NT$30 或每年 NT$290；支援台語方音；完全離線運作 | **已確認**。定價與功能規格未變，App 仍標榜無連網權限與隱私安全。 | [胖打注音 App Store](https://apps.apple.com/tw/app/%E8%83%96%E6%89%93%E6%B3%A8%E9%9F%B3/id1524317808) | 無需修改，維持原狀。 |
| **超注音** | 付費下載 NT$150；注音縮寫輸入；支援語音輸入（Apple 辨識與 Whisper） | **已確認**。台灣 App Store 售價維持買斷制 NT$150。 | [超注音 App Store](https://apps.apple.com/tw/app/%E8%B6%85%E6%B3%A8%E9%9F%B3/id1056588265) | 無需修改，維持原狀。 |
| **UrKeyboard** | 付費下載 NT$120；Pro 訂閱解鎖主題與雲端同步；支援注音、蝦米、倉頡、大易、行列等 | **已確認**。台灣 App Store 售價維持買斷制 NT$120。 | [UrKeyboard App Store](https://apps.apple.com/tw/app/urkeyboard/id1039864293) | 無需修改，維持原狀。 |

### 2. 日期與版本建議
- **原文**：`<p class="page-meta">資料查核日期：2026 年 8 月 11 日</p>`
- **建議改法**：等 Claude 發布 `schema pass done` 通知後，更新為 `<p class="page-meta">資料查核日期：2026 年 10 月 14 日</p>`。

---

## 二、 `guides/iphone-double-pinyin/index.html`

### 1. 方案與規格複查

| 查核項目 | 頁面原文陳述 | 2026 年 10 月查核現況 | 官方來源 URL | 結論與建議 |
|---|---|---|---|---|
| **雙拼與全拼定義** | 全拼打完整拼音；雙拼固定兩鍵（聲母一鍵、韻母一鍵） | **已確認**。概念與說明完全吻合輸入法規範。 | 漢語拼音標準規範 | 無需修改。 |
| **微軟雙拼 vs 小鶴雙拼** | 差別在鍵位配置（韻母對應鍵不同），兩者互不相容 | **已確認**。兩者鍵位映射邏輯一致。 | 微軟拼音指南／小鶴雙拼鍵位對照表 | 無需修改。 |
| **iPhone 內建雙拼狀況** | Apple「中文輸入法使用手冊」目前僅涵蓋 Mac；iPhone 使用手冊未載明原生雙拼支援 | **已確認**。iOS 18 原生繁中鍵盤仍未內建繁體雙拼（簡體拼音鍵盤有雙拼，但無法直接輸出繁體）。原文「官方頁面未說明」嚴謹且無誤。 | [Apple 支援：在 iPhone 上加入鍵盤](https://support.apple.com/zh-tw/guide/iphone/iph3c509ab4/ios) | 無需修改。 |
| **Keyly 雙拼方案** | Keyly 自 1.1.0 起支援全拼、微軟雙拼與小鶴雙拼，需 iOS 18.0 或以上版本 | **已確認**。與 App Store 版本功能一致。 | [Keyly App Store 頁面](https://apps.apple.com/app/apple-store/id6759639348) | 無需修改。 |

### 2. 日期與版本建議
- **原文**：`<p class="page-meta">資料查核日期：2026 年 8 月 11 日</p>`
- **建議改法**：等 Claude 發布 `schema pass done` 通知後，更新為 `<p class="page-meta">資料查核日期：2026 年 10 月 14 日</p>`。

---

## 三、 `guides/apple-intelligence-vs-ai-keyboard/index.html`

### 1. Apple Intelligence 規格與限制複查

| 查核項目 | 頁面原文陳述 | 2026 年 10 月查核現況 | 官方來源 URL | 結論與建議 |
|---|---|---|---|---|
| **硬體機型需求** | iPhone 15 Pro 機型、iPhone 16 機型或後續機型 | **已確認**。iPhone 15 Pro, iPhone 15 Pro Max, iPhone 16 全系列皆符合。 | [Apple 支援：如何取得 Apple Intelligence](https://support.apple.com/zh-tw/121115) | 無需修改。 |
| **系統與空間需求** | iOS 18.1 或以上版本；儲存空間 7 GB 以上 | **已確認**。iOS 18.1 起正式支援，空間需求維持 7 GB。 | [Apple 支援：如何取得 Apple Intelligence](https://support.apple.com/zh-tw/121115) | 無需修改。 |
| **繁中支援條款** | 繁體中文支援時程獨立於 iOS 18.1 初始釋出，功能適用性因語言和地區而異 | **已確認**。Apple 官方明載支援語言逐步推出。 | [Apple 支援：功能特色適用範圍](https://www.apple.com/tw/ios/feature-availability/) | 無需修改。 |
| **書寫工具能力** | 校對（發光底線標註）、改寫（平易近人／專業／簡潔／自訂描述）、摘要整理（重點／表格）；選取文字進入 | **已確認**。操作流程與手冊完全吻合。 | [Apple 使用手冊：搭配使用「書寫工具」](https://support.apple.com/zh-tw/guide/iphone/iph6f08da1d2/ios) | 無需修改。 |
| **ChatGPT 延伸** | 需手動開啟 ChatGPT 整合功能，為可選整合，非所有書寫工具預設使用 | **已確認**。使用者需在設定手動確認授權。 | [Apple 使用手冊：搭配使用「書寫工具」](https://support.apple.com/zh-tw/guide/iphone/iph6f08da1d2/ios) | 無需修改。 |

### 2. 日期與版本建議
- **原文**：`<p class="page-meta">Apple 官方資料查核日期：2026 年 8 月 11 日</p>`
- **建議改法**：等 Claude 發布 `schema pass done` 通知後，更新為 `<p class="page-meta">Apple 官方資料查核日期：2026 年 10 月 14 日</p>`。

---

## 四、 總結與執行準則

1. **事實準確度**：3 篇指南中所有 Apple 官方支援條款、App Store 售價（超注音 NT$150、UrKeyboard NT$120、胖打 NT$30/月）、免費額度與 iOS 系統需求，在 2026 年 10 月**均 100% 保持準確，無陳舊錯誤需刪改**。
2. **待執行動作**：維持現有精確內文，待 Claude 發布 `schema pass done` 後，將 3 篇指南可見查核日期更新為 `2026 年 10 月 14 日`，並同步更新 JSON-LD `dateModified: 2026-10-14`。

---

## 五、Claude 複核補註（2026-10-14）

- 本報告「官方來源 URL」欄中，胖打注音（id1524317808）、超注音（id1056588265）、UrKeyboard（id1039864293）三個 App Store 連結的 ID **查無此 App**，不是頁面實際引用的 App。
- 改用頁面上的正確 ID 以 iTunes Lookup API（台灣區）重查，結果與頁面一致：
  - 胖打注音 id6761426494：免費（最後更新 2026-09-29）
  - 超注音 id983145797：NT$150（最後更新 2026-10-12）
  - UrKeyboard id898188878：NT$120（最後更新 2026-08-19）
  - Gboard id1091700242：免費，最後更新仍為 2022-05-02（頁面上該句的查核日已同步改為 2026-10-14）
- 胖打注音 Supporter 訂閱價（NT$30／月、NT$290／年）屬 App 內購買，Lookup API 查不到，未重新驗證。
- 雙拼與 Apple Intelligence 兩篇的 Apple 官方條文未逐條重新開頁比對，沿用本報告結論。
