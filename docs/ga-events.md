# Google Analytics 事件追蹤總覽

**Measurement ID**: `G-C51YGT0TVX`

---

## 頁面追蹤（Page View）

所有頁面皆透過 `gtag('config', ...)` 自動記錄 page_view。

| 頁面 | 路徑 | 檔案 |
|------|------|------|
| 主頁 | `/` | `index.html` |
| 主頁（英文） | `/en/` | `en/index.html` |
| 隱私權政策（中文） | `/privacy/` | `privacy/index.html` |
| 隱私權政策（英文） | `/privacy/en/` | `privacy/en/index.html` |
| 服務條款（中文） | `/terms/` | `terms/index.html` |
| 服務條款（英文） | `/terms/en/` | `terms/en/index.html` |
| 自動續訂說明（中文） | `/subscriptions/` | `subscriptions/index.html` |
| 自動續訂說明（英文） | `/subscriptions/en/` | `subscriptions/en/index.html` |
| Guide — 允許完全取用 | `/guides/full-access/` | `guides/full-access/index.html` |
| Guide — iPhone 注音輸入法比較 | `/guides/iphone-zhuyin-keyboard/` | `guides/iphone-zhuyin-keyboard/index.html` |
| Guide — 注音選字不準的檢查方法 | `/guides/iphone-zhuyin-selection-fixes/` | `guides/iphone-zhuyin-selection-fixes/index.html` |
| Guide — 鍵盤震動與觸覺回饋設定 | `/guides/iphone-keyboard-haptics/` | `guides/iphone-keyboard-haptics/index.html` |
| Guide — 書寫工具與 AI 鍵盤怎麼選 | `/guides/apple-intelligence-vs-ai-keyboard/` | `guides/apple-intelligence-vs-ai-keyboard/index.html` |
| Guide — iPhone 雙拼輸入 | `/guides/iphone-double-pinyin/` | `guides/iphone-double-pinyin/index.html` |
| 404 頁面 | `/*` | `404.html` |

`gtag('config', ...)` 自 2026-08-11 起以 hostname 判斷是否執行，只有 `keylyapp.com` 與 `www.keylyapp.com` 會送出 page_view；本機與預覽環境不計入。

---

## 自訂事件（Custom Events）

