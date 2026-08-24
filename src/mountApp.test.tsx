import type { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { mountApp } from './mountApp';

function renderer() {
  const render = vi.fn();
  return {
    render,
    createRoot: vi.fn(() => ({ render })) as never,
    hydrateRoot: vi.fn() as never,
  };
}

describe('mountApp', () => {
  const app = 'app' as ReactNode;

  it('開發模式的空 root 使用 createRoot render', () => {
    const root = document.createElement('div');
    const client = renderer();

    mountApp(root, app, client);

    expect(client.createRoot).toHaveBeenCalledWith(root);
    expect(client.render).toHaveBeenCalledWith(app);
    expect(client.hydrateRoot).not.toHaveBeenCalled();
  });

  it('正式預渲染的 root 使用 hydrateRoot', () => {
    const root = document.createElement('div');
    root.innerHTML = '<main>SSR content</main>';
    const client = renderer();

    mountApp(root, app, client);

    expect(client.hydrateRoot).toHaveBeenCalledWith(root, app);
    expect(client.createRoot).not.toHaveBeenCalled();
  });
});
