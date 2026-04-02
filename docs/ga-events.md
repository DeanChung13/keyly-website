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
| 404 頁面 | `/*` | `404.html` |

---

## 自訂事件（Custom Events）

| 事件名稱 | `event_category` | `event_label` | 觸發位置 | 檔案 |
|---------|-----------------|---------------|---------|------|
| `download_click` | `engagement` | `navbar` | Navbar 立即下載（桌面） | `src/App.tsx` |
| `download_click` | `engagement` | `navbar_mobile` | Navbar 立即下載（手機） | `src/App.tsx` |
| `download_click` | `engagement` | `hero` | Hero 區塊「立即解鎖 AI 智慧輸入」 | `src/App.tsx` |
| `download_click` | `engagement` | `cta_section` | CTA 區塊「立即解鎖 AI 智慧輸入」 | `src/App.tsx` |
| `faq_click` | `engagement` | (FAQ 題目) | FAQ 問題點擊展開 | `src/App.tsx` / `AppEn.tsx` |
| `section_view` | `engagement` | (區塊 ID) | 區塊可見度（捲動深度追蹤） | `src/App.tsx` / `AppEn.tsx` |
| `feature_click` | `engagement` | (功能標題) | 特色區塊功能卡片點擊 | `src/App.tsx` / `AppEn.tsx` |
| `link_click` | `engagement` | (連結名稱) | 頁尾或其他外部連結點擊 | `src/App.tsx` / `AppEn.tsx` |

---

## GA 後台查看方式

- **即時事件**：Reports → Realtime → Events
- **download_click 分析**：Reports → Engagement → Events → 點擊 `download_click` → 查看 `event_label` 維度
- **頁面流量**：Reports → Engagement → Pages and screens
