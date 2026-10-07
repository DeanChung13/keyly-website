import { useEffect, useRef, useState } from 'react';
import { Phone, ChatScreen, Keyboard, PromptPicker } from './keyly-phone/ui.jsx';

// 移植自介紹影片（Keyly-video/src/shots/index.jsx）：同樣的情境、打字節奏與 AI 掃光，
// 改成在瀏覽器即時循環播放；改寫句是 Keyly 雲端模型的實測輸出，照影片原文。
const BEAT = 0.25;
const TYPE_AT = 0.6, AI_AT = 3.4, SWEEP_AT = 4.2, DONE_AT = 5.2;

// 每個字要亮的第一個注音鍵
const INITIAL: Record<string, string> = {你:'ㄋ',每:'ㄇ',次:'ㄘ',都:'ㄉ',說:'ㄕ',快:'ㄎ',到:'ㄉ',了:'ㄌ',結:'ㄐ',果:'ㄍ',根:'ㄍ',本:'ㄅ',還:'ㄏ',沒:'ㄇ',出:'ㄔ',門:'ㄇ',
  天:'ㄊ',氣:'ㄑ',變:'ㄅ',冷:'ㄌ',突:'ㄊ',然:'ㄖ',有:'ㄧ',點:'ㄉ',想:'ㄒ',早:'ㄗ',安:'ㄢ',祝:'ㄓ',今:'ㄐ',順:'ㄕ',利:'ㄌ',
  其:'ㄑ',實:'ㄕ',我:'ㄨ',覺:'ㄐ',得:'ㄉ'};

type Msg = { from: 'me' | 'them'; text: string; avatar?: string };
// history：最後一則（them）之前的對話，填滿聊天室上方
type Scene = { duration: number; accent: string; chat: string; history: Msg[]; them: string; themAvatar?: string; input: string; output: string; template: string; caption: string };
type Film = { layout: 'zhuyin' | 'qwerty'; placeholder: string; label: string; picker: string[];
  hook: { duration: number; chat: string; history: Msg[]; them: string; text: string; caption: string }; scenes: Scene[] };
type Frame = { accent: string; chat: string; messages: Msg[]; draft: string; key: string | null; phase: number; template: string; caption: string; sweep: number; label: string };

