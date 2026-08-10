# Keyly - AI 注音鍵盤官網

**Keyly** 是專為 iOS 打造、由 AI 強化的注音鍵盤 Landing Page。使用 React + Vite 建置，部屬於 GitHub Pages，自訂網域為 `keylyapp.com`。

## 技術棧

- **框架**: React 19 + Vite 6
- **樣式**: Tailwind CSS v4
- **動畫**: Motion
- **圖標**: Lucide React
- **語言**: TypeScript

## 專案結構

```
keyly-website/
├── .github/
│   └── workflows/
│       └── deploy.yml       # 自動部屬 GitHub Actions
├── src/
│   ├── App.tsx              # 主頁面（Navbar、Hero、Features、FAQ、CTA、Footer）
│   ├── main.tsx             # React 進入點
│   ├── index.css            # Tailwind 主題與全域樣式
│   └── components/
│       └── TypingAnimation.tsx  # Hero 打字動畫元件
├── privacy/
│   └── index.html           # 隱私權政策（靜態頁面）
├── terms/
│   └── index.html           # 服務條款（靜態頁面）
├── assets/
│   └── images/              # OG banner、icon 等靜態圖片
├── CNAME                    # 自訂網域（keylyapp.com）
├── index.html               # React App 入口模板
├── vite.config.ts
└── package.json
```

## 本地開發

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # 建置到 dist/
npm run lint       # TypeScript 型別檢查
```

## 部屬

push 到 `main` 後 GitHub Actions 自動觸發，完成建置並部屬到 GitHub Pages。

```bash
git push origin main
```

### 首次設定

1. GitHub Repo → **Settings → Pages → Source** 選 **GitHub Actions**
2. 自訂網域填入 `keylyapp.com`（`CNAME` 已包含在專案中）
3. DNS 設定（在你的網域供應商）：

   | 類型 | 名稱 | 值 |
   |------|------|----|
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |
   | CNAME | www | `<你的GitHub帳號>.github.io` |

## 文件

- [GA 事件追蹤總覽](docs/ga-events.md)
- [GA4 研究與定期監測方式](docs/analytics/ga4-research-and-monitoring.md)

### SEO

- [SEO 自然流量改善計劃](docs/seo-growth-plan.md)
- [SEO 稽核證據報告](docs/seo/2026-08-09-seo-audit-evidence.md)
- [SEO 研究與 GSC 定期監測方式](docs/seo/gsc-research-and-monitoring.md)
- [SEO 下一階段任務研究與價值排序](docs/seo/2026-08-11-next-task-prioritization.md)
- [零成本提升 Google 曝光策略與價值排序](docs/seo/2026-08-11-zero-cost-google-exposure-strategies.md)
- [Google 曝光研究與 SEO 優化計畫](docs/seo/2026-08-11-search-demand-research-plan.md)
- [GSC 台灣與非品牌曝光基準](docs/seo/2026-08-11-gsc-exposure-baseline.md)
- [搜尋需求與 SERP 機會矩陣](docs/seo/2026-08-11-search-opportunity-matrix.md)
- [內容 Brief：首頁 iPhone 注音主題群優化](docs/seo/content-brief-homepage-iphone-zhuyin.md)
- [優化 Brief：既有 iPhone 注音鍵盤推薦比較頁](docs/seo/content-brief-iphone-zhuyin-keyboard-recommendation.md)
- [優化 Brief：既有 iPhone 鍵盤聲音與震動頁](docs/seo/content-brief-iphone-keyboard-sound-haptics.md)
- [外部曝光與自然連結機會研究](docs/seo/2026-08-11-earned-media-opportunities.md)
- [內容 Brief：2026 iPhone 注音輸入法推薦與比較](docs/seo/content-brief-iphone-zhuyin-keyboard.md)
- [內容 Brief：iPhone 注音選字不準的檢查與改善方法](docs/seo/content-brief-iphone-zhuyin-selection-fixes.md)
- [內容 Brief：iPhone 鍵盤震動與觸覺回饋設定](docs/seo/content-brief-iphone-keyboard-haptics.md)
- [內容 Brief：Apple Intelligence 書寫工具與 AI 鍵盤怎麼選](docs/seo/content-brief-apple-intelligence-vs-ai-keyboard.md)
- [SEO 修正方案](docs/superpowers/plans/2026-08-09-seo-audit-fixes.md)

### ASO

- [App Store Metadata 免費 ASO 稽核](docs/aso/2026-08-11-app-store-metadata-audit.md)
- [ASO Metadata 變更記錄 — 第一輪（未送出）](docs/aso/2026-08-11-metadata-change-round-1.md)

## 授權

© 2026 Keyly. All rights reserved.
