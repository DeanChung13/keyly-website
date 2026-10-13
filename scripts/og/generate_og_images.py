#!/usr/bin/env python3
"""
Generate 1200x630 Open Graph (OG) banner images for Keyly Guides.
Uses macOS Google Chrome headless mode to capture pixel-perfect PNGs.
"""

import os
import subprocess
import tempfile

CHROME_BIN = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
OUTPUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../public/assets/images/og"))

CARDS = [
    {
        "slug": "iphone-zhuyin-keyboard",
        "tag": "實用指南 · 鍵盤推薦",
        "title": "iPhone 注音鍵盤推薦",
        "subtitle": "iOS 內建與 5 款第三方鍵盤完整評測與比較",
        "badge": "2026 最新評測",
    },
    {
        "slug": "iphone-zhuyin-selection-fixes",
        "tag": "實用指南 · 問題排查",
        "title": "iPhone 注音選字亂跳排查",
        "subtitle": "選字不準、自動修正怎麼解？7 個檢查排查順序",
        "badge": "設定排查步驟",
    },
    {
        "slug": "iphone-keyboard-haptics",
        "tag": "實用指南 · 系統設定",
        "title": "iPhone 鍵盤聲音與打字震動",
        "subtitle": "按鍵聲音開關、打字沒聲音與觸覺回饋完整排查",
        "badge": "iOS 16+ 設定",
    },
    {
        "slug": "iphone-ai-leave-request",
        "tag": "實用指南 · 萬用範本",
        "title": "得體請假訊息怎麼打？",
        "subtitle": "病假、事假、臨時急事回覆範本與 AI 改寫指南",
        "badge": "高情商範本庫",
    },
]

HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8">
<style>
  * {{ box-sizing: border-box; margin: 0; padding: 0; }}
  body {{
    width: 1200px;
    height: 630px;
    background-color: #0D142E;
    background-image: 
      radial-gradient(circle at 90% 12%, rgba(142, 97, 217, 0.28), transparent 45%),
      radial-gradient(circle at 8% 88%, rgba(71, 158, 209, 0.25), transparent 45%),
      radial-gradient(circle at 50% 50%, rgba(56, 199, 186, 0.08), transparent 60%);
    font-family: -apple-system, BlinkMacSystemFont, "PingFang TC", "Heiti TC", "Microsoft JhengHei", sans-serif;
    color: #FFFFFF;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 64px 80px;
    overflow: hidden;
    position: relative;
  }}

  /* Top Bar */
  .header {{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }}
  .brand {{
    display: flex;
    align-items: center;
    gap: 16px;
  }}
  .logo-box {{
    width: 52px;
    height: 52px;
    border-radius: 14px;
    background: #0D142E;
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
  }}
  .brand-text {{
    font-size: 32px;
    font-weight: 800;
    letter-spacing: -0.02em;
    background: linear-gradient(135deg, #479ED1 0%, #8E61D9 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }}
  .tag-pill {{
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 18px;
    border-radius: 999px;
    background: rgba(71, 158, 209, 0.12);
    border: 1px solid rgba(71, 158, 209, 0.35);
    color: #7DD3FC;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 0.04em;
  }}

  /* Main Body */
  .content {{
    margin-top: 10px;
    margin-bottom: 20px;
  }}
  .badge-label {{
    display: inline-block;
    color: #38C7BA;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 16px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }}
  .title {{
    font-size: 68px;
    font-weight: 900;
    line-height: 1.18;
    color: #FFFFFF;
    margin-bottom: 20px;
    letter-spacing: -0.01em;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
    word-break: keep-all;
  }}
  .subtitle {{
    font-size: 27px;
    font-weight: 500;
    line-height: 1.45;
    color: #BFCDE0;
    max-width: 980px;
  }}

  /* Footer */
  .footer {{
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid rgba(191, 205, 224, 0.16);
    padding-top: 24px;
    color: #8E9BAE;
    font-size: 20px;
    font-weight: 500;
  }}
  .footer-left {{
    display: flex;
    align-items: center;
    gap: 12px;
  }}
  .footer-url {{
    color: #479ED1;
    font-weight: 700;
  }}
</style>
</head>
<body>
  <div class="header">
    <div class="brand">
      <div class="logo-box">
        <svg width="34" height="34" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="stem" x1="30" y1="20" x2="30" y2="80" gradientUnits="userSpaceOnUse">
              <stop stop-color="#38C7BA"/>
              <stop offset="1" stop-color="#8E61D9"/>
            </linearGradient>
            <linearGradient id="arm" x1="75" y1="20" x2="40" y2="80" gradientUnits="userSpaceOnUse">
              <stop stop-color="#E6EBF2"/>
              <stop offset="1" stop-color="#BFCDE0"/>
            </linearGradient>
          </defs>
          <rect x="25" y="20" width="16" height="60" fill="url(#stem)"/>
          <path d="M75 20L41 50L75 80H55L31 50L55 20H75Z" fill="url(#arm)"/>
        </svg>
      </div>
      <div class="brand-text">Keyly</div>
    </div>
    <div class="tag-pill">{tag}</div>
  </div>

  <div class="content">
    <div class="badge-label">{badge}</div>
    <h1 class="title">{title}</h1>
    <p class="subtitle">{subtitle}</p>
  </div>

  <div class="footer">
    <div class="footer-left">
      <span>iPhone / iPad 繁體中文 AI 鍵盤</span>
      <span>·</span>
      <span>實機操作教學與評測</span>
    </div>
    <div class="footer-url">keylyapp.com</div>
  </div>
</body>
</html>
"""


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    if not os.path.exists(CHROME_BIN):
        raise FileNotFoundError(f"Chrome not found at {CHROME_BIN}")

    for card in CARDS:
        slug = card["slug"]
        html_content = HTML_TEMPLATE.format(
            tag=card["tag"],
            title=card["title"],
            subtitle=card["subtitle"],
            badge=card["badge"],
        )

        with tempfile.NamedTemporaryFile("w", suffix=".html", delete=False) as f:
            f.write(html_content)
            temp_html = f.name

        out_png = os.path.join(OUTPUT_DIR, f"{slug}.png")
        print(f"Generating OG image for {slug}...")

        cmd = [
            CHROME_BIN,
            "--headless",
            f"--screenshot={out_png}",
            "--window-size=1200,630",
            "--default-background-color=00000000",
            f"file://{temp_html}",
        ]
        res = subprocess.run(cmd, capture_output=True)
        os.unlink(temp_html)

        if not os.path.exists(out_png):
            print(f"Error generating {slug}: {res.stderr.decode()}")
            continue

        # Compress with pngquant if available
        if os.path.exists("/opt/homebrew/bin/pngquant"):
            subprocess.run(["/opt/homebrew/bin/pngquant", "--quality=80-95", "--ext", ".png", "--force", out_png], capture_output=True)

        file_size = os.path.getsize(out_png) / 1024
        print(f"✓ Created {out_png} ({file_size:.1f} KB)")


if __name__ == "__main__":
    main()
