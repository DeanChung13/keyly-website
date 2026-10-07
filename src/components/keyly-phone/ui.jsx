import React from 'react';
import './keyly.css';

// 依 KeylyCore/Shared/Models/ZhuyinLayout.swift 的標準大千鍵序重建。
const ZHUYIN_ROWS = [
  ['ㄅ', 'ㄉ', 'ˇ', 'ˋ', 'ㄓ', 'ˊ', '˙', 'ㄚ', 'ㄞ', 'ㄢ', 'ㄦ'],
  ['ㄆ', 'ㄊ', 'ㄍ', 'ㄐ', 'ㄔ', 'ㄗ', 'ㄧ', 'ㄛ', 'ㄟ', 'ㄣ'],
  ['ㄇ', 'ㄋ', 'ㄎ', 'ㄑ', 'ㄕ', 'ㄘ', 'ㄨ', 'ㄜ', 'ㄠ', 'ㄤ'],
  ['ㄈ', 'ㄌ', 'ㄏ', 'ㄒ', 'ㄖ', 'ㄙ', 'ㄩ', 'ㄝ', 'ㄡ', 'ㄥ', 'delete'],
  ['keyboardChange', 'languageToggle', 'ai', 'space', 'return'],
];

function Icon({name, size = 19}) {
  const common = {width: size, height: size, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': true};
  switch (name) {
    case 'sparkles': return <svg {...common}><path d="m10.1 2.5 1.8 5.7 5.6 1.8-5.6 1.8-1.8 5.7-1.8-5.7L2.7 10l5.6-1.8 1.8-5.7ZM18.6 14.3l.9 2.4 2.3.9-2.3.9-.9 2.4-.9-2.4-2.3-.9 2.3-.9.9-2.4Z" fill="currentColor"/></svg>;
    case 'delete': return <svg {...common}><path d="M8.5 4.5H21v15H8.5L2 12l6.5-7.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="m11 9 6 6m0-6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>;
    // SF Symbols「globe」Regular，由使用者自 SF Symbols App 匯出（2026-10-07）
    case 'globe': return <svg width={size} height={size} viewBox="4 -77 84 84" aria-hidden="true"><path d="M46.2402 4.15039C68.0176 4.15039 85.6934-13.4766 85.6934-35.2539C85.6934-57.0312 68.0176-74.6582 46.2402-74.6582C24.5117-74.6582 6.83594-57.0312 6.83594-35.2539C6.83594-13.4766 24.5117 4.15039 46.2402 4.15039ZM46.2402-1.70898C27.7344-1.70898 12.7441-16.748 12.7441-35.2539C12.7441-53.7598 27.7344-68.7988 46.2402-68.7988C64.7461-68.7988 79.7852-53.7598 79.7852-35.2539C79.7852-16.748 64.7461-1.70898 46.2402-1.70898Z" fill="currentColor"/><path d="M46.2402 1.66016C57.1777 1.66016 65.8203-14.4043 65.8203-35.1562C65.8203-56.0547 57.2266-72.168 46.2402-72.168C35.2539-72.168 26.709-56.0547 26.709-35.1562C26.709-14.4043 35.3027 1.66016 46.2402 1.66016ZM46.2402-3.66211C39.0137-3.66211 32.4707-18.5059 32.4707-35.1562C32.4707-52.002 39.0137-66.8457 46.2402-66.8457C53.5156-66.8457 60.0586-52.002 60.0586-35.1562C60.0586-18.5059 53.5156-3.66211 46.2402-3.66211Z" fill="currentColor"/><path d="M46.2402 2.92969C47.8027 2.92969 49.0723 1.66016 49.0723 0.0976562L49.0723-70.2148C49.0723-71.7773 47.8027-73.0469 46.2402-73.0469C44.7266-73.0469 43.4082-71.7773 43.4082-70.2148L43.4082 0.0976562C43.4082 1.66016 44.7266 2.92969 46.2402 2.92969ZM22.7539-9.52148C27.7344-13.5742 35.9375-15.7715 46.2402-15.7715C56.5918-15.7715 64.7461-13.5742 69.7754-9.52148C70.9961-8.54492 72.6562-8.39844 73.7793-9.47266C74.9023-10.5469 75-12.3047 73.8281-13.4277C68.75-18.1641 58.1543-21.4355 46.2402-21.4355C34.375-21.4355 23.7793-18.1641 18.7012-13.4277C17.5293-12.3047 17.627-10.5469 18.75-9.47266C19.873-8.39844 21.4844-8.54492 22.7539-9.52148ZM12.0605-32.4219L81.3965-32.4219C82.959-32.4219 84.2285-33.6914 84.2285-35.2539C84.2285-36.8164 82.959-38.0859 81.3965-38.0859L12.0605-38.0859C10.498-38.0859 9.22852-36.8164 9.22852-35.2539C9.22852-33.6914 10.498-32.4219 12.0605-32.4219ZM46.2402-48.877C58.1543-48.877 68.75-52.1484 73.8281-56.8848C75-58.0078 74.9023-59.7656 73.7793-60.8398C72.6562-61.9141 70.9961-61.7676 69.7754-60.791C64.7461-56.7383 56.5918-54.541 46.2402-54.541C35.9375-54.541 27.7344-56.7383 22.7539-60.791C21.4844-61.7676 19.873-61.9141 18.75-60.8398C17.627-59.7656 17.5293-58.0078 18.7012-56.8848C23.7793-52.1484 34.375-48.877 46.2402-48.877Z" fill="currentColor"/></svg>;
    case 'return': return <svg {...common}><path d="M20 6v6a4 4 0 0 1-4 4H5m0 0 4-4m-4 4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case 'back': return <svg {...common}><path d="m15 5-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case 'send': return <svg {...common}><path d="m12 19 0-14m0 0-5 5m5-5 5 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    // SF Symbols「microphone」Regular，由使用者自 SF Symbols App 匯出（2026-10-07）
    case 'mic': return <svg width={size} height={size} viewBox="-2.3 -79.8 84 84" aria-hidden="true"><path d="M39.6973-10.9863C56.2988-10.9863 67.7246-22.168 67.7246-38.5254L67.7246-46.4355C67.7246-48.291 66.2598-49.7559 64.4043-49.7559C62.5977-49.7559 61.1328-48.291 61.1328-46.4355L61.1328-38.8184C61.1328-25.6836 52.6855-17.041 39.6973-17.041C26.709-17.041 18.2617-25.6836 18.2617-38.8184L18.2617-46.4355C18.2617-48.291 16.7969-49.7559 14.9414-49.7559C13.1348-49.7559 11.6699-48.291 11.6699-46.4355L11.6699-38.5254C11.6699-22.168 23.0957-10.9863 39.6973-10.9863ZM25.293-39.8438C25.293-30.6641 31.2012-24.3652 39.6973-24.3652C48.1445-24.3652 54.1016-30.6641 54.1016-39.8438L54.1016-63.5742C54.1016-72.7539 48.1445-79.0527 39.6973-79.0527C31.2012-79.0527 25.293-72.7539 25.293-63.5742ZM31.8848-39.8438L31.8848-63.5742C31.8848-69.1895 35.0098-72.5586 39.6973-72.5586C44.3359-72.5586 47.5098-69.1895 47.5098-63.5742L47.5098-39.8438C47.5098-34.2285 44.3359-30.8594 39.6973-30.8594C35.0098-30.8594 31.8848-34.2285 31.8848-39.8438ZM22.6074 3.4668L56.7871 3.4668C58.5938 3.4668 60.0586 2.00195 60.0586 0.146484C60.0586-1.66016 58.5938-3.125 56.7871-3.125L22.6074-3.125C20.752-3.125 19.2871-1.66016 19.2871 0.146484C19.2871 2.00195 20.752 3.4668 22.6074 3.4668ZM39.6973 2.00195C41.5039 2.00195 42.9688 0.537109 42.9688-1.26953L42.9688-12.4512C42.9688-14.3066 41.5039-15.7715 39.6973-15.7715C37.8418-15.7715 36.377-14.3066 36.377-12.4512L36.377-1.26953C36.377 0.537109 37.8418 2.00195 39.6973 2.00195Z" fill="currentColor"/></svg>;
    case 'shift': return <svg {...common}><path d="M12 3.5 3.5 12.5H8v7h8v-7h4.5L12 3.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/></svg>;
    case 'chevron': return <svg {...common}><path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    default: return null;
  }
}

// iPhone 17 Pro Max：螢幕 440×956pt，外層另加均勻邊框。
export function Phone({children, className = ''}) {
  return <div className={`k-phone ${className}`}>
    <i className="k-side-button k-side-action"/><i className="k-side-button k-side-volume-up"/><i className="k-side-button k-side-volume-down"/><i className="k-side-button k-side-power"/>
    <div className="k-phone-screen">
      <div className="k-status"><span>2:35</span><div className="k-island"/><span className="k-status-signals"><i className="k-signal"/><i className="k-wifi"/><i className="k-battery"/></span></div>
      <div className="k-phone-content">{children}</div>
      <div className="k-home-indicator"/>
    </div>
  </div>;
}

// 中性聊天室外觀；draft 可含換行與 emoji，span 保留可量測的游標位置。
export function ChatScreen({title = '相親相愛一家人', messages = [], draft = '', placeholder = '輸入訊息', className = ''}) {
  return <div className={`k-chat ${className}`}>
    <div className="k-chat-header"><span className="k-chat-back"><Icon name="back" size={23}/></span><strong>{title}</strong><span className="k-chat-menu">•••</span></div>
    <div className="k-chat-messages">
      {messages.map((message, index) => <div key={index} className={`k-message-row ${message.from === 'me' ? 'k-from-me' : 'k-from-them'}`}>
        {message.from === 'them' && <span className="k-avatar" aria-hidden="true">{message.avatar ?? title.slice(0, 1)}</span>}
        <div className="k-message">{message.text}</div>
      </div>)}
    </div>
    <div className="k-composer">
      <span className="k-add" aria-hidden="true">＋</span>
      <div className="k-input"><span className="k-draft">{draft}</span><span className="k-caret"/><span className="k-placeholder">{draft ? '' : placeholder}</span></div>
      <span className="k-send" aria-hidden="true"><Icon name="send" size={17}/></span>
    </div>
  </div>;
}

// 英文（QWERTY）版：依使用者 2026-10-01 實機截圖量測（1206px @3x → 440pt 螢幕），單位 px
const QWERTY_ROWS = [
  'qwertyuiop'.split(''),
  [...'asdfghjkl'.split(''), ';'],
  ['shift', ...'zxcvbnm'.split(''), 'delete'],
  ['keyboardChange', 'ai', 'space', 'return'],
];
const QWERTY_W = {shift: 47.4, delete: 47.4, keyboardChange: 48.5, ai: 49.6, space: 213.8, return: 102};

function keyLabel(key, layout) {
  if (key === 'keyboardChange') return '123';
  if (key === 'languageToggle') return 'ABC';   // KeyboardUIService.languageToggleTitle：注音模式顯示 ABC
  if (key === 'ai') return <Icon name="sparkles" size={27}/>;
  if (key === 'space') return layout === 'qwerty' ? 'space' : '空白';
  if (key === 'shift') return <Icon name="shift" size={26}/>;
  if (key === 'return') return <Icon name="return" size={21}/>;
  if (key === 'delete') return <Icon name="delete" size={21}/>;
  return key;
}

function Key({value, pressed, aiState, width, layout}) {
  const isAI = value === 'ai';
  const isFunction = ['keyboardChange', 'languageToggle', 'delete', 'shift'].includes(value);
  const isReturn = value === 'return';
  const down = pressed === value || (value === 'delete' && pressed === '⌫') || (isAI && aiState === 'pressed');
  const extra = [isAI && 'k-ai-key', isFunction && 'k-function-key', isReturn && 'k-return-key', value === 'space' && 'k-space-key', down && 'k-pressed'].filter(Boolean).join(' ');
  return <div className={`k-key ${extra}`} data-key={value} data-pressed={down ? 'true' : 'false'} style={width ? {width} : undefined}>
    <div className="k-key-surface">{keyLabel(value, layout)}</div>
    {down && !isAI && !['space', 'return', 'delete'].includes(value) && <span className="k-key-popover">{keyLabel(value, layout)}</span>}
  </div>;
}

// 候選列 44pt、鍵區 221pt；五排使用 Keyly 的原始鍵序與底排寬度權重。
export function Keyboard({pressed, candidates = [], pickedIndex = 0, aiState = 'idle', idlePrompt = '', layout = 'zhuyin', children, className = ''}) {
  const rows = layout === 'qwerty' ? QWERTY_ROWS : ZHUYIN_ROWS;
  return <div className={`k-keyboard k-layout-${layout} ${className}`}>
    <div className="k-candidate-bar">
      <div className="k-candidate-scroll">
        {candidates.length ? candidates.map((candidate, index) => <span key={`${candidate}-${index}`} className={`k-candidate ${index === pickedIndex ? 'k-picked' : ''}`}>{candidate}</span>) : (idlePrompt && <span className="k-idle-prompt">{idlePrompt}</span>)}
      </div>
      {candidates.length > 0 && <span className="k-candidate-expand"><Icon name="chevron" size={17}/></span>}
    </div>
    <div className="k-key-area">
      {rows.map((row, rowIndex) => <div className={`k-key-row k-row-${rowIndex}`} key={rowIndex}>
        {row.map((value) => <Key value={value} key={value} pressed={pressed} aiState={aiState} width={layout === 'qwerty' ? QWERTY_W[value] : undefined} layout={layout}/>)}
      </div>)}
    </div>
    {children}
    {/* iOS 為第三方鍵盤保留的系統列：地球（切換鍵盤）與聽寫麥克風 */}
    <div className="k-system-bar"><Icon name="globe" size={30}/><Icon name="mic" size={30}/></div>
  </div>;
}

// 可作為 <Keyboard> 的 child，覆蓋候選列；選取色與 15pt pill 參考 PromptSelectionView。
export function PromptPicker({items = [], selected, className = ''}) {
  return <div className={`k-prompt-picker ${className}`}>
    <div className="k-prompt-scroll">
      {items.map((item, index) => <span key={`${item}-${index}`} className={`k-prompt-item ${item === selected ? 'k-selected' : ''}`}>{item}</span>)}
    </div>
  </div>;
}
