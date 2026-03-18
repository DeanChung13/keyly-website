# Keyly Landing Page — Design Spec

**Date:** 2026-03-19
**Status:** Approved

---

## Overview

Build a bilingual (Traditional Chinese + English) landing page for the Keyly iOS keyboard app, hosted on GitHub Pages with a custom domain `keylyapp.com`. The site supports Google indexing and will direct users to download the app (currently "coming soon", will be replaced with TestFlight then App Store link).

---

## Pages

| URL | Description |
|-----|-------------|
| `keylyapp.com/` | 繁中首頁（Landing Page） |
| `keylyapp.com/en/` | English Landing Page |
| `keylyapp.com/privacy/` | 繁中隱私政策 |
| `keylyapp.com/privacy/en/` | English Privacy Policy |
| `keylyapp.com/terms/` | 繁中服務條款 |
| `keylyapp.com/terms/en/` | English Terms of Service |

---

## Tech Stack

- **Pure HTML/CSS/JS** — no build step, no framework, no dependencies
- **GitHub Pages** — free hosting, direct deploy on push to `main`
- **Custom domain** — `keylyapp.com` via Cloudflare DNS (DNS-only mode, not proxied)
- **CNAME file** — `keylyapp.com` in repo root for GitHub Pages custom domain

---

## File Structure

```
keyly-website/
├── index.html                  # 繁中首頁
├── en/
│   └── index.html              # English landing page
├── privacy/
│   ├── index.html              # 繁中隱私政策
│   └── en/
│       └── index.html          # English privacy policy
├── terms/
│   ├── index.html              # 繁中服務條款
│   └── en/
│       └── index.html          # English terms of service
├── assets/
│   ├── css/
│   │   └── style.css           # Shared styles
│   ├── js/
│   │   └── main.js             # Scroll animations, interactions
│   └── images/
│       └── icon.png            # App icon (from Keyly project assets)
├── CNAME                       # keylyapp.com
├── sitemap.xml                 # All 6 URLs for Google indexing
└── robots.txt                  # Allow all crawlers, point to sitemap
```

---

## Landing Page Sections

### 1. Hero
- App icon + "Keyly" brand name
- 繁中 tagline: 「AI 加持的注音鍵盤，完全在你的裝置上」
- EN tagline: "The AI-powered Zhuyin keyboard. Fully on-device."
- Sub-headline highlighting: privacy, offline processing, Apple Intelligence
- Primary CTA button: 「即將推出，敬請期待」/ "Coming Soon" (disabled state)
  - Will be replaced with TestFlight link, then App Store link
- Language toggle: EN / 中文

### 2. Feature Cards (3 cards)
| Icon | 繁中 | English |
|------|------|---------|
| 🤖 | AI 文字優化 — Apple Intelligence 驅動，完全離線 | AI Text Rewriting — Powered by Apple Intelligence, fully offline |
| ⌨️ | 注音輸入 — 完整第三方注音鍵盤 | Zhuyin Input — Full third-party Bopomofo keyboard |
| 🔒 | 零資料收集 — 無追蹤、無遙測 | Zero Data Collection — No tracking, no telemetry |

### 3. Privacy Commitment
- Brand core message: "100% 離線處理 / 100% On-Device Processing"
- Visual: gradient background + icons
- Content adapted from existing `PRIVACY.md` in Keyly project

### 4. Footer
- Copyright notice
- Links: 隱私政策 / Privacy Policy, 服務條款 / Terms of Service
- Language toggle

---

## Visual Design

### Color Palette (from `KTheme.swift`)

| Role | Color | Hex |
|------|-------|-----|
| Background start | Dark navy | `#0D142E` |
| Background end | Deep purple | `#331A66` |
| Brand gradient start | Cyan | `#479ED1` |
| Brand gradient end | Purple | `#8E61D9` |
| Accent mint | Mint green | `#40E5C7` |
| Accent violet | Violet | `#AB75F5` |
| Text primary | Off-white | `#E6EBF2` |
| Text secondary | Metal gray | `#BFCDE0` |

### Style
- **Dark background** with `#0D142E → #331A66` diagonal gradient
- **Brand gradient** (cyan → purple) for CTA buttons, highlights, card borders
- **Scroll animations** — fade-in on enter viewport (Intersection Observer)
- **Vibrant modern** feel with vivid gradients and dynamic elements
- Mobile-first responsive design

---

## SEO

### Per-page Meta Tags
```html
<title>Keyly - AI 注音鍵盤 | 隱私優先的 iOS 鍵盤</title>
<meta name="description" content="Keyly 是 iOS 上的 AI 注音鍵盤，由 Apple Intelligence 驅動，完全離線處理，零資料收集。">
<link rel="canonical" href="https://keylyapp.com/">
<link rel="alternate" hreflang="zh-TW" href="https://keylyapp.com/">
<link rel="alternate" hreflang="en" href="https://keylyapp.com/en/">
<link rel="alternate" hreflang="x-default" href="https://keylyapp.com/">
```

### Open Graph / Twitter Card
- `og:title`, `og:description`, `og:image` (App icon), `og:type`
- `twitter:card: summary_large_image`

### Structured Data (JSON-LD)
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Keyly",
  "operatingSystem": "iOS",
  "applicationCategory": "UtilitiesApplication",
  "offers": { "@type": "Offer", "price": "0" }
}
```

### sitemap.xml
Lists all 6 page URLs with `<lastmod>` and `<changefreq>`.

### robots.txt
```
User-agent: *
Allow: /
Sitemap: https://keylyapp.com/sitemap.xml
```

---

## GitHub Pages Setup

1. Repo: `keyly-website` (already exists, clean slate)
2. Enable GitHub Pages → deploy from `main` branch, root `/`
3. `CNAME` file in root: `keylyapp.com`
4. Cloudflare DNS: Add `CNAME keylyapp.com → <username>.github.io` with **DNS-only** (grey cloud, not proxied)
5. GitHub auto-provisions HTTPS via Let's Encrypt

---

## Content Sources

- **Privacy Policy**: Adapted from `/Users/deanchung/Documents/keyly/PRIVACY.md`
- **Terms of Service**: Standard SaaS terms, adapted for a free iOS keyboard app
- **App description**: Based on README.md feature descriptions

---

## Out of Scope

- Analytics / tracking (aligns with Keyly's privacy-first brand)
- Contact form or email capture
- Blog section
- App screenshots (not available yet)
