# Keyly Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual (zh-TW + EN) static landing page for the Keyly iOS keyboard app, hosted on GitHub Pages at `keylyapp.com`.

**Architecture:** Pure HTML/CSS/JS with no build step. Six pages (landing + privacy + terms × 2 languages) share a single `style.css` and `main.js`. All content is placeholder-quality first-version copy; final copy will be updated separately.

**Tech Stack:** HTML5, CSS3, Vanilla JS (Intersection Observer), GitHub Pages, Cloudflare DNS

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `CNAME` | Create | GitHub Pages custom domain |
| `robots.txt` | Create | Allow crawlers, point to sitemap |
| `sitemap.xml` | Create | All 6 URLs for Google indexing |
| `404.html` | Create | Branded error page |
| `assets/css/style.css` | Create | All shared styles (brand colors, layout, animation) |
| `assets/js/main.js` | Create | Intersection Observer fade-in only |
| `assets/images/icon.png` | Copy | App icon 1024×1024 from Keyly project |
| `assets/images/og-banner.svg` | Create | Social card source (1200×630) |
| `assets/images/og-banner.png` | Generate | Exported from SVG for OG meta tags |
| `index.html` | Create | 繁中 landing page |
| `en/index.html` | Create | EN landing page |
| `privacy/index.html` | Create | 繁中 privacy policy |
| `privacy/en/index.html` | Create | EN privacy policy |
| `terms/index.html` | Create | 繁中 terms of service |
| `terms/en/index.html` | Create | EN terms of service |

---

## Task 1: Scaffold — Directories, CNAME, robots.txt

**Files:**
- Create: `CNAME`
- Create: `robots.txt`
- Create: `en/`, `privacy/en/`, `terms/en/`, `assets/css/`, `assets/js/`, `assets/images/` directories

- [ ] **Step 1: Create directory structure**

```bash
mkdir -p en privacy/en terms/en assets/css assets/js assets/images
```

- [ ] **Step 2: Create CNAME**

```bash
echo "keylyapp.com" > CNAME
```

- [ ] **Step 3: Create robots.txt**

```
User-agent: *
Allow: /
Sitemap: https://keylyapp.com/sitemap.xml
```

- [ ] **Step 4: Verify structure**

```bash
find . -not -path './.git/*' -not -path './docs/*' | sort
```

Expected output includes `CNAME`, `robots.txt`, and all directories.

- [ ] **Step 5: Commit**

```bash
git add CNAME robots.txt en/ privacy/ terms/ assets/
git commit -m "feat: scaffold directory structure"
```

---

## Task 2: App Icon + OG Banner

**Files:**
- Copy: `assets/images/icon.png` (from Keyly project)
- Create: `assets/images/og-banner.svg`
- Generate: `assets/images/og-banner.png`

- [ ] **Step 1: Copy app icon**

```bash
cp /Users/deanchung/Documents/keyly/Keyly/Assets.xcassets/AppIcon.appiconset/Icon-1024.png assets/images/icon.png
```

- [ ] **Step 2: Verify icon copied**

```bash
ls -lh assets/images/icon.png
```

Expected: file exists, ~100–500KB.

- [ ] **Step 3: Create OG banner SVG**

Create `assets/images/og-banner.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0D142E"/>
      <stop offset="100%" stop-color="#331A66"/>
    </linearGradient>
    <linearGradient id="brand" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#479ED1"/>
      <stop offset="100%" stop-color="#8E61D9"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1050" cy="100" r="220" fill="#479ED1" opacity="0.08"/>
  <circle cx="150" cy="530" r="160" fill="#8E61D9" opacity="0.08"/>
  <circle cx="600" cy="315" r="400" fill="#40E5C7" opacity="0.03"/>
  <text x="600" y="260" font-family="-apple-system, BlinkMacSystemFont, Helvetica, sans-serif"
        font-size="110" font-weight="800" text-anchor="middle" fill="url(#brand)">Keyly</text>
  <text x="600" y="330" font-family="-apple-system, BlinkMacSystemFont, Helvetica, sans-serif"
        font-size="28" text-anchor="middle" fill="#E6EBF2">AI 加持的注音鍵盤，完全在你的裝置上</text>
  <text x="600" y="375" font-family="-apple-system, BlinkMacSystemFont, Helvetica, sans-serif"
        font-size="22" text-anchor="middle" fill="#BFCDE0">The AI-powered Zhuyin keyboard. Fully on-device.</text>
  <text x="600" y="460" font-family="-apple-system, BlinkMacSystemFont, Helvetica, sans-serif"
        font-size="20" text-anchor="middle" fill="#479ED1">keylyapp.com</text>
</svg>
```

- [ ] **Step 4: Export SVG to PNG (1200×630)**

**Option A is strongly preferred** — librsvg handles CJK text in SVG correctly:

```bash
# Option A (RECOMMENDED) — librsvg (brew install librsvg)
rsvg-convert assets/images/og-banner.svg -o assets/images/og-banner.png

# Option B — ImageMagick (brew install imagemagick) — CJK text may not render correctly
# magick -density 150 assets/images/og-banner.svg -resize 1200x630! assets/images/og-banner.png

# Option C — reliable fallback if neither tool is available:
# open assets/images/og-banner.svg in Chrome → right-click → Save image as...
# → save to assets/images/og-banner.png
```

- [ ] **Step 5: Verify PNG**

```bash
ls -lh assets/images/og-banner.png
```

Expected: file exists, size > 0.

- [ ] **Step 6: Commit**

```bash
git add assets/images/
git commit -m "feat: add app icon and OG banner"
```

---

## Task 3: Shared CSS

**Files:**
- Create: `assets/css/style.css`

- [ ] **Step 1: Write style.css**

