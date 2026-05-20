#!/usr/bin/env tsx
/**
 * Rewrites named imports from "@lucide/svelte" to default imports from
 * "@lucide/svelte/icons/<kebab-case>" for better tree-shaking / dev performance.
 *
 * Before:
 *   import { ChevronLeft, ArrowRight as AR } from "@lucide/svelte";
 *
 * After:
 *   import ChevronLeft from "@lucide/svelte/icons/chevron-left";
 *   import AR from "@lucide/svelte/icons/arrow-right";
 *
 * Usage:
 *   pnpm dlx tsx transform-lucide-imports.ts            # defaults to ./src
 *   pnpm dlx tsx transform-lucide-imports.ts src lib    # custom roots
 *   pnpm dlx tsx transform-lucide-imports.ts --dry      # preview only
 */

import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { extname, join } from 'node:path';

const PACKAGE = '@lucide/svelte';
const EXTENSIONS = new Set(['.svelte', '.ts', '.js', '.tsx', '.jsx']);
const IGNORED_DIRS = new Set([
  'node_modules',
  '.svelte-kit',
  '.git',
  'build',
  'dist',
  '.vercel',
  '.output'
]);

// Matches a single import statement (named imports only) from @lucide/svelte.
// Captures the brace contents so we can parse the specifiers.
// Handles: import { A, B as C, /* comment */ D } from "@lucide/svelte";
const IMPORT_RE = new RegExp(
  String.raw`import\s*\{([^}]+)\}\s*from\s*["']` +
    PACKAGE.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') +
    String.raw`["'];?`,
  'g'
);

/** PascalCase / camelCase → kebab-case. Handles runs of caps + digits. */
function toKebab(name: string): string {
  // Lucide naming rules (verified against published icon paths like
  // heading-2, volume-2, circle-alert, loader-circle, arrow-down-az):
  //   ABCDef     -> ABC-Def         (cap run before cap+lower)
  //   aB / aB    -> a-B             (lower/digit before new cap)
  //   a1 / B1    -> a-1 / B-1       (letter before digit)
  //   (digit followed by letter is left attached, which is uncommon in lucide)
  return name
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/([a-z\d])([A-Z])/g, '$1-$2')
    .replace(/([A-Za-z])(\d)/g, '$1-$2')
    .toLowerCase();
}

interface Specifier {
  imported: string; // original exported name, e.g. "ChevronLeft"
  local: string; // local binding, e.g. "CL" if aliased, else same as imported
}

function parseSpecifiers(inside: string): Specifier[] {
  // Strip block + line comments inside the braces
  const cleaned = inside.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');

  return cleaned
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => {
      const asMatch = s.match(/^([A-Za-z_$][\w$]*)\s+as\s+([A-Za-z_$][\w$]*)$/);
      if (asMatch) return { imported: asMatch[1], local: asMatch[2] };
      return { imported: s, local: s };
    });
}

function buildReplacement(specs: Specifier[]): string {
  return specs
    .map(({ imported, local }) => `import ${local} from "${PACKAGE}/icons/${toKebab(imported)}";`)
    .join('\n');
}

function transform(source: string): { output: string; changed: boolean } {
  let changed = false;
  const output = source.replace(IMPORT_RE, (_match, inside: string) => {
    const specs = parseSpecifiers(inside);
    if (specs.length === 0) return _match;
    changed = true;
    return buildReplacement(specs);
  });
  return { changed, output };
}

async function* walk(dir: string): AsyncGenerator<string> {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    if (entry.name.startsWith('.') && entry.name !== '.') {
      if (IGNORED_DIRS.has(entry.name)) continue;
    }
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (IGNORED_DIRS.has(entry.name)) continue;
      yield* walk(full);
    } else if (entry.isFile() && EXTENSIONS.has(extname(entry.name))) {
      yield full;
    }
  }
}

async function main() {
  const args = process.argv.slice(2);
  const dry = args.includes('--dry');
  const roots = args.filter((a) => !a.startsWith('--'));
  const targets = roots.length ? roots : ['src'];

  let scanned = 0;
  let modified = 0;

  for (const root of targets) {
    try {
      await stat(root);
    } catch {
      console.warn(`Skipping ${root}: not found`);
      continue;
    }
    for await (const file of walk(root)) {
      scanned++;
      const src = await readFile(file, 'utf8');
      if (!src.includes(PACKAGE)) continue;
      const { output, changed } = transform(src);
      if (!changed || output === src) continue;
      modified++;
      if (dry) {
        console.log(`would update: ${file}`);
      } else {
        await writeFile(file, output, 'utf8');
        console.log(`updated: ${file}`);
      }
    }
  }

  console.log(
    `\n${dry ? 'dry run — ' : ''}scanned ${scanned} file(s), ${modified} ${
      dry ? 'would be modified' : 'modified'
    }.`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
