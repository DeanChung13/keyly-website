# Keyly 社群 Prompt 廣場功能設計規格書 (Prompt Hub Design Spec)

> **任務編號**：[KEY-9](taskctl://issue/KEY-9)  
> **建立日期**：2026-09-24  
> **狀態**：規劃完成（已對齊架構決策，準備進入實作）  
> **關聯專案**：`keyly-website` (Web), `keyly` (iOS App), Supabase, Cloudflare Workers

---

## 一、 背景與核心目標

Keyly 是一款具備雲端 AI 文字轉換的 iOS 鍵盤輸入法。為進一步提升使用者黏著度、活化既有使用者創作動力，並藉由社群分享帶動外部新用戶獲取（Organic Growth），我們規劃建置 **「Keyly 社群 Prompt 廣場」**。

### 核心價值主張
1. **創作者激勵**：提供 iOS 使用者將私房自訂鍵盤指令公開分享的舞台，累積讚數、下載數與個人影響力。
2. **低門檻價值體驗**：訪客與潛在用戶透過清晰的 Before / After 改寫效果，在未安裝前就能秒懂 Keyly 鍵盤帶來的文字升級威力。
3. **無縫產品閉環**：Web 負責 SEO 曝光、公開瀏覽與社群傳播；App 負責身分認證、發布、按讚與「一鍵加入自訂鍵盤」。

---

## 二、 核心產品與架構決策（Decisions Recap）

經過腦力激盪與方案對齊，本功能的關鍵決策如下：

| 決策維度 | 拍板方案 | 設計動機與考量 |
| :--- | :--- | :--- |
| **發布入口** | **僅限由 Keyly iOS App 內發表** | 透過已登入的會員帳號發布，杜絕垃圾廣告與機器人，省去網頁端帳號系統負擔。 |
| **效果展示** | **純靜態 Before / After 對比** | 作者提交 1~2 組情境示範（改寫前 vs 改寫後）；網頁端不開放即時呼叫 AI，零 token 浪費、加載極速且對 SEO 友好。 |
| **按讚機制** | **僅限 iOS App 內操作** | 網頁端僅展示累積讚數，杜絕網頁刷票；將想互動的使用者導流回 App。 |
| **下載/安裝機制** | **點擊「安裝到 Keyly」累加** | Web 點擊「安裝到 Keyly」或 App 內導入時累加計數。 |
| **安裝導流體驗** | **智能分流（Universal Link + QR Code）** | iOS 瀏覽器點擊直接喚起 App 彈窗確認加入；桌面版跳出 QR Code 供掃碼，並附帶「複製 Prompt 內容」按鈕。 |
| **作者展示** | **專屬個人頁面 (`/creators/:username`)** | 具備獨立 URL，展示頭像、個人簡介、社群連結（X / Threads）及所有已發布作品與累計數據。 |
| **詳情頁面** | **專屬詳情頁 (`/prompts/:slug`)** | 獨立 URL，提供完整 OpenGraph 社交預覽卡、詳細 Before/After、提示詞範本與安裝按鈕。 |
| **廣場過濾** | **全功能篩選與搜尋** | 支援分類標籤（職場、社群、翻譯、反串等）、排序（最多下載、最高讚、最新）、關鍵字搜尋、語言切換。 |
| **內容審核** | **即時發布 + 檢舉隱藏機制** | 發布即時上架以維護社群活躍度；後台設定 `status: published \| hidden`，若違規可隨時下架。 |
| **技術方案** | **方案 A（Supabase + Cloudflare Workers）** | 延續現有後端技術棧，Worker 提供 Edge Caching 降載並支援動態 OpenGraph 標籤注入。 |

---

## 三、 資料庫設計 (Supabase Schema)

在現有 Supabase 資料庫建立 4 張核心表格與原子計數 RPC：

```sql
-- 1. 創作者資料表 (creators)
create table public.creators (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade unique,
  username text unique not null,          -- 用於 URL：/creators/:username (英數小寫與底線)
  display_name text not null,             -- 顯示暱稱
  avatar_url text,                        -- 頭像網址
  bio text,                               -- 個人簡介
  social_links jsonb default '{}'::jsonb, -- {"twitter": "...", "threads": "..."}
  total_prompts int default 0,            -- 累計發布數
  total_likes int default 0,              -- 累計獲讚數
  total_downloads int default 0,          -- 累計被安裝次數
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. Prompt 提示詞資料表 (prompts)
create table public.prompts (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid references public.creators(id) on delete cascade not null,
  slug text unique not null,              -- 網址友善代稱，例如 "high-eq-email-reply"
  title text not null,                    -- 標題，例如 "高情商職場回信"
  description text not null,              -- 簡短說明
  template text not null,                 -- 鍵盤 AI 實際執行的 prompt 指令模板
  category text not null,                 -- 主分類（職場 Email、社群文案、翻譯潤飾、長文摘要、幽默反串...）
  tags text[] default '{}',               -- 標籤陣列
  language text default 'zh-TW',          -- 適用語系 (zh-TW, en, ja...)
  
  -- Before / After 靜態效果示範
  examples jsonb not null default '[]'::jsonb,
  -- 範例結構：
  -- [
  --   {
  --     "title": "委婉推託加班",
  --     "before": "今天不行，我晚上有事要走",
  --     "after": "謝謝主管的通知。今晚已有既定的重要家庭安排，我會在明早第一時間優先處理這項進度。"
  --   }
  -- ]

  likes_count int default 0,
  downloads_count int default 0,
  status text default 'published',        -- 'published' | 'hidden'
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 3. 按讚紀錄表 (prompt_likes) - 僅限 App 內登入用戶互動
create table public.prompt_likes (
  user_id uuid references auth.users(id) on delete cascade,
  prompt_id uuid references public.prompts(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (user_id, prompt_id)
);

-- 4. 原子下載計數 RPC 函數
create or replace function increment_prompt_download(target_prompt_id uuid)
returns void as $$
begin
  update public.prompts
  set downloads_count = downloads_count + 1
  where id = target_prompt_id;

  update public.creators
  set total_downloads = total_downloads + 1
  where id = (select creator_id from public.prompts where id = target_prompt_id);
end;
$$ language plpgsql security definer;
```

---

## 四、 後端 API 設計 (Cloudflare Workers)

Cloudflare Worker 作為全站的 API Gateway，配置邊緣快取（Edge Cache）以達到全球毫秒級回應，同時保護 Supabase 連線數。

### 1. API 路由定義

#### `GET /api/prompts`
- **用途**：取得廣場 Prompt 列表
- **快取**：`Cache-Control: public, s-maxage=60, stale-while-revalidate=30`
- **Query 參數**：
  - `category` (可選)：篩選分類
  - `tag` (可選)：篩選標籤
  - `lang` (可選，預設 `all` 或 `zh-TW`)
  - `sort` (可選)：`downloads` (預設) | `popular` (按讚數) | `newest` (最新)
  - `search` (可選)：關鍵字搜尋標題或描述
  - `page`, `limit` (預設 20)
- **回應範例**：
  ```json
  {
    "data": [
      {
        "id": "e9b4...",
        "slug": "high-eq-email-reply",
        "title": "高情商職場回信",
        "description": "將生硬或易起衝突的直白回覆，轉化為得體且堅定專業的商務溝通。",
        "category": "職場 Email",
        "tags": ["職場", "回信", "高情商"],
        "language": "zh-TW",
        "likes_count": 342,
        "downloads_count": 1820,
        "creator": {
          "username": "dean",
          "display_name": "Dean",
          "avatar_url": "https://..."
        },
        "examples": [
          {
            "title": "委婉推託",
            "before": "今天不行，我晚上有事",
            "after": "謝謝通知，今晚已有既定重要行程，明晨第一時間將優先推進。"
          }
        ]
      }
    ],
    "total": 48,
    "page": 1,
    "has_more": true
  }
  ```

#### `GET /api/prompts/:id_or_slug`
- **用途**：取得單一 Prompt 詳細內容
- **快取**：`Cache-Control: public, s-maxage=120, stale-while-revalidate=60`
- **回應**：完整欄位（含 `template` 指令內容、完整 `examples` 清單、作者詳細資訊）。

#### `POST /api/prompts/:id/download`
- **用途**：觸發安裝計數
- **快取**：無快取，直接調用 `increment_prompt_download` RPC
- **回應**：`{ "success": true, "downloads_count": 1821 }`

#### `GET /api/creators/:username`
- **用途**：取得創作者資料與名下作品
- **快取**：`Cache-Control: public, s-maxage=120`
- **回應**：創作者 Profile（簡介、社群、總數據）+ Prompts 清單。

---

## 五、 前端頁面與元件架構 (`keyly-website`)

在現有 Vite + React 架構下擴充以下路由與元件模組：

### 1. 頁面路由規劃
- `/prompts`：**社群 Prompt 廣場首頁**
  - Hero 視覺區：標語、總 Prompt 數展示、搜尋列。
  - 分類篩選列：分類 Pills、排序 Dropdown、語言切換。
  - 卡片網格：響應式 Grid 排版。
- `/prompts/:slug`：**Prompt 獨立詳情頁**
  - 麵包屑導航。
  - 核心展示：Prompt 標題、作者 Badge、分類 Tag、總數據（讚數、下載數）。
  - **Before / After 效果對比區**：對照式卡片設計（左側 Before 灰色底、右側 After Keyly 主題高亮底）。
  - 安裝 CTA 區塊：顯眼的「安裝到 Keyly 鍵盤」主按鈕 + 輔助「複製 Prompt」按鈕。
  - 作者簡介卡片 + 該作者的其他熱門 Prompt。
- `/creators/:username`：**創作者個人主頁**
  - 作者 Profile 頂部：頭像、暱稱、Bio、社群外連按鈕（X / Threads）。
  - 榮譽成就數據盒：累計發布數、總獲讚數、總被下載數。
  - 作品列表：展示該作者發布的所有公開 Prompt。

### 2. 智慧導流元件 (`SmartInstallButton`)
針對點擊「下載 / 安裝到 Keyly」進行跨端智慧處理：
- **iOS 裝置檢測**：
  - 若偵測為 iOS Safari/Chrome，直接跳轉 Universal Link：`https://keylyapp.com/app/prompts/install?id={prompt_id}`（App 攔截後開啟快速加入對話框）。
  - 同時在背景非同步呼叫 `POST /api/prompts/:id/download`。
- **桌面版（macOS / Windows）**：
  - 點擊後彈出 `SmartInstallModal` 視窗：
    - 展示動態生成的 QR Code（掃碼即可在 iPhone 開啟安裝連結）。
    - 提供「複製 Prompt 內容」按鈕（點擊後複製 `template`，提示「已複製到剪貼簿」）。

---

## 六、 社群分享與 OpenGraph SEO 機制

為了讓用戶在 Threads、Twitter (X)、Facebook 或 LINE 分享 Prompt 連結時有精美的卡片預覽：

1. **Cloudflare Worker / Pages Function 中繼攔截**：
   - 當請求包含社群爬蟲 User-Agent（如 `Twitterbot`, `facebookexternalhit`, `LinkedInBot`）時，Worker 從 Supabase 快取中抓取該 Prompt 的標題、描述與作者資訊。
   - 動態替換 HTML 內的 `<meta property="og:title">`、`<meta property="og:description">` 與 `<meta property="og:image">` 後回傳。
2. **預覽卡內容規格**：
   - `og:title`：`{title}｜Keyly 鍵盤 AI 提示詞`
   - `og:description`：`作者：@{username} · 已被安裝 {downloads_count} 次 · {description}`
   - `og:image`：動態或品牌統一的 Prompt 效果圖。

---

## 七、 落地實作路線圖 (Implementation Roadmap)

| 階段 | 範圍 | 核心任務 |
| :--- | :--- | :--- |
| **Phase 1** | 資料庫與後端 | 1. 執行 Supabase 建表 migration 與 RPC 函數。<br>2. 撰寫 Cloudflare Workers API 路由 (`/api/prompts`, `/api/creators`) 與 Edge Cache 設定。 |
| **Phase 2** | Web 前端頁面 | 1. 實作 `/prompts` 廣場頁（搜尋、分類、排序、卡片網格）。<br>2. 實作 `/prompts/:slug` 詳情頁（Before/After 對比展示、SmartInstallButton）。<br>3. 實作 `/creators/:username` 作者頁。<br>4. 整合 Cloudflare Pages 動態 OG Meta 注入。 |
| **Phase 3** | iOS App 整合 | 1. App 內自訂指令增加「公開分享到廣場」按鈕。<br>2. App 支援 Universal Link 喚起並一鍵導入鍵盤。<br>3. App 內建瀏覽廣場與按讚功能。 |
