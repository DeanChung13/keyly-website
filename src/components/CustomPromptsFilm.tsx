import { useEffect, useRef, useState } from 'react';
import { Phone, ChatScreen, Keyboard, PromptPicker } from './keyly-phone/ui';

// Custom Editor Screen
function EditorScreen({ name, instr, saved, locale }: { name: string, instr: string, saved: boolean, locale: 'zh' | 'en' }) {
  const isEn = locale === 'en';
  return (
    <div className="flex flex-col h-full bg-[#F2F2F7] text-[15px] select-none font-sans overflow-hidden">
      <div className="flex justify-between items-center px-4 py-3 bg-white shadow-[0_0.5px_0_rgba(0,0,0,0.1)]">
        <span className="text-brand-cyan">{isEn ? 'Cancel' : '取消'}</span>
        <b className="font-semibold">{isEn ? 'New prompt' : '新增 AI 指令'}</b>
        <span className={`font-semibold transition-colors ${saved ? 'text-black/30' : 'text-brand-cyan'}`}>{isEn ? 'Save' : '儲存'}</span>
      </div>
      <div className="px-4 pt-4 pb-2 text-[13px] text-black/50 uppercase">{isEn ? 'Basics' : '基本資訊'}</div>
      <div className="bg-white border-y border-black/5 flex flex-col">
        <div className="px-4 py-3 border-b border-black/5 flex items-center">
          {name || <span className="text-black/30">{isEn ? 'Title' : '標題'}</span>}
        </div>
        <div className="px-4 py-3 flex justify-between items-center">
          <span>{isEn ? 'Category' : '類別'}</span>
          <span className="text-black/50">{isEn ? 'Creative' : '創意'}</span>
        </div>
      </div>
      <div className="px-4 pt-4 pb-2 text-[13px] text-black/50 uppercase">{isEn ? 'Instruction' : '指令內容'}</div>
      <div className="bg-white border-y border-black/5 px-4 py-3 min-h-[90px] relative">
        <span className="leading-relaxed">{instr || <span className="text-black/30">{isEn ? 'What should the AI do?' : '給 AI 的提示詞...'}</span>}</span>
        {!saved && <span className="inline-block w-0.5 h-[1.1em] bg-brand-cyan align-middle ml-0.5 animate-pulse" />}
      </div>
      <div className="px-4 pt-4 pb-2 text-[13px] text-black/50 uppercase">{isEn ? 'Preview' : '測試預覽'}</div>
      <div className="bg-white border-y border-black/5 px-4 py-3 min-h-[60px] flex justify-between items-center text-black/30">
        <i>{isEn ? 'Type something to test' : '輸入一段想測試的文字'}</i>
        <div className="bg-brand-cyan/10 text-brand-cyan px-2 py-1 rounded text-xs">{isEn ? 'Run AI preview' : '執行 AI 預覽'}</div>
      </div>
    </div>
  );
}

const TYPE_AT = 0.5, SWEEP_AT = 2.4, DONE_AT = 3.2, BEAT = 0.2;

const DATA = {
  zh: {
    layout: 'zh', placeholder: 'iMessage',
    editorName: '回主管',
    editorInstr: '第一句寫結論，下面最多兩點重點，分行',
    chat1: {
      time: '09:12', chat: '王經理', template: '回主管',
      input: '主管我跟你說一下 那個客戶今天又打來 說報價要再改 我已經改三版了 他們說下週一要 我覺得來得及但設計那邊還沒回 所以可能要再看看',
      output: '報價更新案預計下週一可完成，但因設計端尚未回覆，確切時程尚需確認。\n\n重點：\n1. 客戶今日再次來電，要求調整報價，此為第三版。\n2. 設計端回覆進度將影響最終交付時間。'
    },
    chat2: {
      time: '17:40', chat: '王經理', template: '回主管',
      input: '主管 剛剛設計回了 說週五才能給圖 那下週一可能真的來不及 要不要先跟客戶說一聲',
      output: '設計圖週五才會好，下週一恐難如期交付，建議向客戶說明。\n\n重點：\n1. 圖檔延遲至週五\n2. 下週一交付恐不及'
    },
    picker: ['回主管', '職場正式語氣', '精簡文字', '校對錯字']
  },
  en: {
    layout: 'qwerty', placeholder: 'iMessage',
    editorName: 'Reply to Boss',
    editorInstr: 'Lead with the bottom line in one sentence, then at most two bullet points on separate lines.',
    chat1: {
      time: '9:12 AM', chat: 'Dana (Manager)', template: 'Reply to Boss',
      input: "hey so the client called again and wants the quote changed, this is the third version already, they want it monday, i think we can make it but design hasn't gotten back to me so not sure yet",
      output: "We may be able to meet the client's Monday deadline for the third quote revision, but design's feedback is still pending.\n* The client has requested a revised quote for the third time.\n* The new deadline is Monday, contingent on design's input."
    },
    chat2: {
      time: '5:40 PM', chat: 'Dana (Manager)', template: 'Reply to Boss',
      input: "design just got back, they can't send files until friday so monday probably won't work, should we give the client a heads up",
      output: "The design team is delayed until Friday, impacting our Monday timeline, so we should alert the client.\n* Files won't be available until Friday, pushing back our Monday availability.\n* Proactive client communication is recommended due to the potential delay."
    },
    picker: ['Reply to Boss', 'Sound Professional', 'Cut the Fluff', 'Fix Grammar & Typos']
  }
} as const;

