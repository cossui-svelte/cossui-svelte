// The pill's diagonal radius is the reference for continuous secondary lines.
// Kebab-case SVG attribute names so the object can be spread onto Svelte SVG
// elements (`<path {...secondaryLine} />`); upstream React uses camelCase props.
export const secondaryLine = {
  opacity: 0.5,
  'stroke-width': 1,
  'stroke-opacity': 0.65,
  'stroke-linecap': 'butt',
  'stroke-linejoin': 'miter'
} as const;
