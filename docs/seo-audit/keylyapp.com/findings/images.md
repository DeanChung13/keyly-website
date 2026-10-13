# Images（Claude，2026-10-14）

**分數：60 / 100**

## 現況
- 23 頁的原始 HTML 中沒有任何 `<img>`。示意畫面都用 CSS／React 元件（鍵盤、LINE 對話動畫）或影片呈現，因此沒有 alt 缺漏的問題。
- 全站 22 頁共用同一張 `og-banner.png`（1200×630、45 KB）。（初稿寫 `/terms/` 缺 og:image 是爬蟲規則誤判，原始碼有。）

## Findings

### Medium — 所有 guide 共用同一張 OG 圖
- 影響：分享到 LINE、Threads、FB 時，每篇預覽都長一樣，看不出主題，降低社群點擊率。這也是 `Article` schema 的 `image` 欄位需要的圖（見 schema.md）。
- 修法：建置時用模板為每篇 guide 產生 1200×630 的圖（標題文字 + 鍵盤或對話示意）。先做曝光前三名：zhuyin-keyboard、selection-fixes、haptics。

### Low — 圖片搜尋流量為零
- guide 內的操作畫面（設定路徑、鍵盤介面）若有一兩張真實截圖並加 alt，可以拿到 Google 圖片搜尋的「iphone 鍵盤聲音設定」這類流量，也能強化 E-E-A-T 的實測證據。可與 agy 的 content 建議合併評估。
