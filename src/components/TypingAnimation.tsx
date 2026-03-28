import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Delete, CornerDownLeft, MousePointer2, ShieldCheck } from 'lucide-react';
import keyboardImg from '../../assets/images/keyboard.png';

type Showcase = {
  id: string;
  promptTitle: string;
  before: string;
  after: string;
};

type Locale = 'zh-TW' | 'en';

type TypingAnimationCopy = {
  showcases: Showcase[];
  previewTitle: string;
  sourceLabel: string;
  completeLabel: string;
  processingLabel: string;
  spaceLabel: string;
};

const zhTWShowcases: Showcase[] = [
  // 1. 視覺震撼：混亂變秩序。第一秒就讓使用者看到 AI 處理繁瑣資訊的強大實力。
  {
    id: 'style_chaos_to_order',
    promptTitle: '靈感整理術',
    before: '明天要開會要記得帶簡報還有要訂下午茶珍奶微糖然後那個數據報表幫我印五份對了還有要約小明',
    after: '📍 明日待辦清單：\n1. 準備會議簡報\n2. 訂購下午茶（珍奶/微糖）\n3. 列印數據報表（共 5 份）\n4. 聯繫小明確認時程'
  },
  // 2. 社群共鳴：Threads 廢文。精準捕捉台灣目前最火紅的社交平台語境。
  {
    id: 'style_threads_viral',
    promptTitle: 'Threads 流量密碼',
    before: '今天加班到現在才回家，好累喔。',
    after: '凌晨兩點的台北，剩下路燈跟我的黑眼圈。🫠 原來這就是成長的味道（誤）。有沒有人也還沒睡？求拍打餵食...🧋\n\n#加班日常 #台北社畜 #深夜感性'
  },
  // 3. 社交救星：職場生存。把心中的「真心話」包裝成「得體話」。
  {
    id: 'style_workplace_survival',
    promptTitle: '職場生存術',
    before: '這不是我的事，你去問別人好嗎？',
    after: '感謝您的詢問。這部分涉及相關部門的業務權責，建議您可以先與該單位對接，以獲得最即時的協助。如有需要我幫忙串接的地方，請隨時告知！'
  },
  // 4. 旅遊驚喜：日本旅遊。展示注音直出日文的強大跨國能力。
  {
    id: 'style_travel_japan',
    promptTitle: '日本旅遊神隊友',
    before: '不好意思，請問這附近有推薦的在地居酒屋嗎？要不用排隊的。',
    after: 'すみません、この近くにおすすめの地元の居酒屋はありますか？並ばずに入れるお店がいいです。'
  },
  // 5. 商務專業：跨國溝通。強化 Keyly 作為生產力工具的地位。
  {
    id: 'style_global_business',
    promptTitle: '跨國商務溝通',
    before: '老闆，關於這份報告，我需要多一點時間確認數據。',
    after: 'Hi Boss, regarding this report, I would appreciate a bit more time to verify the data to ensure accuracy. I will keep you updated on the progress.'
  },
  // 6. 優雅收尾：專業拒絕。解決台灣人最難開口的「拒絕」痛點。
  {
    id: 'style_polite_decline',
    promptTitle: '專業拒絕',
    before: '這我現在沒空做，你找別人或是等我下禮拜有空再說。',
    after: '謝謝您的提案。目前我手邊的專案正處於關鍵執行期，暫無多餘心力投入新任務。為了確保品質，建議您可以先諮詢相關部門或待下週我確認排程後再與您對接。感謝您的體諒！'
  },
  {
    id: 'style_polite_decline',
    promptTitle: '專業拒絕',
    before: '這我現在沒空做，你找別人或是等我下禮拜有空再說。',
    after: '謝謝您的提案。目前我手邊的專案正處於關鍵執行期，暫無多餘心力投入新任務。為了確保品質，建議您可以先諮詢 [部門名稱] 或待下週我確認排程後再與您對接。感謝您的體諒！'
  },
  {
    id: 'style_social_rescue',
    promptTitle: '社交救星',
    before: '尷尬了，主管問我對公司有什麼建議，我該怎麼說？',
    after: '1. (專業) 建議公司可以評估優化內部的溝通流程，提升跨部門協作效率。\n2. (誠懇) 我觀察到目前的會議頻率較高，若能適度精簡將有助於執行端產出。\n3. (高情商) 我覺得目前的團隊氛圍很棒，若能增加專業技能的分享會就更完美了！'
  },
  {
    id: 'style_high_eq',
    promptTitle: '高情商回覆',
    before: '你這樣做讓我很困擾，可以請你專業一點嗎？',
    after: '關於目前的執行方式，我希望能與您對齊期待，以利後續合作更為順暢。我們是否能抽空討論如何優化流程，讓雙方的專業發揮最大效益？'
  },
  {
    id: 'style_threads_shitpost',
    promptTitle: 'Threads 廢文風格',
    before: '下班好累，想喝手搖飲，但又怕胖，怎麼辦？',
    after: '脆友救我... 🫠\n\n靈魂在呼喊珍奶，但脂肪在警告我。這種「下班後的矛盾心理」有人懂嗎？到底要選擇快樂還是選擇體重？還是說微糖微冰就不會有熱量（誤）🧋✨\n\n#下班日常 #手搖飲控 #生活碎片'
  }
];

