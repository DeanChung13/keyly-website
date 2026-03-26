import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Delete, CornerDownLeft, Globe, Mic, MousePointer2 } from 'lucide-react';

const showcases = [
  {
    id: "style_polite_decline",
    promptTitle: "委婉拒絕",
    before: "我今天真的不想加班，我要去約會，這明天再說。",
    after: "謝謝主管的交派，目前我手邊的工作正進入結案階段，為了確保品質，我預計週一早上第一時間處理這項任務，再請您見諒！祝您週末愉快。"
  },
  {
    id: "style_social_rescue",
    promptTitle: "這句怎麼回 (社交救星)",
    before: "曖昧對象只回了：哈哈是喔",
    after: "1. (幽默) 這樣就想打發我？你的聊天額度是不是用完了😂\n2. (高情商) 感覺你今天心情不錯喔，遇到什麼好事了嗎？\n3. (反問) 這麼簡短！難道這就是傳說中的「話不投機半句多」嗎？"
  },
  {
    id: "style_threads_shitpost",
    promptTitle: "Threads 廢文風格",
    before: "今天下班好累，想喝珍奶。",
    after: "有人跟我一樣嗎？下班後的靈魂只值一杯珍奶，微糖微冰是最後的救贖。我甚至累到連吸管都插不進去，這世界對我太狠了... 🥤🫠"
  },
  {
    id: "style_high_eq",
    promptTitle: "高情商回覆",
    before: "你們改來改去到底煩不煩？浪費我時間。",
    after: "收到您的回饋，針對這次需求的調整，我建議我們先對齊最終目標，以避免後續重複修正耗費雙方的時間與資源。讓我們安排 5 分鐘通話確認細節好嗎？"
  },
  {
    id: "style_foodie_checkin",
    promptTitle: "美食食記打卡",
    before: "這家鹹酥雞真的很好吃，必點九層塔。",
    after: "巷弄隱藏版！這家鹽酥雞真的「很頂」🔥，炸得金黃酥脆完全不油膩，那個靈魂九層塔直接香爆！絕對是我的深夜口袋名單，必吃指數 5 顆星！✨\n#深夜食堂 #鹽酥雞 #必吃口袋名單 #在地美食"
  }
];

