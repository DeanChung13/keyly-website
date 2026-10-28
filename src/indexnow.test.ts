import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

// public/ is copied to dist/ as-is, so this is the file IndexNow fetches
// from the live site to check ownership.
const script = readFileSync(resolve(process.cwd(), 'scripts/indexnow.mjs'), 'utf8');

describe('IndexNow key file', () => {
  it('ships the key that scripts/indexnow.mjs points to', () => {
    const key = script.match(/const KEY = '([0-9a-f]+)'/)?.[1];
    expect(key).toBeTruthy();
    expect(readFileSync(resolve(process.cwd(), `public/${key}.txt`), 'utf8')).toBe(key);
  });

  it('pings for the keylyapp.com host', () => {
    expect(script).toContain("const HOST = 'keylyapp.com'");
  });
});