```css
/* =============================================
   Keyly — Shared Styles
   Brand palette from KTheme.swift
   ============================================= */

:root {
  --bg-start:      #0D142E;
  --bg-end:        #331A66;
  --brand-cyan:    #479ED1;
  --brand-purple:  #8E61D9;
  --accent-mint:   #40E5C7;
  --accent-violet: #AB75F5;
  --text-primary:  #E6EBF2;
  --text-secondary:#BFCDE0;
  --card-bg:       rgba(255,255,255,0.05);
  --card-border:   rgba(71,158,209,0.2);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background: linear-gradient(135deg, var(--bg-start) 0%, var(--bg-end) 100%);
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: var(--text-primary);
  line-height: 1.6;
}

/* ----- Nav ----- */
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 2rem;
  position: sticky;
  top: 0;
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  background: rgba(13,20,46,0.72);
  z-index: 100;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}

.nav-brand {
  font-size: 1.25rem;
  font-weight: 800;
  background: linear-gradient(90deg, var(--brand-cyan), var(--brand-purple));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.lang-toggle { display: flex; gap: 0.5rem; align-items: center; }

.lang-btn {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.875rem;
  padding: 0.25rem 0.75rem;
  border: 1px solid rgba(191,205,224,0.3);
  border-radius: 999px;
  transition: border-color 0.2s, color 0.2s;
}
.lang-btn:hover { border-color: var(--brand-cyan); color: var(--brand-cyan); }

.lang-current {
  font-size: 0.875rem;
  color: var(--brand-cyan);
  font-weight: 600;
}

/* ----- Hero ----- */
.hero {
  min-height: 88vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 2rem;
}

.hero-content { max-width: 660px; }

.hero-icon {
  width: 100px;
  height: 100px;
  border-radius: 24px;
  margin-bottom: 1.75rem;
  box-shadow: 0 8px 40px rgba(71,158,209,0.4);
}

.hero-title {
  font-size: clamp(3.5rem, 9vw, 5.5rem);
  font-weight: 900;
  background: linear-gradient(135deg, var(--brand-cyan), var(--brand-purple));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.05;
  margin-bottom: 1.25rem;
}

.hero-tagline {
  font-size: clamp(1.2rem, 3vw, 1.625rem);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
}

.hero-sub {
  font-size: 1rem;
  color: var(--text-secondary);
  margin-bottom: 2.75rem;
  letter-spacing: 0.01em;
}

.cta-btn {
  display: inline-block;
  padding: 0.9rem 2.5rem;
  background: linear-gradient(90deg, var(--brand-cyan), var(--brand-purple));
  color: #fff;
  font-size: 1.0625rem;
  font-weight: 700;
  text-decoration: none;
  border-radius: 999px;
  letter-spacing: 0.01em;
  box-shadow: 0 4px 24px rgba(71,158,209,0.35);
  transition: opacity 0.2s, transform 0.2s;
}
.cta-btn:hover:not([aria-disabled="true"]) {
  opacity: 0.9;
  transform: translateY(-2px);
}
.cta-btn[aria-disabled="true"] {
  opacity: 0.45;
  cursor: not-allowed;
  /* NOTE: do NOT add pointer-events:none — aria-disabled keeps the element focusable per spec */
}

/* ----- Features ----- */
.features {
  padding: 5rem 2rem;
  max-width: 1100px;
  margin: 0 auto;
}


.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: transform 0.25s, box-shadow 0.25s;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 16px 48px rgba(71,158,209,0.18);
}

.card-icon { font-size: 2.5rem; margin-bottom: 1rem; }

.card-title {
  font-size: 1.1875rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.625rem;
}

.card-desc {
  font-size: 0.9375rem;
  color: var(--text-secondary);
  line-height: 1.75;
}

/* ----- Privacy Section ----- */
.privacy-section {
  padding: 5.5rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.privacy-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg,
    rgba(64,229,199,0.07) 0%,
    rgba(171,117,245,0.07) 100%);
  border-top: 1px solid rgba(64,229,199,0.12);
  border-bottom: 1px solid rgba(171,117,245,0.12);
}

.privacy-content { max-width: 640px; margin: 0 auto; position: relative; }

.privacy-badge { font-size: 3.25rem; margin-bottom: 1.25rem; }

.privacy-title {
  font-size: clamp(1.75rem, 4vw, 2.75rem);
  font-weight: 900;
  background: linear-gradient(90deg, var(--accent-mint), var(--accent-violet));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1.25rem;
}

.privacy-desc {
  font-size: 1.0625rem;
  color: var(--text-secondary);
  line-height: 1.85;
}

/* ----- Footer ----- */
.footer {
  padding: 2.75rem 2rem;
  text-align: center;
  border-top: 1px solid rgba(255,255,255,0.07);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.125rem;
}

.footer-copy { font-size: 0.875rem; color: var(--text-secondary); }

.footer-links { display: flex; gap: 1.75rem; }

.footer-links a {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s;
}
.footer-links a:hover { color: var(--brand-cyan); }

/* ----- Legal pages ----- */
.legal-page {
  max-width: 760px;
  margin: 0 auto;
  padding: 4rem 2rem 6rem;
}

.legal-page h1 {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 800;
  background: linear-gradient(135deg, var(--brand-cyan), var(--brand-purple));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.legal-meta {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 3rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}

.legal-page h2 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 2rem 0 0.875rem;
}

.legal-page h3 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--brand-cyan);
  margin: 1.5rem 0 0.625rem;
}

.legal-page p {
  color: var(--text-secondary);
  line-height: 1.85;
  margin-bottom: 1rem;
  font-size: 0.9375rem;
}

.legal-page ul, .legal-page ol {
  color: var(--text-secondary);
  line-height: 1.85;
  margin-bottom: 1rem;
  padding-left: 1.5rem;
  font-size: 0.9375rem;
}

.legal-page li { margin-bottom: 0.375rem; }

/* ----- 404 ----- */
.not-found {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
}

.not-found-code {
  font-size: clamp(5rem, 15vw, 9rem);
  font-weight: 900;
  background: linear-gradient(135deg, var(--brand-cyan), var(--brand-purple));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 1rem;
}

.not-found h1 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
}

.not-found p {
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.not-found a {
  color: var(--brand-cyan);
  text-decoration: none;
  font-weight: 600;
}
.not-found a:hover { text-decoration: underline; }

/* ----- Animations ----- */
.animate {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.65s ease, transform 0.65s ease;
}
.animate.visible { opacity: 1; transform: translateY(0); }

/* ----- Responsive ----- */
@media (max-width: 768px) {
  .nav { padding: 1rem 1.25rem; }
  .hero { padding: 2.5rem 1.25rem; min-height: 80vh; }
  .hero-icon { width: 80px; height: 80px; border-radius: 18px; }
  .features { padding: 3rem 1.25rem; }
  .privacy-section { padding: 3.5rem 1.25rem; }
  .footer { padding: 2rem 1.25rem; }
  .legal-page { padding: 2.5rem 1.25rem 4rem; }
}
```

