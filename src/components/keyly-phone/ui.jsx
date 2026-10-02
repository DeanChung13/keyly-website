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
    case 'globe': return <svg {...common}><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7"/><path d="M3 12h18M12 3c-2.6 2.3-4 5.3-4 9s1.4 6.7 4 9c2.6-2.3 4-5.3 4-9s-1.4-6.7-4-9Z" stroke="currentColor" strokeWidth="1.5"/></svg>;
    case 'return': return <svg {...common}><path d="M20 6v6a4 4 0 0 1-4 4H5m0 0 4-4m-4 4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case 'back': return <svg {...common}><path d="m15 5-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case 'send': return <svg {...common}><path d="m12 19 0-14m0 0-5 5m5-5 5 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case 'mic': return <svg {...common}><rect x="9" y="3" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="1.7"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>;
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
        {message.from === 'them' && <span className="k-avatar" aria-hidden="true">{title.slice(0, 1)}</span>}
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