const FILMS: Record<'zh' | 'en', Film> = {
  zh: {
    layout: 'zhuyin', placeholder: '輸入訊息', label: 'Keyly 注音鍵盤示範：打字後按 AI 鍵，把一句話改寫成不同風格',
    picker: ['吐槽一下', '吟詩作對', '長輩圖祝福語', '校對錯字'],
    hook: { duration: 4, chat: '小安', history: [{ from: 'them', text: '欸你昨天怎麼先走了' }, { from: 'me', text: '有點累就先回家了' }, { from: 'them', text: '是不是因為阿哲講的那些話' }, { from: 'me', text: '也還好啦…' }, { from: 'them', text: '你可以跟我說沒關係' }], them: '欸 你到底怎麼想？', text: '其實我覺得', caption: '打了又刪，刪了又打' },
    scenes: [
      { duration: 9, accent: '#FF6B4A', chat: '阿哲', history: [{ from: 'me', text: '七點餐廳門口集合喔' }, { from: 'them', text: '好 準時到' }, { from: 'me', text: '到哪了？' }, { from: 'them', text: '出門了出門了' }, { from: 'me', text: '我們都已經點完菜了' }], them: '我快到了！', input: '你每次都說快到了結果根本還沒出門',
        output: '你每次都說「快到了」，乾脆叫「預約遲到」好了，根本還沒出門是在演哪齣？', template: '吐槽一下', caption: '朋友又遲到了' },
      { duration: 9, accent: '#7C6CF2', chat: '小雨', history: [{ from: 'them', text: '下班了嗎？' }, { from: 'me', text: '剛到家' }, { from: 'them', text: '我也是，今天累爆' }, { from: 'me', text: '辛苦了，有吃飯嗎' }, { from: 'them', text: '有啦，吃了一碗熱湯麵' }], them: '今天好冷喔', input: '天氣變冷了，突然有點想你',
        output: '風生微冽覺微寒，\n忽有相思起寸端。\n滿目關情何處寄，\n心隨清念共闌珊。', template: '吟詩作對', caption: '有點想你，說不出口' },
      { duration: 8, accent: '#F0A020', chat: '相親相愛一家人', history: [{ from: 'them', text: '中秋節大家都會回來吧？', avatar: '媽' }, { from: 'me', text: '會！我負責買柚子' }, { from: 'them', text: '好 那我來準備烤肉', avatar: '爸' }, { from: 'them', text: '天氣預報說那天不會下雨 ☀️', avatar: '姊' }, { from: 'them', text: '今天降溫，出門記得多穿一件', avatar: '媽' }], them: '🌅 早安', themAvatar: '爸', input: '早安，祝你今天順利',
        output: '🌸 早安！美好清晨從心開始！送上一份最誠摯的祝願，願您今天步步順暢、事事順心如意☀️ 人生處處是風景，平安喜樂福常在！💖🙏🍀', template: '長輩圖祝福語', caption: '長輩群組的早安' },
    ],
  },
  en: {
    layout: 'qwerty', placeholder: 'iMessage', label: 'Keyly keyboard demo: type a message, tap the AI key, and it gets rewritten in a new tone',
    picker: ['Make It Funny', 'Soften the Tone', 'Hype It Up', 'Fix Grammar & Typos'],
    hook: { duration: 4, chat: 'Messages', history: [{ from: 'them', text: 'about what we talked about last night' }, { from: 'me', text: 'yeah…' }], them: 'so… what do you think?', text: 'honestly i think', caption: 'Type. Delete. Repeat.' },
    scenes: [
      { duration: 9, accent: '#FF6B4A', chat: 'Jake', history: [{ from: 'me', text: 'where are you?' }, { from: 'them', text: 'leaving now' }, { from: 'me', text: "we're already at the table" }], them: 'almost there!!', input: "you said 5 min away 40 minutes ago and you're still at home",
        output: "Five minutes away, you said? That was FORTY minutes ago, and I'm pretty sure you're still in your pajamas.", template: 'Make It Funny', caption: 'Late again?' },
      { duration: 12, accent: '#7C6CF2', chat: 'Dana (Manager)', history: [{ from: 'them', text: 'Morning! Quick update on the client deck' }, { from: 'me', text: "Sure, what's up?" }], them: 'Heads up, deadline moved again. Friday now, and can you redo the deck?',
        input: "this is the third time you changed the deadline and I'm not redoing everything again",
        output: "I understand that deadlines can sometimes shift. However, this is the third time the deadline has been changed, and I'm unable to redo the work if it changes again. Could we please aim to keep the current deadline?",
        template: 'Soften the Tone', caption: 'Boss moved it again?' },
      { duration: 8, accent: '#F0A020', chat: 'Maya', history: [{ from: 'them', text: 'guess who just got off the phone with HR 👀' }, { from: 'me', text: 'WAIT' }], them: 'I GOT THE JOB 😭😭', input: 'congrats on the new job',
        output: "Woohoo! Huge congratulations on landing that new job! That's absolutely fantastic news!", template: 'Hype It Up', caption: 'Big news?' },
    ],
  },
};

/** 打字進度：每字一個十六分音符。回傳 [已出現字數, 目前亮的鍵] */
function typing(local: number, text: string, layout: Film['layout'], from = TYPE_AT): [number, string | null] {
  const cs = [...text];
  const step = Math.min(BEAT / 2, 2.6 / cs.length);
  const n = Math.max(0, Math.min(cs.length, Math.floor((local - from) / step) + 1));
  const typingNow = local >= from && local < from + cs.length * step;
  const ch = cs[n - 1] ?? '';
  const key = layout === 'qwerty' ? (/[a-z;]/i.test(ch) ? ch.toLowerCase() : null) : INITIAL[ch] ?? null;
  return [local < from ? 0 : n, typingNow ? key : null];
}