- [ ] **Step 2: Verify file saved**

```bash
wc -l assets/css/style.css
```

Expected: 200+ lines.

- [ ] **Step 3: Commit**

```bash
git add assets/css/style.css
git commit -m "feat: add shared CSS with brand palette"
```

---

## Task 4: main.js

**Files:**
- Create: `assets/js/main.js`

- [ ] **Step 1: Write main.js**

```js
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.animate').forEach((el) => observer.observe(el));
});
```

- [ ] **Step 2: Commit**

```bash
git add assets/js/main.js
git commit -m "feat: add Intersection Observer scroll animations"
```

---

## Task 5: 繁中 Landing Page

**Files:**
- Create: `index.html`

- [ ] **Step 1: Write index.html**

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Keyly - AI 注音鍵盤 | 隱私優先的 iOS 鍵盤</title>
  <meta name="description" content="Keyly 是 iOS 上的 AI 注音鍵盤，由 Apple Intelligence 驅動，完全離線處理，零資料收集。">
  <link rel="canonical" href="https://keylyapp.com/">
  <link rel="alternate" hreflang="zh-TW" href="https://keylyapp.com/">
  <link rel="alternate" hreflang="en"    href="https://keylyapp.com/en/">
  <link rel="alternate" hreflang="x-default" href="https://keylyapp.com/">
  <link rel="icon" href="/assets/images/icon.png">

  <!-- Open Graph -->
  <meta property="og:title"       content="Keyly - AI 注音鍵盤">
  <meta property="og:description" content="由 Apple Intelligence 驅動，完全離線，零資料收集。">
  <meta property="og:url"         content="https://keylyapp.com/">
  <meta property="og:image"       content="https://keylyapp.com/assets/images/og-banner.png">
  <meta property="og:image:width"  content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:type"        content="website">
  <meta name="twitter:card"       content="summary_large_image">
  <!-- Replace REPLACE_WITH_TOKEN after adding site to Google Search Console (Task 13 Step 6) -->
  <!-- <meta name="google-site-verification" content="REPLACE_WITH_TOKEN"> -->

  <!-- Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Keyly",
    "url": "https://keylyapp.com",
    "operatingSystem": "iOS",
    "applicationCategory": "UtilitiesApplication",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  }
  </script>

  <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>

  <nav class="nav">
    <span class="nav-brand">Keyly</span>
    <div class="lang-toggle">
      <a href="/en/" class="lang-btn">EN</a>
      <span class="lang-current">中文</span>
    </div>
  </nav>

  <section class="hero">
    <div class="hero-content animate">
      <img src="/assets/images/icon.png" alt="Keyly App Icon" class="hero-icon">
      <h1 class="hero-title">Keyly</h1>
      <p class="hero-tagline">AI 加持的注音鍵盤，完全在你的裝置上</p>
      <p class="hero-sub">由 Apple Intelligence 驅動・完全離線・零資料收集</p>
      <a href="#" class="cta-btn" aria-disabled="true">即將推出，敬請期待</a>
    </div>
  </section>

  <section class="features">
    <div class="features-grid">
      <div class="card animate">
        <div class="card-icon">🤖</div>
        <h2 class="card-title">AI 文字優化</h2>
        <p class="card-desc">由 Apple Intelligence 驅動，完全在裝置上處理。智慧重寫與潤飾你的文字，不需要網路連線。</p>
      </div>
      <div class="card animate">
        <div class="card-icon">⌨️</div>
        <h2 class="card-title">注音輸入</h2>
        <p class="card-desc">完整的第三方注音鍵盤，支援所有符號、數字、大小寫切換，以及 Shift / Caps Lock。</p>
      </div>
      <div class="card animate">
        <div class="card-icon">🔒</div>
        <h2 class="card-title">零資料收集</h2>
        <p class="card-desc">不追蹤、不遙測，不要求「完整存取」權限。你的鍵入內容，只有你知道。符合 GDPR 與 CCPA。</p>
      </div>
    </div>
  </section>

  <section class="privacy-section">
    <div class="privacy-content animate">
      <div class="privacy-badge">🔐</div>
      <h2 class="privacy-title">100% 離線處理</h2>
      <p class="privacy-desc">所有 AI 運算完全在你的 iPhone 上執行，數據不離開你的裝置。沒有伺服器，沒有雲端，沒有例外。</p>
    </div>
  </section>

  <footer class="footer">
    <p class="footer-copy">© 2026 Keyly. All rights reserved.</p>
    <nav class="footer-links">
      <a href="/privacy/">隱私政策</a>
      <a href="/terms/">服務條款</a>
    </nav>
    <div class="lang-toggle">
      <a href="/en/" class="lang-btn">EN</a>
      <span class="lang-current">中文</span>
    </div>
  </footer>

  <script src="/assets/js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Open in browser and verify**

