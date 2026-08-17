import '@testing-library/jest-dom/vitest';

// jsdom 沒有實作 IntersectionObserver，但首頁兩處都會用到它：
// App.tsx／AppEn.tsx 的 section_view 捲動埋點，以及 motion 的 whileInView。
// 缺了它 render 會直接丟 ReferenceError，測不到 CTA。
// 這個 stub 只負責讓 render 走完，不模擬任何交集行為。
class NoopIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = '';
  readonly thresholds: readonly number[] = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

globalThis.IntersectionObserver =
  NoopIntersectionObserver as unknown as typeof IntersectionObserver;
