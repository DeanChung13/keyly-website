import { useEffect, useRef, useState } from 'react';
import { Phone, ChatScreen, Keyboard, TranslationCard } from './keyly-phone/ui.jsx';

/**
 * TranslationFilm: Keyly 雙向翻譯 9 秒真實 LINE 對話演示
 *
 * 時間軸設計（9 秒一輪循環）：
 * 0.0 - 1.5s: 收到外國朋友英文訊息（Hey! Are you free this Saturday? Let's try the new cafe ☕）
 * 1.5 - 2.5s: 長按氣泡，彈出 iOS 拷貝選單，點擊「拷貝」
 * 2.5 - 3.5s: 點輸入框鍵盤升起，彈出 iOS「允許貼上」系統提示，點擊「允許貼上」
 * 3.5 - 4.5s: 鍵盤上方即時浮現剪貼簿自動翻譯卡（英 ➔ 繁中）
 * 4.5 - 6.5s: 注音打字亮起打出「好啊！兩點可以嗎」
 * 6.5 - 8.0s: 點閒置列最前面的建議指令「翻成英文」，替換為「Sure! Does 2pm work?」並送出
 *
 * 翻譯卡與閒置列依 2026-10-22 實機截圖：卡片在指令列上方；看懂對方後，對方語言的翻譯指令
 * 會排到閒置列最前面（AIPromptManager.shortcutPrompts），回覆是點這顆指令，不是 AI 鍵。
 * 8.0 - 9.0s: 畫面停留 1 秒展示完整對話閉環
 */

const LOOP = 9.0;
const STILL_AT = 7.5; // 靜態畫面（reduced-motion）：停在送出完成時

const ZHUYIN_INITIAL: Record<string, string> = {
  好: 'ㄏ',
  啊: 'ㄚ',
  兩: 'ㄌ',
  點: 'ㄉ',
  可: 'ㄎ',
  以: 'ㄧ',
  嗎: 'ㄇ',
};

// 閒置列原本的快捷指令；看懂英文訊息後「翻成英文」會被排到最前面
const SHORTCUTS = ['吐槽一下', '吟詩作對', '長輩圖祝福語', '校對錯字'];
const SUGGESTED = '翻成英文';

const BASE_MESSAGES = [
  { from: 'me' as const, text: 'Hi Sarah! How are you doing?' },
  { from: 'them' as const, text: 'Great! Busy with work but excited for the weekend.' },
  { from: 'them' as const, text: "Hey! Are you free this Saturday? Let's try the new cafe ☕" },
];

