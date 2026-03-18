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

**Note on URL depth:** zh-TW legal pages sit at `/privacy/` and `/terms/` (2 levels), while EN legal pages sit at `/privacy/en/` and `/terms/en/` (3 levels). This asymmetry is intentional and consistent with the pattern where root = zh-TW default and `/en/` is the EN variant.

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
├── 404.html                    # Custom 404 page: brand gradient bg, "找不到頁面 / Page Not Found" message, link back to /
├── assets/
│   ├── css/
│   │   └── style.css           # Shared styles
│   ├── js/
│   │   └── main.js             # Intersection Observer fade-in on .animate elements; no other logic
│   └── images/
│       ├── icon.png            # App icon 1024×1024 (from Keyly project assets)
│       └── og-banner.png       # OG image 1200×630 for social sharing
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
- Primary CTA button: 「即將推出，敬請期待」/ "Coming Soon"
  - Implemented as `<a>` with `aria-disabled="true"` + `cursor: not-allowed` style (not `<button disabled>`, to remain focusable and accessible)
  - Will be replaced with TestFlight link, then App Store link
- Language toggle: EN / 中文 — simple links to sibling URL (`/` ↔ `/en/`)

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
- Language toggle — links to sibling URL:
  - `/` ↔ `/en/` (landing pages)
  - `/privacy/` ↔ `/privacy/en/` (privacy pages)
  - `/terms/` ↔ `/terms/en/` (terms pages) (links to sibling URL)

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
- **Scroll animations** — fade-in on enter viewport via Intersection Observer on `.animate` elements
- **Vibrant modern** feel with vivid gradients and dynamic elements
- Mobile-first responsive design
- Favicon: `<link rel="icon" href="/assets/images/icon.png">` (1024×1024 PNG, all pages)

---

## SEO

### Per-page Meta Tags

Every page includes both a `canonical` tag and bidirectional `hreflang` tags for its zh-TW / EN pair.

**Landing page (繁中):**
```html
<title>Keyly - AI 注音鍵盤 | 隱私優先的 iOS 鍵盤</title>
<meta name="description" content="Keyly 是 iOS 上的 AI 注音鍵盤，由 Apple Intelligence 驅動，完全離線處理，零資料收集。">
<link rel="canonical" href="https://keylyapp.com/">
<link rel="alternate" hreflang="zh-TW" href="https://keylyapp.com/">
<link rel="alternate" hreflang="en" href="https://keylyapp.com/en/">
<link rel="alternate" hreflang="x-default" href="https://keylyapp.com/">
```

**Privacy page (繁中):**
```html
<link rel="canonical" href="https://keylyapp.com/privacy/">
<link rel="alternate" hreflang="zh-TW" href="https://keylyapp.com/privacy/">
<link rel="alternate" hreflang="en" href="https://keylyapp.com/privacy/en/">
<link rel="alternate" hreflang="x-default" href="https://keylyapp.com/privacy/">
```

**Privacy page (EN):**
```html
<link rel="canonical" href="https://keylyapp.com/privacy/en/">
<link rel="alternate" hreflang="zh-TW" href="https://keylyapp.com/privacy/">
<link rel="alternate" hreflang="en" href="https://keylyapp.com/privacy/en/">
<link rel="alternate" hreflang="x-default" href="https://keylyapp.com/privacy/">
```

**Terms page (繁中):**
```html
<link rel="canonical" href="https://keylyapp.com/terms/">
<link rel="alternate" hreflang="zh-TW" href="https://keylyapp.com/terms/">
<link rel="alternate" hreflang="en" href="https://keylyapp.com/terms/en/">
<link rel="alternate" hreflang="x-default" href="https://keylyapp.com/terms/">
```

**Terms page (EN):**
```html
<link rel="canonical" href="https://keylyapp.com/terms/en/">
<link rel="alternate" hreflang="zh-TW" href="https://keylyapp.com/terms/">
<link rel="alternate" hreflang="en" href="https://keylyapp.com/terms/en/">
<link rel="alternate" hreflang="x-default" href="https://keylyapp.com/terms/">
```

**Landing page (EN):**
```html
<link rel="canonical" href="https://keylyapp.com/en/">
<link rel="alternate" hreflang="zh-TW" href="https://keylyapp.com/">
<link rel="alternate" hreflang="en" href="https://keylyapp.com/en/">
<link rel="alternate" hreflang="x-default" href="https://keylyapp.com/">
```

`x-default` always points to the zh-TW variant as the unmatched-locale fallback.

### Open Graph / Twitter Card
```html
<meta property="og:title" content="Keyly - AI 注音鍵盤">
<meta property="og:description" content="...">
<meta property="og:url" content="https://keylyapp.com/">
<meta property="og:image" content="https://keylyapp.com/assets/images/og-banner.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
```

`og:url` must match the page's canonical URL (changes per page).

`og-banner.png` must be 1200×630 px — a dedicated social card featuring the app icon, tagline, and brand gradient background. Do not use the square app icon directly as it will be cropped on Twitter.

### Structured Data (JSON-LD) — landing page only
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Keyly",
  "url": "https://keylyapp.com",
  "operatingSystem": "iOS",
  "applicationCategory": "UtilitiesApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
```

### sitemap.xml
All 6 URLs with trailing slashes (matching canonical tags), `<lastmod>`, and `<changefreq>`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://keylyapp.com/</loc><lastmod>2026-03-19</lastmod><changefreq>monthly</changefreq><priority>1.0</priority></url>
  <url><loc>https://keylyapp.com/en/</loc><lastmod>2026-03-19</lastmod><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>https://keylyapp.com/privacy/</loc><lastmod>2026-03-19</lastmod><changefreq>yearly</changefreq><priority>0.3</priority></url>
  <url><loc>https://keylyapp.com/privacy/en/</loc><lastmod>2026-03-19</lastmod><changefreq>yearly</changefreq><priority>0.3</priority></url>
  <url><loc>https://keylyapp.com/terms/</loc><lastmod>2026-03-19</lastmod><changefreq>yearly</changefreq><priority>0.3</priority></url>
  <url><loc>https://keylyapp.com/terms/en/</loc><lastmod>2026-03-19</lastmod><changefreq>yearly</changefreq><priority>0.3</priority></url>
</urlset>
```

Update `<lastmod>` dates whenever page content changes.

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
4. **Cloudflare DNS** — apex domain (`keylyapp.com`) requires **A records**, not CNAME (RFC prohibits CNAME on apex):
   ```
   A  keylyapp.com  185.199.108.153  DNS-only (grey cloud)
   A  keylyapp.com  185.199.109.153  DNS-only (grey cloud)
   A  keylyapp.com  185.199.110.153  DNS-only (grey cloud)
   A  keylyapp.com  185.199.111.153  DNS-only (grey cloud)
   ```
   Optionally add `CNAME www → <username>.github.io` (also DNS-only) to support `www.keylyapp.com`.
5. GitHub auto-provisions HTTPS via Let's Encrypt once DNS propagates.

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
