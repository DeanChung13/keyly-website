import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// 從 vitest/config 匯入，才認得下面的 test 區塊；它就是 vite 的 defineConfig
// 加上 test 欄位的型別，build 行為不變。
import {defineConfig} from 'vitest/config';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
  },
  build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          en: path.resolve(__dirname, 'en/index.html'),
          privacy: path.resolve(__dirname, 'privacy/index.html'),
          privacyEn: path.resolve(__dirname, 'privacy/en/index.html'),
          terms: path.resolve(__dirname, 'terms/index.html'),
          termsEn: path.resolve(__dirname, 'terms/en/index.html'),
          subscriptions: path.resolve(__dirname, 'subscriptions/index.html'),
          subscriptionsEn: path.resolve(__dirname, 'subscriptions/en/index.html'),
          guides: path.resolve(__dirname, 'guides/index.html'),
          guidesFullAccess: path.resolve(__dirname, 'guides/full-access/index.html'),
          guidesZhuyinKeyboard: path.resolve(__dirname, 'guides/iphone-zhuyin-keyboard/index.html'),
          guidesSelectionFixes: path.resolve(__dirname, 'guides/iphone-zhuyin-selection-fixes/index.html'),
          guidesKeyboardHaptics: path.resolve(__dirname, 'guides/iphone-keyboard-haptics/index.html'),
          guidesAppleIntelligence: path.resolve(__dirname, 'guides/apple-intelligence-vs-ai-keyboard/index.html'),
          guidesDoublePinyin: path.resolve(__dirname, 'guides/iphone-double-pinyin/index.html'),
          guidesMessageSummary: path.resolve(__dirname, 'guides/iphone-ai-message-summary/index.html'),
          guidesLeaveRequest: path.resolve(__dirname, 'guides/iphone-ai-leave-request/index.html'),
          guidesElderlyReply: path.resolve(__dirname, 'guides/iphone-ai-elderly-reply/index.html'),
          go: path.resolve(__dirname, 'go/index.html'),
          notFound: path.resolve(__dirname, '404.html'),
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
});