```bash
open index.html
```

Check: hero section visible, cards visible, gradient background, CTA button appears disabled (muted), language toggle shows "EN" link.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add zh-TW landing page"
```

---

## Task 6: EN Landing Page

**Files:**
- Create: `en/index.html`

- [ ] **Step 1: Write en/index.html**

Identical structure to Task 5 `index.html` with these differences:
- `<html lang="en">`
- Title: `Keyly — AI-Powered Zhuyin Keyboard for iOS`
- Description: `Keyly is an AI-powered Zhuyin keyboard for iOS, driven by Apple Intelligence. 100% on-device. Zero data collection.`
- `<link rel="canonical" href="https://keylyapp.com/en/">`
- hreflang: `zh-TW` → `https://keylyapp.com/`, `en` → `https://keylyapp.com/en/`, `x-default` → `https://keylyapp.com/`
- `og:url`: `https://keylyapp.com/en/`
- Nav lang toggle: `<span class="lang-current">EN</span>` + `<a href="/" class="lang-btn">中文</a>`
- Hero tagline: `The AI-powered Zhuyin keyboard. Fully on-device.`
- Hero sub: `Powered by Apple Intelligence · Fully Offline · Zero Data Collection`
- CTA: `Coming Soon`
- Cards:
  - `AI Text Rewriting` — "Powered by Apple Intelligence, processed entirely on your device. Intelligently rewrites and refines your text — no internet required."
  - `Zhuyin Input` — "A full third-party Bopomofo keyboard with complete symbol, number, and case support including Shift and Caps Lock."
  - `Zero Data Collection` — "No tracking, no telemetry, no Full Access required. What you type stays on your device. GDPR & CCPA compliant."
- Privacy section: `100% On-Device Processing` — "All AI computation runs entirely on your iPhone. Your data never leaves your device. No servers, no cloud, no exceptions."
- Footer links: `Privacy Policy` (→ `/privacy/en/`) + `Terms of Service` (→ `/terms/en/`)
- Footer lang toggle: `<span class="lang-current">EN</span>` + `<a href="/" class="lang-btn">中文</a>`
- JSON-LD: same, `"url": "https://keylyapp.com"` (not the /en/ URL — the canonical app URL)
- All asset paths unchanged (`/assets/...`)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Keyly — AI-Powered Zhuyin Keyboard for iOS</title>
  <meta name="description" content="Keyly is an AI-powered Zhuyin keyboard for iOS, driven by Apple Intelligence. 100% on-device. Zero data collection.">
  <link rel="canonical" href="https://keylyapp.com/en/">
  <link rel="alternate" hreflang="zh-TW" href="https://keylyapp.com/">
  <link rel="alternate" hreflang="en"    href="https://keylyapp.com/en/">
  <link rel="alternate" hreflang="x-default" href="https://keylyapp.com/">
  <link rel="icon" href="/assets/images/icon.png">

  <meta property="og:title"       content="Keyly — AI-Powered Zhuyin Keyboard">
  <meta property="og:description" content="Powered by Apple Intelligence. 100% on-device. Zero data collection.">
  <meta property="og:url"         content="https://keylyapp.com/en/">
  <meta property="og:image"       content="https://keylyapp.com/assets/images/og-banner.png">
  <meta property="og:image:width"  content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:type"        content="website">
  <meta name="twitter:card"       content="summary_large_image">

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Keyly",
    "url": "https://keylyapp.com",
    "operatingSystem": "iOS",
    "applicationCategory": "UtilitiesApplication",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  }
  </script>

  <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>

  <nav class="nav">
    <span class="nav-brand">Keyly</span>
    <div class="lang-toggle">
      <a href="/" class="lang-btn">中文</a>
      <span class="lang-current">EN</span>
    </div>
  </nav>

  <section class="hero">
    <div class="hero-content animate">
      <img src="/assets/images/icon.png" alt="Keyly App Icon" class="hero-icon">
      <h1 class="hero-title">Keyly</h1>
      <p class="hero-tagline">The AI-powered Zhuyin keyboard. Fully on-device.</p>
      <p class="hero-sub">Powered by Apple Intelligence · Fully Offline · Zero Data Collection</p>
      <a href="#" class="cta-btn" aria-disabled="true">Coming Soon</a>
    </div>
  </section>

  <section class="features">
    <div class="features-grid">
      <div class="card animate">
        <div class="card-icon">🤖</div>
        <h2 class="card-title">AI Text Rewriting</h2>
        <p class="card-desc">Powered by Apple Intelligence, processed entirely on your device. Intelligently rewrites and refines your text — no internet required.</p>
      </div>
      <div class="card animate">
        <div class="card-icon">⌨️</div>
        <h2 class="card-title">Zhuyin Input</h2>
        <p class="card-desc">A full third-party Bopomofo keyboard with complete symbol, number, and case support including Shift and Caps Lock.</p>
      </div>
      <div class="card animate">
        <div class="card-icon">🔒</div>
        <h2 class="card-title">Zero Data Collection</h2>
        <p class="card-desc">No tracking, no telemetry, no Full Access required. What you type stays on your device. GDPR &amp; CCPA compliant.</p>
      </div>
    </div>
  </section>

  <section class="privacy-section">
    <div class="privacy-content animate">
      <div class="privacy-badge">🔐</div>
      <h2 class="privacy-title">100% On-Device Processing</h2>
      <p class="privacy-desc">All AI computation runs entirely on your iPhone. Your data never leaves your device. No servers, no cloud, no exceptions.</p>
    </div>
  </section>

  <footer class="footer">
    <p class="footer-copy">© 2026 Keyly. All rights reserved.</p>
    <nav class="footer-links">
      <a href="/privacy/en/">Privacy Policy</a>
      <a href="/terms/en/">Terms of Service</a>
    </nav>
    <div class="lang-toggle">
      <a href="/" class="lang-btn">中文</a>
      <span class="lang-current">EN</span>
    </div>
  </footer>

  <script src="/assets/js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Open in browser and verify**

