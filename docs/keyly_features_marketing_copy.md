# Keyly Landing Page: 產品特色與技術亮點 (Marketing Copy)

此文件為 Keyly 專屬的 Landing Page 網頁文案素材。採用「用戶利益導向 (User-Benefit-Centric)」架構，將硬核開發技術（Geek Tech）完美轉化為支撐產品價值的強大背書，兼顧一般大眾與高端科技愛好者。

---

## 1. 核心賣點：一秒李白上身（AI 驅動的文字魔法）

**【用戶利益 / Marketing Hook】**
在任何 App 內打完草稿，一鍵幫你潤飾成完美字句，不用再為了找 ChatGPT 而頻繁切換應用程式。你的思緒，值得被最優雅地表達。

**【Geek Tech / 技術背書】**
- **首創 Hybrid AI 架構**：自由切換 Apple Intelligence (FoundationModels) 進行完全無網際網路的極致隱私離線處理，或連接 **Supabase 雲端架構** (Cloud AI / Custom API) 釋放無限的 LLM 算力擴充。

## 2. 打字體驗：順到會上癮的極致手感（高能輸入引擎）

**【用戶利益 / Marketing Hook】**
天下武功，唯快不破。我們解決了 iOS 第三方鍵盤最常見的卡頓問題，即使快速盲打也不會誤觸。配上精心調校的恰好震動回饋，讓你一打字就停不下來。

**【Geek Tech / 技術背書】**
- **無情效能輾壓**：底層捨棄緩慢的 Swift 原生處理，改採**獨立且跨平台的 `KeylyRustEngine`** 進行注音解析，極致壓縮運算時間。
- **座標防誤觸黑科技**：獨家開發 `OverlapKeyCommitCoordinator` 交疊判定演算法，大幅提升盲打精準度與容錯率。
- **突破 iOS 50MB 記憶體牆**：採用 `UIView.performWithoutAnimation` 與 **ShadowPath 快取渲染**策略，徹底告別耗能的重繪閃爍，實現 120FPS 級別的絲滑介面。

## 3. 個人化工作流：你的文字許願池（Prompt 系統）

**【用戶利益 / Marketing Hook】**
不只是潤飾！你可以自己設定專屬的「AI 咒語」（例如：專業英文翻譯、廢話產生器、抓錯字小幫手）。在鍵盤上單手一鍵叫出選單，讓 Keyly 成為最懂你的隨身助理。

**【Geek Tech / 技術背書】**
- **深度 iOS 系統整合**：利用 `PromptSelectionView` UIMenu 直接嵌入鍵盤。
- **安全的多端同步**：你的專屬 Prompt 參數檔透過 **App Group 架構** 及 **Keychain 加密** 實現主 App 與鍵盤間的安全共享，並藉由後端即時同步。

## 4. 獨家彩蛋：指尖上的演奏會（Midi 音樂鍵盤）

**【用戶利益 / Marketing Hook】**
無聊的回覆訊息也能變成一場音樂饗宴！開啟專屬鋼琴模式，打出的每一個注音都會完美契合預設的世界名曲旋律。在辦公室偷彈一首「給愛麗絲」從未如此簡單。

**【Geek Tech / 技術背書】**
- **底層 MIDI 取樣合成**：內建 `PianoSoundService`，不依賴耗能的高階音頻框架，直接解析 `melodies.json` 動態 mapping 到按鍵事件。
- **零延遲觸發**：直接驅動 SoundFont 音符播放，保證高頻率打字時依然行雲流水。

## 5. 安全信仰：隱私至上，零妥協（資料保護）

**【用戶利益 / Marketing Hook】**
你的對話、密碼與生活點滴，全都留在你的手機裡。我們提供最強大的防護保證，連開發者都不知道你昨晚跟誰聊了什麼。

**【Geek Tech / 技術背書】**
- **實踐絕對的「零側錄」方針**：嚴格遵守 Apple iOS 沙盒機制。
- **端到端隔離**：純地端模型保證 100% 離線運行。即使是雲端 API 請求，也採用高安全級別的 Token 傳輸且「閱後即焚」。Firebase Remote Config 僅作設定屬性遙測與崩潰除錯，絕不掛載任何鍵盤輸入監聽。

---

> **開發團隊備註**：以上五大亮點已完全統整 Keyly iOS 專案的軟體架構特性，可直接交付行銷或網頁開發人員作為 Landing Page 區塊的 Content Sections。
