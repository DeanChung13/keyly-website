import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { enShowcases } from './showcases';

const appResource = (path: string) =>
  JSON.parse(readFileSync(resolve(process.cwd(), '../keyly', path), 'utf8'));

describe('English homepage showcases', () => {
  it('reference real en-US prompts by id and title', () => {
    const prompts: Array<{ id: string; title: string }> = appResource(
      'KeylyCore/Shared/Resources/prompts.en-US.json'
    );
    const titleById = new Map(prompts.map(p => [p.id, p.title]));
    for (const showcase of enShowcases) {
      expect(titleById.get(showcase.id), showcase.id).toBe(showcase.promptTitle);
    }
  });

  it('use verified before/after pairs from the app tutorial', () => {
    const tutorial: Array<{ id: string; input: string; results: string[] }> = appResource(
      'Keyly/Resources/tutorial.en-US.json'
    );
    for (const showcase of enShowcases) {
      const verified = tutorial.find(t => t.id === showcase.id);
      expect(verified, showcase.id).toBeDefined();
      expect(showcase.before).toBe(verified!.input);
      expect(verified!.results).toContain(showcase.after);
    }
  });
});
