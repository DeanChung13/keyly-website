import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import AppEn from './AppEn';
import { APP_STORE_CAMPAIGN_TOKEN, DOWNLOAD_URL } from './appStoreLink';

const APP_ID = 'id6759639348';

describe('App Store Campaign Link', () => {
  it('指向 Apple 的 Keyly 產品頁', () => {
    const url = new URL(DOWNLOAD_URL);
    expect(url.hostname).toBe('apps.apple.com');
    expect(url.pathname).toContain(APP_ID);
  });

  it('帶齊 Campaign 歸因需要的三個參數', () => {
    const { searchParams } = new URL(DOWNLOAD_URL);

    // pt 由 Apple 產生，不可推導；這裡只確認存在且非空
    expect(searchParams.get('pt')).toBeTruthy();
    expect(searchParams.get('ct')).toBe(APP_STORE_CAMPAIGN_TOKEN);
    expect(searchParams.get('ct')).toBe('website_landing');
    expect(searchParams.get('mt')).toBe('8');
  });
});

describe('首頁下載 CTA', () => {
  let gtag: ReturnType<typeof vi.fn>;
  const swallowNavigation = (event: MouseEvent) => event.preventDefault();

  beforeEach(() => {
    gtag = vi.fn();
    (globalThis as unknown as { gtag: unknown }).gtag = gtag;
    // jsdom 不會真的導航，但會對每次 <a> 點擊噴 "Not implemented" 錯誤。
    // onClick 的埋點在 default action 之前就跑完了，攔掉不影響驗證。
    document.addEventListener('click', swallowNavigation);
  });

  afterEach(() => {
    document.removeEventListener('click', swallowNavigation);
    cleanup();
    vi.clearAllMocks();
  });

  /** 展開手機選單，navbar_mobile 的 CTA 預設不在 DOM 裡。 */
  function openMobileMenu(toggleLabel: string) {
    fireEvent.click(screen.getByLabelText(toggleLabel));
  }

  function downloadLinks(): HTMLAnchorElement[] {
    return screen
      .getAllByRole('link')
      .filter(
        (element): element is HTMLAnchorElement =>
          element instanceof HTMLAnchorElement && element.href.includes(APP_ID)
      );
  }

  // 繁中與英文首頁共用同一個 DOWNLOAD_URL 常數；兩邊都跑同一組驗證，
  // 避免日後只改了一邊。
  const pages = [
    {
      name: '繁中首頁',
      Component: App,
      toggleLabel: '切換選單',
      expectedLabels: ['navbar', 'navbar_mobile', 'hero', 'cta_section'],
    },
    {
      name: '英文首頁',
      Component: AppEn,
      toggleLabel: 'Toggle menu',
      expectedLabels: ['navbar_en', 'navbar_mobile_en', 'hero_en', 'cta_section_en'],
    },
  ] as const;

  for (const { name, Component, toggleLabel, expectedLabels } of pages) {
    describe(name, () => {
      it('所有 Keyly App Store CTA 都使用完整 Campaign Link', () => {
        render(<Component />);
        openMobileMenu(toggleLabel);

        const links = downloadLinks();
        expect(links).toHaveLength(expectedLabels.length);

        for (const link of links) {
          const url = new URL(link.href);
          expect(url.hostname).toBe('apps.apple.com');
          expect(url.pathname).toContain(APP_ID);
          expect(url.searchParams.get('pt')).toBeTruthy();
          expect(url.searchParams.get('ct')).toBe('website_landing');
          expect(url.searchParams.get('mt')).toBe('8');
        }
      });

      it('點擊仍送出 download_click，且 event_label 未變', () => {
        render(<Component />);
        openMobileMenu(toggleLabel);

        // navbar_mobile 的 onClick 會順手關掉選單，先抓好節點再逐一點擊
        for (const link of downloadLinks()) {
          link.click();
        }

        expect(gtag).toHaveBeenCalledTimes(expectedLabels.length);
        for (const call of gtag.mock.calls) {
          expect(call[0]).toBe('event');
          expect(call[1]).toBe('download_click');
          expect(call[2]).toMatchObject({ event_category: 'engagement' });
        }

        const labels = gtag.mock.calls.map((call) => call[2].event_label);
        expect(labels.sort()).toEqual([...expectedLabels].sort());
      });

      // rel="noreferrer" 會壓掉 Referer，Apple 就無法把下載歸因到 keylyapp.com。
      // 見 commit e8f35b8。
      it('保留 rel="noopener" 且不加 noreferrer', () => {
        render(<Component />);
        openMobileMenu(toggleLabel);

        for (const link of downloadLinks()) {
          expect(link.rel).toContain('noopener');
          expect(link.rel).not.toContain('noreferrer');
        }
      });
    });
  }
});
