import type { ReactNode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';

type Renderer = {
  createRoot: typeof createRoot;
  hydrateRoot: typeof hydrateRoot;
};

const defaultRenderer: Renderer = { createRoot, hydrateRoot };

export function mountApp(
  root: HTMLElement,
  app: ReactNode,
  renderer: Renderer = defaultRenderer
) {
  if (root.hasChildNodes()) {
    return renderer.hydrateRoot(root, app);
  }

  const clientRoot = renderer.createRoot(root);
  clientRoot.render(app);
  return clientRoot;
}
