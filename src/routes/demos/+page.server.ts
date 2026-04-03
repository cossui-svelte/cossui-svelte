import fs from 'node:fs';
import path from 'node:path';

const DEMOS_DIR = path.resolve('src/routes/demos');

export async function load() {
  const items = fs.readdirSync(DEMOS_DIR, { withFileTypes: true });

  const folders = items
    .filter(
      (item) => item.isDirectory() && fs.existsSync(path.join(DEMOS_DIR, item.name, '+page.svelte'))
    )
    .map((item) => item.name)
    .sort();

  return { folders };
}
