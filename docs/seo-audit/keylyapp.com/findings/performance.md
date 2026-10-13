# Performance（Claude，2026-10-14）

**分數：70 / 100（估計值，資料不完整）**

> PageSpeed Insights 這次無法執行：不帶 API key 的共用額度已滿（rate limit）。以下是資源層級的分析，**不是** Lighthouse 或 CrUX 實測數據。要取得 LCP／INP／CLS 實測值，請在 GSC「網站使用體驗」查看，或設定 PSI API key 後重跑 `pagespeed_check.py`。

## 觀察
| 頁面 | HTML | JS | CSS | 其他 |
|---|---|---|---|---|
| `/` | 57 KB | main 23 KB + client 204 KB + index 142 KB（未壓縮） | 54 KB | hero 影片，poster 48 KB |
| `/guides/iphone-zhuyin-keyboard/` | 49 KB | 無應用程式 JS | — | 只有 GA 與 Cloudflare 腳本 |
| `/guides/iphone-ai-elderly-reply/` | 39 KB | client 204 KB + rewrite-film | 10 KB + film CSS | 對話動畫 |

- 主力頁 zhuyin-keyboard 是純靜態 HTML，效能不是它的瓶頸。

## Findings

### Medium — 首頁 hero 影片：較大的 webm 排在前面
- 證據：`custom-zh.webm` 1.11 MB、`custom-zh.mp4` 814 KB。`<source>` 順序 webm 在前，Chrome 會選 webm，下載量反而多 36%。
- 修法：把 webm 重新壓縮到比 mp4 小（VP9 CRF 調高，或改 AV1）；若做不到，就把 mp4 的 `<source>` 放前面。`preload="metadata"` 與 poster 已經設好，保留即可。

### Low — Cloudflare Email Obfuscation 在每頁注入 `email-decode.min.js`
- 只有含 email 的頁面（privacy、terms）需要。若其他頁沒有 email，可在 Cloudflare 對 `/guides/*` 關閉，少一個請求。

### Low — 首頁 JS 約 370 KB（未壓縮）
- 是 React hydration 的成本。brotli 壓縮後約 100 KB 上下，屬可接受範圍。等 CrUX 顯示 INP 有問題再處理。