```bash
open en/index.html
```

Check: all text is in English, lang toggle shows "中文" link.

- [ ] **Step 3: Commit**

```bash
git add en/index.html
git commit -m "feat: add EN landing page"
```

---

## Task 7: sitemap.xml

**Files:**
- Create: `sitemap.xml`

- [ ] **Step 1: Write sitemap.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://keylyapp.com/</loc>
    <lastmod>2026-03-19</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://keylyapp.com/en/</loc>
    <lastmod>2026-03-19</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://keylyapp.com/privacy/</loc>
    <lastmod>2026-03-19</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://keylyapp.com/privacy/en/</loc>
    <lastmod>2026-03-19</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://keylyapp.com/terms/</loc>
    <lastmod>2026-03-19</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://keylyapp.com/terms/en/</loc>
    <lastmod>2026-03-19</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>
```

- [ ] **Step 2: Commit**

```bash
git add sitemap.xml
git commit -m "feat: add sitemap.xml"
```

---

## Task 8: 繁中 Privacy Policy

**Files:**
- Create: `privacy/index.html`

Content adapted from `/Users/deanchung/Documents/keyly/PRIVACY.md`.

- [ ] **Step 1: Write privacy/index.html**

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>隱私政策 — Keyly</title>
  <meta name="description" content="Keyly 隱私政策：我們不收集、不儲存、不傳輸您的任何數據。">
  <link rel="canonical" href="https://keylyapp.com/privacy/">
  <link rel="alternate" hreflang="zh-TW" href="https://keylyapp.com/privacy/">
  <link rel="alternate" hreflang="en"    href="https://keylyapp.com/privacy/en/">
  <link rel="alternate" hreflang="x-default" href="https://keylyapp.com/privacy/">
  <link rel="icon" href="/assets/images/icon.png">
  <meta property="og:title"       content="隱私政策 — Keyly">
  <meta property="og:description" content="Keyly 隱私政策：我們不收集、不儲存、不傳輸您的任何數據。">
  <meta property="og:url"         content="https://keylyapp.com/privacy/">
  <meta property="og:image"       content="https://keylyapp.com/assets/images/og-banner.png">
  <meta property="og:type"        content="website">
  <meta name="twitter:card"       content="summary_large_image">
  <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>

  <nav class="nav">
    <a href="/" class="nav-brand">Keyly</a>
    <div class="lang-toggle">
      <a href="/privacy/en/" class="lang-btn">EN</a>
      <span class="lang-current">中文</span>
    </div>
  </nav>

  <main class="legal-page">
    <h1>隱私政策</h1>
    <p class="legal-meta">最後更新日期：2026年2月14日</p>

    <h2>概述</h2>
    <p>Keyly 是一個注重隱私的 iOS 鍵盤應用程式。本 App 的設計理念是<strong>完全不收集、不儲存、不傳輸任何用戶數據</strong>。</p>

    <h2>核心隱私承諾</h2>

    <h3>1. 零數據收集</h3>
    <p>本 App 不會收集以下任何數據：</p>
    <ul>
      <li>您輸入的文字內容</li>
      <li>您的按鍵記錄</li>
      <li>您的使用習慣</li>
      <li>您的個人資訊</li>
      <li>您的設備資訊</li>
      <li>您的位置資訊</li>
      <li>任何其他形式的數據</li>
    </ul>

    <h3>2. 完全離線處理</h3>
    <ul>
      <li>所有 AI 處理都在您的設備上本地完成</li>
      <li>使用 Apple Intelligence 技術，數據不離開您的設備</li>
      <li>不需要網路連接即可使用 AI 功能</li>
      <li>不會將任何數據上傳到伺服器</li>
    </ul>

    <h3>3. 不要求完全訪問權限</h3>
    <p>本 App 不要求「允許完全訪問」權限。鍵盤擴展在沙盒環境中運行，無法訪問網路或您的其他 App 數據。</p>

    <h2>技術說明</h2>

    <h3>Apple Intelligence</h3>
    <p>本 App 使用 Apple Intelligence 提供 AI 輔助輸入功能。所有 AI 處理都在設備上完成，不會將數據發送到任何伺服器，完全符合 Apple 的隱私標準。</p>

    <h3>App Groups</h3>
    <p>本 App 使用 App Groups 功能讓主 App 和鍵盤擴展共享必要的配置數據（如用戶偏好設定）。這些數據僅存儲在您的設備上，不包含任何輸入內容，不會被上傳或分享給任何第三方。</p>

    <h2>數據安全</h2>
    <p>由於本 App 不收集任何數據，因此沒有數據洩露、被攻擊或被第三方訪問的風險。您的隱私得到最大程度的保護。</p>

    <h2>第三方服務</h2>
    <p>本 App 不使用任何第三方分析、廣告或追蹤服務，包括 Google Analytics、Facebook SDK、任何廣告網路或數據分析服務。</p>

    <h2>兒童隱私</h2>
    <p>本 App 適合所有年齡層使用。由於我們不收集任何數據，因此不會收集兒童的個人資訊。</p>

    <h2>您的權利</h2>
    <p>由於本 App 不收集任何數據，不存在數據訪問、刪除、更正或可攜性請求的情況。</p>

    <h2>隱私政策變更</h2>
    <p>如果我們對本隱私政策進行任何重大變更，我們將在 App 中通知您，並更新本文件的「最後更新日期」。</p>

    <h2>聯絡我們</h2>
    <p>如果您對本隱私政策有任何疑問，請透過 App Store 的 App 支援頁面聯絡我們。</p>

    <h2>法律依據</h2>
    <p>本隱私政策符合歐盟一般數據保護規範（GDPR）、加州消費者隱私法（CCPA）及 Apple App Store 審核指南的要求。</p>
  </main>

  <footer class="footer">
    <p class="footer-copy">© 2026 Keyly. All rights reserved.</p>
    <nav class="footer-links">
      <a href="/privacy/">隱私政策</a>
      <a href="/terms/">服務條款</a>
    </nav>
    <div class="lang-toggle">
      <a href="/privacy/en/" class="lang-btn">EN</a>
      <span class="lang-current">中文</span>
    </div>
  </footer>

</body>
</html>
```

