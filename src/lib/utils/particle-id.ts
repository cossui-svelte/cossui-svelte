/**
 * Derives a human readable title from a particle id, e.g. `p-accordion-1` -> `Accordion 1`.
 */
export function idToName(id: string): string {
  const match = id.match(/^p-(.*)-(\d+)$/);
  if (!match) return id;
  const [, category, num] = match;
  return (
    category
      .split('-')
      .map((w, i) => (i === 0 ? w[0].toUpperCase() + w.slice(1) : w))
      .join(' ') +
    ' ' +
    num
  );
}