const enShowcases: Showcase[] = [
  {
    id: 'style_chaos_to_order',
    promptTitle: 'Idea Organizer',
    before: 'meeting tomorrow need slides order boba tea half sugar also print 5 copies of report and call mike',
    after: '📍 Tomorrow\'s To-Do List:\n1. Prepare meeting slides\n2. Order boba tea (Half Sugar)\n3. Print 5 copies of the report\n4. Call Mike for follow-up'
  },
  // 2. Social Media Viral: Capturing the Gen Z / Millennial digital tone.
  {
    id: 'style_social_viral',
    promptTitle: 'Viral Content Creator',
    before: 'just got home from work so tired its so late',
    after: '2 AM vibes... just me, my iced coffee, and this deadline. 🫠 Is this what they call "the hustle" or am I just sleep-deprived? Send help (and snacks). 🍕✨\n\n#WorkLife #NightOwl #GrindSet'
  },
  // 3. Workplace Diplomacy: Turning blunt thoughts into professional communication.
  {
    id: 'style_workplace_survival',
    promptTitle: 'Professional Diplomat',
    before: 'This is not my job, go ask someone else.',
    after: 'Thank you for reaching out. This falls under the [Department Name]\'s scope of responsibility. I recommend contacting them directly for the most accurate assistance. Let me know if you need help with the handoff!'
  },
  // 4. Travel Companion (Japanese): Showing off the seamless translation power.
  {
    id: 'style_travel_japan',
    promptTitle: 'Travel Sidekick',
    before: 'Excuse me, are there any good local izakayas nearby that don\'t have a long wait?',
    after: 'すみません、この近くにおすすめの地元の居酒屋はありますか？並ばずに入れるお店がいいです。'
  },
  // 5. Business English Pro: Elevating standard English to executive level.
  {
    id: 'style_global_business',
    promptTitle: 'Executive Presence',
    before: 'Boss, I need more time for the report to check the numbers.',
    after: 'Hi [Name], I would appreciate a bit more time to verify the data in this report to ensure full accuracy. I will provide you with a revised timeline by end of day.'
  },
  // 6. Polite Decline: Solving the universal pain point of saying "No".
  {
    id: 'style_polite_decline',
    promptTitle: 'Graceful Refusal',
    before: 'I dont have time for this now, ask someone else or wait until next week.',
    after: 'Thanks for the proposal. I’m currently at full capacity with a high-priority project and won\'t be able to take this on right now. Perhaps we can touch base next week once I’ve cleared my current queue?'
  },
  {
    id: 'style_polite_decline',
    promptTitle: 'Polite Decline',
    before: "I can't take this on right now. Please ask someone else or check back with me next week.",
    after: 'Thank you for thinking of me. My current projects are in a critical execution phase, so I do not have the bandwidth to commit to additional work at the moment. To keep quality high, you may want to check with [team name] first, or reconnect with me next week once I have reviewed my schedule. I appreciate your understanding.'
  },
  {
    id: 'style_social_rescue',
    promptTitle: 'Social Rescue',
    before: 'My manager asked what I think the company should improve. What should I say?',
    after: '1. (Professional) The company could review internal communication workflows to improve cross-team execution.\n2. (Sincere) I have noticed meetings are fairly frequent, and trimming them slightly could create more room for delivery work.\n3. (High-EQ) The team atmosphere is already strong. Adding more skill-sharing sessions could make it even better.'
  },
  {
    id: 'style_high_eq',
    promptTitle: 'High-EQ Reply',
    before: 'Your approach is making this difficult for me. Can you be more professional?',
    after: 'I would like to align on expectations around the current workflow so our collaboration can move more smoothly. Would you be open to a quick discussion on how we can improve the process and help both sides work more effectively?'
  },
  {
    id: 'style_threads_shitpost',
    promptTitle: 'Threads Post',
    before: "I'm exhausted after work and want bubble tea, but I also don't want to gain weight. What do I do?",
    after: "Need help, internet...\n\nMy soul wants bubble tea, but my body is filing a formal complaint. Does anyone else know this exact after-work crisis? Do I choose happiness or the scale? Or does half sugar somehow cancel the calories out? Asking for a friend.\n\n#AfterWorkMood #BubbleTeaProblems #TinyLifeCrisis"
  }
];

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