- [ ] **Step 2: Open in browser and verify**

```bash
open privacy/index.html
```

Check: styled correctly, nav brand links back to `/`, content readable.

- [ ] **Step 3: Commit**

```bash
git add privacy/index.html
git commit -m "feat: add zh-TW privacy policy page"
```

---

## Task 9: EN Privacy Policy

**Files:**
- Create: `privacy/en/index.html`

- [ ] **Step 1: Write privacy/en/index.html**

Same structure as Task 8 with:
- `<html lang="en">`
- Title: `Privacy Policy — Keyly`
- `<link rel="canonical" href="https://keylyapp.com/privacy/en/">`
- hreflang: same pair, `x-default` → `https://keylyapp.com/privacy/`
- `og:url`: `https://keylyapp.com/privacy/en/`
- Nav lang toggle: `<a href="/privacy/" class="lang-btn">中文</a>` + `<span class="lang-current">EN</span>`
- All content translated to English (mirror the zh-TW structure)
- Footer lang toggle: links to `/privacy/` (中文) and `/terms/en/` (terms)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Privacy Policy — Keyly</title>
  <meta name="description" content="Keyly Privacy Policy: we do not collect, store, or transmit any user data.">
  <link rel="canonical" href="https://keylyapp.com/privacy/en/">
  <link rel="alternate" hreflang="zh-TW" href="https://keylyapp.com/privacy/">
  <link rel="alternate" hreflang="en"    href="https://keylyapp.com/privacy/en/">
  <link rel="alternate" hreflang="x-default" href="https://keylyapp.com/privacy/">
  <link rel="icon" href="/assets/images/icon.png">
  <meta property="og:title"       content="Privacy Policy — Keyly">
  <meta property="og:description" content="Keyly Privacy Policy: we do not collect, store, or transmit any user data.">
  <meta property="og:url"         content="https://keylyapp.com/privacy/en/">
  <meta property="og:image"       content="https://keylyapp.com/assets/images/og-banner.png">
  <meta property="og:type"        content="website">
  <meta name="twitter:card"       content="summary_large_image">
  <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>

  <nav class="nav">
    <a href="/en/" class="nav-brand">Keyly</a>
    <div class="lang-toggle">
      <a href="/privacy/" class="lang-btn">中文</a>
      <span class="lang-current">EN</span>
    </div>
  </nav>

  <main class="legal-page">
    <h1>Privacy Policy</h1>
    <p class="legal-meta">Last updated: February 14, 2026</p>

    <h2>Overview</h2>
    <p>Keyly is a privacy-focused iOS keyboard app. This app is designed to <strong>never collect, store, or transmit any user data</strong>.</p>

    <h2>Core Privacy Commitments</h2>

    <h3>1. Zero Data Collection</h3>
    <p>This app does not collect any of the following:</p>
    <ul>
      <li>Text you type</li>
      <li>Keystroke logs</li>
      <li>Usage patterns</li>
      <li>Personal information</li>
      <li>Device information</li>
      <li>Location information</li>
      <li>Any other form of data</li>
    </ul>

    <h3>2. Fully Offline Processing</h3>
    <ul>
      <li>All AI processing is performed locally on your device</li>
      <li>Apple Intelligence technology keeps your data on-device</li>
      <li>AI features work without an internet connection</li>
      <li>No data is ever uploaded to any server</li>
    </ul>

    <h3>3. No Full Access Required</h3>
    <p>This app does not request "Allow Full Access" permission. The keyboard extension runs in a sandboxed environment with no network access and no access to other app data.</p>

    <h2>Technical Details</h2>

    <h3>Apple Intelligence</h3>
    <p>This app uses Apple Intelligence for AI-assisted input. All AI processing occurs on-device and no data is sent to any server, fully complying with Apple's privacy standards.</p>

    <h3>App Groups</h3>
    <p>This app uses App Groups to share configuration data (such as user preferences) between the main app and the keyboard extension. This data is stored only on your device, contains no input content, and is never uploaded or shared with any third party.</p>

    <h2>Data Security</h2>
    <p>Because this app collects no data, there is no risk of data breach, attack, or third-party access. Your privacy is protected to the maximum extent possible.</p>

    <h2>Third-Party Services</h2>
    <p>This app does not use any third-party analytics, advertising, or tracking services, including Google Analytics, Facebook SDK, ad networks, or data analytics platforms.</p>

    <h2>Children's Privacy</h2>
    <p>This app is suitable for all ages. Because we collect no data, we do not collect personal information from children.</p>

    <h2>Your Rights</h2>
    <p>Because this app collects no data, there are no data access, deletion, correction, or portability requests to fulfill.</p>

    <h2>Policy Changes</h2>
    <p>If we make any significant changes to this privacy policy, we will notify you in the app and update the "last updated" date.</p>

    <h2>Contact Us</h2>
    <p>If you have any questions about this privacy policy, please contact us via the App Support page on the App Store.</p>

    <h2>Legal Basis</h2>
    <p>This privacy policy complies with the EU General Data Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA), and the Apple App Store Review Guidelines.</p>
  </main>

  <footer class="footer">
    <p class="footer-copy">© 2026 Keyly. All rights reserved.</p>
    <nav class="footer-links">
      <a href="/privacy/en/">Privacy Policy</a>
      <a href="/terms/en/">Terms of Service</a>
    </nav>
    <div class="lang-toggle">
      <a href="/privacy/" class="lang-btn">中文</a>
      <span class="lang-current">EN</span>
    </div>
  </footer>

