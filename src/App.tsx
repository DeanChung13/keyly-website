/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Zap, Globe, User, ChevronRight, Keyboard, Smartphone, CheckCircle2, Download, Menu, X, Wand2, Feather, Command, Music, ShieldCheck, ChevronDown } from 'lucide-react';
import TypingAnimation from './components/TypingAnimation';

declare const gtag: (...args: unknown[]) => void;

const APP_STORE_URL = 'https://apps.apple.com/app/id6759639348';

function trackDownload(location: string) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'download_click', { event_category: 'engagement', event_label: location });
  }
}

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
    <div className={`flex flex-col ${centered ? 'items-center' : 'items-center lg:items-start'} space-y-5`}>
      <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackDownload(centered ? 'cta_section' : 'hero')} className="w-full sm:w-auto bg-bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-bg-secondary transition-all transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg shadow-bg-primary/20">
        <Smartphone className="w-5 h-5" />
        <span>立即解鎖 AI 智慧輸入</span>
      </a>

      {!buttonOnly && (
        <div className="flex flex-col space-y-6 text-sm text-text-secondary text-left w-full max-w-2xl mx-auto">
          {/* 定價與核心價值 */}
          <div className={`font-medium text-text-primary ${centered ? 'text-center text-base' : ''}`}>
            <span className="line-through text-text-secondary/60">定價 NT$150</span>，限時入手 NT$90<br />
            <div className="mb-2">一次投資，終身進化</div>
          </div>

          {/* 功能對照表 */}
          <div className="overflow-hidden rounded-2xl border border-metal-gray/20 bg-white shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-metal-white/30 text-text-primary">
                  <th className="p-4 font-bold border-b border-metal-gray/10">核心功能差異</th>
                  <th className="p-4 font-bold border-b border-metal-gray/10">一般用戶 (買斷)</th>
                  <th className="p-4 font-bold border-b border-metal-gray/10 text-brand-cyan">Keyly Pro (訂閱)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-metal-gray/10">
                <tr>
                  <td className="p-4 font-medium text-text-primary">當前價格</td>
                  <td className="p-4">NT$90 <span className="text-[10px] opacity-60">(原價 $150)</span></td>
                  <td className="p-4 text-brand-cyan font-bold">NT$150 / 每月</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-text-primary">定位描述</td>
                  <td className="p-4">基礎進階，智慧啟航</td>
                  <td className="p-4">無限生產力，專家首選</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-text-primary">極速注音引擎</td>
                  <td className="p-4 text-brand-teal">✅ 完整版 (含更新)</td>
                  <td className="p-4 text-brand-teal">✅ 完整版 (含更新)</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-text-primary">本地離線 AI</td>
                  <td className="p-4 text-brand-teal">✅ 無限次基礎修正</td>
                  <td className="p-4 text-brand-teal">✅ 無限次基礎修正</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-text-primary">雲端 AI 魔法額度</td>
                  <td className="p-4">每日 5 次 (現行額度)*</td>
                  <td className="p-4 font-bold text-brand-purple">🚀 無限次數 (吃到飽)</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-text-primary">AI 指令庫</td>
                  <td className="p-4">✅ 內建標準指令</td>
                  <td className="p-4">✅ 內建標準指令</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-text-primary">AI 指令管理員</td>
                  <td className="p-4 text-text-secondary/50">❌ 僅限內建指令</td>
                  <td className="p-4 font-bold text-brand-cyan">✨ 自定義 / 編輯 / 收藏</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 法律與溫馨提醒 */}
          <div className="space-y-3 px-1">
            <p className="text-[13px] leading-relaxed">
              <strong>💡 溫馨提醒：</strong> 即便每日雲端額度用完，您依然能永久無限次使用流暢的注音引擎與本地端離線 AI 修正功能，核心輸入體驗絕不打折。
            </p>
            <p className="text-[12px] text-text-secondary/80 bg-brand-cyan/5 p-3 rounded-xl border border-brand-cyan/10">
              <strong>⚠️ 限時優惠：</strong> NT$90 買斷優惠僅限首波推廣期間。現在入手，即可在 App 維運期間持續享有功能更新權限。
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#F4F7FA] text-text-primary font-sans selection:bg-brand-cyan/30 overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <ComparisonTable />
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
            <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackDownload('navbar')} className="bg-bg-primary text-white px-5 py-2 rounded-full font-medium hover:bg-bg-secondary transition-colors flex items-center space-x-2">
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
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="block px-3 py-2 text-brand-cyan font-medium hover:bg-metal-white/50 rounded-md" onClick={() => { setIsOpen(false); trackDownload('navbar_mobile'); }}>立即下載</a>
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
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative z-10 w-full"
            >
              {/* Decorative blobs */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-brand-cyan/30 to-brand-purple/30 rounded-full blur-3xl -z-10 opacity-50"></div>

              <TypingAnimation />
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#F4F7FA] rounded-2xl p-6 border border-metal-gray/20 hover:shadow-lg hover:border-brand-cyan/30 transition-all"
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

function ComparisonTable() {
  return (
    <section id="pricing" className="py-24 bg-[#F4F7FA]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">選擇適合您的方案</h2>
          <p className="text-text-secondary text-lg">一次買斷基礎功能，或升級 Pro 解鎖無限可能</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* General User */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 border border-metal-gray/20 shadow-sm flex flex-col"
          >
            <div className="mb-8">
              <h3 className="text-xl font-bold text-text-primary mb-2">一般用戶（推廣買斷制）</h3>
              <div className="flex items-baseline space-x-1">
                <span className="text-3xl font-black text-text-primary">NT$ 90</span>
                <span className="text-text-secondary line-through text-sm">NT$ 150</span>
              </div>
              <p className="text-sm font-medium text-brand-purple mt-2">基礎進階，智慧啟航</p>
            </div>

            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-start space-x-3 text-text-secondary">
                <CheckCircle2 className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
                <span><strong className="text-text-primary">極速注音引擎：</strong>完整版 (含持續更新)</span>
              </li>
              <li className="flex items-start space-x-3 text-text-secondary">
                <CheckCircle2 className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
                <span><strong className="text-text-primary">本地離線 AI：</strong>無限次基礎修正</span>
              </li>
              <li className="flex items-start space-x-3 text-text-secondary">
                <CheckCircle2 className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
                <span><strong className="text-text-primary">雲端 AI 魔法額度：</strong>每日 5 次 (現行額度)*</span>
              </li>
              <li className="flex items-start space-x-3 text-text-secondary">
                <CheckCircle2 className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
                <span><strong className="text-text-primary">AI 指令庫：</strong>內建所有標準指令</span>
              </li>
              <li className="flex items-start space-x-3 text-text-secondary/50 italic">
                <X className="w-5 h-5 shrink-0 mt-0.5" />
                <span><strong className="text-text-primary/50">AI 指令管理員：</strong>僅限使用內建指令</span>
              </li>
            </ul>

            <div className="pt-6 border-t border-metal-gray/10">
              <p className="text-xs text-brand-purple font-medium mb-1">⚠️ 限時優惠：</p>
              <p className="text-xs text-text-secondary/70">NT$ 90 買斷優惠僅限首波推廣期間。現在入手，即可在 App 維運期間持續享有功能更新權限。</p>
            </div>
          </motion.div>

          {/* Pro User */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-bg-primary rounded-3xl p-8 border border-white/10 shadow-xl shadow-brand-cyan/10 flex flex-col relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 px-5 py-1.5 bg-accent-mint text-bg-primary font-bold text-xs rounded-bl-2xl">
              RECOMMENDED
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-2">Keyly Pro（專業訂閱制）</h3>
              <div className="flex items-baseline space-x-1">
                <span className="text-3xl font-black text-white">NT$ 150 <span className="text-lg font-normal text-metal-gray">/ 每月</span></span>
              </div>
              <p className="text-sm font-medium text-accent-mint mt-2">無限生產力，專家首選</p>
            </div>

            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-start space-x-3 text-metal-white">
                <Sparkles className="w-5 h-5 text-accent-mint shrink-0 mt-0.5" />
                <span className="font-medium text-white"><strong className="text-accent-mint">雲端 AI 魔法額度：</strong>🚀 無限次數 (吃到飽)</span>
              </li>
              <li className="flex items-start space-x-3 text-metal-white">
                <Zap className="w-5 h-5 text-accent-mint shrink-0 mt-0.5" />
                <span className="font-medium text-white"><strong className="text-accent-mint">模型優先權：</strong>全球頂尖 AI 模型優先對接</span>
              </li>
              <li className="flex items-start space-x-3 text-metal-white">
                <Command className="w-5 h-5 text-accent-mint shrink-0 mt-0.5" />
                <span className="font-medium text-white"><strong className="text-accent-mint">AI 指令管理員：</strong>✨ 自定義 / 編輯 / 收藏</span>
              </li>
              <li className="flex items-start space-x-3 text-metal-white">
                <Globe className="w-5 h-5 text-accent-mint shrink-0 mt-0.5" />
                <span className="font-medium text-white">更快速的雲端連線優先權</span>
              </li>
              <li className="flex items-start space-x-3 text-metal-white">
                <User className="w-5 h-5 text-accent-mint shrink-0 mt-0.5" />
                <span className="font-medium text-white">專屬進階功能優先體驗</span>
              </li>
            </ul>

            <div className="pt-6 border-t border-white/10">
              <p className="text-xs text-metal-gray">專為有大量專業文字產出需求的職人與創作者打造</p>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 max-w-3xl mx-auto space-y-4 text-center">
          <div className="bg-brand-cyan/5 border border-brand-cyan/20 rounded-2xl p-6">
            <p className="text-sm text-text-primary font-medium leading-relaxed">
              💡 溫馨提醒：即便每日雲端額度用完，您依然能永久無限次使用流暢的注音引擎與本地端離線 AI 修正功能，核心輸入體驗絕不打折。
            </p>
          </div>
          <p className="text-xs text-text-secondary/60 italic">
            * 雲端 AI 額度與模型由第三方技術提供，Keyly 保留依營運成本調整方案之權利，變更將提前告知。
          </p>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      question: "Keyly 鍵盤支援哪些語言？",
      answer: "為了追求極致的打字手感，我們將心力傾注於打造完美的「繁體中文（注音）」輸入體驗，同時無縫支援中英混合輸入。更棒的是，透過強大的 AI 引擎，Keyly 能為您打破語言隔閡，一鍵完成各種外語的專業翻譯與完美潤飾。"
    },
    {
      question: "如果我不常用 AI，單純當作一般鍵盤好用嗎？",
      answer: "絕對讓您愛不釋手！Keyly 的靈魂所在，正是一套為了「極速順暢、精準除錯」而淬鍊出的頂級注音引擎。即便您褪去所有 AI 魔法的外衣，它依然能為您帶來 iOS 平台上最俐落、最暢快的純粹打字享受。"
    },
    {
      question: "打字速度很快時，會不會容易卡頓或閃退？",
      answer: "絕對不會！Keyly 是由超過十年功力的資深 iOS 工程師親自操刀，歷經無數次極端測試與精密調校的結晶。我們不僅深入優化了觸控邊界與觸發邏輯，更真實還原了媲美 Apple 原廠的細膩震動回饋，確保您無論手速多快，都能享受行雲流水、毫無延遲的沉浸式體驗。"
    },
    {
      question: "音樂鍵盤（鋼琴模式）是什麼？",
      answer: "這是一項專為打字體驗注入靈魂的獨家彩蛋！我們內建了超擬真的鋼琴音色，讓您在打字的同時也能流暢彈奏各首世界名曲。無論快打慢敲，優美的旋律都會隨著指尖行雲流水般傾瀉而出，不僅為日常生活增添一抹文藝氣息，更讓每一次枯燥的訊息回覆，都昇華成專屬於您的微型音樂饗宴。"
    },
    {
      question: "為什麼安裝時需要「允許完全取用」權限？",
      answer: "這是開啟 AI 魔法的必備鑰匙！受限於 iOS 嚴格的安全沙盒機制，鍵盤必須取得完整權限，才能為您安全連線至雲端智庫。我們秉持著最高規格的隱私承諾，保證「絕對零側錄」——不僅閱後即焚，更絕不窺探或儲存您的任何私人對話與珍貴數據。"
    },
    {
      question: "你們的雲端 AI 是用哪家的模型？安全嗎？",
      answer: "使用者的資訊安全與隱私是我們的核心使命。Keyly 的雲端引擎基於 Google、OpenAI 與 Anthropic 等全球領先的技術架構，並嚴格遵循國際最高等級資安標準進行調校。我們承諾：Keyly 優先選用具備透明隱私政策的服務商，且嚴格限制資料僅用於即時處理，絕不將您的個人對話用於模型訓練。搭配我們的自動清除機制，確保您的數據在處理完成後即從緩存中移除，守護您的數位足跡。"
    },
    {
      question: "我自己設定的專屬 AI 指令會如何儲存？",
      answer: "您專屬的魔法咒語，我們替您嚴密守護。目前所有自訂的「文字許願池」指令，都將透過軍規等級的加密技術，安穩地鎖在您的設備本地端。隨著未來生態系的擴張，我們也正積極籌劃具備端到端加密的雲端同步服務，敬請期待！"
    },
    {
      question: "如果沒有網路，還可以使用 AI 潤飾嗎？",
      answer: "當然沒問題！若是您的設備支援 Apple 最前沿的原生 AI 框架，Keyly 就能如同裝備了隱形引擎一般，在完全斷網的環境下發揮實力。這不僅意味著閃電般的秒速反應，更確保了您的靈感與隱私，100% 留存在掌心的設備中。"
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-bg-primary text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-purple/15 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">常見問題 <span className="text-accent-mint">Q&A</span></h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-bg-secondary rounded-2xl border border-white/10 overflow-hidden transition-all duration-300"
            >
              <button
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-medium text-metal-white pr-8">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-brand-cyan shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
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
<div className="flex items-center gap-3 text-sm text-text-secondary">
  <a href="/privacy/" className="hover:text-brand-cyan transition-colors">隱私權政策</a>
  <span className="text-metal-gray/50">|</span>
  <a href="/terms/" className="hover:text-brand-cyan transition-colors">服務條款</a>
  <span className="text-metal-gray/50">|</span>
  <a href="/subscriptions/" className="hover:text-brand-cyan transition-colors">自動續訂說明</a>
</div>
            <span className="text-metal-gray">|</span>
            <a href="mailto:support@keylyapp.com" className="hover:text-brand-cyan transition-colors">技術支援</a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-metal-gray">
          &copy; 2026 Keyly 由台灣團隊專為高效溝通而生。
        </div>
      </div>
    </footer>
  );
}
