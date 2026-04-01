import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Delete, CornerDownLeft, MousePointer2, ShieldCheck } from 'lucide-react';
import keyboardImg from '../../assets/images/keyboard.png';

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
    <div className="relative w-[300px] sm:w-[340px] h-[650px] bg-[#F4F5F7] rounded-[3rem] border-[10px] border-[#1E213A] shadow-2xl overflow-hidden ring-1 ring-black/10 mx-auto flex flex-col scale-90 sm:scale-100 origin-top">
      <div className="absolute top-0 inset-x-0 h-5 bg-[#1E213A] rounded-b-2xl w-32 mx-auto z-20"></div>

      <div className="pt-10 pb-3 px-6 bg-white border-b border-gray-100 flex items-center justify-between shadow-sm z-10">
        <div className="w-10"></div>
        <div className="font-bold text-sm text-gray-800">{copy.previewTitle}</div>
        <div className="flex items-center text-brand-cyan">
          <ShieldCheck className="w-4 h-4" />
        </div>
      </div>

      <div className="flex-1 p-5 bg-white relative overflow-hidden">
        <div className="mb-4">
          <AnimatePresence mode="wait">
            {phase === 'done' ? (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
              >
                <Sparkles className="w-3 h-3 mr-1" /> {copy.completeLabel}
              </motion.span>
            ) : (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600"
              >
                {copy.sourceLabel}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className={`text-gray-800 text-base leading-relaxed whitespace-pre-wrap font-sans transition-colors duration-500 ${phase === 'done' ? 'text-gray-900 font-medium' : 'text-gray-500 italic'}`}>
          {displayedText}
          {phase !== 'done' && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-0.5 h-5 bg-brand-cyan ml-1 align-middle"
            />
          )}
        </div>

        <AnimatePresence>
          {phase === 'processing' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                  className="w-16 h-16 border-4 border-brand-cyan/20 border-t-brand-cyan rounded-full"
                />
                <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-brand-cyan animate-pulse" />
              </div>
              <p className="mt-4 text-sm font-bold text-brand-cyan animate-pulse">{copy.processingLabel}</p>

              <motion.div
                initial={{ top: '-10%' }}
                animate={{ top: '110%' }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-cyan/50 to-transparent shadow-[0_0_15px_rgba(71,158,209,0.5)]"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {phase === 'waiting' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="absolute bottom-6 right-6 flex items-center z-30"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-brand-cyan rounded-full blur-md opacity-50 animate-pulse"></div>
                <button className="relative flex items-center space-x-2 bg-bg-primary text-white px-5 py-3 rounded-full text-sm font-bold shadow-2xl border border-white/20">
                  <Sparkles className="w-4 h-4 text-brand-cyan" />
                  <span>{currentShowcase.promptTitle}</span>
                </button>
              </div>

              <motion.div
                initial={{ x: 40, y: 40, opacity: 0 }}
                animate={{ x: -10, y: 10, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="absolute right-0 bottom-0 z-40 pointer-events-none"
              >
                <MousePointer2 className="w-6 h-6 fill-white stroke-black" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <img src={keyboardImg} alt="Keyboard" className="w-full h-auto object-contain" />
    </div>
  );
}
