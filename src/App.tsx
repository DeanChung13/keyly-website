/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Zap, Globe, User, ChevronRight, Keyboard, Smartphone, Download, Menu, X, Wand2, Feather, Command, ShieldCheck, ChevronDown, Star , Repeat } from 'lucide-react';
import HeroFilm from './components/HeroFilm';
import TranslationFilm from './components/TranslationFilm';
import CustomPromptsFilm from './components/CustomPromptsFilm';
import { DOWNLOAD_URL } from './appStoreLink';

declare const gtag: (...args: unknown[]) => void;

const DOWNLOAD_EVENT = 'download_click';

const trackDownload = (location: string) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', DOWNLOAD_EVENT, { event_category: 'engagement', event_label: location });
  }
};

const trackFaqClick = (question: string) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'faq_click', { event_category: 'engagement', event_label: question });
  }
};

const trackSectionView = (sectionName: string) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'section_view', { event_category: 'engagement', event_label: sectionName });
  }
};

const trackFeatureClick = (featureTitle: string) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'feature_click', { event_category: 'engagement', event_label: featureTitle });
  }
};

const trackLinkClick = (linkName: string, destination: string) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'link_click', { event_category: 'engagement', event_label: linkName, destination: destination });
  }
};

function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="100" height="100" rx="20" fill="#0D142E" />
      <defs>
        <linearGradient id="k-stem" x1="30" y1="20" x2="30" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38C7BA" />
          <stop offset="1" stopColor="#8E61D9" />
        </linearGradient>
        <linearGradient id="k-arm" x1="75" y1="20" x2="40" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E6EBF2" />
          <stop offset="1" stopColor="#BFCDE0" />
        </linearGradient>
      </defs>
      <rect x="25" y="20" width="16" height="60" fill="url(#k-stem)" />
      <path d="M75 20L41 50L75 80H55L31 50L55 20H75Z" fill="url(#k-arm)" />
    </svg>
  );
}

function DownloadCTA({ centered = false }: { centered?: boolean }) {
  return (
    <div className={`flex flex-col w-full ${centered ? 'items-center' : 'items-center lg:items-start'} space-y-3`}>
      <a href={DOWNLOAD_URL} target="_blank" rel="noopener" onClick={() => trackDownload(centered ? 'cta_section' : 'hero')} className="w-auto bg-bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-bg-secondary transition-all duration-200 transform hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none inline-flex items-center justify-center space-x-2 shadow-lg shadow-bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2">
        <Smartphone className="w-5 h-5" />
        <span>免費下載</span>
      </a>
      <div className="inline-flex items-center space-x-1.5 text-xs text-text-secondary/90 pt-0.5">
        <div className="flex text-amber-400" aria-label="5 星好評">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <span className="font-semibold text-text-primary">5.0</span>
        <span className="text-text-secondary/40">·</span>
        <span>App Store 滿分好評</span>
      </div>
    </div>
  );
}

