import { useEffect, useRef, useState } from 'react';
import { Phone, ChatScreen, Keyboard, PromptPicker } from './keyly-phone/ui.jsx';

// /guides/line-translation/ 的示範動畫：LINE 聊天室裡用注音打中文 → AI 鍵選「翻成英文」→ 英文回填後送出。
// 節奏沿用 HeroFilm：每字一個十六分音符、AI 掃光後換成結果。
const TYPE_AT = 0.6, AI_AT = 4.0, SWEEP_AT = 4.8, DONE_AT = 5.8, SEND_AT = 8.4, LOOP = 10.5;

const HISTORY = [
  { from: 'them', text: 'Hi! This is Mike from Brightline.' },
  { from: 'me', text: 'Hi Mike, nice to meet you!' },
  { from: 'them', text: 'Nice to meet you too 😊' },
  { from: 'them', text: 'We are interested in 500 units.' },
  { from: 'me', text: 'Great, let me check with my team.' },
  { from: 'them', text: 'Thanks! Any update on the quotation?' },
] as const;
const INPUT = '不好意思這麼晚回覆，報價單我明天中午前寄給你。';
const OUTPUT = "Sorry for the late reply. I'll send you the quotation by noon tomorrow.";
const TEMPLATE = '翻成英文';
const PICKER = [TEMPLATE, '校對錯字', '吐槽一下', '長輩圖祝福語'];
const STEPS = ['用注音打中文', '點 AI 選「翻成英文」', '英文填回輸入框，送出'];

// 每個字要亮的第一個注音鍵
const INITIAL: Record<string, string> = {不:'ㄅ',好:'ㄏ',意:'ㄧ',思:'ㄙ',這:'ㄓ',麼:'ㄇ',晚:'ㄨ',回:'ㄏ',覆:'ㄈ',報:'ㄅ',價:'ㄐ',單:'ㄉ',
  我:'ㄨ',明:'ㄇ',天:'ㄊ',中:'ㄓ',午:'ㄨ',前:'ㄑ',寄:'ㄐ',給:'ㄍ',你:'ㄋ'};

function frameAt(t: number) {
  const cs = [...INPUT];
  const step = Math.min(0.125, 2.6 / cs.length);
  const n = t < TYPE_AT ? 0 : Math.min(cs.length, Math.floor((t - TYPE_AT) / step) + 1);
  const typingNow = t >= TYPE_AT && t < TYPE_AT + cs.length * step;
  const key = typingNow ? INITIAL[cs[n - 1]] ?? null : null;
  const phase = t < AI_AT ? 0 : t < SWEEP_AT ? 1 : t < DONE_AT ? 2 : t < SEND_AT ? 3 : 4;
  const p = Math.min(1, Math.max(0, (t - SWEEP_AT) / (DONE_AT - SWEEP_AT)));
  const messages = phase === 4 ? [...HISTORY, { from: 'me', text: OUTPUT }] : [...HISTORY];
  const draft = phase === 4 ? '' : phase === 3 ? OUTPUT : cs.slice(0, n).join('');
  const stepIndex = phase === 0 ? 0 : phase <= 2 ? 1 : 2;
  return { messages, draft, key, phase, sweep: p > 0 && p < 1 ? p : 0, stepIndex };
}

export default function LineTranslationFilm() {
  const ref = useRef<HTMLDivElement>(null);
  // 不播動畫時（prefers-reduced-motion、尚未載入 JS）停在翻譯完成的畫面
  const [t, setT] = useState(DONE_AT + 1);

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
    // 捲出畫面就停，回來時從停下的地方接著播
    const observer = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(req);
      if (entry.isIntersecting) { start = null; req = requestAnimationFrame(loop); }
    });
    setT(0);
    observer.observe(el);
    return () => { observer.disconnect(); cancelAnimationFrame(req); };
  }, []);

  const f = frameAt(t);
  const s = 0.62;
  return (
    <div ref={ref} className="ltf">
      <div className="ltf-phone" style={{ width: 456 * s, height: 972 * s }} role="img"
        aria-label="示範：在 LINE 聊天室用 Keyly 注音鍵盤打中文，點 AI 鍵選「翻成英文」，英文直接填回輸入框後送出">
        <div style={{ transform: `scale(${s})`, transformOrigin: 'top left' }} aria-hidden="true">
          <Phone>
            <ChatScreen title="Mike" messages={f.messages} draft={f.draft} />
            <Keyboard pressed={f.key} candidates={[]} aiState={f.phase === 1 ? 'pressed' : 'idle'} layout="zhuyin">
              <PromptPicker items={PICKER} selected={f.phase >= 1 ? TEMPLATE : ''} />
            </Keyboard>
          </Phone>
        </div>
        {f.sweep > 0 && (
          <div className="ltf-sweep" style={{ background: `linear-gradient(100deg, transparent ${f.sweep * 140 - 30}%, rgba(142, 97, 217, 0.3) ${f.sweep * 140 - 10}%, transparent ${f.sweep * 140}%)` }} />
        )}
      </div>
      <ol className="ltf-steps" aria-hidden="true">
        {STEPS.map((label, i) => <li key={label} className={i === f.stepIndex ? 'is-active' : ''}><b>{i + 1}</b>{label}</li>)}
      </ol>
    </div>
  );
}