function clamp(v: number, min: number, max: number) { return Math.max(min, Math.min(max, v)); }

function typingStr(local: number, text: string, from = 0, speed = 0.05) {
  if (local < from) return '';
  const n = Math.floor((local - from) / speed) + 1;
  return [...text].slice(0, n).join('');
}

interface Frame {
  phase: 'editor' | 'chat1' | 'chat2';
  name?: string;
  instr?: string;
  saved?: boolean;
  time?: string;
  chat?: string;
  draft?: string;
  sweep?: number;
  aiPressed?: boolean;
}

function frameAt(data: typeof DATA['zh'], t: number): Frame {
  // Timeline:
  // 0 - 3s: Editor screen
  // 3 - 7s: Chat 1
  // 7 - 11s: Chat 2
  if (t < 3) {
    const name = typingStr(t, data.editorName, 0.2, 0.08);
    const instr = typingStr(t, data.editorInstr, 0.8, 0.06);
    return { phase: 'editor', name, instr, saved: t > 2.6 };
  } else if (t < 7) {
    const local = t - 3;
    const isAi = local > SWEEP_AT;
    const p = clamp((local - SWEEP_AT) / (DONE_AT - SWEEP_AT), 0, 1);
    return {
      phase: 'chat1', time: data.chat1.time, chat: data.chat1.chat,
      draft: p >= 1 ? data.chat1.output : data.chat1.input,
      sweep: p > 0 && p < 1 ? p : 0,
      aiPressed: isAi
    };
  } else if (t < 11) {
    const local = t - 7;
    const isAi = local > SWEEP_AT;
    const p = clamp((local - SWEEP_AT) / (DONE_AT - SWEEP_AT), 0, 1);
    return {
      phase: 'chat2', time: data.chat2.time, chat: data.chat2.chat,
      draft: p >= 1 ? data.chat2.output : data.chat2.input,
      sweep: p > 0 && p < 1 ? p : 0,
      aiPressed: isAi
    };
  }
  return frameAt(data, 0);
}

const LOOP = 11;
const STILL_TIME = 10.5; // Final rewritten state in Chat 2

export default function CustomPromptsFilm({ locale = 'zh' }: { locale?: 'zh' | 'en' }) {
  const data = DATA[locale];
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(STILL_TIME);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    let req = 0, start: number | null = null, offset = 0, last = -1;
    const loop = (now: number) => {
      start ??= now - offset * 1000;
      const next = ((now - start) / 1000) % LOOP;
      offset = next;
      const q = Math.floor(next * 30) / 30;
      if (q !== last) { last = q; setT(q); }
      req = requestAnimationFrame(loop);
    };
    const observer = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(req);
      if (entry.isIntersecting) { start = null; req = requestAnimationFrame(loop); }
    });
    setT(0);
    observer.observe(el);
    return () => { observer.disconnect(); cancelAnimationFrame(req); };
  }, []);

  const f = frameAt(data, t);
  const isEditor = f.phase === 'editor';
  
  return (
    <div ref={ref} className="flex flex-col items-center" style={{ ['--accent' as string]: '#28C39F' }}>
      <div className="relative [--s:0.56] sm:[--s:0.62] lg:[--s:0.75]" style={{ width: 'calc(456px * var(--s))', height: 'calc(972px * var(--s))' }} role="img" aria-label="Keyly Custom Prompt Demo">
        <div className="origin-top-left" style={{ transform: 'scale(var(--s))' }} aria-hidden="true">
          <Phone>
            {isEditor ? (
              <EditorScreen name={f.name || ''} instr={f.instr || ''} saved={f.saved || false} locale={locale} />
            ) : (
              <>
                <ChatScreen title={f.chat!} messages={[]} draft={f.draft || ''} placeholder={data.placeholder} />
                <Keyboard pressed={null} candidates={[]} idlePrompt={f.phase === 'chat1' ? data.chat1.template : data.chat2.template} aiState={f.aiPressed ? 'pressed' : 'idle'} layout={data.layout as any}>
                  {f.aiPressed && <PromptPicker items={data.picker} selected={f.phase === 'chat1' ? data.chat1.template : data.chat2.template} />}
                </Keyboard>
              </>
            )}
          </Phone>
        </div>
        {!isEditor && f.sweep! > 0 && (
          <div className="pointer-events-none absolute inset-[3%] rounded-[2rem] mix-blend-multiply"
            style={{ background: `linear-gradient(100deg, transparent ${f.sweep! * 140 - 30}%, color-mix(in srgb, var(--accent) 30%, transparent) ${f.sweep! * 140 - 10}%, transparent ${f.sweep! * 140}%)` }} />
        )}
      </div>
      <div className="mt-5 flex min-h-[2.5rem] items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold shadow-sm ring-1 ring-black/5" aria-hidden="true">
        {isEditor ? (
          <span className="text-text-primary">{locale === 'en' ? 'One sentence. One prompt.' : '一句白話，就是一個模板。'}</span>
        ) : (
          <>
            <span style={{ color: 'var(--accent)' }}>{f.time}</span>
            <span className="text-text-primary">{locale === 'en' ? 'Tap, and it sounds like you.' : '按一下，就是你的口吻。'}</span>
          </>
        )}
      </div>
    </div>
  );
}