export default function App() {
  useEffect(() => {
    const trackedSections = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            if (sectionId && !trackedSections.has(sectionId)) {
              trackSectionView(sectionId);
              trackedSections.add(sectionId);
            }
          }
        });
      },
      { threshold: 0.3 } // 區塊出現 30% 時觸發
    );

    const sections = ['custom-prompts', 'features', 'faq', 'download'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F7FA] text-text-primary font-sans selection:bg-brand-cyan/30 overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <CustomPrompts />
        <Features />
        <FAQSection />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-3 left-0 right-0 z-50 px-3 sm:px-4">
      <div className="max-w-6xl mx-auto bg-white/85 backdrop-blur-xl border border-metal-gray/30 rounded-2xl shadow-[0_10px_35px_rgba(13,20,46,0.08)]">
        <div className="px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Logo className="w-8 h-8 rounded-lg shadow-sm" />
            <span className="font-bold text-xl tracking-tight">Keyly</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-text-secondary hover:text-brand-cyan transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan rounded-md px-1">功能特色</a>
            <a href="/guides/" onClick={() => trackLinkClick('home_nav_guides', '/guides/')} className="text-text-secondary hover:text-brand-cyan transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan rounded-md px-1">實用指南</a>
            <a href="#faq" className="text-text-secondary hover:text-brand-cyan transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan rounded-md px-1">常見問題</a>
            <a href={DOWNLOAD_URL} target="_blank" rel="noopener" onClick={() => trackDownload('navbar')} className="bg-bg-primary text-white px-5 py-2 rounded-full font-medium hover:bg-bg-secondary transition-colors duration-200 flex items-center space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2">
              <Download className="w-4 h-4" />
              <span>免費下載</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan rounded-md p-1" aria-label="切換選單">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 max-w-6xl mx-auto bg-white/95 backdrop-blur-xl border border-metal-gray/30 rounded-2xl px-4 pt-2 pb-4 space-y-2 shadow-lg">
          <a href="#features" className="block px-3 py-2 text-text-secondary hover:bg-metal-white/50 rounded-md transition-colors duration-200" onClick={() => setIsOpen(false)}>功能特色</a>
          <a href="/guides/" className="block px-3 py-2 text-text-secondary hover:bg-metal-white/50 rounded-md transition-colors duration-200" onClick={() => { setIsOpen(false); trackLinkClick('home_nav_guides_mobile', '/guides/'); }}>實用指南</a>
          <a href="#faq" className="block px-3 py-2 text-text-secondary hover:bg-metal-white/50 rounded-md transition-colors duration-200" onClick={() => setIsOpen(false)}>常見問題</a>
          <a href={DOWNLOAD_URL} target="_blank" rel="noopener" className="block px-3 py-2 text-brand-cyan font-medium hover:bg-metal-white/50 rounded-md transition-colors duration-200" onClick={() => { setIsOpen(false); trackDownload('navbar_mobile'); }}>免費下載</a>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section className="pt-32 pb-20 lg:pt-44 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">

          {/* Text Content */}
          <div className="lg:col-span-6 text-center lg:text-left mb-16 lg:mb-0 z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-sm font-semibold tracking-[0.08em] text-text-secondary/80 mb-4">
                台灣團隊打造 · iPhone 注音雙向翻譯鍵盤
              </div>
              <h1 className="font-black text-text-primary leading-tight mb-6">
                <span className="block text-2xl lg:text-3xl xl:text-4xl mb-2 text-text-secondary">iPhone 翻譯鍵盤</span>
                <span className="block text-5xl lg:text-5xl xl:text-6xl">
                  用注音打中文，<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-purple">
                    跟任何國家的人聊天
                  </span>
                </span>
              </h1>
              <p className="text-base lg:text-lg text-text-secondary/90 leading-relaxed max-w-xl mx-auto lg:mx-0">
                對方傳任何語言，複製就自動翻譯；你用注音打中文，一鍵翻成對方的語言送出。LINE、IG、WhatsApp 都不用切換 App。注音輸入永久免費，離線也能順暢打字。
              </p>

              <div className="mt-8">
                <DownloadCTA />
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-6 text-sm font-medium text-text-secondary">
                  <a
                    href="/translation/"
                    onClick={() => trackLinkClick('hero_translation_hub', '/translation/')}
                    className="text-brand-cyan hover:underline inline-flex items-center gap-1 font-semibold"
                  >
                    了解雙向翻譯功能 <ChevronRight className="w-4 h-4" />
                  </a>
                  <span className="text-metal-gray/50">·</span>
                  <a
                    href="/guides/line-translation/"
                    onClick={() => trackLinkClick('home_hero_line_guide', '/guides/line-translation/')}
                    className="hover:text-text-primary transition-colors"
                  >
                    LINE 翻譯教學
                  </a>
                  <span className="text-metal-gray/50">·</span>
                  <a
                    href="/guides/iphone-translation-keyboard-comparison/"
                    onClick={() => trackLinkClick('home_hero_translation_comparison', '/guides/iphone-translation-keyboard-comparison/')}
                    className="hover:text-text-primary transition-colors"
                  >
                    6 款翻譯鍵盤評測
                  </a>
                </div>
                <div className="mt-3">
                  <a
                    href="/guides/iphone-zhuyin-keyboard/"
                    onClick={() => trackLinkClick('home_hero_zhuyin_comparison', '/guides/iphone-zhuyin-keyboard/')}
                    className="inline-flex items-center text-sm font-medium text-text-secondary hover:text-brand-cyan underline underline-offset-4 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan rounded-md"
                  >
                    還在比較？查看 iPhone 注音鍵盤推薦與功能比較
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Animation Mockup */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end mt-12 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95, rotate: 4 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 25, delay: 0.2 }}
              className="relative z-10 w-full"
            >
              {/* Decorative blobs */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-brand-cyan/30 to-brand-purple/30 rounded-full blur-3xl -z-10 opacity-50"></div>

              <TranslationFilm />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}