export default function TypingAnimation() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'waiting' | 'processing' | 'done' | 'idle'>('idle');
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let isMounted = true;
    
    const runAnimation = async () => {
      const currentShowcase = showcases[currentIndex];
      
      // Reset
      setPhase('typing');
      setDisplayedText('');
      
      // Type before text
      for (let i = 0; i <= currentShowcase.before.length; i++) {
        if (!isMounted) return;
        setDisplayedText(currentShowcase.before.substring(0, i));
        await new Promise(r => setTimeout(r, 50 + Math.random() * 50));
      }
      
      // Wait before clicking AI
      if (!isMounted) return;
      setPhase('waiting');
      await new Promise(r => setTimeout(r, 1200));
      
      // Processing
      if (!isMounted) return;
      setPhase('processing');
      await new Promise(r => setTimeout(r, 800));
      
      // Done
      if (!isMounted) return;
      setDisplayedText(currentShowcase.after);
      setPhase('done');
      
      // Wait before next
      await new Promise(r => setTimeout(r, 4000));
      
      // Next showcase
      if (isMounted) {
        setCurrentIndex((prev) => (prev + 1) % showcases.length);
      }
    };

    runAnimation();

    return () => {
      isMounted = false;
    };
  }, [currentIndex]);

  const currentShowcase = showcases[currentIndex];

  return (
    <div className="relative w-[320px] sm:w-[360px] h-[700px] bg-[#F4F5F7] rounded-[3rem] border-[12px] border-[#1E213A] shadow-2xl overflow-hidden ring-1 ring-black/10 mx-auto flex flex-col">
      {/* Notch */}
      <div className="absolute top-0 inset-x-0 h-6 bg-[#1E213A] rounded-b-3xl w-40 mx-auto z-20"></div>
      
      {/* App Header */}
      <div className="pt-12 pb-4 px-6 bg-white border-b border-gray-200 flex items-center justify-center shadow-sm z-10">
        <div className="font-bold text-base text-gray-800">新增貼文</div>
      </div>
      
      {/* Text Area */}
      <div className="flex-1 p-5 bg-white relative">
        <div className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap font-sans">
          {displayedText}
          {phase !== 'done' && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-0.5 h-5 bg-brand-cyan ml-1 align-middle"
            />
          )}
        </div>
        
        {/* AI Action Button (Floating) */}
        <AnimatePresence mode="wait">
          {(phase === 'waiting' || phase === 'processing') && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="absolute bottom-4 right-4 flex items-center"
            >
              <div className="relative z-10">
                <div className={`absolute inset-0 bg-gradient-to-r from-brand-cyan to-brand-purple rounded-full blur-md transition-opacity duration-300 ${phase === 'processing' ? 'opacity-100' : 'opacity-0'}`}></div>
                <button className="relative flex items-center space-x-2 bg-[#1E213A] border border-white/10 text-white px-4 py-2.5 rounded-full text-sm font-medium shadow-lg">
                  {phase === 'processing' ? (
                    <Sparkles className="w-4 h-4 text-brand-cyan animate-pulse" />
                  ) : (
                    <Sparkles className="w-4 h-4 text-brand-cyan" />
                  )}
                  <span>{currentShowcase.promptTitle}</span>
                </button>
              </div>
              
              {/* Simulated Cursor clicking the button */}
              {phase === 'waiting' && (
                <motion.div
                  initial={{ x: 50, y: 50, opacity: 0 }}
                  animate={{ x: -10, y: 10, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="absolute right-0 bottom-0 z-50 pointer-events-none text-white"
                >
                  <MousePointer2 className="w-6 h-6 fill-white stroke-black" />
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Keyboard Area */}
      <div className="bg-[#D1D5DB] pb-8 pt-2 px-1.5 flex flex-col gap-1.5">
        {/* Row 1 */}
        <div className="flex justify-center gap-1">
          {['ㄅ','ㄉ','ˇ','ˋ','ㄓ','ˊ','˙','ㄚ','ㄞ','ㄢ','ㄦ'].map(k => (
            <div key={k} className="bg-white rounded shadow-sm flex-1 h-11 flex items-center justify-center text-lg text-black">{k}</div>
          ))}
        </div>
        {/* Row 2 */}
        <div className="flex justify-center gap-1 px-1">
          {['ㄆ','ㄊ','ㄍ','ㄐ','ㄔ','ㄗ','ㄧ','ㄛ','ㄟ','ㄣ'].map(k => (
            <div key={k} className="bg-white rounded shadow-sm flex-1 h-11 flex items-center justify-center text-lg text-black">{k}</div>
          ))}
        </div>
        {/* Row 3 */}
        <div className="flex justify-center gap-1 px-3">
          {['ㄇ','ㄋ','ㄎ','ㄑ','ㄕ','ㄘ','ㄨ','ㄜ','ㄠ','ㄤ'].map(k => (
            <div key={k} className="bg-white rounded shadow-sm flex-1 h-11 flex items-center justify-center text-lg text-black">{k}</div>
          ))}
        </div>
        {/* Row 4 */}
        <div className="flex justify-center gap-1 pl-5 pr-1">
          {['ㄈ','ㄌ','ㄏ','ㄒ','ㄖ','ㄙ','ㄩ','ㄝ','ㄡ','ㄥ'].map(k => (
            <div key={k} className="bg-white rounded shadow-sm flex-1 h-11 flex items-center justify-center text-lg text-black">{k}</div>
          ))}
          <div className="bg-[#AEB3BE] rounded shadow-sm w-[42px] h-11 flex items-center justify-center text-black">
            <Delete className="w-5 h-5" />
          </div>
        </div>
        {/* Row 5 */}
        <div className="flex justify-center gap-1">
          <div className="bg-[#AEB3BE] rounded shadow-sm w-[42px] h-11 flex items-center justify-center text-sm text-black">123</div>
          <div className="bg-[#AEB3BE] rounded shadow-sm w-[42px] h-11 flex items-center justify-center text-sm text-black">ABC</div>
          <div className="bg-gradient-to-br from-[#6366F1] to-[#A855F7] rounded shadow-sm w-11 h-11 flex items-center justify-center text-white">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="bg-white rounded shadow-sm flex-1 h-11 flex items-center justify-center text-sm text-black">空白</div>
          <div className="bg-[#AEB3BE] rounded shadow-sm w-[60px] h-11 flex items-center justify-center text-black">
            <CornerDownLeft className="w-5 h-5" />
          </div>
        </div>
        {/* Row 6 */}
        <div className="flex justify-between px-4 pt-1">
          <Globe className="w-6 h-6 text-gray-600" />
          <Mic className="w-6 h-6 text-gray-600" />
        </div>
      </div>
    </div>
  );
}
