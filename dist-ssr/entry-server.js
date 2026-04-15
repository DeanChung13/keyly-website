import { jsxs, jsx } from "react/jsx-runtime";
import { renderToString } from "react-dom/server";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ShieldCheck, Sparkles, MousePointer2, Download, X, Menu, ChevronDown, Smartphone, Wand2, Feather, Command, Music } from "lucide-react";
const keyboardImg = "/assets/keyboard-C-cJCmuM.webp";
const zhTWShowcases = [
  // 1. 視覺震撼：混亂變秩序。第一秒就讓使用者看到 AI 處理繁瑣資訊的強大實力。
  {
    id: "style_chaos_to_order",
    promptTitle: "靈感整理術",
    before: "明天要開會要記得帶簡報還有要訂下午茶珍奶微糖然後那個數據報表幫我印五份對了還有要約小明",
    after: "📍 明日待辦清單：\n1. 準備會議簡報\n2. 訂購下午茶（珍奶/微糖）\n3. 列印數據報表（共 5 份）\n4. 聯繫小明確認時程"
  },
  // 2. 社群共鳴：Threads 廢文。精準捕捉台灣目前最火紅的社交平台語境。
  {
    id: "style_threads_viral",
    promptTitle: "Threads 流量密碼",
    before: "今天加班到現在才回家，好累喔。",
    after: "凌晨兩點的台北，剩下路燈跟我的黑眼圈。🫠 原來這就是成長的味道（誤）。有沒有人也還沒睡？求拍打餵食...🧋\n\n#加班日常 #台北社畜 #深夜感性"
  },
  // 3. 社交救星：職場生存。把心中的「真心話」包裝成「得體話」。
  {
    id: "style_workplace_survival",
    promptTitle: "職場生存術",
    before: "這不是我的事，你去問別人好嗎？",
    after: "感謝您的詢問。這部分涉及相關部門的業務權責，建議您可以先與該單位對接，以獲得最即時的協助。如有需要我幫忙串接的地方，請隨時告知！"
  },
  // 4. 旅遊驚喜：日本旅遊。展示注音直出日文的強大跨國能力。
  {
    id: "style_travel_japan",
    promptTitle: "日本旅遊神隊友",
    before: "不好意思，請問這附近有推薦的在地居酒屋嗎？要不用排隊的。",
    after: "すみません、この近くにおすすめの地元の居酒屋はありますか？並ばずに入れるお店がいいです。"
  },
  // 5. 商務專業：跨國溝通。強化 Keyly 作為生產力工具的地位。
  {
    id: "style_global_business",
    promptTitle: "跨國商務溝通",
    before: "老闆，關於這份報告，我需要多一點時間確認數據。",
    after: "Hi Boss, regarding this report, I would appreciate a bit more time to verify the data to ensure accuracy. I will keep you updated on the progress."
  },
  // 6. 優雅收尾：專業拒絕。解決台灣人最難開口的「拒絕」痛點。
  {
    id: "style_polite_decline",
    promptTitle: "專業拒絕",
    before: "這我現在沒空做，你找別人或是等我下禮拜有空再說。",
    after: "謝謝您的提案。目前我手邊的專案正處於關鍵執行期，暫無多餘心力投入新任務。為了確保品質，建議您可以先諮詢相關部門或待下週我確認排程後再與您對接。感謝您的體諒！"
  },
  {
    id: "style_social_rescue",
    promptTitle: "社交救星",
    before: "尷尬了，主管問我對公司有什麼建議，我該怎麼說？",
    after: "1. (專業) 建議公司可以評估優化內部的溝通流程，提升跨部門協作效率。\n2. (誠懇) 我觀察到目前的會議頻率較高，若能適度精簡將有助於執行端產出。\n3. (高情商) 我覺得目前的團隊氛圍很棒，若能增加專業技能的分享會就更完美了！"
  },
  {
    id: "style_high_eq",
    promptTitle: "高情商回覆",
    before: "你這樣做讓我很困擾，可以請你專業一點嗎？",
    after: "關於目前的執行方式，我希望能與您對齊期待，以利後續合作更為順暢。我們是否能抽空討論如何優化流程，讓雙方的專業發揮最大效益？"
  },
  {
    id: "style_threads_shitpost",
    promptTitle: "Threads 廢文風格",
    before: "下班好累，想喝手搖飲，但又怕胖，怎麼辦？",
    after: "脆友救我... 🫠\n\n靈魂在呼喊珍奶，但脂肪在警告我。這種「下班後的矛盾心理」有人懂嗎？到底要選擇快樂還是選擇體重？還是說微糖微冰就不會有熱量（誤）🧋✨\n\n#下班日常 #手搖飲控 #生活碎片"
  }
];
const enShowcases = [
  {
    id: "style_chaos_to_order",
    promptTitle: "Idea Organizer",
    before: "meeting tomorrow need slides order boba tea half sugar also print 5 copies of report and call mike",
    after: "📍 Tomorrow's To-Do List:\n1. Prepare meeting slides\n2. Order boba tea (Half Sugar)\n3. Print 5 copies of the report\n4. Call Mike for follow-up"
  },
  // 2. Social Media Viral: Capturing the Gen Z / Millennial digital tone.
  {
    id: "style_social_viral",
    promptTitle: "Viral Content Creator",
    before: "just got home from work so tired its so late",
    after: '2 AM vibes... just me, my iced coffee, and this deadline. 🫠 Is this what they call "the hustle" or am I just sleep-deprived? Send help (and snacks). 🍕✨\n\n#WorkLife #NightOwl #GrindSet'
  },
  // 3. Workplace Diplomacy: Turning blunt thoughts into professional communication.
  {
    id: "style_workplace_survival",
    promptTitle: "Professional Diplomat",
    before: "This is not my job, go ask someone else.",
    after: "Thank you for reaching out. This falls under the [Department Name]'s scope of responsibility. I recommend contacting them directly for the most accurate assistance. Let me know if you need help with the handoff!"
  },
  // 4. Travel Companion (Japanese): Showing off the seamless translation power.
  {
    id: "style_travel_japan",
    promptTitle: "Travel Sidekick",
    before: "Excuse me, are there any good local izakayas nearby that don't have a long wait?",
    after: "すみません、この近くにおすすめの地元の居酒屋はありますか？並ばずに入れるお店がいいです。"
  },
  // 5. Business English Pro: Elevating standard English to executive level.
  {
    id: "style_global_business",
    promptTitle: "Executive Presence",
    before: "Boss, I need more time for the report to check the numbers.",
    after: "Hi [Name], I would appreciate a bit more time to verify the data in this report to ensure full accuracy. I will provide you with a revised timeline by end of day."
  },
  // 6. Polite Decline: Solving the universal pain point of saying "No".
  {
    id: "style_polite_decline",
    promptTitle: "Graceful Refusal",
    before: "I dont have time for this now, ask someone else or wait until next week.",
    after: "Thanks for the proposal. I’m currently at full capacity with a high-priority project and won't be able to take this on right now. Perhaps we can touch base next week once I’ve cleared my current queue?"
  },
  {
    id: "style_social_rescue",
    promptTitle: "Social Rescue",
    before: "My manager asked what I think the company should improve. What should I say?",
    after: "1. (Professional) The company could review internal communication workflows to improve cross-team execution.\n2. (Sincere) I have noticed meetings are fairly frequent, and trimming them slightly could create more room for delivery work.\n3. (High-EQ) The team atmosphere is already strong. Adding more skill-sharing sessions could make it even better."
  },
  {
    id: "style_high_eq",
    promptTitle: "High-EQ Reply",
    before: "Your approach is making this difficult for me. Can you be more professional?",
    after: "I would like to align on expectations around the current workflow so our collaboration can move more smoothly. Would you be open to a quick discussion on how we can improve the process and help both sides work more effectively?"
  },
  {
    id: "style_threads_shitpost",
    promptTitle: "Threads Post",
    before: "I'm exhausted after work and want bubble tea, but I also don't want to gain weight. What do I do?",
    after: "Need help, internet...\n\nMy soul wants bubble tea, but my body is filing a formal complaint. Does anyone else know this exact after-work crisis? Do I choose happiness or the scale? Or does half sugar somehow cancel the calories out? Asking for a friend.\n\n#AfterWorkMood #BubbleTeaProblems #TinyLifeCrisis"
  }
];
const copyMap = {
  "zh-TW": {
    showcases: zhTWShowcases,
    previewTitle: "Keyly AI 預覽",
    sourceLabel: "原始輸入內容",
    completeLabel: "AI 魔法優化完成",
    processingLabel: "正在精煉您的文字...",
    spaceLabel: "空白"
  },
  en: {
    showcases: enShowcases,
    previewTitle: "Keyly AI Preview",
    sourceLabel: "Original Draft",
    completeLabel: "AI refinement complete",
    processingLabel: "Refining your text...",
    spaceLabel: "Space"
  }
};
function TypingAnimation({ locale = "zh-TW" }) {
  const copy = copyMap[locale];
  const showcases = copy.showcases;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState("idle");
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    let isMounted = true;
    const runAnimation = async () => {
      const currentShowcase2 = showcases[currentIndex];
      setPhase("typing");
      setDisplayedText("");
      for (let i = 0; i <= currentShowcase2.before.length; i++) {
        if (!isMounted) return;
        setDisplayedText(currentShowcase2.before.substring(0, i));
        await new Promise((r) => setTimeout(r, 40 + Math.random() * 40));
      }
      if (!isMounted) return;
      setPhase("waiting");
      await new Promise((r) => setTimeout(r, 1e3));
      if (!isMounted) return;
      setPhase("processing");
      await new Promise((r) => setTimeout(r, 1200));
      if (!isMounted) return;
      setDisplayedText(currentShowcase2.after);
      setPhase("done");
      await new Promise((r) => setTimeout(r, 5e3));
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
  return /* @__PURE__ */ jsxs("div", { className: "relative w-[300px] sm:w-[340px] h-[650px] sm:h-[737px] bg-gradient-to-br from-[#3b3d52] to-[#141523] rounded-[3.2rem] p-[8px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] mx-auto flex flex-col scale-90 sm:scale-100 origin-top ring-1 ring-white/10 z-20", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-[120px] -left-[2px] w-[3px] h-[26px] bg-[#2a2c40] rounded-l-md shadow-[inset_1px_0_1px_rgba(255,255,255,0.1)]" }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[170px] -left-[2px] w-[3px] h-[52px] bg-[#2a2c40] rounded-l-md shadow-[inset_1px_0_1px_rgba(255,255,255,0.1)]" }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[230px] -left-[2px] w-[3px] h-[52px] bg-[#2a2c40] rounded-l-md shadow-[inset_1px_0_1px_rgba(255,255,255,0.1)]" }),
    /* @__PURE__ */ jsx("div", { className: "absolute top-[180px] -right-[2px] w-[3px] h-[75px] bg-[#2a2c40] rounded-r-md shadow-[inset_-1px_0_1px_rgba(255,255,255,0.1)]" }),
    /* @__PURE__ */ jsxs("div", { className: "relative w-full h-full bg-white rounded-[2.8rem] overflow-hidden flex flex-col shadow-[inset_0_0_20px_rgba(0,0,0,0.15)] ring-1 ring-black/5", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 w-[150%] h-[150%] -rotate-45 -translate-y-[60%] -translate-x-[20%] pointer-events-none z-50 mix-blend-overlay" }),
      /* @__PURE__ */ jsxs("div", { className: "absolute top-2.5 inset-x-0 mx-auto w-[115px] h-[32px] bg-black rounded-full z-40 shadow-[0_4px_15px_rgba(0,0,0,0.3)] flex items-center justify-between px-3 ring-1 ring-white/10", children: [
        /* @__PURE__ */ jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-white/10 ring-1 ring-black/50 overflow-hidden relative", children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-tr from-blue-900/40 to-purple-500/40 mix-blend-color-dodge" }) }),
        /* @__PURE__ */ jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-white/10 ring-1 ring-black/50" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "absolute top-0 inset-x-0 h-12 flex justify-between items-center px-7 pt-1 z-30 text-[12px] font-semibold text-gray-800 pointer-events-none", children: [
        /* @__PURE__ */ jsx("span", { children: "9:41" }),
        /* @__PURE__ */ jsxs("div", { className: "flex space-x-1.5 items-center mt-0.5", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex space-x-[2px] items-end h-2.5", children: [
            /* @__PURE__ */ jsx("div", { className: "w-[3px] h-[4px] bg-gray-800 rounded-sm" }),
            /* @__PURE__ */ jsx("div", { className: "w-[3px] h-[6px] bg-gray-800 rounded-sm" }),
            /* @__PURE__ */ jsx("div", { className: "w-[3px] h-[8px] bg-gray-800 rounded-sm" }),
            /* @__PURE__ */ jsx("div", { className: "w-[3px] h-[10px] bg-gray-800 rounded-sm" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "w-[18px] h-3 rounded-[3px] ring-1 ring-gray-800 flex items-center p-[1.5px] relative", children: [
            /* @__PURE__ */ jsx("div", { className: "w-full h-full bg-gray-800 rounded-[1px]" }),
            /* @__PURE__ */ jsx("div", { className: "absolute -right-[2px] top-1/2 -translate-y-1/2 w-[2px] h-[4px] bg-gray-800 rounded-r-sm" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "pt-14 pb-3 px-6 bg-white/90 backdrop-blur-md border-b border-gray-100/80 flex items-center justify-between shadow-sm z-20 relative", children: [
        /* @__PURE__ */ jsx("div", { className: "w-8" }),
        /* @__PURE__ */ jsx("div", { className: "font-bold text-[15px] text-gray-800 tracking-wide", children: copy.previewTitle }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center text-brand-cyan drop-shadow-sm", children: /* @__PURE__ */ jsx(ShieldCheck, { className: "w-5 h-5" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 p-6 bg-[#fafafa] relative overflow-hidden flex flex-col", children: [
        /* @__PURE__ */ jsx("div", { className: "mb-5", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: phase === "done" ? /* @__PURE__ */ jsxs(
          motion.span,
          {
            initial: { opacity: 0, scale: 0.8, y: 5 },
            animate: { opacity: 1, scale: 1, y: 0 },
            transition: { type: "spring", stiffness: 300, damping: 20 },
            className: "inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 ring-1 ring-green-500/30 shadow-sm",
            children: [
              /* @__PURE__ */ jsx(Sparkles, { className: "w-3.5 h-3.5 mr-1.5" }),
              " ",
              copy.completeLabel
            ]
          },
          "done"
        ) : /* @__PURE__ */ jsx(
          motion.span,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            className: "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white text-gray-600 ring-1 ring-gray-200 shadow-sm",
            children: copy.sourceLabel
          },
          "source"
        ) }) }),
        /* @__PURE__ */ jsxs("div", { className: `text-gray-800 text-[17px] leading-[1.6] whitespace-pre-wrap font-sans transition-all duration-700 relative z-10 ${phase === "done" ? "text-gray-900 font-medium" : "text-gray-500 italic"}`, children: [
          displayedText,
          phase !== "done" && /* @__PURE__ */ jsx(
            motion.span,
            {
              animate: { opacity: [1, 0] },
              transition: { repeat: Infinity, duration: 0.8 },
              className: "inline-block w-0.5 h-5 bg-brand-cyan ml-1 align-middle rounded-full"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(AnimatePresence, { children: phase === "processing" && /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            transition: { duration: 0.3 },
            className: "absolute inset-0 bg-white/70 backdrop-blur-[4px] z-30 flex flex-col items-center justify-center",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    animate: { rotate: 360 },
                    transition: { repeat: Infinity, duration: 1.5, ease: "linear" },
                    className: "w-20 h-20 border-[5px] border-brand-cyan/10 border-t-brand-cyan rounded-full drop-shadow-md"
                  }
                ),
                /* @__PURE__ */ jsx(Sparkles, { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-brand-cyan animate-pulse drop-shadow-sm" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "mt-5 text-sm font-bold tracking-widest text-brand-cyan uppercase animate-pulse drop-shadow-sm", children: copy.processingLabel }),
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: { top: "-10%" },
                  animate: { top: "110%" },
                  transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                  className: "absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-cyan/70 to-transparent shadow-[0_0_20px_rgba(71,158,209,0.8)]"
                }
              )
            ]
          }
        ) }),
        /* @__PURE__ */ jsx(AnimatePresence, { children: phase === "waiting" && /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.8, y: 15 },
            animate: { opacity: 1, scale: 1, y: 0 },
            exit: { opacity: 0, scale: 0.9, y: 10 },
            transition: { type: "spring", stiffness: 400, damping: 25 },
            className: "absolute bottom-8 right-6 flex items-center z-40",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "relative group cursor-pointer", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-brand-cyan rounded-full blur-lg opacity-60 animate-pulse group-hover:opacity-100 transition-opacity" }),
                /* @__PURE__ */ jsxs("button", { className: "relative flex items-center space-x-2 bg-bg-primary hover:bg-bg-primary/90 text-white px-5 py-3.5 rounded-full text-sm font-bold shadow-xl border border-white/20 transition-transform hover:scale-105 active:scale-95", children: [
                  /* @__PURE__ */ jsx(Sparkles, { className: "w-4 h-4 text-brand-cyan" }),
                  /* @__PURE__ */ jsx("span", { className: "tracking-wide", children: currentShowcase.promptTitle })
                ] })
              ] }),
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: { x: 50, y: 50, opacity: 0 },
                  animate: { x: -10, y: 15, opacity: 1 },
                  transition: { type: "spring", stiffness: 200, damping: 20, delay: 0.4 },
                  className: "absolute right-0 bottom-0 z-50 pointer-events-none drop-shadow-2xl",
                  children: /* @__PURE__ */ jsx(MousePointer2, { className: "w-7 h-7 fill-white stroke-black stroke-[1.5]" })
                }
              )
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx("img", { src: keyboardImg, alt: "Keyboard", className: "w-full h-auto object-contain z-10 relative -mt-4 drop-shadow-lg" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-[6px] left-1/2 -translate-x-1/2 w-[120px] h-[4px] bg-black/80 rounded-full z-50" })
    ] })
  ] });
}
const DOWNLOAD_URL$1 = "https://apps.apple.com/app/id6759639348";
const DOWNLOAD_EVENT$1 = "download_click";
const trackDownload$1 = (location) => {
  if (typeof gtag !== "undefined") {
    gtag("event", DOWNLOAD_EVENT$1, { event_category: "engagement", event_label: location });
  }
};
const trackFaqClick$1 = (question) => {
  if (typeof gtag !== "undefined") {
    gtag("event", "faq_click", { event_category: "engagement", event_label: question });
  }
};
const trackSectionView$1 = (sectionName) => {
  if (typeof gtag !== "undefined") {
    gtag("event", "section_view", { event_category: "engagement", event_label: sectionName });
  }
};
const trackFeatureClick$1 = (featureTitle) => {
  if (typeof gtag !== "undefined") {
    gtag("event", "feature_click", { event_category: "engagement", event_label: featureTitle });
  }
};
const trackLinkClick$1 = (linkName, destination) => {
  if (typeof gtag !== "undefined") {
    gtag("event", "link_click", { event_category: "engagement", event_label: linkName, destination });
  }
};
function Logo$1({ className = "w-8 h-8" }) {
  return /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 100 100", fill: "none", xmlns: "http://www.w3.org/2000/svg", className, children: [
    /* @__PURE__ */ jsx("rect", { width: "100", height: "100", rx: "20", fill: "#0D142E" }),
    /* @__PURE__ */ jsxs("defs", { children: [
      /* @__PURE__ */ jsxs("linearGradient", { id: "k-stem", x1: "30", y1: "20", x2: "30", y2: "80", gradientUnits: "userSpaceOnUse", children: [
        /* @__PURE__ */ jsx("stop", { stopColor: "#38C7BA" }),
        /* @__PURE__ */ jsx("stop", { offset: "1", stopColor: "#8E61D9" })
      ] }),
      /* @__PURE__ */ jsxs("linearGradient", { id: "k-arm", x1: "75", y1: "20", x2: "40", y2: "80", gradientUnits: "userSpaceOnUse", children: [
        /* @__PURE__ */ jsx("stop", { stopColor: "#E6EBF2" }),
        /* @__PURE__ */ jsx("stop", { offset: "1", stopColor: "#BFCDE0" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("rect", { x: "25", y: "20", width: "16", height: "60", fill: "url(#k-stem)" }),
    /* @__PURE__ */ jsx("path", { d: "M75 20L41 50L75 80H55L31 50L55 20H75Z", fill: "url(#k-arm)" })
  ] });
}
function DownloadCTA$1({ centered = false }) {
  return /* @__PURE__ */ jsx("div", { className: `flex flex-col w-full ${centered ? "items-center" : "items-center lg:items-start"} space-y-6`, children: /* @__PURE__ */ jsxs("a", { href: DOWNLOAD_URL$1, target: "_blank", rel: "noopener noreferrer", onClick: () => trackDownload$1(centered ? "cta_section" : "hero"), className: "w-full sm:w-auto bg-bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-bg-secondary transition-all duration-200 transform hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none flex items-center justify-center space-x-2 shadow-lg shadow-bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2", children: [
    /* @__PURE__ */ jsx(Smartphone, { className: "w-5 h-5" }),
    /* @__PURE__ */ jsx("span", { children: "免費下載" })
  ] }) });
}
function App$1() {
  useEffect(() => {
    const trackedSections = /* @__PURE__ */ new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            if (sectionId && !trackedSections.has(sectionId)) {
              trackSectionView$1(sectionId);
              trackedSections.add(sectionId);
            }
          }
        });
      },
      { threshold: 0.3 }
      // 區塊出現 30% 時觸發
    );
    const sections = ["features", "faq", "download"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#F4F7FA] text-text-primary font-sans selection:bg-brand-cyan/30 overflow-x-hidden", children: [
    /* @__PURE__ */ jsx(Navbar$1, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx(Hero$1, {}),
      /* @__PURE__ */ jsx(Features$1, {}),
      /* @__PURE__ */ jsx(FAQSection$1, {}),
      /* @__PURE__ */ jsx(CTA$1, {})
    ] }),
    /* @__PURE__ */ jsx(Footer$1, {})
  ] });
}
function Navbar$1() {
  const [isOpen, setIsOpen] = useState(false);
  return /* @__PURE__ */ jsxs("nav", { className: "fixed top-3 left-0 right-0 z-50 px-3 sm:px-4", children: [
    /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto bg-white/85 backdrop-blur-xl border border-metal-gray/30 rounded-2xl shadow-[0_10px_35px_rgba(13,20,46,0.08)]", children: /* @__PURE__ */ jsxs("div", { className: "px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsx(Logo$1, { className: "w-8 h-8 rounded-lg shadow-sm" }),
        /* @__PURE__ */ jsx("span", { className: "font-bold text-xl tracking-tight", children: "Keyly" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "hidden md:flex items-center space-x-8", children: [
        /* @__PURE__ */ jsx("a", { href: "#features", className: "text-text-secondary hover:text-brand-cyan transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan rounded-md px-1", children: "功能特色" }),
        /* @__PURE__ */ jsx("a", { href: "#faq", className: "text-text-secondary hover:text-brand-cyan transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan rounded-md px-1", children: "常見問題" }),
        /* @__PURE__ */ jsxs("a", { href: DOWNLOAD_URL$1, target: "_blank", rel: "noopener noreferrer", onClick: () => trackDownload$1("navbar"), className: "bg-bg-primary text-white px-5 py-2 rounded-full font-medium hover:bg-bg-secondary transition-colors duration-200 flex items-center space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2", children: [
          /* @__PURE__ */ jsx(Download, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsx("span", { children: "免費下載" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "md:hidden flex items-center", children: /* @__PURE__ */ jsx("button", { onClick: () => setIsOpen(!isOpen), className: "text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan rounded-md p-1", "aria-label": "切換選單", children: isOpen ? /* @__PURE__ */ jsx(X, { className: "w-6 h-6" }) : /* @__PURE__ */ jsx(Menu, { className: "w-6 h-6" }) }) })
    ] }) }),
    isOpen && /* @__PURE__ */ jsxs("div", { className: "md:hidden mt-2 max-w-6xl mx-auto bg-white/95 backdrop-blur-xl border border-metal-gray/30 rounded-2xl px-4 pt-2 pb-4 space-y-2 shadow-lg", children: [
      /* @__PURE__ */ jsx("a", { href: "#features", className: "block px-3 py-2 text-text-secondary hover:bg-metal-white/50 rounded-md transition-colors duration-200", onClick: () => setIsOpen(false), children: "功能特色" }),
      /* @__PURE__ */ jsx("a", { href: "#faq", className: "block px-3 py-2 text-text-secondary hover:bg-metal-white/50 rounded-md transition-colors duration-200", onClick: () => setIsOpen(false), children: "常見問題" }),
      /* @__PURE__ */ jsx("a", { href: DOWNLOAD_URL$1, target: "_blank", rel: "noopener noreferrer", className: "block px-3 py-2 text-brand-cyan font-medium hover:bg-metal-white/50 rounded-md transition-colors duration-200", onClick: () => {
        setIsOpen(false);
        trackDownload$1("navbar_mobile");
      }, children: "免費下載" })
    ] })
  ] });
}
function Hero$1() {
  return /* @__PURE__ */ jsx("section", { className: "pt-32 pb-20 lg:pt-44 lg:pb-32 overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative", children: /* @__PURE__ */ jsxs("div", { className: "lg:grid lg:grid-cols-12 lg:gap-16 items-center", children: [
    /* @__PURE__ */ jsx("div", { className: "lg:col-span-6 text-center lg:text-left mb-16 lg:mb-0 z-10", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        children: [
          /* @__PURE__ */ jsx("div", { className: "inline-flex items-center rounded-full border border-brand-cyan/30 bg-white/80 px-4 py-2 text-sm font-medium text-text-secondary mb-6", children: "台灣團隊打造 · iOS 注音輸入體驗" }),
          /* @__PURE__ */ jsxs("h1", { className: "text-4xl lg:text-5xl xl:text-6xl font-black text-text-primary leading-tight mb-6", children: [
            "指尖上的 AI 智慧，",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-purple", children: "文字轉化一鍵完成" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg text-text-secondary/90 leading-relaxed max-w-xl mx-auto lg:mx-0", children: "兼顧速度、手感與隱私的智慧注音鍵盤，讓翻譯、潤飾、改寫都能在同一個輸入流程完成。" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto lg:mx-0", children: [
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-white/80 border border-metal-gray/20 px-4 py-3", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-text-secondary", children: "下載方式" }),
              /* @__PURE__ */ jsx("p", { className: "font-semibold text-text-primary", children: "免費下載" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-white/80 border border-metal-gray/20 px-4 py-3", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-text-secondary", children: "新登入獎勵" }),
              /* @__PURE__ */ jsx("p", { className: "font-semibold text-text-primary", children: "一次性 50 次" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-white/80 border border-metal-gray/20 px-4 py-3", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-text-secondary", children: "離線模式" }),
              /* @__PURE__ */ jsx("p", { className: "font-semibold text-text-primary", children: "支援無限使用" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsx(DownloadCTA$1, {}) })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "lg:col-span-6 relative flex justify-center lg:justify-end mt-12 lg:mt-0", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 40, scale: 0.95, rotate: 4 },
        animate: { opacity: 1, y: 0, scale: 1, rotate: 0 },
        transition: { type: "spring", stiffness: 120, damping: 25, delay: 0.2 },
        className: "relative z-10 w-full",
        children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-brand-cyan/30 to-brand-purple/30 rounded-full blur-3xl -z-10 opacity-50" }),
          /* @__PURE__ */ jsx(React.Suspense, { fallback: /* @__PURE__ */ jsx("div", { className: "w-full aspect-[4/3] rounded-3xl bg-metal-gray/10 animate-pulse border border-metal-gray/20" }), children: /* @__PURE__ */ jsx(TypingAnimation, {}) })
        ]
      }
    ) })
  ] }) }) });
}
function Features$1() {
  const features = [
    {
      icon: /* @__PURE__ */ jsx(Wand2, { className: "w-6 h-6 text-brand-cyan" }),
      title: "專屬你的文字濾鏡",
      description: "無論是由衷的情書、隨性的抒發，抑或是嚴謹的商業報告，只需隨心打下草稿，一鍵套用專屬的 AI 濾鏡，瞬間就能將其轉換為最完美的風格語氣。支援完全斷網的離線隱私模式，亦可連結雲端，釋放頂級模型無與倫比的創作潛能。"
    },
    {
      icon: /* @__PURE__ */ jsx(Feather, { className: "w-6 h-6 text-brand-purple" }),
      title: "極致順滑的輸入手感",
      description: "為了追求第三方鍵盤的極速體驗，我們研發出專為流暢而生的注音引擎。精準微調的觸控邊界，搭配細膩的沉浸式震動回饋，每一次敲擊都是享受，流暢手感讓您愛不釋手。"
    },
    {
      icon: /* @__PURE__ */ jsx(Command, { className: "w-6 h-6 text-accent-mint" }),
      title: "隨打即用的智慧快捷",
      description: "遠遠不只是挑錯字！這是專屬於您的文字魔法盒。您可以隨心自訂專屬的「AI 指令」，無論是瞬翻專業外文、精煉長篇大論，抑或是將隻言片語化為優雅的高情商客套話，只需單手一滑即可輕鬆召喚，便利至極。"
    },
    {
      icon: /* @__PURE__ */ jsx(Music, { className: "w-6 h-6 text-accent-sky" }),
      title: "撫平焦躁的指尖琴韻",
      description: "為平淡的打字體驗注入迷人的藝術氣息！開啟專屬的鋼琴模式後，您的每次敲擊都會化作優美的名曲旋律。縱使是回覆枯燥冷硬的公事訊息，指尖流淌出的輕柔琴韻，依然能為您撫平煩躁，舒緩一整天的緊繃與壓力。"
    },
    {
      icon: /* @__PURE__ */ jsx(ShieldCheck, { className: "w-6 h-6 text-brand-cyan" }),
      title: "高規格隱私防線",
      description: "您的對話隱私是我們的核心使命。Keyly 採用「不落地處理」原則，確保您的輸入內容在處理完畢後自動銷毀，不進行任何持久化儲存。我們嚴格遵守 Apple 隱私規範，不監控、不側錄，亦不將您的私人數據用於模型訓練，提供真正純淨且安全的輸入體驗。"
    }
  ];
  return /* @__PURE__ */ jsx("section", { id: "features", className: "py-24 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsx("div", { className: "text-center max-w-3xl mx-auto mb-16", children: /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-text-primary", children: "為什麼 Keyly 是更好的 AI 注音鍵盤？" }) }),
    /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: features.map((feature, index) => /* @__PURE__ */ jsxs(
      motion.div,
      {
        onClick: () => trackFeatureClick$1(feature.title),
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: index * 0.1 },
        className: "bg-[#F4F7FA] rounded-2xl p-6 border border-metal-gray/20 hover:shadow-lg hover:border-brand-cyan/30 transition-[box-shadow,border-color] cursor-pointer",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4 mb-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0", children: feature.icon }),
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-text-primary", children: feature.title })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-text-secondary leading-relaxed", children: feature.description })
        ]
      },
      index
    )) })
  ] }) });
}
function FAQSection$1() {
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
      answer: /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsx("p", { children: "這是開啟 AI 魔法的技術門票！受限於 iOS 安全機制，第三方鍵盤必須取得此權限，才能透過網路與雲端 AI 引擎連線以提供潤飾服務。" }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "如果不開啟也沒關係：" }),
          "您依然能永久無限次使用 Keyly 最引以為傲、極速順暢的注音輸入引擎。核心打字功能完全不受影響，確保您在純淨環境下也能享受高品質輸入。此外，在支援的硬體設備上，您仍可享有基礎的本地端 AI 修正功能，這不需要連網，隱私 100% 留存在您的設備中。"
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "若您選擇開啟：" }),
          "我們秉持最高規格隱私承諾，採納「即時處理」機制，所有數據僅供 AI 運算並在完成後即刻從快取移除。Keyly 嚴格遵守 Apple 規範，不監控、不側錄、不儲存您的私人對話內容。"
        ] })
      ] })
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
      question: "一般用戶（免費下載）跟 Keyly Pro 訂閱用戶有什麼差別？",
      answer: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "一般用戶（免費下載）：" }),
          /* @__PURE__ */ jsx("br", {}),
          "免費下載即可享有極速注音引擎、完整標準指令庫，並在新登入帳號時一次性獲得 50 次雲端 AI 魔法額度。"
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Keyly Pro 訂閱（NT$150/月）：" }),
          /* @__PURE__ */ jsx("br", {}),
          "專為高頻率專業人士打造。徹底解鎖無限次雲端 AI 運算，並獨享「AI 指令管理員」，支援自定義指令的新增、編輯與收藏，讓 AI 完美契合您的使用習慣。"
        ] })
      ] })
    }
  ];
  const [openIndex, setOpenIndex] = useState(null);
  const getFaqAnswerId = (index) => `faq-answer-${index}`;
  return /* @__PURE__ */ jsxs("section", { id: "faq", className: "py-24 bg-bg-primary text-white overflow-hidden relative", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-[800px] h-[800px] bg-brand-purple/15 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none transform-gpu will-change-transform" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10", children: [
      /* @__PURE__ */ jsx("div", { className: "text-center mb-16", children: /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-4xl font-bold mb-6", children: [
        "常見問題 ",
        /* @__PURE__ */ jsx("span", { className: "text-accent-mint", children: "Q&A" })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: faqs.map((faq, index) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "bg-bg-secondary rounded-2xl border border-white/10 overflow-hidden transform-gpu",
          children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                className: "w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/70 active:bg-white/5 transition-colors duration-200",
                onClick: () => {
                  if (openIndex !== index) trackFaqClick$1(faq.question);
                  setOpenIndex(openIndex === index ? null : index);
                },
                "aria-expanded": openIndex === index,
                "aria-controls": getFaqAnswerId(index),
                children: [
                  /* @__PURE__ */ jsx("span", { className: "text-lg font-medium text-metal-white pr-8", children: faq.question }),
                  /* @__PURE__ */ jsx(
                    ChevronDown,
                    {
                      className: `w-5 h-5 text-brand-cyan shrink-0 transition-transform duration-300 motion-reduce:transition-none ${openIndex === index ? "rotate-180" : ""}`
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: openIndex === index && /* @__PURE__ */ jsx(
              motion.div,
              {
                id: getFaqAnswerId(index),
                initial: { height: 0, opacity: 0 },
                animate: { height: "auto", opacity: 1 },
                exit: { height: 0, opacity: 0 },
                transition: { duration: 0.3, ease: "easeInOut" },
                className: "overflow-hidden",
                children: /* @__PURE__ */ jsx("div", { className: "px-6 pb-6 text-metal-gray leading-relaxed", children: faq.answer })
              }
            ) })
          ]
        },
        index
      )) })
    ] })
  ] });
}
function CTA$1() {
  return /* @__PURE__ */ jsxs("section", { id: "download", className: "py-24 bg-white relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-brand-cyan/5" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold text-text-primary mb-6", children: "體驗更聰明的 iPhone 注音輸入法" }),
      /* @__PURE__ */ jsx("p", { className: "text-xl text-text-secondary mb-10", children: "立即下載 Keyly，用 AI 加速繁體中文輸入、潤飾與翻譯流程。" }),
      /* @__PURE__ */ jsx(DownloadCTA$1, { centered: true })
    ] })
  ] });
}
function Footer$1() {
  return /* @__PURE__ */ jsx("footer", { className: "bg-[#F4F7FA] border-t border-metal-gray/30 py-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 mb-4 md:mb-0", children: [
        /* @__PURE__ */ jsx(Logo$1, { className: "w-8 h-8 rounded-lg shadow-sm" }),
        /* @__PURE__ */ jsx("span", { className: "font-bold text-text-primary", children: "Keyly" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center items-center gap-3 text-sm text-text-secondary", children: [
        /* @__PURE__ */ jsx("a", { href: "/privacy/", onClick: () => trackLinkClick$1("privacy_policy", "/privacy/"), className: "hover:text-brand-cyan transition-colors", children: "隱私權政策" }),
        /* @__PURE__ */ jsx("span", { className: "text-metal-gray/50", children: "|" }),
        /* @__PURE__ */ jsx("a", { href: "/terms/", onClick: () => trackLinkClick$1("terms_of_service", "/terms/"), className: "hover:text-brand-cyan transition-colors", children: "服務條款" }),
        /* @__PURE__ */ jsx("span", { className: "text-metal-gray/50", children: "|" }),
        /* @__PURE__ */ jsx("a", { href: "/subscriptions/", onClick: () => trackLinkClick$1("subscription_terms", "/subscriptions/"), className: "hover:text-brand-cyan transition-colors", children: "自動續訂說明" }),
        /* @__PURE__ */ jsx("span", { className: "text-metal-gray/50", children: "|" }),
        /* @__PURE__ */ jsx("a", { href: "mailto:support@keylyapp.com", onClick: () => trackLinkClick$1("support_email", "mailto:support@keylyapp.com"), className: "hover:text-brand-cyan transition-colors", children: "技術支援" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-8 text-center text-sm text-metal-gray", children: "© 2026 Keyly 由台灣團隊專為高效溝通而生。" })
  ] }) });
}
const DOWNLOAD_URL = "https://apps.apple.com/app/id6759639348";
const DOWNLOAD_EVENT = "download_click";
const trackDownload = (location) => {
  if (typeof gtag !== "undefined") {
    gtag("event", DOWNLOAD_EVENT, { event_category: "engagement", event_label: location });
  }
};
const trackFaqClick = (question) => {
  if (typeof gtag !== "undefined") {
    gtag("event", "faq_click", { event_category: "engagement", event_label: question });
  }
};
const trackSectionView = (sectionName) => {
  if (typeof gtag !== "undefined") {
    gtag("event", "section_view", { event_category: "engagement", event_label: sectionName + "_en" });
  }
};
const trackFeatureClick = (featureTitle) => {
  if (typeof gtag !== "undefined") {
    gtag("event", "feature_click", { event_category: "engagement", event_label: featureTitle });
  }
};
const trackLinkClick = (linkName, destination) => {
  if (typeof gtag !== "undefined") {
    gtag("event", "link_click", { event_category: "engagement", event_label: linkName, destination });
  }
};
function Logo({ className = "w-8 h-8" }) {
  return /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 100 100", fill: "none", xmlns: "http://www.w3.org/2000/svg", className, children: [
    /* @__PURE__ */ jsx("rect", { width: "100", height: "100", rx: "20", fill: "#0D142E" }),
    /* @__PURE__ */ jsxs("defs", { children: [
      /* @__PURE__ */ jsxs("linearGradient", { id: "k-stem-en", x1: "30", y1: "20", x2: "30", y2: "80", gradientUnits: "userSpaceOnUse", children: [
        /* @__PURE__ */ jsx("stop", { stopColor: "#38C7BA" }),
        /* @__PURE__ */ jsx("stop", { offset: "1", stopColor: "#8E61D9" })
      ] }),
      /* @__PURE__ */ jsxs("linearGradient", { id: "k-arm-en", x1: "75", y1: "20", x2: "40", y2: "80", gradientUnits: "userSpaceOnUse", children: [
        /* @__PURE__ */ jsx("stop", { stopColor: "#E6EBF2" }),
        /* @__PURE__ */ jsx("stop", { offset: "1", stopColor: "#BFCDE0" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("rect", { x: "25", y: "20", width: "16", height: "60", fill: "url(#k-stem-en)" }),
    /* @__PURE__ */ jsx("path", { d: "M75 20L41 50L75 80H55L31 50L55 20H75Z", fill: "url(#k-arm-en)" })
  ] });
}
function DownloadCTA({ centered = false }) {
  return /* @__PURE__ */ jsx("div", { className: `flex flex-col w-full ${centered ? "items-center" : "items-center lg:items-start"} space-y-6`, children: /* @__PURE__ */ jsxs("a", { href: DOWNLOAD_URL, target: "_blank", rel: "noopener noreferrer", onClick: () => trackDownload(centered ? "cta_section_en" : "hero_en"), className: "w-full sm:w-auto bg-bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-bg-secondary transition-all duration-200 transform hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none flex items-center justify-center space-x-2 shadow-lg shadow-bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2", children: [
    /* @__PURE__ */ jsx(Smartphone, { className: "w-5 h-5" }),
    /* @__PURE__ */ jsx("span", { children: "Download Now" })
  ] }) });
}
function App() {
  useEffect(() => {
    const trackedSections = /* @__PURE__ */ new Set();
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
      { threshold: 0.3 }
    );
    const sections = ["features", "faq", "download"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#F4F7FA] text-text-primary selection:bg-brand-cyan/30 overflow-x-hidden", style: { fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang TC", "Heiti TC", "Microsoft JhengHei", system-ui, sans-serif' }, children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx(Hero, {}),
      /* @__PURE__ */ jsx(Features, {}),
      /* @__PURE__ */ jsx(FAQSection, {}),
      /* @__PURE__ */ jsx(CTA, {})
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return /* @__PURE__ */ jsxs("nav", { className: "fixed top-3 left-0 right-0 z-50 px-3 sm:px-4", children: [
    /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto bg-white/85 backdrop-blur-xl border border-metal-gray/30 rounded-2xl shadow-[0_10px_35px_rgba(13,20,46,0.08)]", children: /* @__PURE__ */ jsxs("div", { className: "px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsx(Logo, { className: "w-8 h-8 rounded-lg shadow-sm" }),
        /* @__PURE__ */ jsx("span", { className: "font-bold text-xl tracking-tight", children: "Keyly" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "hidden md:flex items-center space-x-8", children: [
        /* @__PURE__ */ jsx("a", { href: "#features", className: "text-text-secondary hover:text-brand-cyan transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan rounded-md px-1", children: "Features" }),
        /* @__PURE__ */ jsx("a", { href: "#faq", className: "text-text-secondary hover:text-brand-cyan transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan rounded-md px-1", children: "FAQ" }),
        /* @__PURE__ */ jsxs("a", { href: DOWNLOAD_URL, target: "_blank", rel: "noopener noreferrer", onClick: () => trackDownload("navbar_en"), className: "bg-bg-primary text-white px-5 py-2 rounded-full font-medium hover:bg-bg-secondary transition-colors duration-200 flex items-center space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2", children: [
          /* @__PURE__ */ jsx(Download, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsx("span", { children: "Download Now" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "md:hidden flex items-center", children: /* @__PURE__ */ jsx("button", { onClick: () => setIsOpen(!isOpen), className: "text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan rounded-md p-1", "aria-label": "Toggle menu", children: isOpen ? /* @__PURE__ */ jsx(X, { className: "w-6 h-6" }) : /* @__PURE__ */ jsx(Menu, { className: "w-6 h-6" }) }) })
    ] }) }),
    isOpen && /* @__PURE__ */ jsxs("div", { className: "md:hidden mt-2 max-w-6xl mx-auto bg-white/95 backdrop-blur-xl border border-metal-gray/30 rounded-2xl px-4 pt-2 pb-4 space-y-2 shadow-lg", children: [
      /* @__PURE__ */ jsx("a", { href: "#features", className: "block px-3 py-2 text-text-secondary hover:bg-metal-white/50 rounded-md transition-colors duration-200", onClick: () => setIsOpen(false), children: "Features" }),
      /* @__PURE__ */ jsx("a", { href: "#faq", className: "block px-3 py-2 text-text-secondary hover:bg-metal-white/50 rounded-md transition-colors duration-200", onClick: () => setIsOpen(false), children: "FAQ" }),
      /* @__PURE__ */ jsx("a", { href: DOWNLOAD_URL, target: "_blank", rel: "noopener noreferrer", className: "block px-3 py-2 text-brand-cyan font-medium hover:bg-metal-white/50 rounded-md transition-colors duration-200", onClick: () => {
        setIsOpen(false);
        trackDownload("navbar_mobile_en");
      }, children: "Download Now" })
    ] })
  ] });
}
function Hero() {
  return /* @__PURE__ */ jsx("section", { className: "pt-32 pb-20 lg:pt-44 lg:pb-32 overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative", children: /* @__PURE__ */ jsxs("div", { className: "lg:grid lg:grid-cols-12 lg:gap-16 items-center", children: [
    /* @__PURE__ */ jsx("div", { className: "lg:col-span-6 text-center lg:text-left mb-16 lg:mb-0 z-10", children: /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, children: [
      /* @__PURE__ */ jsx("div", { className: "inline-flex items-center rounded-full border border-brand-cyan/30 bg-white/80 px-4 py-2 text-sm font-medium text-text-secondary mb-6", children: "Built in Taiwan · tuned for iOS Zhuyin input" }),
      /* @__PURE__ */ jsxs("h1", { className: "text-4xl lg:text-5xl xl:text-6xl font-black text-text-primary leading-tight mb-6", children: [
        "AI Zhuyin keyboard for faster, clearer writing on iPhone",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-purple", children: "rewrite and refine text in one tap" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-text-secondary/90 leading-relaxed max-w-xl mx-auto lg:mx-0", children: "Keyly unifies speed, writing quality, and privacy so translation, rewriting, and refinement happen directly in your typing flow." }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto lg:mx-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-white/80 border border-metal-gray/20 px-4 py-3", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-text-secondary", children: "Download" }),
          /* @__PURE__ */ jsx("p", { className: "font-semibold text-text-primary", children: "Free" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-white/80 border border-metal-gray/20 px-4 py-3", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-text-secondary", children: "New sign-ins" }),
          /* @__PURE__ */ jsx("p", { className: "font-semibold text-text-primary", children: "One-time 50 requests" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-white/80 border border-metal-gray/20 px-4 py-3", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-text-secondary", children: "Offline mode" }),
          /* @__PURE__ */ jsx("p", { className: "font-semibold text-text-primary", children: "Unlimited use" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsx(DownloadCTA, {}) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "lg:col-span-6 relative flex justify-center lg:justify-end mt-12 lg:mt-0", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 40, scale: 0.95, rotate: 4 },
        animate: { opacity: 1, y: 0, scale: 1, rotate: 0 },
        transition: { type: "spring", stiffness: 120, damping: 25, delay: 0.2 },
        className: "relative z-10 w-full",
        children: [
          /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-brand-cyan/30 to-brand-purple/30 rounded-full blur-3xl -z-10 opacity-50" }),
          /* @__PURE__ */ jsx(React.Suspense, { fallback: /* @__PURE__ */ jsx("div", { className: "w-full aspect-[4/3] rounded-3xl bg-metal-gray/10 animate-pulse border border-metal-gray/20" }), children: /* @__PURE__ */ jsx(TypingAnimation, { locale: "en" }) })
        ]
      }
    ) })
  ] }) }) });
}
function Features() {
  const features = [
    {
      icon: /* @__PURE__ */ jsx(Wand2, { className: "w-6 h-6 text-brand-cyan" }),
      title: "A text filter shaped around you",
      description: "Whether you are drafting a sincere message, a casual post, or a formal business document, you can write freely and apply the right AI filter in one tap. Use it fully offline when privacy matters, or connect to the cloud for stronger creative range from top-tier models."
    },
    {
      icon: /* @__PURE__ */ jsx(Feather, { className: "w-6 h-6 text-brand-purple" }),
      title: "Extremely smooth typing feel",
      description: "To push third-party keyboard speed as far as possible, we built a Zhuyin engine that prioritizes fluidity. The touch boundaries are finely tuned, the haptic rhythm is deliberate, and the overall typing feel stays stable and satisfying."
    },
    {
      icon: /* @__PURE__ */ jsx(Command, { className: "w-6 h-6 text-accent-mint" }),
      title: "Smart shortcuts ready mid-typing",
      description: "This goes far beyond typo correction. Build your own AI commands for instant translation, long-form compression, or polished high-EQ replies, then call them with a quick gesture directly from the keyboard."
    },
    {
      icon: /* @__PURE__ */ jsx(Music, { className: "w-6 h-6 text-accent-sky" }),
      title: "Piano tone that softens the mood",
      description: "Piano Mode turns ordinary typing into something more playful. Each keystroke can become part of a flowing melody, making even dry work replies feel lighter and less abrasive."
    },
    {
      icon: /* @__PURE__ */ jsx(ShieldCheck, { className: "w-6 h-6 text-brand-cyan" }),
      title: "A high-standard privacy boundary",
      description: "Conversation privacy is central to Keyly. We follow an ephemeral-processing principle so your text is destroyed after processing rather than stored long-term. We do not monitor, log, or repurpose your private data for model training."
    }
  ];
  return /* @__PURE__ */ jsx("section", { id: "features", className: "py-24 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsx("div", { className: "text-center max-w-3xl mx-auto mb-16", children: /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-text-primary", children: "Why Keyly is a better Zhuyin keyboard" }) }),
    /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: features.map((feature, index) => /* @__PURE__ */ jsxs(
      motion.div,
      {
        onClick: () => trackFeatureClick(feature.title),
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: index * 0.1 },
        className: "bg-[#F4F7FA] rounded-2xl p-6 border border-metal-gray/20 hover:shadow-lg hover:border-brand-cyan/30 transition-[box-shadow,border-color] cursor-pointer",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4 mb-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0", children: feature.icon }),
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-text-primary", children: feature.title })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-text-secondary leading-relaxed", children: feature.description })
        ]
      },
      index
    )) })
  ] }) });
}
function FAQSection() {
  const faqs = [
    {
      question: "Is Keyly still good if I mostly use it as a regular keyboard?",
      answer: "Yes. The core of Keyly is a fast, precise Zhuyin engine built for clean correction and smooth input. Even without AI, it is meant to deliver a sharp and comfortable typing experience on iOS."
    },
    {
      question: "Which languages does Keyly support?",
      answer: "Our strongest focus is Traditional Chinese Zhuyin, with full mixed Chinese-English input support. On top of that, Keyly's AI can help with translation and multilingual refinement in one tap. AI output should still be reviewed before formal use."
    },
    {
      question: "Why do I need to enable “Allow Full Access”?",
      answer: /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsx("p", { children: "This is the technical requirement that allows a third-party iOS keyboard to connect to cloud AI services." }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "If you keep it off:" }),
          " you can still use Keyly's core Zhuyin engine without limitation. On supported devices, you can also keep basic on-device AI correction fully offline."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "If you turn it on:" }),
          " we use an ephemeral-processing model. Data is handled only for the requested AI task, then removed from cache. Keyly does not monitor, record, or store your everyday private conversations."
        ] })
      ] })
    },
    {
      question: "Which cloud AI providers do you use, and is it safe?",
      answer: "We build on global top-tier providers including Google, OpenAI, and Anthropic. Keyly limits data use to immediate requests only and does not allow your personal conversations to be used for model training. Automatic cache clearing further reduces retention risk."
    },
    {
      question: "Can I still use AI refinement without internet access?",
      answer: "Yes, if your device supports Apple's native on-device AI frameworks. On supported hardware, Keyly can refine text offline, which gives you both faster response time and stronger privacy guarantees."
    },
    {
      question: "Will very fast typing cause lag or crashes?",
      answer: "We built the product with a strict performance bar. Keyly is tuned by an experienced iOS engineering team and tested across multiple devices so that the typing flow stays stable, fluid, and responsive even at high speed."
    },
    {
      question: "How are my custom AI commands stored?",
      answer: "Your custom prompts stay under your control. They are currently stored locally on your device using encryption, and we are planning end-to-end encrypted sync so switching devices becomes more seamless later."
    },
    {
      question: "What is the music keyboard, or Piano Mode?",
      answer: "It is a built-in easter egg that adds high-quality piano tones to your typing. You can switch it on or off whenever you want and turn even routine replies into a small, more expressive interaction."
    },
    {
      question: "What is the difference between free download users and Keyly Pro?",
      answer: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Standard users (free download):" }),
          /* @__PURE__ */ jsx("br", {}),
          "Free download includes the high-speed Zhuyin engine, the full standard prompt library, and a one-time gift of 50 cloud AI requests for newly signed-in accounts."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Keyly Pro subscription (NT$150/month):" }),
          /* @__PURE__ */ jsx("br", {}),
          "Built for heavy professional use. It unlocks unlimited cloud AI processing and adds the AI Prompt Manager so you can create, edit, and save custom commands that match your workflow."
        ] })
      ] })
    }
  ];
  const [openIndex, setOpenIndex] = useState(null);
  const getFaqAnswerId = (index) => `faq-answer-en-${index}`;
  return /* @__PURE__ */ jsxs("section", { id: "faq", className: "py-24 bg-bg-primary text-white overflow-hidden relative", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-[800px] h-[800px] bg-brand-purple/15 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none transform-gpu will-change-transform" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10", children: [
      /* @__PURE__ */ jsx("div", { className: "text-center mb-16", children: /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-4xl font-bold mb-6", children: [
        "FAQ ",
        /* @__PURE__ */ jsx("span", { className: "text-accent-mint", children: "Q&A" })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: faqs.map((faq, index) => /* @__PURE__ */ jsxs("div", { className: "bg-bg-secondary rounded-2xl border border-white/10 overflow-hidden transform-gpu", children: [
        /* @__PURE__ */ jsxs("button", { className: "w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/70 active:bg-white/5 transition-colors duration-200", onClick: () => {
          if (openIndex !== index) trackFaqClick(faq.question);
          setOpenIndex(openIndex === index ? null : index);
        }, "aria-expanded": openIndex === index, "aria-controls": getFaqAnswerId(index), children: [
          /* @__PURE__ */ jsx("span", { className: "text-lg font-medium text-metal-white pr-8", children: faq.question }),
          /* @__PURE__ */ jsx(ChevronDown, { className: `w-5 h-5 text-brand-cyan shrink-0 transition-transform duration-300 motion-reduce:transition-none ${openIndex === index ? "rotate-180" : ""}` })
        ] }),
        /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: openIndex === index && /* @__PURE__ */ jsx(
          motion.div,
          {
            id: getFaqAnswerId(index),
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: { duration: 0.3, ease: "easeInOut" },
            className: "overflow-hidden",
            children: /* @__PURE__ */ jsx("div", { className: "px-6 pb-6 text-metal-gray leading-relaxed", children: faq.answer })
          }
        ) })
      ] }, index)) })
    ] })
  ] });
}
function CTA() {
  return /* @__PURE__ */ jsxs("section", { id: "download", className: "py-24 bg-white relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-brand-cyan/5" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold text-text-primary mb-6", children: "Try a smarter Zhuyin keyboard for iPhone" }),
      /* @__PURE__ */ jsx("p", { className: "text-xl text-text-secondary mb-10", children: "Get Keyly and speed up Traditional Chinese typing, rewriting, and translation in one keyboard." }),
      /* @__PURE__ */ jsx(DownloadCTA, { centered: true })
    ] })
  ] });
}
function Footer() {
  return /* @__PURE__ */ jsx("footer", { className: "bg-[#F4F7FA] border-t border-metal-gray/30 py-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 mb-4 md:mb-0", children: [
        /* @__PURE__ */ jsx(Logo, { className: "w-8 h-8 rounded-lg shadow-sm" }),
        /* @__PURE__ */ jsx("span", { className: "font-bold text-text-primary", children: "Keyly" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center items-center gap-3 text-sm text-text-secondary", children: [
        /* @__PURE__ */ jsx("a", { href: "/privacy/en/", onClick: () => trackLinkClick("privacy_policy_en", "/privacy/en/"), className: "hover:text-brand-cyan transition-colors", children: "Privacy Policy" }),
        /* @__PURE__ */ jsx("span", { className: "text-metal-gray/50", children: "|" }),
        /* @__PURE__ */ jsx("a", { href: "/terms/en/", onClick: () => trackLinkClick("terms_of_service_en", "/terms/en/"), className: "hover:text-brand-cyan transition-colors", children: "Terms of Service" }),
        /* @__PURE__ */ jsx("span", { className: "text-metal-gray/50", children: "|" }),
        /* @__PURE__ */ jsx("a", { href: "/subscriptions/en/", onClick: () => trackLinkClick("subscription_terms_en", "/subscriptions/en/"), className: "hover:text-brand-cyan transition-colors", children: "Auto-Renewal Terms" }),
        /* @__PURE__ */ jsx("span", { className: "text-metal-gray/50", children: "|" }),
        /* @__PURE__ */ jsx("a", { href: "mailto:support@keylyapp.com", onClick: () => trackLinkClick("support_email_en", "mailto:support@keylyapp.com"), className: "hover:text-brand-cyan transition-colors", children: "Support" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-8 text-center text-sm text-metal-gray", children: "© 2026 Keyly. Built by a Taiwan-based team for faster, sharper communication." })
  ] }) });
}
function render(url) {
  const app = url === "/en/" ? /* @__PURE__ */ jsx(App, {}) : /* @__PURE__ */ jsx(App$1, {});
  return renderToString(app);
}
export {
  render
};
