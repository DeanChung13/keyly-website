import { useEffect, useRef, useState } from 'react';
import { Phone, ChatScreen, Keyboard, PromptPicker } from './keyly-phone/ui.jsx';

// 指南頁共用的改寫示範動畫：聊天室打字 → AI 鍵選指令 → 掃光 → 結果回填 → 送出。
// 節奏沿用 HeroFilm；多個情境依序循環。
export type Msg = { from: 'me' | 'them'; text: string };
export type Scene = { chat: string; history: Msg[]; input: string; output: string; template: string; picker: string[]; label: string };
export type FilmConfig = { label: string; scenes: Scene[] };

const TYPE_AT = 0.6, TYPE_MAX = 2.6;
const AI_AT = TYPE_AT + TYPE_MAX + 0.8, SWEEP_AT = AI_AT + 0.8, DONE_AT = SWEEP_AT + 1.0, SEND_AT = DONE_AT + 3.2, SCENE = SEND_AT + 2.0;
const STEP_LABELS = ['打出草稿', '點 AI 選指令', '結果填回輸入框，送出'];

// 打字時亮的鍵只是視覺節奏，依字碼挑一個注音鍵
const KEYS = [...'ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘㄙㄧㄨㄩㄚㄛㄜㄝㄞㄟㄠㄡㄢㄣㄤㄥ'];
const keyFor = (ch: string) => (/[\s，。、！？：；,.!?\n]/.test(ch) ? null : KEYS[ch.codePointAt(0)! % KEYS.length]);

function frameAt(scenes: Scene[], time: number) {
  const index = Math.floor(time / SCENE) % scenes.length;
  const s = scenes[index];
  const t = time - index * SCENE;
  const cs = [...s.input];
  const step = Math.min(0.125, TYPE_MAX / cs.length);
  const n = t < TYPE_AT ? 0 : Math.min(cs.length, Math.floor((t - TYPE_AT) / step) + 1);
  const key = t >= TYPE_AT && t < TYPE_AT + cs.length * step ? keyFor(cs[n - 1]) : null;
  const phase = t < AI_AT ? 0 : t < SWEEP_AT ? 1 : t < DONE_AT ? 2 : t < SEND_AT ? 3 : 4;
  const p = Math.min(1, Math.max(0, (t - SWEEP_AT) / (DONE_AT - SWEEP_AT)));
  return {
    s, index,
    messages: phase === 4 ? [...s.history, { from: 'me' as const, text: s.output }] : s.history,
    draft: phase === 4 ? '' : phase === 3 ? s.output : cs.slice(0, n).join(''),
    key, phase, sweep: p > 0 && p < 1 ? p : 0,
    stepIndex: phase === 0 ? 0 : phase <= 2 ? 1 : 2,
  };
}

export default function RewriteFilm({ label, scenes }: FilmConfig) {
  const LOOP = SCENE * scenes.length;
  const ref = useRef<HTMLDivElement>(null);
  // 不播動畫時（prefers-reduced-motion）停在第一個情境改寫完成的畫面
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
  }, [LOOP]);

  const f = frameAt(scenes, t);
  const steps = [STEP_LABELS[0], `點 AI 選「${f.s.template}」`, STEP_LABELS[2]];
  const scale = 0.62;
  return (
    <div ref={ref} className="rwf">
      {scenes.length > 1 && <p className="rwf-scene" aria-hidden="true">{f.s.label}</p>}
      <div className="rwf-phone" style={{ width: 456 * scale, height: 972 * scale }} role="img" aria-label={label}>
        <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }} aria-hidden="true">
          <Phone className="k-theme-line">
            <ChatScreen title={f.s.chat} messages={f.messages} draft={f.draft} />
            <Keyboard pressed={f.key} candidates={[]} aiState={f.phase === 1 ? 'pressed' : 'idle'} layout="zhuyin">
              <PromptPicker items={f.s.picker} selected={f.phase >= 1 ? f.s.template : ''} />
            </Keyboard>
          </Phone>
        </div>
        {f.sweep > 0 && (
          <div className="rwf-sweep" style={{ background: `linear-gradient(100deg, transparent ${f.sweep * 140 - 30}%, rgba(142, 97, 217, 0.3) ${f.sweep * 140 - 10}%, transparent ${f.sweep * 140}%)` }} />
        )}
      </div>
      <ol className="rwf-steps" aria-hidden="true">
        {steps.map((text, i) => <li key={i} className={i === f.stepIndex ? 'is-active' : ''}><b>{i + 1}</b>{text}</li>)}
      </ol>
    </div>
  );
}