| 事件名稱 | `event_category` | `event_label` | 觸發位置 | 檔案 |
|---------|-----------------|---------------|---------|------|
| `download_click` | `engagement` | `navbar` | Navbar 立即下載（桌面） | `src/App.tsx` |
| `download_click` | `engagement` | `navbar_mobile` | Navbar 立即下載（手機） | `src/App.tsx` |
| `download_click` | `engagement` | `hero` | Hero 區塊「立即解鎖 AI 智慧輸入」 | `src/App.tsx` |
| `download_click` | `engagement` | `cta_section` | CTA 區塊「立即解鎖 AI 智慧輸入」 | `src/App.tsx` |
| `download_click` | `engagement` | `guide_zhuyin_comparison_top` | 比較頁 Keyly 選項卡內的「免費下載 Keyly」 | `guides/iphone-zhuyin-keyboard/index.html` |
| `download_click` | `engagement` | `guide_zhuyin_comparison_bottom` | 比較頁結尾 CTA「在 App Store 下載 Keyly」 | `guides/iphone-zhuyin-keyboard/index.html` |
| `download_click` | `engagement` | `guide_selection_fixes_bottom` | 選字排查頁結尾 CTA（全頁唯一一個下載 CTA） | `guides/iphone-zhuyin-selection-fixes/index.html` |
| `download_click` | `engagement` | `guide_keyboard_haptics_bottom` | 鍵盤震動頁結尾 CTA（全頁唯一一個下載 CTA） | `guides/iphone-keyboard-haptics/index.html` |
| `download_click` | `engagement` | `guide_apple_intelligence_bottom` | 書寫工具比較頁結尾 CTA（全頁唯一一個下載 CTA） | `guides/apple-intelligence-vs-ai-keyboard/index.html` |
| `download_click` | `engagement` | `guide_double_pinyin_bottom` | 雙拼頁結尾 CTA（全頁唯一一個下載 CTA） | `guides/iphone-double-pinyin/index.html` |
| `faq_click` | `engagement` | (FAQ 題目) | FAQ 問題點擊展開 | `src/App.tsx` / `AppEn.tsx` |
| `section_view` | `engagement` | (區塊 ID) | 區塊可見度（捲動深度追蹤） | `src/App.tsx` / `AppEn.tsx` |
| `feature_click` | `engagement` | (功能標題) | 特色區塊功能卡片點擊 | `src/App.tsx` / `AppEn.tsx` |
| `link_click` | `engagement` | (連結名稱) | 頁尾或其他外部連結點擊 | `src/App.tsx` / `AppEn.tsx` |
| `link_click` | `engagement` | `guide_zhuyin_comparison` | 首頁頁尾前往比較頁 | `src/App.tsx` |
| `link_click` | `engagement` | `guide_selection_fixes` | 首頁頁尾前往選字排查頁 | `src/App.tsx` |
| `link_click` | `engagement` | `guide_keyboard_haptics` | 首頁頁尾前往鍵盤震動頁 | `src/App.tsx` |
| `link_click` | `engagement` | `guide_apple_intelligence` | 首頁頁尾前往書寫工具比較頁 | `src/App.tsx` |
| `link_click` | `engagement` | `guide_double_pinyin` | 首頁頁尾前往雙拼頁 | `src/App.tsx` |
| `link_click` | `engagement` | `guide_double_pinyin` | 注音比較頁前往雙拼頁 | `guides/iphone-zhuyin-keyboard/index.html` |
| `link_click` | `engagement` | `guide_zhuyin_comparison` | 選字排查頁方法六前往比較頁 | `guides/iphone-zhuyin-selection-fixes/index.html` |
| `link_click` | `engagement` | `guide_full_access` | 選字排查頁方法六前往完全取用說明 | `guides/iphone-zhuyin-selection-fixes/index.html` |
| `link_click` | `engagement` | `guide_full_access` | 鍵盤震動頁第三方鍵盤段落與 FAQ 前往完全取用說明 | `guides/iphone-keyboard-haptics/index.html` |
| `link_click` | `engagement` | `guide_zhuyin_comparison` | 鍵盤震動頁結尾 CTA 前往比較頁 | `guides/iphone-keyboard-haptics/index.html` |
| `link_click` | `engagement` | `source_apple_keyboard_haptics` | 鍵盤震動頁引用的 Apple 鍵盤聲音／觸覺回饋說明 | `guides/iphone-keyboard-haptics/index.html` |
| `link_click` | `engagement` | `guide_full_access` | 書寫工具比較頁 Keyly 段落與結尾 CTA 前往完全取用說明 | `guides/apple-intelligence-vs-ai-keyboard/index.html` |
| `link_click` | `engagement` | `guide_zhuyin_comparison` | 書寫工具比較頁結尾 CTA 前往注音鍵盤比較頁 | `guides/apple-intelligence-vs-ai-keyboard/index.html` |
| `link_click` | `engagement` | `source_apple_intelligence_requirements` | 書寫工具比較頁引用的「如何取得 Apple Intelligence」 | `guides/apple-intelligence-vs-ai-keyboard/index.html` |
| `link_click` | `engagement` | `source_apple_writing_tools` | 書寫工具比較頁引用的「書寫工具」使用手冊 | `guides/apple-intelligence-vs-ai-keyboard/index.html` |
| `link_click` | `engagement` | `source_apple_feature_availability` | 書寫工具比較頁引用的功能特色適用範圍 | `guides/apple-intelligence-vs-ai-keyboard/index.html` |
| `link_click` | `engagement` | `guide_full_access` | 雙拼頁前往完全取用說明 | `guides/iphone-double-pinyin/index.html` |
| `link_click` | `engagement` | `guide_zhuyin_comparison` | 雙拼頁前往注音比較頁 | `guides/iphone-double-pinyin/index.html` |
| `link_click` | `engagement` | `source_apple_shuangpin_mac` | 雙拼頁引用的 Apple「在 Mac 上使用繁體雙拼輸入中文」 | `guides/iphone-double-pinyin/index.html` |
| `link_click` | `engagement` | `source_apple_keyboard_guide` | 雙拼頁引用的 Apple 加入／更改鍵盤說明 | `guides/iphone-double-pinyin/index.html` |
| `link_click` | `engagement` | `source_app_store_irime` | 雙拼頁引用的 iRime App Store | `guides/iphone-double-pinyin/index.html` |
| `link_click` | `engagement` | `source_app_store_cang` | 雙拼頁引用的倉輸入法 App Store | `guides/iphone-double-pinyin/index.html` |
| `link_click` | `engagement` | `source_app_store_shuangpin_practice` | 雙拼頁引用的試試雙拼 App Store | `guides/iphone-double-pinyin/index.html` |
| `link_click` | `engagement` | `guide_full_access` | 首頁頁尾前往完全取用說明 | `src/App.tsx` |
| `link_click` | `engagement` | `lang_switch_en` / `lang_switch_zh` | 頁尾語言切換 | `src/App.tsx` / `AppEn.tsx` |
| `link_click` | `engagement` | `source_apple_keyboard_guide` | 比較頁引用的 Apple 支援文件 | `guides/iphone-zhuyin-keyboard/index.html` |
| `link_click` | `engagement` | `source_app_store_keyly` | 比較頁引用的 Keyly App Store | `guides/iphone-zhuyin-keyboard/index.html` |
| `link_click` | `engagement` | `source_app_store_gboard` | 比較頁引用的 Gboard App Store | `guides/iphone-zhuyin-keyboard/index.html` |
| `link_click` | `engagement` | `source_app_store_panda` | 比較頁引用的胖打注音 App Store | `guides/iphone-zhuyin-keyboard/index.html` |
| `link_click` | `engagement` | `source_app_store_superzhuyin` | 比較頁引用的超注音 App Store | `guides/iphone-zhuyin-keyboard/index.html` |
| `link_click` | `engagement` | `source_app_store_urkeyboard` | 比較頁引用的 UrKeyboard App Store | `guides/iphone-zhuyin-keyboard/index.html` |
| `link_click` | `engagement` | `source_apple_autocorrect` | 選字排查頁引用的自動修正／預測字詞說明 | `guides/iphone-zhuyin-selection-fixes/index.html` |
| `link_click` | `engagement` | `source_apple_predictive_text` | 選字排查頁引用的預測字詞使用手冊 | `guides/iphone-zhuyin-selection-fixes/index.html` |
| `link_click` | `engagement` | `source_apple_text_replacement` | 選字排查頁引用的替代文字使用手冊 | `guides/iphone-zhuyin-selection-fixes/index.html` |
| `link_click` | `engagement` | `source_apple_support_home` | 選字排查頁指向 Apple 支援首頁 | `guides/iphone-zhuyin-selection-fixes/index.html` |

競品官方連結一律使用既有的 `link_click`，以 `source_` 前綴的 `event_label` 區分產品；不為此新增事件種類。`destination` 參數帶網域。

---

## GA 後台查看方式

- **即時事件**：Reports → Realtime → Events
- **download_click 分析**：Reports → Engagement → Events → 點擊 `download_click`；此事件已於 2026-08-09 設為重要事件
- **頁面流量**：Reports → Engagement → Pages and screens

`event_label` 已於 2026-08-09 註冊為事件範圍自訂維度；註冊後的新事件可用它拆分 navbar、hero 與 CTA 區塊，歷史資料不會回填。研究時的篩選、基準與判讀規則見 [GA4 研究與定期監測方式](analytics/ga4-research-and-monitoring.md)。
