import { jsxs, jsx } from "react/jsx-runtime";
import { renderToString } from "react-dom/server";
import { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { Pause, Play, Download, X, Menu, Sparkles, Keyboard as Keyboard$1, Repeat, Wand2, ChevronRight, ChevronDown, Smartphone, Star, Feather, Command, ShieldCheck } from "lucide-react";
const ZHUYIN_ROWS = [
  ["ㄅ", "ㄉ", "ˇ", "ˋ", "ㄓ", "ˊ", "˙", "ㄚ", "ㄞ", "ㄢ", "ㄦ"],
  ["ㄆ", "ㄊ", "ㄍ", "ㄐ", "ㄔ", "ㄗ", "ㄧ", "ㄛ", "ㄟ", "ㄣ"],
  ["ㄇ", "ㄋ", "ㄎ", "ㄑ", "ㄕ", "ㄘ", "ㄨ", "ㄜ", "ㄠ", "ㄤ"],
  ["ㄈ", "ㄌ", "ㄏ", "ㄒ", "ㄖ", "ㄙ", "ㄩ", "ㄝ", "ㄡ", "ㄥ", "delete"],
  ["keyboardChange", "languageToggle", "ai", "space", "return"]
];
function Icon({ name, size = 19 }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", "aria-hidden": true };
  switch (name) {
    case "sparkles":
      return /* @__PURE__ */ jsx("svg", { ...common, children: /* @__PURE__ */ jsx("path", { d: "m10.1 2.5 1.8 5.7 5.6 1.8-5.6 1.8-1.8 5.7-1.8-5.7L2.7 10l5.6-1.8 1.8-5.7ZM18.6 14.3l.9 2.4 2.3.9-2.3.9-.9 2.4-.9-2.4-2.3-.9 2.3-.9.9-2.4Z", fill: "currentColor" }) });
    case "delete":
      return /* @__PURE__ */ jsxs("svg", { ...common, children: [
        /* @__PURE__ */ jsx("path", { d: "M8.5 4.5H21v15H8.5L2 12l6.5-7.5Z", stroke: "currentColor", strokeWidth: "1.8", strokeLinejoin: "round" }),
        /* @__PURE__ */ jsx("path", { d: "m11 9 6 6m0-6-6 6", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round" })
      ] });
    // SF Symbols「globe」Regular，由使用者自 SF Symbols App 匯出（2026-10-07）
    case "globe":
      return /* @__PURE__ */ jsxs("svg", { width: size, height: size, viewBox: "4 -77 84 84", "aria-hidden": "true", children: [
        /* @__PURE__ */ jsx("path", { d: "M46.2402 4.15039C68.0176 4.15039 85.6934-13.4766 85.6934-35.2539C85.6934-57.0312 68.0176-74.6582 46.2402-74.6582C24.5117-74.6582 6.83594-57.0312 6.83594-35.2539C6.83594-13.4766 24.5117 4.15039 46.2402 4.15039ZM46.2402-1.70898C27.7344-1.70898 12.7441-16.748 12.7441-35.2539C12.7441-53.7598 27.7344-68.7988 46.2402-68.7988C64.7461-68.7988 79.7852-53.7598 79.7852-35.2539C79.7852-16.748 64.7461-1.70898 46.2402-1.70898Z", fill: "currentColor" }),
        /* @__PURE__ */ jsx("path", { d: "M46.2402 1.66016C57.1777 1.66016 65.8203-14.4043 65.8203-35.1562C65.8203-56.0547 57.2266-72.168 46.2402-72.168C35.2539-72.168 26.709-56.0547 26.709-35.1562C26.709-14.4043 35.3027 1.66016 46.2402 1.66016ZM46.2402-3.66211C39.0137-3.66211 32.4707-18.5059 32.4707-35.1562C32.4707-52.002 39.0137-66.8457 46.2402-66.8457C53.5156-66.8457 60.0586-52.002 60.0586-35.1562C60.0586-18.5059 53.5156-3.66211 46.2402-3.66211Z", fill: "currentColor" }),
        /* @__PURE__ */ jsx("path", { d: "M46.2402 2.92969C47.8027 2.92969 49.0723 1.66016 49.0723 0.0976562L49.0723-70.2148C49.0723-71.7773 47.8027-73.0469 46.2402-73.0469C44.7266-73.0469 43.4082-71.7773 43.4082-70.2148L43.4082 0.0976562C43.4082 1.66016 44.7266 2.92969 46.2402 2.92969ZM22.7539-9.52148C27.7344-13.5742 35.9375-15.7715 46.2402-15.7715C56.5918-15.7715 64.7461-13.5742 69.7754-9.52148C70.9961-8.54492 72.6562-8.39844 73.7793-9.47266C74.9023-10.5469 75-12.3047 73.8281-13.4277C68.75-18.1641 58.1543-21.4355 46.2402-21.4355C34.375-21.4355 23.7793-18.1641 18.7012-13.4277C17.5293-12.3047 17.627-10.5469 18.75-9.47266C19.873-8.39844 21.4844-8.54492 22.7539-9.52148ZM12.0605-32.4219L81.3965-32.4219C82.959-32.4219 84.2285-33.6914 84.2285-35.2539C84.2285-36.8164 82.959-38.0859 81.3965-38.0859L12.0605-38.0859C10.498-38.0859 9.22852-36.8164 9.22852-35.2539C9.22852-33.6914 10.498-32.4219 12.0605-32.4219ZM46.2402-48.877C58.1543-48.877 68.75-52.1484 73.8281-56.8848C75-58.0078 74.9023-59.7656 73.7793-60.8398C72.6562-61.9141 70.9961-61.7676 69.7754-60.791C64.7461-56.7383 56.5918-54.541 46.2402-54.541C35.9375-54.541 27.7344-56.7383 22.7539-60.791C21.4844-61.7676 19.873-61.9141 18.75-60.8398C17.627-59.7656 17.5293-58.0078 18.7012-56.8848C23.7793-52.1484 34.375-48.877 46.2402-48.877Z", fill: "currentColor" })
      ] });
    case "return":
      return /* @__PURE__ */ jsx("svg", { ...common, children: /* @__PURE__ */ jsx("path", { d: "M20 6v6a4 4 0 0 1-4 4H5m0 0 4-4m-4 4 4 4", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) });
    case "back":
      return /* @__PURE__ */ jsx("svg", { ...common, children: /* @__PURE__ */ jsx("path", { d: "m15 5-7 7 7 7", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) });
    case "send":
      return /* @__PURE__ */ jsx("svg", { ...common, children: /* @__PURE__ */ jsx("path", { d: "m12 19 0-14m0 0-5 5m5-5 5 5", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round" }) });
    // SF Symbols「microphone」Regular，由使用者自 SF Symbols App 匯出（2026-10-07）
    case "mic":
      return /* @__PURE__ */ jsx("svg", { width: size, height: size, viewBox: "-2.3 -79.8 84 84", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M39.6973-10.9863C56.2988-10.9863 67.7246-22.168 67.7246-38.5254L67.7246-46.4355C67.7246-48.291 66.2598-49.7559 64.4043-49.7559C62.5977-49.7559 61.1328-48.291 61.1328-46.4355L61.1328-38.8184C61.1328-25.6836 52.6855-17.041 39.6973-17.041C26.709-17.041 18.2617-25.6836 18.2617-38.8184L18.2617-46.4355C18.2617-48.291 16.7969-49.7559 14.9414-49.7559C13.1348-49.7559 11.6699-48.291 11.6699-46.4355L11.6699-38.5254C11.6699-22.168 23.0957-10.9863 39.6973-10.9863ZM25.293-39.8438C25.293-30.6641 31.2012-24.3652 39.6973-24.3652C48.1445-24.3652 54.1016-30.6641 54.1016-39.8438L54.1016-63.5742C54.1016-72.7539 48.1445-79.0527 39.6973-79.0527C31.2012-79.0527 25.293-72.7539 25.293-63.5742ZM31.8848-39.8438L31.8848-63.5742C31.8848-69.1895 35.0098-72.5586 39.6973-72.5586C44.3359-72.5586 47.5098-69.1895 47.5098-63.5742L47.5098-39.8438C47.5098-34.2285 44.3359-30.8594 39.6973-30.8594C35.0098-30.8594 31.8848-34.2285 31.8848-39.8438ZM22.6074 3.4668L56.7871 3.4668C58.5938 3.4668 60.0586 2.00195 60.0586 0.146484C60.0586-1.66016 58.5938-3.125 56.7871-3.125L22.6074-3.125C20.752-3.125 19.2871-1.66016 19.2871 0.146484C19.2871 2.00195 20.752 3.4668 22.6074 3.4668ZM39.6973 2.00195C41.5039 2.00195 42.9688 0.537109 42.9688-1.26953L42.9688-12.4512C42.9688-14.3066 41.5039-15.7715 39.6973-15.7715C37.8418-15.7715 36.377-14.3066 36.377-12.4512L36.377-1.26953C36.377 0.537109 37.8418 2.00195 39.6973 2.00195Z", fill: "currentColor" }) });
    case "shift":
      return /* @__PURE__ */ jsx("svg", { ...common, children: /* @__PURE__ */ jsx("path", { d: "M12 3.5 3.5 12.5H8v7h8v-7h4.5L12 3.5Z", stroke: "currentColor", strokeWidth: "1.7", strokeLinejoin: "round" }) });
    case "chevron":
      return /* @__PURE__ */ jsx("svg", { ...common, children: /* @__PURE__ */ jsx("path", { d: "m6 9 6 6 6-6", stroke: "currentColor", strokeWidth: "1.9", strokeLinecap: "round", strokeLinejoin: "round" }) });
    default:
      return null;
  }
}
function Phone({ children, className = "" }) {
  return /* @__PURE__ */ jsxs("div", { className: `k-phone ${className}`, children: [
    /* @__PURE__ */ jsx("i", { className: "k-side-button k-side-action" }),
    /* @__PURE__ */ jsx("i", { className: "k-side-button k-side-volume-up" }),
    /* @__PURE__ */ jsx("i", { className: "k-side-button k-side-volume-down" }),
    /* @__PURE__ */ jsx("i", { className: "k-side-button k-side-power" }),
    /* @__PURE__ */ jsxs("div", { className: "k-phone-screen", children: [
      /* @__PURE__ */ jsxs("div", { className: "k-status", children: [
        /* @__PURE__ */ jsx("span", { children: "2:35" }),
        /* @__PURE__ */ jsx("div", { className: "k-island" }),
        /* @__PURE__ */ jsxs("span", { className: "k-status-signals", children: [
          /* @__PURE__ */ jsx("i", { className: "k-signal" }),
          /* @__PURE__ */ jsx("i", { className: "k-wifi" }),
          /* @__PURE__ */ jsx("i", { className: "k-battery" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "k-phone-content", children }),
      /* @__PURE__ */ jsx("div", { className: "k-home-indicator" })
    ] })
  ] });
}
function ChatScreen({ title = "相親相愛一家人", messages = [], draft = "", placeholder = "輸入訊息", className = "" }) {
  return /* @__PURE__ */ jsxs("div", { className: `k-chat ${className}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "k-chat-header", children: [
      /* @__PURE__ */ jsx("span", { className: "k-chat-back", children: /* @__PURE__ */ jsx(Icon, { name: "back", size: 23 }) }),
      /* @__PURE__ */ jsx("strong", { children: title }),
      /* @__PURE__ */ jsx("span", { className: "k-chat-menu", children: "•••" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "k-chat-messages", children: messages.map((message, index) => /* @__PURE__ */ jsxs("div", { className: `k-message-row ${message.from === "me" ? "k-from-me" : "k-from-them"}`, children: [
      message.from === "them" && /* @__PURE__ */ jsx("span", { className: "k-avatar", "aria-hidden": "true", children: message.avatar ?? title.slice(0, 1) }),
      /* @__PURE__ */ jsx("div", { className: "k-message", children: message.text })
    ] }, index)) }),
    /* @__PURE__ */ jsxs("div", { className: "k-composer", children: [
      /* @__PURE__ */ jsx("span", { className: "k-add", "aria-hidden": "true", children: "＋" }),
      /* @__PURE__ */ jsxs("div", { className: "k-input", children: [
        /* @__PURE__ */ jsx("span", { className: "k-draft", children: draft }),
        /* @__PURE__ */ jsx("span", { className: "k-caret" }),
        /* @__PURE__ */ jsx("span", { className: "k-placeholder", children: draft ? "" : placeholder })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "k-send", "aria-hidden": "true", children: /* @__PURE__ */ jsx(Icon, { name: "send", size: 17 }) })
    ] })
  ] });
}
const QWERTY_ROWS = [
  "qwertyuiop".split(""),
  [..."asdfghjkl".split(""), ";"],
  ["shift", ..."zxcvbnm".split(""), "delete"],
  ["keyboardChange", "ai", "space", "return"]
];
const QWERTY_W = { shift: 47.4, delete: 47.4, keyboardChange: 48.5, ai: 49.6, space: 213.8, return: 102 };
function keyLabel(key, layout) {
  if (key === "keyboardChange") return "123";
  if (key === "languageToggle") return "ABC";
  if (key === "ai") return /* @__PURE__ */ jsx(Icon, { name: "sparkles", size: 27 });
  if (key === "space") return layout === "qwerty" ? "space" : "空白";
  if (key === "shift") return /* @__PURE__ */ jsx(Icon, { name: "shift", size: 26 });
  if (key === "return") return /* @__PURE__ */ jsx(Icon, { name: "return", size: 21 });
  if (key === "delete") return /* @__PURE__ */ jsx(Icon, { name: "delete", size: 21 });
  return key;
}
function Key({ value, pressed, aiState, width, layout }) {
  const isAI = value === "ai";
  const isFunction = ["keyboardChange", "languageToggle", "delete", "shift"].includes(value);
  const isReturn = value === "return";
  const down = pressed === value || value === "delete" && pressed === "⌫" || isAI && aiState === "pressed";
  const extra = [isAI && "k-ai-key", isFunction && "k-function-key", isReturn && "k-return-key", value === "space" && "k-space-key", down && "k-pressed"].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxs("div", { className: `k-key ${extra}`, "data-key": value, "data-pressed": down ? "true" : "false", style: width ? { width } : void 0, children: [
    /* @__PURE__ */ jsx("div", { className: "k-key-surface", children: keyLabel(value, layout) }),
    down && !isAI && !["space", "return", "delete"].includes(value) && /* @__PURE__ */ jsx("span", { className: "k-key-popover", children: keyLabel(value, layout) })
  ] });
}
function Keyboard({ pressed, candidates = [], pickedIndex = 0, aiState = "idle", idlePrompt = "", layout = "zhuyin", children, className = "" }) {
  const rows = layout === "qwerty" ? QWERTY_ROWS : ZHUYIN_ROWS;
  return /* @__PURE__ */ jsxs("div", { className: `k-keyboard k-layout-${layout} ${className}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "k-candidate-bar", children: [
      /* @__PURE__ */ jsx("div", { className: "k-candidate-scroll", children: candidates.length ? candidates.map((candidate, index) => /* @__PURE__ */ jsx("span", { className: `k-candidate ${index === pickedIndex ? "k-picked" : ""}`, children: candidate }, `${candidate}-${index}`)) : idlePrompt && /* @__PURE__ */ jsx("span", { className: "k-idle-prompt", children: idlePrompt }) }),
      candidates.length > 0 && /* @__PURE__ */ jsx("span", { className: "k-candidate-expand", children: /* @__PURE__ */ jsx(Icon, { name: "chevron", size: 17 }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "k-key-area", children: rows.map((row, rowIndex) => /* @__PURE__ */ jsx("div", { className: `k-key-row k-row-${rowIndex}`, children: row.map((value) => /* @__PURE__ */ jsx(Key, { value, pressed, aiState, width: layout === "qwerty" ? QWERTY_W[value] : void 0, layout }, value)) }, rowIndex)) }),
    children,
    /* @__PURE__ */ jsxs("div", { className: "k-system-bar", children: [
      /* @__PURE__ */ jsx(Icon, { name: "globe", size: 30 }),
      /* @__PURE__ */ jsx(Icon, { name: "mic", size: 30 })
    ] })
  ] });
}
function PromptPicker({ items = [], selected, className = "" }) {
  return /* @__PURE__ */ jsx("div", { className: `k-prompt-picker ${className}`, children: /* @__PURE__ */ jsx("div", { className: "k-prompt-scroll", children: items.map((item, index) => /* @__PURE__ */ jsx("span", { className: `k-prompt-item ${item === selected ? "k-selected" : ""}`, children: item }, `${item}-${index}`)) }) });
}
const BEAT = 0.25;
const TYPE_AT = 0.6, AI_AT = 3.4, SWEEP_AT = 4.2, DONE_AT = 5.2;
const INITIAL = {
  你: "ㄋ",
  每: "ㄇ",
  次: "ㄘ",
  都: "ㄉ",
  說: "ㄕ",
  快: "ㄎ",
  到: "ㄉ",
  了: "ㄌ",
  結: "ㄐ",
  果: "ㄍ",
  根: "ㄍ",
  本: "ㄅ",
  還: "ㄏ",
  沒: "ㄇ",
  出: "ㄔ",
  門: "ㄇ",
  天: "ㄊ",
  氣: "ㄑ",
  變: "ㄅ",
  冷: "ㄌ",
  突: "ㄊ",
  然: "ㄖ",
  有: "ㄧ",
  點: "ㄉ",
  想: "ㄒ",
  早: "ㄗ",
  安: "ㄢ",
  祝: "ㄓ",
  今: "ㄐ",
  順: "ㄕ",
  利: "ㄌ",
  其: "ㄑ",
  實: "ㄕ",
  我: "ㄨ",
  覺: "ㄐ",
  得: "ㄉ"
};
const FILMS = {
  zh: {
    layout: "zhuyin",
    placeholder: "輸入訊息",
    label: "Keyly 注音鍵盤示範：打字後按 AI 鍵，把一句話改寫成不同風格",
    picker: ["吐槽一下", "吟詩作對", "長輩圖祝福語", "校對錯字"],
    hook: { duration: 4, chat: "小安", history: [{ from: "them", text: "欸你昨天怎麼先走了" }, { from: "me", text: "有點累就先回家了" }, { from: "them", text: "是不是因為阿哲講的那些話" }, { from: "me", text: "也還好啦…" }, { from: "them", text: "你可以跟我說沒關係" }], them: "欸 你到底怎麼想？", text: "其實我覺得", caption: "打了又刪，刪了又打" },
    scenes: [
      {
        duration: 9,
        accent: "#FF6B4A",
        chat: "阿哲",
        history: [{ from: "me", text: "七點餐廳門口集合喔" }, { from: "them", text: "好 準時到" }, { from: "me", text: "到哪了？" }, { from: "them", text: "出門了出門了" }, { from: "me", text: "我們都已經點完菜了" }],
        them: "我快到了！",
        input: "你每次都說快到了結果根本還沒出門",
        output: "你每次都說「快到了」，乾脆叫「預約遲到」好了，根本還沒出門是在演哪齣？",
        template: "吐槽一下",
        caption: "朋友又遲到了"
      },
      {
        duration: 9,
        accent: "#7C6CF2",
        chat: "小雨",
        history: [{ from: "them", text: "下班了嗎？" }, { from: "me", text: "剛到家" }, { from: "them", text: "我也是，今天累爆" }, { from: "me", text: "辛苦了，有吃飯嗎" }, { from: "them", text: "有啦，吃了一碗熱湯麵" }],
        them: "今天好冷喔",
        input: "天氣變冷了，突然有點想你",
        output: "風生微冽覺微寒，\n忽有相思起寸端。\n滿目關情何處寄，\n心隨清念共闌珊。",
        template: "吟詩作對",
        caption: "有點想你，說不出口"
      },
      {
        duration: 8,
        accent: "#F0A020",
        chat: "相親相愛一家人",
        history: [{ from: "them", text: "中秋節大家都會回來吧？", avatar: "媽" }, { from: "me", text: "會！我負責買柚子" }, { from: "them", text: "好 那我來準備烤肉", avatar: "爸" }, { from: "them", text: "天氣預報說那天不會下雨 ☀️", avatar: "姊" }, { from: "them", text: "今天降溫，出門記得多穿一件", avatar: "媽" }],
        them: "🌅 早安",
        themAvatar: "爸",
        input: "早安，祝你今天順利",
        output: "🌸 早安！美好清晨從心開始！送上一份最誠摯的祝願，願您今天步步順暢、事事順心如意☀️ 人生處處是風景，平安喜樂福常在！💖🙏🍀",
        template: "長輩圖祝福語",
        caption: "長輩群組的早安"
      }
    ]
  },
  en: {
    layout: "qwerty",
    placeholder: "iMessage",
    label: "Keyly keyboard demo: type a message, tap the AI key, and it gets rewritten in a new tone",
    picker: ["Make It Funny", "Soften the Tone", "Hype It Up", "Fix Grammar & Typos"],
    hook: { duration: 4, chat: "Messages", history: [{ from: "them", text: "about what we talked about last night" }, { from: "me", text: "yeah…" }], them: "so… what do you think?", text: "honestly i think", caption: "Type. Delete. Repeat." },
    scenes: [
      {
        duration: 9,
        accent: "#FF6B4A",
        chat: "Jake",
        history: [{ from: "me", text: "where are you?" }, { from: "them", text: "leaving now" }, { from: "me", text: "we're already at the table" }],
        them: "almost there!!",
        input: "you said 5 min away 40 minutes ago and you're still at home",
        output: "Five minutes away, you said? That was FORTY minutes ago, and I'm pretty sure you're still in your pajamas.",
        template: "Make It Funny",
        caption: "Late again?"
      },
      {
        duration: 12,
        accent: "#7C6CF2",
        chat: "Dana (Manager)",
        history: [{ from: "them", text: "Morning! Quick update on the client deck" }, { from: "me", text: "Sure, what's up?" }],
        them: "Heads up, deadline moved again. Friday now, and can you redo the deck?",
        input: "this is the third time you changed the deadline and I'm not redoing everything again",
        output: "I understand that deadlines can sometimes shift. However, this is the third time the deadline has been changed, and I'm unable to redo the work if it changes again. Could we please aim to keep the current deadline?",
        template: "Soften the Tone",
        caption: "Boss moved it again?"
      },
      {
        duration: 8,
        accent: "#F0A020",
        chat: "Maya",
        history: [{ from: "them", text: "guess who just got off the phone with HR 👀" }, { from: "me", text: "WAIT" }],
        them: "I GOT THE JOB 😭😭",
        input: "congrats on the new job",
        output: "Woohoo! Huge congratulations on landing that new job! That's absolutely fantastic news!",
        template: "Hype It Up",
        caption: "Big news?"
      }
    ]
  }
};
function typing(local, text, layout, from = TYPE_AT) {
  const cs = [...text];
  const step = Math.min(BEAT / 2, 2.6 / cs.length);
  const n = Math.max(0, Math.min(cs.length, Math.floor((local - from) / step) + 1));
  const typingNow = local >= from && local < from + cs.length * step;
  const ch = cs[n - 1] ?? "";
  const key = layout === "qwerty" ? /[a-z;]/i.test(ch) ? ch.toLowerCase() : null : INITIAL[ch] ?? null;
  return [local < from ? 0 : n, typingNow ? key : null];
}
function frameAt(film, t) {
  const HOOK = film.hook;
  if (t < HOOK.duration) {
    const len = HOOK.text.length;
    const [n, key] = t < 1.8 ? typing(t, HOOK.text, film.layout, 0.3) : [Math.max(0, len - Math.floor((t - 1.8) / Math.min(0.15, 0.8 / len))), t < 2.6 ? "⌫" : null];
    return { accent: "#5B8CFF", chat: HOOK.chat, messages: [...HOOK.history, { from: "them", text: HOOK.them }], draft: HOOK.text.slice(0, n), key, phase: 0, template: "", caption: HOOK.caption, sweep: 0, label: "" };
  }
  let local = t - HOOK.duration;
  for (const s of film.scenes) {
    if (local < s.duration) {
      const [n, key] = typing(local, s.input, film.layout);
      const phase = local < AI_AT ? 0 : local < SWEEP_AT ? 1 : local < DONE_AT ? 2 : 3;
      const p = Math.min(1, Math.max(0, (local - SWEEP_AT) / (DONE_AT - SWEEP_AT)));
      return {
        accent: s.accent,
        chat: s.chat,
        messages: [...s.history, { from: "them", text: s.them, avatar: s.themAvatar }],
        draft: phase >= 2 ? s.output : [...s.input].slice(0, n).join(""),
        key,
        phase,
        template: s.template,
        caption: s.caption,
        sweep: p > 0 && p < 1 ? p : 0,
        label: s.template
      };
    }
    local -= s.duration;
  }
  return frameAt(film, 0);
}
const loopOf = (film) => film.hook.duration + film.scenes.reduce((sum, s) => sum + s.duration, 0);
const stillOf = (film) => film.hook.duration + DONE_AT + 1;
function HeroFilm({ locale = "zh" }) {
  const film = FILMS[locale];
  const LOOP = loopOf(film);
  const ref = useRef(null);
  const [t, setT] = useState(stillOf(film));
  useEffect(() => {
    var _a;
    const el = ref.current;
    if (!el || ((_a = window.matchMedia) == null ? void 0 : _a.call(window, "(prefers-reduced-motion: reduce)").matches)) return;
    let req = 0, start = null, offset = 0, last = -1;
    const loop = (now) => {
      start ?? (start = now - offset * 1e3);
      const next = (now - start) / 1e3 % LOOP;
      offset = next;
      const q = Math.floor(next * 30) / 30;
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
  }, [LOOP]);
  const f = frameAt(film, t);
  return /* @__PURE__ */ jsxs("div", { ref, className: "flex flex-col items-center", style: { ["--accent"]: f.accent }, children: [
    /* @__PURE__ */ jsxs("div", { className: "relative [--s:0.56] sm:[--s:0.62] lg:[--s:0.75]", style: { width: "calc(456px * var(--s))", height: "calc(972px * var(--s))" }, role: "img", "aria-label": film.label, children: [
      /* @__PURE__ */ jsx("div", { className: "origin-top-left", style: { transform: "scale(var(--s))" }, "aria-hidden": "true", children: /* @__PURE__ */ jsxs(Phone, { className: locale === "zh" ? "k-theme-line" : "", children: [
        /* @__PURE__ */ jsx(ChatScreen, { title: f.chat, messages: f.messages, draft: f.draft, placeholder: film.placeholder }),
        /* @__PURE__ */ jsx(Keyboard, { pressed: f.key, candidates: [], idlePrompt: f.template, aiState: f.phase >= 1 ? "pressed" : "idle", layout: film.layout, children: f.phase === 1 && /* @__PURE__ */ jsx(PromptPicker, { items: film.picker, selected: f.template }) })
      ] }) }),
      f.sweep > 0 && /* @__PURE__ */ jsx(
        "div",
        {
          className: "pointer-events-none absolute inset-[3%] rounded-[2rem] mix-blend-multiply",
          style: { background: `linear-gradient(100deg, transparent ${f.sweep * 140 - 30}%, color-mix(in srgb, var(--accent) 30%, transparent) ${f.sweep * 140 - 10}%, transparent ${f.sweep * 140}%)` }
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-5 flex min-h-[2.5rem] items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold shadow-sm ring-1 ring-black/5", "aria-hidden": "true", children: [
      f.label && /* @__PURE__ */ jsxs("span", { style: { color: "var(--accent)" }, children: [
        "✦ ",
        f.label
      ] }),
      /* @__PURE__ */ jsx("span", { className: "text-text-primary", children: f.caption })
    ] })
  ] });
}
function CustomPromptsFilm({ locale = "zh" }) {
  const ref = useRef(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReduceMotion(mediaQuery.matches);
      setIsPlaying(!mediaQuery.matches);
      const listener = (e) => {
        setReduceMotion(e.matches);
        setIsPlaying(!e.matches);
      };
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, []);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (isPlaying) {
      const playPromise = video.play();
      if (playPromise !== void 0) {
        playPromise.catch(() => {
          setIsPlaying(false);
        });
      }
    } else {
      video.pause();
    }
  }, [isPlaying]);
  const basename = locale === "en" ? "custom-en" : "custom-zh";
  const isEn = locale === "en";
  const playLabel = isEn ? "Play video" : "播放影片";
  const pauseLabel = isEn ? "Pause video" : "暫停影片";
  return /* @__PURE__ */ jsx("div", { className: "w-full mx-auto overflow-hidden sm:rounded-[2rem] shadow-2xl sm:ring-1 ring-black/10 bg-[#F2F2F7]", children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: "relative aspect-video w-full group cursor-pointer",
      onClick: () => setIsPlaying(!isPlaying),
      children: [
        /* @__PURE__ */ jsxs(
          "video",
          {
            ref,
            className: "absolute top-0 left-0 w-full h-full object-cover",
            autoPlay: !reduceMotion,
            muted: true,
            loop: true,
            playsInline: true,
            preload: "metadata",
            poster: `/videos/${basename}.jpg`,
            "aria-label": isEn ? "Keyly Custom Prompt Demo" : "Keyly 自訂指令示範",
            children: [
              /* @__PURE__ */ jsx("source", { src: `/videos/${basename}.webm`, type: "video/webm" }),
              /* @__PURE__ */ jsx("source", { src: `/videos/${basename}.mp4`, type: "video/mp4" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            className: "absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-white py-1.5 pl-1.5 pr-4 text-sm font-extrabold text-text-primary shadow-[0_10px_30px_rgba(15,23,42,.18)] ring-4 ring-transparent transition-shadow duration-200 hover:shadow-[0_12px_34px_rgba(15,23,42,.26)] focus-visible:outline-none focus-visible:ring-brand-cyan/40 cursor-pointer",
            "aria-label": isPlaying ? pauseLabel : playLabel,
            onClick: (e) => {
              e.stopPropagation();
              setIsPlaying(!isPlaying);
            },
            children: [
              /* @__PURE__ */ jsx("span", { className: "grid h-8 w-8 place-items-center rounded-full bg-brand-cyan text-white", children: isPlaying ? /* @__PURE__ */ jsx(Pause, { className: "h-4 w-4", fill: "currentColor" }) : /* @__PURE__ */ jsx(Play, { className: "ml-0.5 h-4 w-4", fill: "currentColor" }) }),
              isPlaying ? isEn ? "Pause" : "暫停" : isEn ? "Play" : "播放"
            ]
          }
        )
      ]
    }
  ) });
}
const DOWNLOAD_URL = "https://apps.apple.com/app/apple-store/id6759639348?pt=686508&ct=website_landing&mt=8";
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
  return /* @__PURE__ */ jsxs("div", { className: `flex flex-col w-full ${centered ? "items-center" : "items-center lg:items-start"} space-y-3`, children: [
    /* @__PURE__ */ jsxs("a", { href: DOWNLOAD_URL, target: "_blank", rel: "noopener", onClick: () => trackDownload$1(centered ? "cta_section" : "hero"), className: "w-auto bg-bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-bg-secondary transition-all duration-200 transform hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none inline-flex items-center justify-center space-x-2 shadow-lg shadow-bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2", children: [
      /* @__PURE__ */ jsx(Smartphone, { className: "w-5 h-5" }),
      /* @__PURE__ */ jsx("span", { children: "免費下載" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center space-x-1.5 text-xs text-text-secondary/90 pt-0.5", children: [
      /* @__PURE__ */ jsx("div", { className: "flex text-amber-400", "aria-label": "5 星好評", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx(Star, { className: "w-3.5 h-3.5 fill-amber-400 text-amber-400" }, i)) }),
      /* @__PURE__ */ jsx("span", { className: "font-semibold text-text-primary", children: "5.0" }),
      /* @__PURE__ */ jsx("span", { className: "text-text-secondary/40", children: "·" }),
      /* @__PURE__ */ jsx("span", { children: "App Store 滿分好評" })
    ] })
  ] });
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
    const sections = ["custom-prompts", "features", "faq", "download"];
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
      /* @__PURE__ */ jsx(CustomPrompts$1, {}),
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
        /* @__PURE__ */ jsx("a", { href: "/guides/", onClick: () => trackLinkClick$1("home_nav_guides", "/guides/"), className: "text-text-secondary hover:text-brand-cyan transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan rounded-md px-1", children: "實用指南" }),
        /* @__PURE__ */ jsx("a", { href: "#faq", className: "text-text-secondary hover:text-brand-cyan transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan rounded-md px-1", children: "常見問題" }),
        /* @__PURE__ */ jsxs("a", { href: DOWNLOAD_URL, target: "_blank", rel: "noopener", onClick: () => trackDownload$1("navbar"), className: "bg-bg-primary text-white px-5 py-2 rounded-full font-medium hover:bg-bg-secondary transition-colors duration-200 flex items-center space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2", children: [
          /* @__PURE__ */ jsx(Download, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsx("span", { children: "免費下載" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "md:hidden flex items-center", children: /* @__PURE__ */ jsx("button", { onClick: () => setIsOpen(!isOpen), className: "text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan rounded-md p-1", "aria-label": "切換選單", children: isOpen ? /* @__PURE__ */ jsx(X, { className: "w-6 h-6" }) : /* @__PURE__ */ jsx(Menu, { className: "w-6 h-6" }) }) })
    ] }) }),
    isOpen && /* @__PURE__ */ jsxs("div", { className: "md:hidden mt-2 max-w-6xl mx-auto bg-white/95 backdrop-blur-xl border border-metal-gray/30 rounded-2xl px-4 pt-2 pb-4 space-y-2 shadow-lg", children: [
      /* @__PURE__ */ jsx("a", { href: "#features", className: "block px-3 py-2 text-text-secondary hover:bg-metal-white/50 rounded-md transition-colors duration-200", onClick: () => setIsOpen(false), children: "功能特色" }),
      /* @__PURE__ */ jsx("a", { href: "/guides/", className: "block px-3 py-2 text-text-secondary hover:bg-metal-white/50 rounded-md transition-colors duration-200", onClick: () => {
        setIsOpen(false);
        trackLinkClick$1("home_nav_guides_mobile", "/guides/");
      }, children: "實用指南" }),
      /* @__PURE__ */ jsx("a", { href: "#faq", className: "block px-3 py-2 text-text-secondary hover:bg-metal-white/50 rounded-md transition-colors duration-200", onClick: () => setIsOpen(false), children: "常見問題" }),
      /* @__PURE__ */ jsx("a", { href: DOWNLOAD_URL, target: "_blank", rel: "noopener", className: "block px-3 py-2 text-brand-cyan font-medium hover:bg-metal-white/50 rounded-md transition-colors duration-200", onClick: () => {
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
          /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold tracking-[0.08em] text-text-secondary/80 mb-4", children: "台灣團隊打造 · iOS 注音輸入體驗" }),
          /* @__PURE__ */ jsxs("h1", { className: "font-black text-text-primary leading-tight mb-6", children: [
            /* @__PURE__ */ jsx("span", { className: "block text-2xl lg:text-3xl xl:text-4xl mb-2", children: "iPhone 注音鍵盤" }),
            /* @__PURE__ */ jsxs("span", { className: "block text-5xl lg:text-5xl xl:text-6xl", children: [
              "指尖上的 AI 智慧，",
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-purple", children: "文字轉化一鍵完成" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-base lg:text-lg text-text-secondary/90 leading-relaxed max-w-xl mx-auto lg:mx-0", children: "為 iPhone 與 iPad 的繁體中文使用者打造的注音輸入法。核心是注音輸入與選字，離線就能使用。AI 分兩種：雲端 AI 的潤飾、翻譯與改寫需要網路；在支援 Apple 裝置端 AI 框架的機型上，另有可離線使用的基礎修正。" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8", children: [
            /* @__PURE__ */ jsx(DownloadCTA$1, {}),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "/guides/iphone-zhuyin-keyboard/",
                onClick: () => trackLinkClick$1("home_hero_zhuyin_comparison", "/guides/iphone-zhuyin-keyboard/"),
                className: "inline-flex items-center mt-5 text-sm font-medium text-text-secondary hover:text-brand-cyan underline underline-offset-4 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan rounded-md",
                children: "還在比較？查看 iPhone 注音鍵盤推薦與功能比較"
              }
            )
          ] })
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
          /* @__PURE__ */ jsx(HeroFilm, {})
        ]
      }
    ) })
  ] }) }) });
}
function CustomPrompts$1() {
  return /* @__PURE__ */ jsx("section", { id: "custom-prompts", className: "py-24 bg-white relative overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-1.5 px-3 py-1 mb-5 rounded-full bg-brand-cyan/10 text-brand-cyan text-sm font-semibold", children: [
        /* @__PURE__ */ jsx(Sparkles, { className: "w-3.5 h-3.5" }),
        /* @__PURE__ */ jsx("span", { children: "自訂 AI 指令" })
      ] }),
      /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-4xl font-bold tracking-tight leading-snug text-text-primary", style: { textWrap: "balance" }, children: [
        "每天要回的那幾種訊息，",
        /* @__PURE__ */ jsx("br", {}),
        "按一下就好。"
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "mt-4 text-base md:text-lg text-text-secondary leading-relaxed max-w-3xl mx-auto", children: [
        "用一句話寫下你的 AI 指令，存起來，在任何 App 的鍵盤上一鍵改好。",
        /* @__PURE__ */ jsx("br", { className: "hidden md:block" }),
        "不用再複製到其他 AI App、改完又貼回來。"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("ul", { className: "mt-8 md:mt-10 grid md:grid-cols-3 gap-2 md:gap-4 max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxs("li", { className: "bg-[#F4F7FA] rounded-xl md:rounded-2xl px-3 py-1.5 md:p-5 border border-metal-gray/20 flex items-center gap-2.5 md:gap-3.5", children: [
        /* @__PURE__ */ jsx("div", { className: "w-7 h-7 md:w-10 md:h-10 bg-white rounded-lg md:rounded-xl shadow-sm flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(Keyboard$1, { className: "w-4 h-4 md:w-5 md:h-5 text-brand-cyan" }) }),
        /* @__PURE__ */ jsx("span", { className: "text-[15px] md:text-base font-semibold text-text-primary leading-snug lg:whitespace-nowrap", children: "寫一次，天天用" })
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "bg-[#F4F7FA] rounded-xl md:rounded-2xl px-3 py-1.5 md:p-5 border border-metal-gray/20 flex items-center gap-2.5 md:gap-3.5", children: [
        /* @__PURE__ */ jsx("div", { className: "w-7 h-7 md:w-10 md:h-10 bg-white rounded-lg md:rounded-xl shadow-sm flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(Repeat, { className: "w-4 h-4 md:w-5 md:h-5 text-brand-purple" }) }),
        /* @__PURE__ */ jsx("span", { className: "text-[15px] md:text-base font-semibold text-text-primary leading-snug lg:whitespace-nowrap", children: "不用跳 App、不用複製貼上" })
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "bg-[#F4F7FA] rounded-xl md:rounded-2xl px-3 py-1.5 md:p-5 border border-metal-gray/20 flex items-center gap-2.5 md:gap-3.5", children: [
        /* @__PURE__ */ jsx("div", { className: "w-7 h-7 md:w-10 md:h-10 bg-white rounded-lg md:rounded-xl shadow-sm flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(Wand2, { className: "w-4 h-4 md:w-5 md:h-5 text-accent-mint" }) }),
        /* @__PURE__ */ jsx("span", { className: "text-[15px] md:text-base font-semibold text-text-primary leading-snug lg:whitespace-nowrap", children: "改出來就是你要的格式和口吻" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-14 -mx-4 sm:mx-0", children: /* @__PURE__ */ jsx(CustomPromptsFilm, { locale: "zh" }) }),
    /* @__PURE__ */ jsx("div", { className: "mt-8 text-center", children: /* @__PURE__ */ jsxs(
      "a",
      {
        href: "/guides/iphone-custom-ai-prompt/",
        onClick: () => trackLinkClick$1("custom_prompts", "/guides/iphone-custom-ai-prompt/"),
        className: "inline-flex items-center gap-1.5 font-semibold text-brand-cyan hover:gap-2.5 transition-all",
        children: [
          "看怎麼寫自己的指令",
          /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4" })
        ]
      }
    ) })
  ] }) });
}
function Features$1() {
  const features = [
    {
      icon: /* @__PURE__ */ jsx(Wand2, { className: "w-6 h-6 text-brand-cyan" }),
      title: "專屬你的文字濾鏡",
      description: "情書、隨手抒發或商業報告，先把草稿打出來，再套用你設定的 AI 濾鏡調整語氣。這一層是選用的：離線時鍵盤照常運作，連上網路才會使用雲端模型。"
    },
    {
      icon: /* @__PURE__ */ jsx(Feather, { className: "w-6 h-6 text-brand-purple" }),
      title: "為打字手感調校的注音引擎",
      description: "我們自行開發注音引擎，並針對第三方鍵盤的反應速度調校觸控邊界與震動回饋。目標是讓連續輸入不卡頓，尤其在盲打時。"
    },
    {
      icon: /* @__PURE__ */ jsx(Command, { className: "w-6 h-6 text-accent-mint" }),
      title: "隨打即用的智慧快捷",
      description: "除了挑錯字，你可以自訂專屬的「AI 指令」：翻譯外文、精簡長段落，或把一句話改寫成得體的說法，單手一滑就能叫出來。"
    },
    {
      icon: /* @__PURE__ */ jsx(ShieldCheck, { className: "w-6 h-6 text-brand-cyan" }),
      title: "高規格隱私防線",
      description: "您的對話隱私是我們的核心使命。Keyly 採用「最小化與必要性」原則，僅在提供服務所需範圍內處理資料，原則上不作不必要的長期保存；若因法令義務、安全防護或交易驗證需要，才會在必要期間內保留部分資料。我們嚴格遵守 Apple 隱私規範，不監控、不側錄，亦不將您的私人數據用於模型訓練。"
    }
  ];
  return /* @__PURE__ */ jsx("section", { id: "features", className: "py-24 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsx("div", { className: "text-center max-w-3xl mx-auto mb-16", children: /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-text-primary", children: "Keyly 這套 iPhone 注音輸入法怎麼運作？" }) }),
    /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-8", children: features.map((feature, index) => /* @__PURE__ */ jsxs(
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
      answer: "可以。Keyly 的核心就是注音輸入本身，AI 是額外那一層。即使離線或完全不使用 AI，注音輸入、選字與自訂詞都照常運作，不需要開啟任何連網功能。"
    },
    {
      question: "Keyly 鍵盤支援哪些語言？",
      answer: "主要是繁體中文（注音），並支援中英混合輸入。翻譯與潤飾則由 AI 功能處理，需要連線。（註：AI 生成內容僅供參考，請於正式場合自行核實。）"
    },
    {
      question: "為什麼安裝時需要開啟「允許完全取用」權限？",
      answer: /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsx("p", { children: "這是開啟 AI 魔法的技術門票！受限於 iOS 安全機制，第三方鍵盤必須取得此權限，才能透過網路與雲端 AI 引擎連線以提供潤飾服務。" }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "如果不開啟也沒關係：" }),
          "注音輸入引擎不需要這個權限，選字、自訂詞與日常打字都能照常使用。另外，在支援 Apple 裝置端 AI 框架的機型上，基礎的裝置端 AI 修正也不需要連網，該功能處理的內容留在裝置上。"
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "若您選擇開啟：" }),
          "我們採取最小化資料原則，僅在您主動觸發 AI 功能時處理必要內容。資料以即時處理為主，並在技術與營運可行範圍內縮短保存時間；如涉及法令遵循、安全防護或交易驗證需求，可能於必要期間保留部分紀錄。Keyly 嚴格遵守 Apple 規範，不監控、不側錄您的私人對話。"
        ] }),
        /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("a", { href: "/guides/full-access/", className: "text-brand-cyan underline underline-offset-4 hover:text-accent-mint", children: "延伸閱讀：「允許完全取用」到底開放了什麼？安全嗎？" }) })
      ] })
    },
    {
      question: "你們的雲端 AI 是用哪家的模型？安全嗎？",
      answer: "雲端 AI 使用 Google、OpenAI 與 Anthropic 的模型服務。Keyly 限制資料僅用於當次即時請求，不會把你的個人對話用於模型訓練，任務完成後即從伺服器緩存移除。"
    },
    {
      question: "如果沒有網路，還可以使用 AI 潤飾嗎？",
      answer: "要看是哪一種 AI。雲端 AI 的潤飾、翻譯與改寫需要網路，也需要開啟「允許完全取用」。至於裝置端 AI，只要機型支援 Apple 的裝置端 AI 框架（例如 iPhone 15 Pro、M 系列晶片或更新機型），基礎修正可以在離線狀態下使用，處理內容留在裝置上。注音輸入本身則不受網路影響。"
    },
    {
      question: "打字速度很快時，會不會容易卡頓或閃退？",
      answer: "Keyly 由 iOS 工程團隊開發，並在多種機型上測試過連續高速輸入。震動回饋也依原生鍵盤的手感調校。若你遇到卡頓或閃退，請來信告訴我們實際機型與情境。"
    },
    {
      question: "我自己設定的專屬 AI 指令會如何儲存？",
      answer: "您的專屬指令由您掌控。目前所有自訂指令均透過加密技術儲存於設備本地端。我們也正籌劃具備端到端加密的雲端同步服務，讓您未來更換設備也能無縫接軌。"
    },
    {
      question: "一般用戶（免費下載）跟 Keyly Pro 訂閱用戶有什麼差別？",
      answer: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "一般用戶（免費下載）：" }),
          /* @__PURE__ */ jsx("br", {}),
          "免費下載即可使用注音引擎、完整標準指令庫，並在新登入帳號時一次性獲得 30 次雲端 AI 魔法額度。"
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Keyly Pro 訂閱（月訂 NT$150，年訂 NT$1,190，年訂可免費試用 3 天）：" }),
          /* @__PURE__ */ jsx("br", {}),
          "專為高頻率專業人士打造。徹底解鎖無限次雲端 AI 運算，並獨享「AI 指令管理員」，支援自定義指令的新增、編輯與收藏，讓 AI 貼近你的使用習慣。"
        ] })
      ] })
    }
  ];
  const getFaqAnswerId = (index) => `faq-answer-${index}`;
  return /* @__PURE__ */ jsxs("section", { id: "faq", className: "py-24 bg-bg-primary text-white overflow-hidden relative", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-[800px] h-[800px] bg-brand-purple/15 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none transform-gpu will-change-transform" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10", children: [
      /* @__PURE__ */ jsx("div", { className: "text-center mb-16", children: /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-4xl font-bold mb-6", children: [
        "常見問題 ",
        /* @__PURE__ */ jsx("span", { className: "text-accent-mint", children: "Q&A" })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: faqs.map((faq, index) => /* @__PURE__ */ jsxs(
        "details",
        {
          className: "group bg-bg-secondary rounded-2xl border border-white/10 overflow-hidden",
          onToggle: (event) => {
            if (event.currentTarget.open) trackFaqClick$1(faq.question);
          },
          children: [
            /* @__PURE__ */ jsxs("summary", { className: "w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer list-none [&::-webkit-details-marker]:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/70 active:bg-white/5 transition-colors duration-200", children: [
              /* @__PURE__ */ jsx("span", { className: "text-lg font-medium text-metal-white pr-8", children: faq.question }),
              /* @__PURE__ */ jsx(
                ChevronDown,
                {
                  "aria-hidden": "true",
                  className: "w-5 h-5 text-brand-cyan shrink-0 transition-transform duration-300 motion-reduce:transition-none group-open:rotate-180"
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { id: getFaqAnswerId(index), className: "px-6 pb-6 text-metal-gray leading-relaxed", children: faq.answer })
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
      /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold text-text-primary mb-6", children: "試試這套 iPhone 注音輸入法" }),
      /* @__PURE__ */ jsx("p", { className: "text-xl text-text-secondary mb-10", children: "先當一套好打的注音鍵盤，需要的時候再讓 AI 接手潤飾與翻譯。免費下載，離線也能用。" }),
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
        /* @__PURE__ */ jsx("a", { href: "/guides/", onClick: () => trackLinkClick$1("guides_hub", "/guides/"), className: "hover:text-brand-cyan transition-colors", children: "實用指南" }),
        /* @__PURE__ */ jsx("span", { className: "text-metal-gray/50", children: "|" }),
        /* @__PURE__ */ jsx("a", { href: "/privacy/", onClick: () => trackLinkClick$1("privacy_policy", "/privacy/"), className: "hover:text-brand-cyan transition-colors", children: "隱私權政策" }),
        /* @__PURE__ */ jsx("span", { className: "text-metal-gray/50", children: "|" }),
        /* @__PURE__ */ jsx("a", { href: "/terms/", onClick: () => trackLinkClick$1("terms_of_service", "/terms/"), className: "hover:text-brand-cyan transition-colors", children: "服務條款" }),
        /* @__PURE__ */ jsx("span", { className: "text-metal-gray/50", children: "|" }),
        /* @__PURE__ */ jsx("a", { href: "/subscriptions/", onClick: () => trackLinkClick$1("subscription_terms", "/subscriptions/"), className: "hover:text-brand-cyan transition-colors", children: "自動續訂說明" }),
        /* @__PURE__ */ jsx("span", { className: "text-metal-gray/50", children: "|" }),
        /* @__PURE__ */ jsx("a", { href: "mailto:support@keylyapp.com", onClick: () => trackLinkClick$1("support_email", "mailto:support@keylyapp.com"), className: "hover:text-brand-cyan transition-colors", children: "技術支援" }),
        /* @__PURE__ */ jsx("span", { className: "text-metal-gray/50", children: "|" }),
        /* @__PURE__ */ jsx("a", { href: "/en/", hrefLang: "en", onClick: () => trackLinkClick$1("lang_switch_en", "/en/"), className: "hover:text-brand-cyan transition-colors", children: "English" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-8 text-center text-sm text-metal-gray", children: "© 2026 Keyly 由台灣團隊專為高效溝通而生。" })
  ] }) });
}
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
  return /* @__PURE__ */ jsxs("div", { className: `flex flex-col w-full ${centered ? "items-center" : "items-center lg:items-start"} space-y-3`, children: [
    /* @__PURE__ */ jsxs("a", { href: DOWNLOAD_URL, target: "_blank", rel: "noopener", onClick: () => trackDownload(centered ? "cta_section_en" : "hero_en"), className: "w-auto bg-bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-bg-secondary transition-all duration-200 transform hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none inline-flex items-center justify-center space-x-2 shadow-lg shadow-bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2", children: [
      /* @__PURE__ */ jsx(Smartphone, { className: "w-5 h-5" }),
      /* @__PURE__ */ jsx("span", { children: "Download Now" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center space-x-1.5 text-xs text-text-secondary/90 pt-0.5", children: [
      /* @__PURE__ */ jsx("div", { className: "flex text-amber-400", "aria-label": "5 star rating", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx(Star, { className: "w-3.5 h-3.5 fill-amber-400 text-amber-400" }, i)) }),
      /* @__PURE__ */ jsx("span", { className: "font-semibold text-text-primary", children: "5.0" }),
      /* @__PURE__ */ jsx("span", { className: "text-text-secondary/40", children: "·" }),
      /* @__PURE__ */ jsx("span", { children: "App Store Rating" })
    ] })
  ] });
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
    const sections = ["custom-prompts", "features", "faq", "download"];
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
      /* @__PURE__ */ jsx(CustomPrompts, {}),
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
        /* @__PURE__ */ jsxs("a", { href: DOWNLOAD_URL, target: "_blank", rel: "noopener", onClick: () => trackDownload("navbar_en"), className: "bg-bg-primary text-white px-5 py-2 rounded-full font-medium hover:bg-bg-secondary transition-colors duration-200 flex items-center space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2", children: [
          /* @__PURE__ */ jsx(Download, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsx("span", { children: "Download Now" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "md:hidden flex items-center", children: /* @__PURE__ */ jsx("button", { onClick: () => setIsOpen(!isOpen), className: "text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan rounded-md p-1", "aria-label": "Toggle menu", children: isOpen ? /* @__PURE__ */ jsx(X, { className: "w-6 h-6" }) : /* @__PURE__ */ jsx(Menu, { className: "w-6 h-6" }) }) })
    ] }) }),
    isOpen && /* @__PURE__ */ jsxs("div", { className: "md:hidden mt-2 max-w-6xl mx-auto bg-white/95 backdrop-blur-xl border border-metal-gray/30 rounded-2xl px-4 pt-2 pb-4 space-y-2 shadow-lg", children: [
      /* @__PURE__ */ jsx("a", { href: "#features", className: "block px-3 py-2 text-text-secondary hover:bg-metal-white/50 rounded-md transition-colors duration-200", onClick: () => setIsOpen(false), children: "Features" }),
      /* @__PURE__ */ jsx("a", { href: "#faq", className: "block px-3 py-2 text-text-secondary hover:bg-metal-white/50 rounded-md transition-colors duration-200", onClick: () => setIsOpen(false), children: "FAQ" }),
      /* @__PURE__ */ jsx("a", { href: DOWNLOAD_URL, target: "_blank", rel: "noopener", className: "block px-3 py-2 text-brand-cyan font-medium hover:bg-metal-white/50 rounded-md transition-colors duration-200", onClick: () => {
        setIsOpen(false);
        trackDownload("navbar_mobile_en");
      }, children: "Download Now" })
    ] })
  ] });
}
function Hero() {
  return /* @__PURE__ */ jsx("section", { className: "pt-32 pb-20 lg:pt-44 lg:pb-32 overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative", children: /* @__PURE__ */ jsxs("div", { className: "lg:grid lg:grid-cols-12 lg:gap-16 items-center", children: [
    /* @__PURE__ */ jsx("div", { className: "lg:col-span-6 text-center lg:text-left mb-16 lg:mb-0 z-10", children: /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, children: [
      /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold tracking-[0.08em] text-text-secondary/80 mb-4", children: "AI keyboard for iPhone · also supports Zhuyin" }),
      /* @__PURE__ */ jsxs("h1", { className: "text-4xl lg:text-5xl xl:text-6xl font-black text-text-primary leading-tight mb-6", children: [
        "Rewrite any message,",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-purple", children: "right from your keyboard" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-text-secondary/90 leading-relaxed max-w-xl mx-auto lg:mx-0", children: "Type a rough draft, tap a prompt, and Keyly rewrites it in place. Fix typos, soften the tone, or translate without leaving the chat." }),
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
          /* @__PURE__ */ jsx(HeroFilm, { locale: "en" })
        ]
      }
    ) })
  ] }) }) });
}
function CustomPrompts() {
  return /* @__PURE__ */ jsx("section", { id: "custom-prompts", className: "py-24 bg-white relative overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-1.5 px-3 py-1 mb-5 rounded-full bg-brand-cyan/10 text-brand-cyan text-sm font-semibold", children: [
        /* @__PURE__ */ jsx(Sparkles, { className: "w-3.5 h-3.5" }),
        /* @__PURE__ */ jsx("span", { children: "Custom AI prompts" })
      ] }),
      /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-4xl font-bold tracking-tight leading-snug text-text-primary", style: { textWrap: "balance" }, children: [
        "The messages you send every day,",
        /* @__PURE__ */ jsx("br", {}),
        "one tap away."
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-base md:text-lg text-text-secondary leading-relaxed max-w-3xl mx-auto", style: { textWrap: "balance" }, children: "Write your own AI instruction in one sentence, save it, and rewrite in any app right from your keyboard. No copying into another AI app and pasting it back." })
    ] }),
    /* @__PURE__ */ jsxs("ul", { className: "mt-8 md:mt-10 grid md:grid-cols-3 gap-2 md:gap-4 max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxs("li", { className: "bg-[#F4F7FA] rounded-xl md:rounded-2xl px-3 py-1.5 md:p-5 border border-metal-gray/20 flex items-center gap-2.5 md:gap-3.5", children: [
        /* @__PURE__ */ jsx("div", { className: "w-7 h-7 md:w-10 md:h-10 bg-white rounded-lg md:rounded-xl shadow-sm flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(Keyboard$1, { className: "w-4 h-4 md:w-5 md:h-5 text-brand-cyan" }) }),
        /* @__PURE__ */ jsx("span", { className: "text-[15px] md:text-base font-semibold text-text-primary leading-snug lg:whitespace-nowrap", children: "Write once, use every day" })
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "bg-[#F4F7FA] rounded-xl md:rounded-2xl px-3 py-1.5 md:p-5 border border-metal-gray/20 flex items-center gap-2.5 md:gap-3.5", children: [
        /* @__PURE__ */ jsx("div", { className: "w-7 h-7 md:w-10 md:h-10 bg-white rounded-lg md:rounded-xl shadow-sm flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(Repeat, { className: "w-4 h-4 md:w-5 md:h-5 text-brand-purple" }) }),
        /* @__PURE__ */ jsx("span", { className: "text-[15px] md:text-base font-semibold text-text-primary leading-snug lg:whitespace-nowrap", children: "No app switching, no copy-paste" })
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "bg-[#F4F7FA] rounded-xl md:rounded-2xl px-3 py-1.5 md:p-5 border border-metal-gray/20 flex items-center gap-2.5 md:gap-3.5", children: [
        /* @__PURE__ */ jsx("div", { className: "w-7 h-7 md:w-10 md:h-10 bg-white rounded-lg md:rounded-xl shadow-sm flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(Wand2, { className: "w-4 h-4 md:w-5 md:h-5 text-accent-mint" }) }),
        /* @__PURE__ */ jsx("span", { className: "text-[15px] md:text-base font-semibold text-text-primary leading-snug lg:whitespace-nowrap", children: "Comes out in your format and your voice" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-14 -mx-4 sm:mx-0", children: /* @__PURE__ */ jsx(CustomPromptsFilm, { locale: "en" }) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 text-center", children: [
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: "/guides/iphone-custom-ai-prompt/",
          onClick: () => trackLinkClick("custom_prompts_en", "/guides/iphone-custom-ai-prompt/"),
          className: "inline-flex items-center gap-1.5 font-semibold text-brand-cyan hover:gap-2.5 transition-all",
          children: [
            "See how to write your own",
            /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4" })
          ]
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-metal-gray", children: "(Guide currently available in Traditional Chinese)" })
    ] })
  ] }) });
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
      icon: /* @__PURE__ */ jsx(ShieldCheck, { className: "w-6 h-6 text-brand-cyan" }),
      title: "A high-standard privacy boundary",
      description: "Conversation privacy is central to Keyly. We follow an ephemeral-processing principle so your text is destroyed after processing rather than stored long-term. We do not monitor, log, or repurpose your private data for model training."
    }
  ];
  return /* @__PURE__ */ jsx("section", { id: "features", className: "py-24 bg-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsx("div", { className: "text-center max-w-3xl mx-auto mb-16", children: /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-text-primary", children: "Why Keyly is a better Zhuyin keyboard" }) }),
    /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-8", children: features.map((feature, index) => /* @__PURE__ */ jsxs(
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
          " we process only the data needed for features you actively trigger. Processing is primarily request-based, and retention is minimized where technically and operationally feasible; limited records may still be retained when required for legal compliance, security, or transaction verification. Keyly does not monitor or keylog your everyday private conversations."
        ] })
      ] })
    },
    {
      question: "Which cloud AI providers do you use, and is it safe?",
      answer: "We build on global top-tier providers including Google, OpenAI, and Anthropic. Keyly limits data use to user-initiated requests and does not allow your personal conversations to be used for model training. Request data retention is minimized subject to legal, security, and operational requirements."
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
      question: "What is the difference between free download users and Keyly Pro?",
      answer: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Standard users (free download):" }),
          /* @__PURE__ */ jsx("br", {}),
          "Free download includes the high-speed Zhuyin engine, the full standard prompt library, and a one-time gift of 30 cloud AI requests for newly signed-in accounts."
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Keyly Pro subscription (US$4.99/month or US$39.99/year; the annual plan includes a 3-day free trial):" }),
          /* @__PURE__ */ jsx("br", {}),
          "Built for heavy professional use. It unlocks unlimited cloud AI processing and adds the AI Prompt Manager so you can create, edit, and save custom commands that match your workflow."
        ] })
      ] })
    }
  ];
  const getFaqAnswerId = (index) => `faq-answer-en-${index}`;
  return /* @__PURE__ */ jsxs("section", { id: "faq", className: "py-24 bg-bg-primary text-white overflow-hidden relative", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-[800px] h-[800px] bg-brand-purple/15 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none transform-gpu will-change-transform" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10", children: [
      /* @__PURE__ */ jsx("div", { className: "text-center mb-16", children: /* @__PURE__ */ jsxs("h2", { className: "text-3xl md:text-4xl font-bold mb-6", children: [
        "FAQ ",
        /* @__PURE__ */ jsx("span", { className: "text-accent-mint", children: "Q&A" })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: faqs.map((faq, index) => /* @__PURE__ */ jsxs(
        "details",
        {
          className: "group bg-bg-secondary rounded-2xl border border-white/10 overflow-hidden",
          onToggle: (event) => {
            if (event.currentTarget.open) trackFaqClick(faq.question);
          },
          children: [
            /* @__PURE__ */ jsxs("summary", { className: "w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer list-none [&::-webkit-details-marker]:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/70 active:bg-white/5 transition-colors duration-200", children: [
              /* @__PURE__ */ jsx("span", { className: "text-lg font-medium text-metal-white pr-8", children: faq.question }),
              /* @__PURE__ */ jsx(ChevronDown, { "aria-hidden": "true", className: "w-5 h-5 text-brand-cyan shrink-0 transition-transform duration-300 motion-reduce:transition-none group-open:rotate-180" })
            ] }),
            /* @__PURE__ */ jsx("div", { id: getFaqAnswerId(index), className: "px-6 pb-6 text-metal-gray leading-relaxed", children: faq.answer })
          ]
        },
        index
      )) })
    ] })
  ] });
}
function CTA() {
  return /* @__PURE__ */ jsxs("section", { id: "download", className: "py-24 bg-white relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-brand-cyan/5" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold text-text-primary mb-6", children: "Rewrite messages without leaving the chat" }),
      /* @__PURE__ */ jsx("p", { className: "text-xl text-text-secondary mb-10", children: "Get Keyly for AI rewriting and translation in any app, plus Zhuyin typing for Traditional Chinese." }),
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
        /* @__PURE__ */ jsx("a", { href: "mailto:support@keylyapp.com", onClick: () => trackLinkClick("support_email_en", "mailto:support@keylyapp.com"), className: "hover:text-brand-cyan transition-colors", children: "Support" }),
        /* @__PURE__ */ jsx("span", { className: "text-metal-gray/50", children: "|" }),
        /* @__PURE__ */ jsx("a", { href: "/", hrefLang: "zh-TW", onClick: () => trackLinkClick("lang_switch_zh", "/"), className: "hover:text-brand-cyan transition-colors", children: "繁體中文" })
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
