/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Zap, Globe, User, ChevronRight, Keyboard, Smartphone, CheckCircle2, Download, Menu, X, Wand2, Feather, Command, Music, ShieldCheck, ChevronDown } from 'lucide-react';
import TypingAnimation from './components/TypingAnimation';

declare const gtag: (...args: unknown[]) => void;

const DOWNLOAD_URL = 'https://apps.apple.com/app/id6759639348';
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

function DownloadCTA({ centered = false, buttonOnly = false }: { centered?: boolean; buttonOnly?: boolean }) {
  return (
    <div className={`flex flex-col w-full ${centered ? 'items-center' : 'items-center lg:items-start'} space-y-6`}>
      <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackDownload(centered ? 'cta_section' : 'hero')} className="w-full sm:w-auto bg-bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-bg-secondary transition-all transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg shadow-bg-primary/20">
        <Smartphone className="w-5 h-5" />
        <span>立即下載</span>
      </a>

      {!buttonOnly && (
        <div className={`flex flex-col space-y-5 text-sm text-text-secondary text-left w-full ${centered ? 'bg-metal-white/50 p-6 rounded-2xl border border-metal-gray/20 max-w-md' : 'bg-white/60 backdrop-blur-sm p-6 sm:p-7 rounded-2xl border border-metal-gray/20 shadow-sm max-w-md lg:max-w-none'}`}>
          <div className={`font-medium text-text-primary border-b border-metal-gray/20 pb-4 ${centered ? 'text-center text-base' : 'text-center lg:text-left text-base'}`}>
            <span className="line-through text-text-secondary/60">定價 NT$150</span>，限時入手 <span className="text-brand-purple font-bold text-lg">NT$90</span><br />
            <div className="mt-1 text-text-secondary text-sm">一次投資，終身進化</div>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
            <div className="flex flex-col">
              <strong className="text-text-primary text-base">職人級注音鍵盤</strong>
              <span className="text-text-secondary/90 mt-1 leading-relaxed">台灣團隊深度優化，最懂在地用語。流暢、精準、不跳針，找回指尖最舒暢的打字節奏。</span>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-brand-purple shrink-0 mt-0.5" />
            <div className="flex flex-col">
              <strong className="text-text-primary text-base">永久解鎖指令庫</strong>
              <span className="text-text-secondary/90 mt-1 leading-relaxed">立即擁有現行所有 AI 快捷指令，並享有未來所有新功能的免費升級權限。</span>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-accent-mint shrink-0 mt-0.5" />
            <div className="flex flex-col">
              <strong className="text-text-primary text-base">每日 AI 助攻（預設 5 次）</strong>
              <span className="text-text-secondary/90 mt-1 leading-relaxed">每日贈送基礎雲端 AI 額度。核心輸入體驗絕不打折，離線模式可無限次使用。</span>
            </div>
          </div>
          <div className={`text-xs text-text-secondary/70 border-t border-metal-gray/20 pt-4 ${centered ? 'text-center' : 'text-center lg:text-left'}`}>
            若您有大量專業文字產出需求，App 內另提供 Pro 訂閱方案，解鎖「無限次」AI 處理額度與專屬進階功能。
          </div>
        </div>
      )}
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

    const sections = ['features', 'faq', 'download'];
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-metal-gray/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Logo className="w-8 h-8 rounded-lg shadow-sm" />
            <span className="font-bold text-xl tracking-tight">Keyly</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-text-secondary hover:text-brand-cyan transition-colors">功能特色</a>
            <a href="#faq" className="text-text-secondary hover:text-brand-cyan transition-colors">常見問題</a>
            <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackDownload('navbar')} className="bg-bg-primary text-white px-5 py-2 rounded-full font-medium hover:bg-bg-secondary transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>立即下載</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-text-secondary">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-metal-gray/30 px-4 pt-2 pb-4 space-y-2">
          <a href="#features" className="block px-3 py-2 text-text-secondary hover:bg-metal-white/50 rounded-md" onClick={() => setIsOpen(false)}>功能特色</a>
          <a href="#faq" className="block px-3 py-2 text-text-secondary hover:bg-metal-white/50 rounded-md" onClick={() => setIsOpen(false)}>常見問題</a>
          <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer" className="block px-3 py-2 text-brand-cyan font-medium hover:bg-metal-white/50 rounded-md" onClick={() => { setIsOpen(false); trackDownload('navbar_mobile'); }}>立即下載</a>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">

          {/* Text Content */}
          <div className="lg:col-span-6 text-center lg:text-left mb-16 lg:mb-0 z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-text-primary leading-tight mb-6">
                指尖上的 AI 智慧，<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-purple">
                  文字轉化一鍵完成
                </span>
              </h1>

              <div className="mt-8">
                <DownloadCTA />
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

              <React.Suspense fallback={<div className="w-full aspect-[4/3] rounded-3xl bg-metal-gray/10 animate-pulse border border-metal-gray/20"></div>}>
                <TypingAnimation />
              </React.Suspense>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      icon: <Wand2 className="w-6 h-6 text-brand-cyan" />,
      title: "專屬你的文字濾鏡",
      description: "無論是由衷的情書、隨性的抒發，抑或是嚴謹的商業報告，只需隨心打下草稿，一鍵套用專屬的 AI 濾鏡，瞬間就能將其轉換為最完美的風格語氣。支援完全斷網的離線隱私模式，亦可連結雲端，釋放頂級模型無與倫比的創作潛能。"
    },
    {
      icon: <Feather className="w-6 h-6 text-brand-purple" />,
      title: "極致順滑的輸入手感",
      description: "為了追求第三方鍵盤的極速體驗，我們研發出專為流暢而生的注音引擎。精準微調的觸控邊界，搭配細膩的沉浸式震動回饋，每一次敲擊都是享受，流暢手感讓您愛不釋手。"
    },
    {
      icon: <Command className="w-6 h-6 text-accent-mint" />,
      title: "隨打即用的智慧快捷",
      description: "遠遠不只是挑錯字！這是專屬於您的文字魔法盒。您可以隨心自訂專屬的「AI 指令」，無論是瞬翻專業外文、精煉長篇大論，抑或是將隻言片語化為優雅的高情商客套話，只需單手一滑即可輕鬆召喚，便利至極。"
    },
    {
      icon: <Music className="w-6 h-6 text-accent-sky" />,
      title: "撫平焦躁的指尖琴韻",
      description: "為平淡的打字體驗注入迷人的藝術氣息！開啟專屬的鋼琴模式後，您的每次敲擊都會化作優美的名曲旋律。縱使是回覆枯燥冷硬的公事訊息，指尖流淌出的輕柔琴韻，依然能為您撫平煩躁，舒緩一整天的緊繃與壓力。"
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-brand-cyan" />,
      title: "高規格隱私防線",
      description: "您的對話隱私是我們的核心使命。Keyly 採用「不落地處理」原則，確保您的輸入內容在處理完畢後自動銷毀，不進行任何持久化儲存。我們嚴格遵守 Apple 隱私規範，不監控、不側錄，亦不將您的私人數據用於模型訓練，提供真正純淨且安全的輸入體驗。"
    }
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">為什麼選擇 Keyly？</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      question: "如果不常用 AI，單純當作一般鍵盤好用嗎？",
      answer: "絕對讓您愛不釋手！Keyly 的靈魂所在，正是一套專為「極速順暢、精準除錯」而生的頂級注音引擎。即便在離線或不使用 AI 的狀態下，它依然能提供 iOS 平台上最俐落、最暢快的純粹打字享受。"
    },
    {
      question: "Keyly 鍵盤支援哪些語言？",
      answer: "我們傾注全力打造最完美的「繁體中文（注音）」體驗，並完整支援中英混合輸入。透過強大的 AI 引擎，Keyly 能協助您跨越語言隔閡，一鍵完成外語翻譯與文字潤飾。(註：AI 生成內容僅供參考，請於正式場合自行核實。)"
    },
    {
      question: "為什麼安裝時需要開啟「允許完全取用」權限？",
      answer: (
        <div className="space-y-3">
          <p>這是開啟 AI 魔法的技術門票！受限於 iOS 安全機制，第三方鍵盤必須取得此權限，才能透過網路與雲端 AI 引擎連線以提供潤飾服務。</p>
          <p><strong>如果不開啟也沒關係：</strong>您依然能永久無限次使用 Keyly 最引以為傲、極速順暢的注音輸入引擎。核心打字功能完全不受影響，確保您在純淨環境下也能享受高品質輸入。此外，在支援的硬體設備上，您仍可享有基礎的本地端 AI 修正功能，這不需要連網，隱私 100% 留存在您的設備中。</p>
          <p><strong>若您選擇開啟：</strong>我們秉持最高規格隱私承諾，採納「即時處理」機制，所有數據僅供 AI 運算並在完成後即刻從快取移除。Keyly 嚴格遵守 Apple 規範，不監控、不側錄、不儲存您的私人對話內容。</p>
        </div>
      )
    },
    {
      question: "你們的雲端 AI 是用哪家的模型？安全嗎？",
      answer: "我們選用 Google、OpenAI 與 Anthropic 等全球頂尖技術架構。Keyly 嚴格限制資料僅用於「即時請求」，且承諾不將您的個人對話用於模型訓練。搭配自動清除機制，確保數據在完成任務後即從伺服器緩存移除，嚴密守護您的數位足跡。"
    },
    {
      question: "如果沒有網路，還可以使用 AI 潤飾嗎？",
      answer: "沒問題！只要您的設備支援 Apple 原生 AI 框架（如 iPhone 15 Pro, M 系列晶片或更新機型），Keyly 即可在離線環境下發揮實力。這不僅意味著閃電般的秒速反應，更確保您的靈感 100% 留存在設備中。"
    },
    {
      question: "打字速度很快時，會不會容易卡頓或閃退？",
      answer: "我們對效能充滿信心。Keyly 由資深 iOS 工程團隊親自操刀，歷經多型號極端測試與優化。我們精準還原了原生級的細膩震動回饋，確保無論手速多快，都能提供行雲流水的流暢體驗。"
    },
    {
      question: "我自己設定的專屬 AI 指令會如何儲存？",
      answer: "您的專屬指令由您掌控。目前所有自訂指令均透過加密技術儲存於設備本地端。我們也正籌劃具備端到端加密的雲端同步服務，讓您未來更換設備也能無縫接軌。"
    },
    {
      question: "音樂鍵盤（鋼琴模式）是什麼？",
      answer: "這是為打字體驗注入靈魂的獨家彩蛋！我們內建了高品質鋼琴音色，讓您在打字同時也能流暢彈奏。此功能可依喜好隨時開啟或關閉，讓每一次訊息回覆都昇華成專屬於您的微型音樂饗宴。"
    },
    {
      question: "一般用戶（買斷版）跟 Keyly Pro 訂閱用戶有什麼差別？",
      answer: (
        <div className="space-y-4">
          <p>
            <strong>一般用戶（限時特價 NT$90）：</strong><br />
            一次購買，持續進化！享有極速注音引擎、完整標準指令庫，並包含目前每日 5 次的雲端 AI 魔法額度。
          </p>
          <p>
            <strong>Keyly Pro 訂閱（NT$150/月）：</strong><br />
            專為高頻率專業人士打造。徹底解鎖無限次雲端 AI 運算，並獨享「AI 指令管理員」，支援自定義指令的新增、編輯與收藏，讓 AI 完美契合您的使用習慣。
          </p>
        </div>
      )
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);
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
            <div
              key={index}
              className="bg-bg-secondary rounded-2xl border border-white/10 overflow-hidden transform-gpu"
            >
              <button
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none active:bg-white/5 transition-colors"
                onClick={() => {
                  if (openIndex !== index) trackFaqClick(faq.question);
                  setOpenIndex(openIndex === index ? null : index);
                }}
                aria-expanded={openIndex === index}
                aria-controls={getFaqAnswerId(index)}
              >
                <span className="text-lg font-medium text-metal-white pr-8">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-brand-cyan shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    id={getFaqAnswerId(index)}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-metal-gray leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
        <h2 className="text-4xl font-bold text-text-primary mb-6">體驗未來的輸入法</h2>
        <p className="text-xl text-text-secondary mb-10">
          立即獲取 Keyly，開啟文字輸入的全新進化。
        </p>
        <DownloadCTA centered buttonOnly />
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
            <a href="/privacy/" onClick={() => trackLinkClick('privacy_policy', '/privacy/')} className="hover:text-brand-cyan transition-colors">隱私權政策</a>
            <span className="text-metal-gray/50">|</span>
            <a href="/terms/" onClick={() => trackLinkClick('terms_of_service', '/terms/')} className="hover:text-brand-cyan transition-colors">服務條款</a>
            <span className="text-metal-gray/50">|</span>
            <a href="/subscriptions/" onClick={() => trackLinkClick('subscription_terms', '/subscriptions/')} className="hover:text-brand-cyan transition-colors">自動續訂說明</a>
            <span className="text-metal-gray/50">|</span>
            <a href="mailto:support@keylyapp.com" onClick={() => trackLinkClick('support_email', 'mailto:support@keylyapp.com')} className="hover:text-brand-cyan transition-colors">技術支援</a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-metal-gray">
          &copy; 2026 Keyly 由台灣團隊專為高效溝通而生。
        </div>
      </div>
    </footer>
  );
}
