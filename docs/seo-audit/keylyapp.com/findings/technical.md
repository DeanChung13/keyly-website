# Technical SEO（Claude，2026-10-14）

資料來源：線上爬取 sitemap 全部 23 頁、curl 標頭與轉址測試、GSC URL Inspection／Sitemaps API。

**分數：78 / 100**

## 運作良好
- 23 頁全部回 200，canonical 皆自我指向且與 sitemap URL 一致。
- `http→https` 301；無斜線與 `/index.html` 皆 308 到有斜線版本，沒有重複 URL。
- 真 404 回 404（不是 soft 404）。
- robots.txt 只擋 `/cdn-cgi/` 與 `/go/`（導流跳轉頁），並宣告 sitemap。
- 所有頁面都是 SSR 預渲染，原始 HTML 就有完整內文（guide 頁 1,000–3,700 個中文字），不依賴 JS。
- hreflang：首頁、privacy、terms、subscriptions 的 zh-TW／en／x-default 雙向成對正確。

## Findings

### High — 新頁未被 Google 發現：`/guides/iphone-translation-keyboard-comparison/`
- 證據：URL Inspection = **「URL is unknown to Google」**。Sitemap 最後被 Google 下載是 **2026-10-04**，此頁 10-07 才上線。
- 修法：GSC 重新提交 sitemap，並對此頁「要求建立索引」。往後每次新增 guide 都做一次。

### High — `/guides/iphone-double-pinyin/` 長期「已發現 - 目前尚未建立索引」
- 證據：URL Inspection = **Discovered – currently not indexed**，8 月就在 sitemap，至今 0 曝光。唯一 referring URL 是外部轉介的首頁。
- 判讀：Google 判斷不值得爬。站內只有 zhuyin-keyboard、apple-intelligence 兩篇連到它，內部訊號弱；雙拼也是簡體使用者為主的主題，跟站內繁中注音主軸距離較遠。
- 修法：先「要求建立索引」；同時從 `guides/` hub 以外的相關頁（selection-fixes、zhuyin-keyboard 比較表內的雙拼列）加上下文連結。若 60 天後仍未收錄，評估是否併入 zhuyin-keyboard 的一個段落。

### Medium — sitemap `lastmod` 全部過期
- 證據：`public/sitemap.xml` 手動維護，19 個 URL 的 lastmod 早於該頁最後一次 git commit（例：`/guides/` 寫 2026-08-11，實際 10-07 改過；四篇 AI 情境 guide 寫 8 月，實際 10-07 改過）。
- 影響：Google 會忽略持續不準的 lastmod，改版後的重新爬取變慢。
- 修法：在 `scripts/prerender.mjs` 建置時自動產生 sitemap，lastmod 取「內容」最後修改日（建議用頁面 JSON-LD 的 `dateModified`，不要用 git 日期，因為純樣式 commit 也會改到）。

### Low — `www.keylyapp.com` 無法解析
- 證據：curl 回 000（DNS 無記錄）。
- 修法：Cloudflare 加 `www` CNAME，301 到 apex。少數人手打 www 會直接失敗。

### Low — 沒有 HSTS
- 證據：回應標頭沒有 `Strict-Transport-Security`。
- 修法：Cloudflare SSL/TLS → Edge Certificates 開啟 HSTS（先 max-age 6 個月、不勾 preload）。非排名因素，屬安全加分。

### Low — `<html lang>` 不一致
- 首頁 `zh-Hant`，其他中文頁 `zh-TW`，hreflang 用 `zh-TW`，JSON-LD `inLanguage` 用 `zh-Hant-TW`。統一成 `zh-TW` 即可。

### Info — 品牌詞「keyly」被其他國家的同名品牌稀釋
- 證據：`keyly` 共約 300 次曝光，台灣只有 10 次（排名 1、CTR 20%）；其餘約 290 次落在 `/en/`，排名 4、0 點擊，來自非台灣地區。
- 判讀：搜尋者多半在找別的 Keyly，不是我們能修的問題，不用追 `/en/` 的 CTR。
