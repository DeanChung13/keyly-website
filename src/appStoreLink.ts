// Keyly 的 App Store 下載連結，繁中與英文首頁共用，避免兩邊日後分歧。
//
// 這是 App Store Connect 產生的 Campaign Link：
//   pt  provider token，由 Apple 產生，不可自行推導或猜測
//   ct  campaign token，對應 Analytics → 獲取 → 行銷活動 的 website_landing
//   mt  media type，8 代表 iOS App
//
// Apple 的 Campaign 報表提供的是歸因下載／銷售／使用量，不是可靠的點擊數，
// 且需累積至少 5 次歸因下載才會顯示該 Campaign 的獨立資料。點擊數仍以
// GA4 的 download_click 為準。
export const APP_STORE_CAMPAIGN_TOKEN = 'website_landing';

export const DOWNLOAD_URL =
  'https://apps.apple.com/app/apple-store/id6759639348?pt=686508&ct=website_landing&mt=8';
