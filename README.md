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

## 授權

© 2026 Keyly. All rights reserved.