export default function TranslationFilm() {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(STILL_AT);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    let req = 0;
    let start: number | null = null;
    let offset = 0;
    let last = -1;

    const loop = (now: number) => {
      start ??= now - offset * 1000;
      const next = ((now - start) / 1000) % LOOP;
      offset = next;
      const q = Math.floor(next * 30) / 30; // 30fps
      if (q !== last) {
        last = q;
        setT(q);
      }
      req = requestAnimationFrame(loop);
    };

    const observer = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(req);
      if (entry.isIntersecting) {
        start = null;
        req = requestAnimationFrame(loop);
      }
    });

    setT(0);
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(req);
    };
  }, []);

  // 狀態判定
  const isCopyMenuVisible = t >= 1.5 && t < 2.5;
  const isPastePromptVisible = t >= 2.5 && t < 3.5;
  const isTranslationCardVisible = t >= 3.5;
  const isTyping = t >= 4.5 && t < 6.5;
  const isTranslated = t >= 6.5;
  const isSent = t >= 7.2;

  // 動態訊息列表
  const messages = isSent
    ? [...BASE_MESSAGES, { from: 'me' as const, text: 'Sure! Does 2pm work?' }]
    : BASE_MESSAGES;

  // 輸入框草稿
  let draft = '';
  let activeKey: string | null = null;

  if (isTyping) {
    const text = '好啊！兩點可以嗎';
    const progress = Math.min(1, Math.max(0, (t - 4.5) / 2.0));
    const charsCount = Math.min(text.length, Math.floor(progress * (text.length + 1)));
    draft = text.slice(0, charsCount);
    const currentChar = text[charsCount - 1];
    activeKey = currentChar ? ZHUYIN_INITIAL[currentChar] ?? null : null;
  } else if (isTranslated && !isSent) {
    draft = 'Sure! Does 2pm work?';
  } else if (isSent) {
    draft = '';
  }

  // 標籤與字幕
  let caption = '收到外國朋友訊息，不想切 App 查字典？';
  let label = '雙向翻譯閉環';
  let accent = '#38C7BA';

  if (t >= 1.5 && t < 2.5) {
    caption = '長按複製對方的訊息，Keyly 自動處理';
    label = '一鍵複製';
    accent = '#38C7BA';
  } else if (t >= 2.5 && t < 3.5) {
    caption = 'iOS 系統提示：你點允許才讀取，安全透明';
    label = '隱私把關';
    accent = '#8E61D9';
  } else if (t >= 3.5 && t < 4.5) {
    caption = '剪貼簿秒速解析，直接在鍵盤看懂中文！';
    label = '免切換 App';
    accent = '#38C7BA';
  } else if (t >= 4.5 && t < 6.5) {
    caption = '不用硬翻英文，用最習慣的注音直接打字';
    label = '原生注音輸入';
    accent = '#2F7BF6';
  } else if (t >= 6.5 && t < 8.0) {
    caption = '點「翻成英文」，一鍵換成英文送出！';
    label = '即時轉換送出';
    accent = '#38C7BA';
  } else if (t >= 8.0) {
    caption = '完全輸入自己的語言，也能和任何一國人暢聊';
    label = 'Keyly 跨國雙向對話';
    accent = '#38C7BA';
  }

  return (
    <div ref={ref} className="flex flex-col items-center" style={{ ['--accent' as string]: accent }}>
      {/* iPhone 螢幕縮放容器 */}
      <div
        className="relative [--s:0.56] sm:[--s:0.62] lg:[--s:0.75]"
        style={{ width: 'calc(456px * var(--s))', height: 'calc(972px * var(--s))' }}
        role="img"
        aria-label="Keyly 雙向翻譯示範：複製對方的訊息，鍵盤秒顯示中文；打注音打中文，一鍵翻成英文送出"
      >
        <div className="origin-top-left" style={{ transform: 'scale(var(--s))' }} aria-hidden="true">
          <Phone className="k-theme-line">
            <ChatScreen
              title="Sarah ☕ (New York)"
              messages={messages}
              draft={draft}
              placeholder="輸入訊息"
            />

            <Keyboard
              pressed={activeKey}
              candidates={[]}
              layout="zhuyin"
              chips={isTranslationCardVisible ? [SUGGESTED, ...SHORTCUTS] : SHORTCUTS}
              suggested={isTranslationCardVisible ? SUGGESTED : null}
              tapped={t >= 6.3 && t < 6.7 ? SUGGESTED : null}
              top={isTranslationCardVisible ? <TranslationCard badge="基本翻譯" text="嘿！這週六有空嗎？一起去新咖啡廳吧 ☕" /> : null}
            >
            </Keyboard>

            {/* iOS 長按拷貝選單 */}
            {isCopyMenuVisible && (
              <div className="absolute left-6 top-[370px] z-20 flex items-center bg-[#2C2C2E]/95 backdrop-blur-md text-white rounded-xl shadow-2xl px-1.5 py-1 text-[15px] font-medium border border-white/10 animate-fade-in">
                <span className="px-3 py-1 rounded-lg bg-white/20 text-white font-semibold">拷貝</span>
                <span className="w-px h-3.5 bg-white/20 mx-0.5" />
                <span className="px-3 py-1 text-white/80">回覆</span>
                <span className="w-px h-3.5 bg-white/20 mx-0.5" />
                <span className="px-3 py-1 text-white/80">轉傳</span>
              </div>
            )}

            {/* iOS 允許貼上系統彈窗 */}
            {isPastePromptVisible && (
              <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/30 backdrop-blur-[2px]">
                <div className="w-[280px] bg-[#F2F2F2]/95 backdrop-blur-xl rounded-[18px] text-center shadow-2xl overflow-hidden border border-black/5 animate-scale-up">
                  <div className="px-5 pt-5 pb-4">
                    <h4 className="text-[17px] font-semibold text-black tracking-tight leading-snug">
                      「Keyly」想要從「LINE」貼上
                    </h4>
                  </div>
                  <div className="grid grid-cols-2 border-t border-[#3C3C43]/20 divide-x divide-[#3C3C43]/20 text-[17px]">
                    <div className="py-3 text-[#007AFF] font-normal">不允許貼上</div>
                    <div className="py-3 text-[#007AFF] font-semibold bg-[#007AFF]/10">允許貼上</div>
                  </div>
                </div>
              </div>
            )}

          </Phone>
        </div>
      </div>

      {/* 底部字幕與膠囊 */}
      <div
        className="mt-5 flex min-h-[2.5rem] items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold shadow-sm ring-1 ring-black/5"
        aria-hidden="true"
      >
        <span style={{ color: 'var(--accent)' }}>✦ {label}</span>
        <span className="text-text-primary">{caption}</span>
      </div>
    </div>
  );
}