function frameAt(film: Film, t: number): Frame {
  const HOOK = film.hook;
  if (t < HOOK.duration) {
    const len = HOOK.text.length;
    const [n, key] = t < 1.8 ? typing(t, HOOK.text, film.layout, 0.3) : [Math.max(0, len - Math.floor((t - 1.8) / Math.min(0.15, 0.8 / len))), t < 2.6 ? '⌫' : null];
    return { accent: '#5B8CFF', chat: HOOK.chat, messages: [...HOOK.history, { from: 'them', text: HOOK.them }], draft: HOOK.text.slice(0, n), key, phase: 0, template: '', caption: HOOK.caption, sweep: 0, label: '' };
  }
  let local = t - HOOK.duration;
  for (const s of film.scenes) {
    if (local < s.duration) {
      const [n, key] = typing(local, s.input, film.layout);
      const phase = local < AI_AT ? 0 : local < SWEEP_AT ? 1 : local < DONE_AT ? 2 : 3;
      const p = Math.min(1, Math.max(0, (local - SWEEP_AT) / (DONE_AT - SWEEP_AT)));
      return { accent: s.accent, chat: s.chat, messages: [...s.history, { from: 'them', text: s.them, avatar: s.themAvatar }], draft: phase >= 2 ? s.output : [...s.input].slice(0, n).join(''),
        key, phase, template: s.template, caption: s.caption, sweep: p > 0 && p < 1 ? p : 0, label: s.template };
    }
    local -= s.duration;
  }
  return frameAt(film, 0);
}
const loopOf = (film: Film) => film.hook.duration + film.scenes.reduce((sum, s) => sum + s.duration, 0);
// 不播動畫時（prefers-reduced-motion）停在第一個情境改寫完成的畫面
const stillOf = (film: Film) => film.hook.duration + DONE_AT + 1;

export default function HeroFilm({ locale = 'zh' }: { locale?: 'zh' | 'en' }) {
  const film = FILMS[locale];
  const LOOP = loopOf(film);
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(stillOf(film));

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    let req = 0, start: number | null = null, offset = 0, last = -1;
    const loop = (now: number) => {
      start ??= now - offset * 1000;
      const next = ((now - start) / 1000) % LOOP;
      offset = next;
      const q = Math.floor(next * 30) / 30;   // 30fps 就夠，避免每個 rAF 都重繪
      if (q !== last) { last = q; setT(q); }
      req = requestAnimationFrame(loop);
    };
    // 捲出畫面就停，回來時從停下的地方接著播
    const observer = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(req);
      if (entry.isIntersecting) { start = null; req = requestAnimationFrame(loop); }
    });
    setT(0);
    observer.observe(el);
    return () => { observer.disconnect(); cancelAnimationFrame(req); };
  }, [LOOP]);

  const f = frameAt(film, t);
  return (
    <div ref={ref} className="flex flex-col items-center" style={{ ['--accent' as string]: f.accent }}>
      {/* 影片的手機是 iPhone 17 Pro Max 實際尺寸（456×972），整支等比例縮小 */}
      <div className="relative [--s:0.56] sm:[--s:0.62] lg:[--s:0.75]" style={{ width: 'calc(456px * var(--s))', height: 'calc(972px * var(--s))' }} role="img" aria-label={film.label}>
        <div className="origin-top-left" style={{ transform: 'scale(var(--s))' }} aria-hidden="true">
          <Phone className={locale === 'zh' ? 'k-theme-line' : ''}>
            <ChatScreen title={f.chat} messages={f.messages} draft={f.draft} placeholder={film.placeholder} />
            <Keyboard pressed={f.key} candidates={[]} idlePrompt={f.template} aiState={f.phase >= 1 ? 'pressed' : 'idle'} layout={film.layout}>
              {f.phase === 1 && <PromptPicker items={film.picker} selected={f.template} />}
            </Keyboard>
          </Phone>
        </div>
        {f.sweep > 0 && (
          <div className="pointer-events-none absolute inset-[3%] rounded-[2rem] mix-blend-multiply"
            style={{ background: `linear-gradient(100deg, transparent ${f.sweep * 140 - 30}%, color-mix(in srgb, var(--accent) 30%, transparent) ${f.sweep * 140 - 10}%, transparent ${f.sweep * 140}%)` }} />
        )}
      </div>
      <div className="mt-5 flex min-h-[2.5rem] items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold shadow-sm ring-1 ring-black/5" aria-hidden="true">
        {f.label && <span style={{ color: 'var(--accent)' }}>✦ {f.label}</span>}
        <span className="text-text-primary">{f.caption}</span>
      </div>
    </div>
  );
}