</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add privacy/en/index.html
git commit -m "feat: add EN privacy policy page"
```

---

## Task 10: 繁中 Terms of Service

**Files:**
- Create: `terms/index.html`

- [ ] **Step 1: Write terms/index.html**

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>服務條款 — Keyly</title>
  <meta name="description" content="Keyly 服務條款。">
  <link rel="canonical" href="https://keylyapp.com/terms/">
  <link rel="alternate" hreflang="zh-TW" href="https://keylyapp.com/terms/">
  <link rel="alternate" hreflang="en"    href="https://keylyapp.com/terms/en/">
  <link rel="alternate" hreflang="x-default" href="https://keylyapp.com/terms/">
  <link rel="icon" href="/assets/images/icon.png">
  <meta property="og:title"       content="服務條款 — Keyly">
  <meta property="og:description" content="Keyly 服務條款。">
  <meta property="og:url"         content="https://keylyapp.com/terms/">
  <meta property="og:image"       content="https://keylyapp.com/assets/images/og-banner.png">
  <meta property="og:type"        content="website">
  <meta name="twitter:card"       content="summary_large_image">
  <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>

  <nav class="nav">
    <a href="/" class="nav-brand">Keyly</a>
    <div class="lang-toggle">
      <a href="/terms/en/" class="lang-btn">EN</a>
      <span class="lang-current">中文</span>
    </div>
  </nav>

  <main class="legal-page">
    <h1>服務條款</h1>
    <p class="legal-meta">最後更新日期：2026年3月19日</p>

    <h2>接受條款</h2>
    <p>下載或使用 Keyly（以下簡稱「本 App」），即表示您同意遵守本服務條款。如您不同意，請勿使用本 App。</p>

    <h2>服務說明</h2>
    <p>Keyly 是一款免費的 iOS 自訂鍵盤應用程式，提供注音輸入與 AI 文字優化功能。本 App 目前免費提供，我們保留未來調整定價的權利，並會提前通知用戶。</p>

    <h2>使用規範</h2>
    <p>您同意不以任何非法或本條款禁止的方式使用本 App，且不得嘗試干擾本 App 的正常運作。</p>

    <h2>智慧財產權</h2>
    <p>本 App 及其所有相關內容（包含設計、程式碼、商標）均屬開發者所有，受著作權法保護。未經授權，不得複製、修改或散布。</p>

    <h2>免責聲明</h2>
    <p>本 App 以「現狀」提供，不附帶任何明示或暗示的保證。我們不保證本 App 不會中斷或無錯誤，亦不對因使用本 App 造成的任何損失負責。</p>

    <h2>責任限制</h2>
    <p>在法律允許的最大範圍內，開發者對任何間接、附帶、特殊或後果性損害不承擔責任。</p>

    <h2>第三方服務</h2>
    <p>本 App 依賴 Apple 的 iOS 平台及 App Store 發行。您使用本 App 亦須遵守 Apple 的服務條款與使用指南。</p>

    <h2>條款修改</h2>
    <p>我們保留隨時修改本服務條款的權利。重大變更將透過 App 通知或更新本頁面的「最後更新日期」告知。繼續使用本 App 即表示您接受修改後的條款。</p>

    <h2>準據法</h2>
    <p>本條款受中華民國（台灣）法律管轄，相關爭議以台灣法院為管轄法院。</p>

    <h2>聯絡我們</h2>
    <p>如對本服務條款有任何疑問，請透過 App Store 的 App 支援頁面聯絡我們。</p>
  </main>

  <footer class="footer">
    <p class="footer-copy">© 2026 Keyly. All rights reserved.</p>
    <nav class="footer-links">
      <a href="/privacy/">隱私政策</a>
      <a href="/terms/">服務條款</a>
    </nav>
    <div class="lang-toggle">
      <a href="/terms/en/" class="lang-btn">EN</a>
      <span class="lang-current">中文</span>
    </div>
  </footer>

</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add terms/index.html
git commit -m "feat: add zh-TW terms of service page"
```

---

## Task 11: EN Terms of Service

**Files:**
- Create: `terms/en/index.html`

