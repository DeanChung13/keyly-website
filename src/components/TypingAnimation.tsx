import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Delete, CornerDownLeft, MousePointer2, ShieldCheck } from 'lucide-react';
import keyboardImg from '../../assets/images/keyboard.webp';

import { Showcase, zhTWShowcases, enShowcases } from '@/src/data/showcases';

type Locale = 'zh-TW' | 'en';

type TypingAnimationCopy = {
  showcases: Showcase[];
  previewTitle: string;
  sourceLabel: string;
  completeLabel: string;
  processingLabel: string;
  spaceLabel: string;
};


const copyMap: Record<Locale, TypingAnimationCopy> = {
  'zh-TW': {
    showcases: zhTWShowcases,
    previewTitle: 'Keyly AI 預覽',
    sourceLabel: '原始輸入內容',
    completeLabel: 'AI 魔法優化完成',
    processingLabel: '正在精煉您的文字...',
    spaceLabel: '空白'
  },
  en: {
    showcases: enShowcases,
    previewTitle: 'Keyly AI Preview',
    sourceLabel: 'Original Draft',
    completeLabel: 'AI refinement complete',
    processingLabel: 'Refining your text...',
    spaceLabel: 'Space'
  }
};

export default function TypingAnimation({ locale = 'zh-TW' }: { locale?: Locale }) {
  const copy = copyMap[locale];
  const showcases = copy.showcases;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'waiting' | 'processing' | 'done' | 'idle'>('idle');
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let isMounted = true;

    const runAnimation = async () => {
      const currentShowcase = showcases[currentIndex];

      setPhase('typing');
      setDisplayedText('');

      for (let i = 0; i <= currentShowcase.before.length; i++) {
        if (!isMounted) return;
        setDisplayedText(currentShowcase.before.substring(0, i));
        await new Promise((r) => setTimeout(r, 40 + Math.random() * 40));
      }

      if (!isMounted) return;
      setPhase('waiting');
      await new Promise((r) => setTimeout(r, 1000));

      if (!isMounted) return;
      setPhase('processing');
      await new Promise((r) => setTimeout(r, 1200));

      if (!isMounted) return;
      setDisplayedText(currentShowcase.after);
      setPhase('done');

      await new Promise((r) => setTimeout(r, 5000));

      if (isMounted) {
        setCurrentIndex((prev) => (prev + 1) % showcases.length);
      }
    };

    runAnimation();

    return () => {
      isMounted = false;
    };
  }, [currentIndex, showcases]);

  const currentShowcase = showcases[currentIndex];

  return (
    <div className="relative w-[300px] sm:w-[340px] h-[650px] sm:h-[737px] bg-gradient-to-br from-[#3b3d52] to-[#141523] rounded-[3.2rem] p-[8px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] mx-auto flex flex-col scale-90 sm:scale-100 origin-top ring-1 ring-white/10 z-20">
      {/* Hardware Buttons */}
      <div className="absolute top-[120px] -left-[2px] w-[3px] h-[26px] bg-[#2a2c40] rounded-l-md shadow-[inset_1px_0_1px_rgba(255,255,255,0.1)]"></div>
      <div className="absolute top-[170px] -left-[2px] w-[3px] h-[52px] bg-[#2a2c40] rounded-l-md shadow-[inset_1px_0_1px_rgba(255,255,255,0.1)]"></div>
      <div className="absolute top-[230px] -left-[2px] w-[3px] h-[52px] bg-[#2a2c40] rounded-l-md shadow-[inset_1px_0_1px_rgba(255,255,255,0.1)]"></div>
      <div className="absolute top-[180px] -right-[2px] w-[3px] h-[75px] bg-[#2a2c40] rounded-r-md shadow-[inset_-1px_0_1px_rgba(255,255,255,0.1)]"></div>

      {/* Inner Screen */}
      <div className="relative w-full h-full bg-white rounded-[2.8rem] overflow-hidden flex flex-col shadow-[inset_0_0_20px_rgba(0,0,0,0.15)] ring-1 ring-black/5">
        
        {/* Screen Glare Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 w-[150%] h-[150%] -rotate-45 -translate-y-[60%] -translate-x-[20%] pointer-events-none z-50 mix-blend-overlay"></div>

        {/* Dynamic Island */}
        <div className="absolute top-2.5 inset-x-0 mx-auto w-[115px] h-[32px] bg-black rounded-full z-40 shadow-[0_4px_15px_rgba(0,0,0,0.3)] flex items-center justify-between px-3 ring-1 ring-white/10">
          <div className="w-2.5 h-2.5 rounded-full bg-white/10 ring-1 ring-black/50 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 to-purple-500/40 mix-blend-color-dodge"></div>
          </div>
          <div className="w-2.5 h-2.5 rounded-full bg-white/10 ring-1 ring-black/50"></div>
        </div>

        {/* Fake Status Bar */}
        <div className="absolute top-0 inset-x-0 h-12 flex justify-between items-center px-7 pt-1 z-30 text-[12px] font-semibold text-gray-800 pointer-events-none">
          <span>9:41</span>
          <div className="flex space-x-1.5 items-center mt-0.5">
            <div className="flex space-x-[2px] items-end h-2.5">
              <div className="w-[3px] h-[4px] bg-gray-800 rounded-sm"></div>
              <div className="w-[3px] h-[6px] bg-gray-800 rounded-sm"></div>
              <div className="w-[3px] h-[8px] bg-gray-800 rounded-sm"></div>
              <div className="w-[3px] h-[10px] bg-gray-800 rounded-sm"></div>
            </div>
            <div className="w-[18px] h-3 rounded-[3px] ring-1 ring-gray-800 flex items-center p-[1.5px] relative">
              <div className="w-full h-full bg-gray-800 rounded-[1px]"></div>
              <div className="absolute -right-[2px] top-1/2 -translate-y-1/2 w-[2px] h-[4px] bg-gray-800 rounded-r-sm"></div>
            </div>
          </div>
        </div>

        <div className="pt-14 pb-3 px-6 bg-white/90 backdrop-blur-md border-b border-gray-100/80 flex items-center justify-between shadow-sm z-20 relative">
          <div className="w-8"></div>
          <div className="font-bold text-[15px] text-gray-800 tracking-wide">{copy.previewTitle}</div>
          <div className="flex items-center text-brand-cyan drop-shadow-sm">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="flex-1 p-6 bg-[#fafafa] relative overflow-hidden flex flex-col">
          <div className="mb-5">
            <AnimatePresence mode="wait">
              {phase === 'done' ? (
                <motion.span
                  key="done"
                  initial={{ opacity: 0, scale: 0.8, y: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 ring-1 ring-green-500/30 shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5 mr-1.5" /> {copy.completeLabel}
                </motion.span>
              ) : (
                <motion.span
                  key="source"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white text-gray-600 ring-1 ring-gray-200 shadow-sm"
                >
                  {copy.sourceLabel}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <div className={`text-gray-800 text-[17px] leading-[1.6] whitespace-pre-wrap font-sans transition-all duration-700 relative z-10 ${phase === 'done' ? 'text-gray-900 font-medium' : 'text-gray-500 italic'}`}>
            {displayedText}
            {phase !== 'done' && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-0.5 h-5 bg-brand-cyan ml-1 align-middle rounded-full"
              />
            )}
          </div>

          <AnimatePresence>
            {phase === 'processing' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-white/70 backdrop-blur-[4px] z-30 flex flex-col items-center justify-center"
              >
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                    className="w-20 h-20 border-[5px] border-brand-cyan/10 border-t-brand-cyan rounded-full drop-shadow-md"
                  />
                  <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-brand-cyan animate-pulse drop-shadow-sm" />
                </div>
                <p className="mt-5 text-sm font-bold tracking-widest text-brand-cyan uppercase animate-pulse drop-shadow-sm">{copy.processingLabel}</p>

                <motion.div
                  initial={{ top: '-10%' }}
                  animate={{ top: '110%' }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-cyan/70 to-transparent shadow-[0_0_20px_rgba(71,158,209,0.8)]"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {phase === 'waiting' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="absolute bottom-8 right-6 flex items-center z-40"
              >
                <div className="relative group cursor-pointer">
                  <div className="absolute inset-0 bg-brand-cyan rounded-full blur-lg opacity-60 animate-pulse group-hover:opacity-100 transition-opacity"></div>
                  <button className="relative flex items-center space-x-2 bg-bg-primary hover:bg-bg-primary/90 text-white px-5 py-3.5 rounded-full text-sm font-bold shadow-xl border border-white/20 transition-transform hover:scale-105 active:scale-95">
                    <Sparkles className="w-4 h-4 text-brand-cyan" />
                    <span className="tracking-wide">{currentShowcase.promptTitle}</span>
                  </button>
                </div>

                <motion.div
                  initial={{ x: 50, y: 50, opacity: 0 }}
                  animate={{ x: -10, y: 15, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.4 }}
                  className="absolute right-0 bottom-0 z-50 pointer-events-none drop-shadow-2xl"
                >
                  <MousePointer2 className="w-7 h-7 fill-white stroke-black stroke-[1.5]" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <img src={keyboardImg} alt="Keyboard" className="w-full h-auto object-contain z-10 relative -mt-4 drop-shadow-lg" />

        {/* Home Indicator */}
        <div className="absolute bottom-[6px] left-1/2 -translate-x-1/2 w-[120px] h-[4px] bg-black/80 rounded-full z-50"></div>
      </div>
    </div>
  );
}