function CustomPrompts() {
  return (
    <section id="custom-prompts" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 與 #features 一致：置中標題（text-3xl/4xl）＋ #F4F7FA 卡片；影片之後才放教學連結 */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-5 rounded-full bg-brand-cyan/10 text-brand-cyan text-sm font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>自訂 AI 指令</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-snug text-text-primary" style={{ textWrap: 'balance' }}>
            每天要回的那幾種訊息，<br />按一下就好。
          </h2>
          <p className="mt-4 text-base md:text-lg text-text-secondary leading-relaxed max-w-3xl mx-auto">
            用一句話寫下你的 AI 指令，存起來，在任何 App 的鍵盤上一鍵改好。<br className="hidden md:block" />不用再複製到其他 AI App、改完又貼回來。
          </p>
        </div>

        <ul className="mt-8 md:mt-10 grid md:grid-cols-3 gap-2 md:gap-4 max-w-5xl mx-auto">
          <li className="bg-[#F4F7FA] rounded-xl md:rounded-2xl px-3 py-1.5 md:p-5 border border-metal-gray/20 flex items-center gap-2.5 md:gap-3.5">
            <div className="w-7 h-7 md:w-10 md:h-10 bg-white rounded-lg md:rounded-xl shadow-sm flex items-center justify-center shrink-0">
              <Keyboard className="w-4 h-4 md:w-5 md:h-5 text-brand-cyan" />
            </div>
            <span className="text-[15px] md:text-base font-semibold text-text-primary leading-snug lg:whitespace-nowrap">寫一次，天天用</span>
          </li>
          <li className="bg-[#F4F7FA] rounded-xl md:rounded-2xl px-3 py-1.5 md:p-5 border border-metal-gray/20 flex items-center gap-2.5 md:gap-3.5">
            <div className="w-7 h-7 md:w-10 md:h-10 bg-white rounded-lg md:rounded-xl shadow-sm flex items-center justify-center shrink-0">
              <Repeat className="w-4 h-4 md:w-5 md:h-5 text-brand-purple" />
            </div>
            <span className="text-[15px] md:text-base font-semibold text-text-primary leading-snug lg:whitespace-nowrap">不用跳 App、不用複製貼上</span>
          </li>
          <li className="bg-[#F4F7FA] rounded-xl md:rounded-2xl px-3 py-1.5 md:p-5 border border-metal-gray/20 flex items-center gap-2.5 md:gap-3.5">
            <div className="w-7 h-7 md:w-10 md:h-10 bg-white rounded-lg md:rounded-xl shadow-sm flex items-center justify-center shrink-0">
              <Wand2 className="w-4 h-4 md:w-5 md:h-5 text-accent-mint" />
            </div>
            <span className="text-[15px] md:text-base font-semibold text-text-primary leading-snug lg:whitespace-nowrap">改出來就是你要的格式和口吻</span>
          </li>
        </ul>

        <div className="mt-14 -mx-4 sm:mx-0">
          <CustomPromptsFilm locale="zh" />
        </div>

        <div className="mt-8 text-center">
          <a
            href="/guides/iphone-custom-ai-prompt/"
            onClick={() => trackLinkClick('custom_prompts', '/guides/iphone-custom-ai-prompt/')}
            className="inline-flex items-center gap-1.5 font-semibold text-brand-cyan hover:gap-2.5 transition-all"
          >
            看怎麼寫自己的指令
            <ChevronRight className="w-4 h-4" />
          </a>
          
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      icon: <Globe className="w-6 h-6 text-brand-cyan" />,
      title: "雙向無縫跨國翻譯",
      description: "外國朋友傳訊息來，複製就看懂；你用熟悉的注音打字，一鍵翻成外語直接送出。支援看懂 17 種語言，LINE、IG、WhatsApp 都不用切換 App。"
    },
    {
      icon: <Wand2 className="w-6 h-6 text-brand-purple" />,
      title: "翻譯之外，把話說好",
      description: "情書、隨手抒發或商業報告，先把草稿打出來，再套用你設定的 AI 濾鏡調整語氣。離線時鍵盤照常運作，連上網路即可使用雲端頂尖模型。"
    },
    {
      icon: <Feather className="w-6 h-6 text-accent-mint" />,
      title: "為打字手感調校的注音引擎",
      description: "我們自行開發原生注音引擎，並針對第三方鍵盤的反應速度調校觸控邊界與震動回饋。目標是讓連續輸入不卡頓，盲打也得心應手。"
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-brand-cyan" />,
      title: "本機優先的隱私防線",
      description: "剪貼簿辨識完全在 iPhone 本機進行，純數字、沒有空格的密碼與驗證碼、網址與電話號碼自動略過不翻譯。剪貼簿原文與譯文僅暫存於手機記憶體，鍵盤收起立即清除；Keyly 不會在自身的伺服器保存您的對話內容。"
    }
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">雙向翻譯與 AI 寫作，Keyly 怎麼運作？</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              onClick={() => trackFeatureClick(feature.title)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#F4F7FA] rounded-2xl p-6 border border-metal-gray/20 hover:shadow-lg hover:border-brand-cyan/30 transition-[box-shadow,border-color] cursor-pointer"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-text-primary">{feature.title}</h3>
              </div>
              <p className="text-text-secondary leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      question: "Keyly 會自動讀剪貼簿，會不會讀到我的密碼或私訊？",
      answer: "只有在 Keyly 鍵盤開著時才會讀取剪貼簿，且 iOS 會先詢問是否「允許貼上」，沒點允許就讀不到（您也可以在 iOS「設定 › App › Keyly › 從其他 App 貼上」設為永遠允許，即可省去每次彈窗）。Keyly 本機內建過濾機制，純數字、沒有空格的密碼與驗證碼、網址與電話號碼都不會被翻譯或送出。剪貼簿原文與譯文僅暫存於手機記憶體，鍵盤收起立即清除；在 iOS 26 以上預設於 iPhone 本機完成翻譯，原文不離開手機；若使用雲端 AI 翻譯，Keyly 亦不會在自身伺服器保存內容。"
    },
    {
      question: "看懂對方傳來的訊息，會扣 30 次 AI 額度嗎？",
      answer: "在支援本機翻譯的機型（iOS 26+）上看懂對方不扣額度；iOS 18～25 若使用雲端翻譯，則與 AI 改寫共用雲端額度。30 次雲端額度用完後，注音輸入與本機看懂對方的訊息依然永久免費可用，額度用完也絕不會鎖住你的打字鍵盤。"
    },
    {
      question: "如果不常用 AI，單純當作一般鍵盤好用嗎？",
      answer: "可以。Keyly 的核心就是注音輸入本身，AI 是額外那一層。即使離線或完全不使用 AI，注音輸入、選字與自訂詞都照常運作，不需要開啟任何連網功能。"
    },
    {
      question: "Keyly 鍵盤支援哪些語言？",
      answer: "打字為繁體中文（注音），並支援中英混合輸入。翻譯支援英文、日文、韓文、越南文、印尼文、西班牙文、法文、德文等 17 種主流語言（基本翻譯支援語言以 iOS 為準，雲端 AI 翻譯支援更多）。AI 生成內容僅供參考。"
    },
    {
      question: "為什麼安裝時需要開啟「允許完全取用」權限？",
      answer: (
        <div className="space-y-3">
          <p>這是開啟 AI 潤飾與剪貼簿翻譯的技術門票！受限於 iOS 安全機制，第三方鍵盤必須取得完全取用權限，才能讀取您複製的訊息並提供剪貼簿翻譯，或透過網路連線雲端 AI 服務。</p>
          <p><strong>如果不開啟也沒關係：</strong>注音輸入引擎不需要這個權限，選字、自訂詞與日常打字都能永久離線使用。另外，在支援 Apple 裝置端 AI 框架的機型上，基礎的裝置端文字修正也不需要連網，該功能處理的內容留在裝置上（剪貼簿翻譯仍需完全取用以讀取文字，基本翻譯首次使用時需下載語言資料）。</p>
          <p><strong>若您選擇開啟：</strong>我們採取最小化資料原則，僅在您主動觸發 AI 功能或複製訊息時即時處理。Keyly 嚴格遵守 Apple 規範，不監控、不側錄您的私人對話，密碼與驗證碼亦會自動略過。</p>
          <p>
            <a href="/guides/full-access/" className="text-brand-cyan underline underline-offset-4 hover:text-accent-mint">
              延伸閱讀：「允許完全取用」到底開放了什麼？安全嗎？
            </a>
          </p>
        </div>
      )
    },
    {
      question: "你們的雲端 AI 是用哪家的模型？安全嗎？",
      answer: "雲端 AI 使用 Google、OpenAI 與 Anthropic 的模型服務。Keyly 限制資料僅用於當次即時請求，不會把你的個人對話用於模型訓練，任務完成後即從伺服器緩存移除。"
    },
    {
      question: "如果沒有網路，還可以使用 AI 潤飾嗎？",
      answer: "要看是哪一種 AI。雲端 AI 的潤飾、翻譯與改寫需要網路，也需要開啟「允許完全取用」。至於裝置端 AI，只要機型支援 Apple 的裝置端 AI 框架（例如 iPhone 15 Pro、M 系列晶片或更新機型），基礎修正可以在離線狀態下使用，處理內容留在裝置上。注音輸入本身則不受網路影響。"
    },
    {
      question: "打字速度很快時，會不會容易卡頓或閃退？",
      answer: "Keyly 由 iOS 工程團隊開發，並在多種機型上測試過連續高速輸入。震動回饋也依原生鍵盤的手感調校。若你遇到卡頓或閃退，請來信告訴我們實際機型與情境。"
    },
    {
      question: "我自己設定的專屬 AI 指令會如何儲存？",
      answer: "您的專屬指令由您掌控。目前所有自訂指令均透過加密技術儲存於設備本地端。我們也正籌劃具備端到端加密的雲端同步服務，讓您未來更換設備也能無縫接軌。"
    },
    {
      question: "一般用戶（免費下載）跟 Keyly Pro 訂閱用戶有什麼差別？",
      answer: (
        <div className="space-y-4">
          <p>
            <strong>一般用戶（免費下載）：</strong><br />
            免費下載即可永久使用極速注音引擎、完整標準指令庫與自訂指令管理，並在新登入帳號時一次性獲得 30 次雲端 AI 額度。
          </p>
          <p>
            <strong>Keyly Pro 訂閱（月訂 NT$150，年訂 NT$1,190，年訂可免費試用 3 天）：</strong><br />
            專為高頻率專業人士打造。解鎖不限次數的雲端 AI 運算（設有防濫用頻率保護），享有專屬連線特權，優先對接全球頂尖模型，讓回覆翻譯與文字潤飾更自然流暢。
          </p>
        </div>
      )
    }
  ];

  const getFaqAnswerId = (index: number) => `faq-answer-${index}`;

  return (
    <section id="faq" className="py-24 bg-bg-primary text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-purple/15 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none transform-gpu will-change-transform"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">常見問題 <span className="text-accent-mint">Q&A</span></h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group bg-bg-secondary rounded-2xl border border-white/10 overflow-hidden"
              onToggle={(event) => {
                if (event.currentTarget.open) trackFaqClick(faq.question);
              }}
            >
              <summary className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer list-none [&::-webkit-details-marker]:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/70 active:bg-white/5 transition-colors duration-200">
                <span className="text-lg font-medium text-metal-white pr-8">{faq.question}</span>
                <ChevronDown
                  aria-hidden="true"
                  className="w-5 h-5 text-brand-cyan shrink-0 transition-transform duration-300 motion-reduce:transition-none group-open:rotate-180"
                />
              </summary>

              <div id={getFaqAnswerId(index)} className="px-6 pb-6 text-metal-gray leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="download" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-brand-cyan/5"></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-4xl font-bold text-text-primary mb-6">試試這套 iPhone 注音輸入法</h2>
        <p className="text-xl text-text-secondary mb-10">
          先當一套好打的注音鍵盤，需要的時候再讓 AI 接手潤飾與翻譯。免費下載，離線也能用。
        </p>
        <DownloadCTA centered />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#F4F7FA] border-t border-metal-gray/30 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Logo className="w-8 h-8 rounded-lg shadow-sm" />
            <span className="font-bold text-text-primary">Keyly</span>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-3 text-sm text-text-secondary">
            <a href="/guides/" onClick={() => trackLinkClick('guides_hub', '/guides/')} className="hover:text-brand-cyan transition-colors">實用指南</a>
            <span className="text-metal-gray/50">|</span>
            <a href="/privacy/" onClick={() => trackLinkClick('privacy_policy', '/privacy/')} className="hover:text-brand-cyan transition-colors">隱私權政策</a>
            <span className="text-metal-gray/50">|</span>
            <a href="/terms/" onClick={() => trackLinkClick('terms_of_service', '/terms/')} className="hover:text-brand-cyan transition-colors">服務條款</a>
            <span className="text-metal-gray/50">|</span>
            <a href="/subscriptions/" onClick={() => trackLinkClick('subscription_terms', '/subscriptions/')} className="hover:text-brand-cyan transition-colors">自動續訂說明</a>
            <span className="text-metal-gray/50">|</span>
            <a href="mailto:support@keylyapp.com" onClick={() => trackLinkClick('support_email', 'mailto:support@keylyapp.com')} className="hover:text-brand-cyan transition-colors">技術支援</a>
            <span className="text-metal-gray/50">|</span>
            <a href="/en/" hrefLang="en" onClick={() => trackLinkClick('lang_switch_en', '/en/')} className="hover:text-brand-cyan transition-colors">English</a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-metal-gray">
          &copy; 2026 Keyly 由台灣團隊專為高效溝通而生。
        </div>
      </div>
    </footer>
  );
}