- [ ] **Step 1: Write terms/en/index.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Terms of Service — Keyly</title>
  <meta name="description" content="Keyly Terms of Service.">
  <link rel="canonical" href="https://keylyapp.com/terms/en/">
  <link rel="alternate" hreflang="zh-TW" href="https://keylyapp.com/terms/">
  <link rel="alternate" hreflang="en"    href="https://keylyapp.com/terms/en/">
  <link rel="alternate" hreflang="x-default" href="https://keylyapp.com/terms/">
  <link rel="icon" href="/assets/images/icon.png">
  <meta property="og:title"       content="Terms of Service — Keyly">
  <meta property="og:description" content="Keyly Terms of Service.">
  <meta property="og:url"         content="https://keylyapp.com/terms/en/">
  <meta property="og:image"       content="https://keylyapp.com/assets/images/og-banner.png">
  <meta property="og:type"        content="website">
  <meta name="twitter:card"       content="summary_large_image">
  <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>

  <nav class="nav">
    <a href="/en/" class="nav-brand">Keyly</a>
    <div class="lang-toggle">
      <a href="/terms/" class="lang-btn">中文</a>
      <span class="lang-current">EN</span>
    </div>
  </nav>

  <main class="legal-page">
    <h1>Terms of Service</h1>
    <p class="legal-meta">Last updated: March 19, 2026</p>

    <h2>Acceptance of Terms</h2>
    <p>By downloading or using Keyly (the "App"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the App.</p>

    <h2>Description of Service</h2>
    <p>Keyly is a free iOS custom keyboard app providing Zhuyin input and AI text optimization. The App is currently provided free of charge. We reserve the right to adjust pricing in the future and will notify users in advance.</p>

    <h2>Acceptable Use</h2>
    <p>You agree not to use the App for any unlawful purpose or in any way prohibited by these Terms, and not to attempt to interfere with the App's normal operation.</p>

    <h2>Intellectual Property</h2>
    <p>The App and all associated content (including design, code, and trademarks) are owned by the developer and protected by copyright law. Unauthorized reproduction, modification, or distribution is prohibited.</p>

    <h2>Disclaimer of Warranties</h2>
    <p>The App is provided "as is" without warranties of any kind, express or implied. We do not guarantee that the App will be uninterrupted or error-free, and we are not liable for any losses arising from your use of the App.</p>

    <h2>Limitation of Liability</h2>
    <p>To the maximum extent permitted by law, the developer shall not be liable for any indirect, incidental, special, or consequential damages.</p>

    <h2>Third-Party Services</h2>
    <p>The App relies on Apple's iOS platform and App Store distribution. Your use of the App is also subject to Apple's terms of service and usage guidelines.</p>

    <h2>Changes to Terms</h2>
    <p>We reserve the right to modify these Terms at any time. Material changes will be communicated via the App or by updating the "last updated" date on this page. Continued use of the App constitutes acceptance of the revised Terms.</p>

    <h2>Governing Law</h2>
    <p>These Terms are governed by the laws of the Republic of China (Taiwan). Any disputes shall be subject to the jurisdiction of courts in Taiwan.</p>

    <h2>Contact Us</h2>
    <p>If you have any questions about these Terms, please contact us via the App Support page on the App Store.</p>
  </main>

  <footer class="footer">
    <p class="footer-copy">© 2026 Keyly. All rights reserved.</p>
    <nav class="footer-links">
      <a href="/privacy/en/">Privacy Policy</a>
      <a href="/terms/en/">Terms of Service</a>
    </nav>
    <div class="lang-toggle">
      <a href="/terms/" class="lang-btn">中文</a>
      <span class="lang-current">EN</span>
    </div>
  </footer>

</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add terms/en/index.html
git commit -m "feat: add EN terms of service page"
```

---

## Task 12: 404 Page

**Files:**
- Create: `404.html`

- [ ] **Step 1: Write 404.html**

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>404 — Keyly</title>
  <link rel="icon" href="/assets/images/icon.png">
  <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>

  <nav class="nav">
    <a href="/" class="nav-brand">Keyly</a>
  </nav>

  <div class="not-found">
    <div class="not-found-code">404</div>
    <h1>找不到頁面 / Page Not Found</h1>
    <p>這個頁面不存在或已被移除。<br>This page does not exist or has been removed.</p>
    <a href="/">← 返回首頁 / Back to Home</a>
  </div>

</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add 404.html
git commit -m "feat: add branded 404 page"
```

---

## Task 13: GitHub Pages Setup

- [ ] **Step 1: Push to GitHub**

If the remote doesn't exist yet, create repo on GitHub first (name: `keyly-website`), then:

```bash
git remote add origin https://github.com/<your-username>/keyly-website.git
git push -u origin main
```

- [ ] **Step 2: Enable GitHub Pages**

1. Go to GitHub repo → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: `main` / root `/`
4. Click **Save**

- [ ] **Step 3: Configure Cloudflare DNS**

In Cloudflare DNS dashboard for `keylyapp.com`, add these records (all with **DNS-only / grey cloud**):

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| A | `keylyapp.com` | `185.199.108.153` | DNS only |
| A | `keylyapp.com` | `185.199.109.153` | DNS only |
| A | `keylyapp.com` | `185.199.110.153` | DNS only |
| A | `keylyapp.com` | `185.199.111.153` | DNS only |
| CNAME | `www` | `<your-username>.github.io` | DNS only |

- [ ] **Step 4: Verify custom domain on GitHub**

Back in GitHub Pages settings:
- Enter `keylyapp.com` in the **Custom domain** field and click **Save**
- Wait for DNS check to pass (can take a few minutes)
- Check **Enforce HTTPS** once the certificate is provisioned

- [ ] **Step 5: Verify site is live**

```bash
curl -I https://keylyapp.com/
```

Expected: `HTTP/2 200` with `content-type: text/html`

- [ ] **Step 6: Submit sitemap to Google Search Console**

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property: `keylyapp.com`
3. Verify ownership via HTML tag method:
   - Get the verification token from Search Console
   - Open `index.html`, find the commented-out `google-site-verification` line, replace `REPLACE_WITH_TOKEN` with the real token, then uncomment it
   - `git add index.html && git commit -m "chore: add Google Search Console verification tag" && git push`
4. Submit sitemap: `https://keylyapp.com/sitemap.xml`

---

## Final Checklist

- [ ] All 6 pages open correctly in browser
- [ ] Language toggles navigate between correct sibling pages
- [ ] Scroll animations fire on all `.animate` elements
- [ ] CTA button appears visually disabled
- [ ] `https://keylyapp.com/` returns 200
- [ ] `https://keylyapp.com/404-test` returns 404 with branded page
- [ ] Sitemap is accessible at `https://keylyapp.com/sitemap.xml`
- [ ] OG preview looks correct (test with [opengraph.xyz](https://www.opengraph.xyz))
