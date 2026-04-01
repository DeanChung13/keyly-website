export type Showcase = {
  id: string;
  promptTitle: string;
  before: string;
  after: string;
};

export const zhTWShowcases: Showcase[] = [
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

export const enShowcases: Showcase[] = [
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
