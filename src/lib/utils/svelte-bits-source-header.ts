/**
 * Optional metadata header for registry components, e.g.:
 *
 * <!--
 * @title Accordion
 * @description A set of collapsible panels with headings and content.
 * @dependencies bits-ui, clsx
 * -->
 *
 * Must be the very first thing in the file. Any field can be omitted; files
 * without a header simply resolve to an empty header, letting callers fall
 * back to other metadata sources.
 */
export type SvelteBitsSourceHeader = {
  title?: string;
  description?: string;
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
};

const HEADER_PATTERN = /^\s*<!--([\s\S]*?)-->/;
const FIELD_PATTERN = /^@(\w+)\s+(.+)$/;
const LIST_FIELDS = new Set<keyof SvelteBitsSourceHeader>([
  'dependencies',
  'devDependencies',
  'registryDependencies'
]);

export function parseSvelteBitsHeader(content: string): { header: SvelteBitsSourceHeader } {
  const match = content.match(HEADER_PATTERN);
  if (!match) return { header: {} };

  const header: SvelteBitsSourceHeader = {};

  for (const line of match[1].split('\n')) {
    const fieldMatch = line.trim().match(FIELD_PATTERN);
    if (!fieldMatch) continue;

    const [, key, value] = fieldMatch;
    if (LIST_FIELDS.has(key as keyof SvelteBitsSourceHeader)) {
      header[key as 'dependencies' | 'devDependencies' | 'registryDependencies'] = value
        .split(',')
        .map((v) => v.trim())
        .filter(Boolean);
    } else if (key === 'title' || key === 'description') {
      header[key] = value.trim();
    }
  }

  return { header };
}
