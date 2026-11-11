<svelte:options namespace="svg" />

<script lang="ts">
  // Rendered inside a parent <svg>; `svelte:options namespace` keeps these as SVG nodes.
  let {
    x1,
    x2,
    y,
    label,
    labelOffset = 8
  }: { x1: number; x2: number; y: number; label: string; labelOffset?: number } = $props();
</script>

<path
  d={`M${x1} ${y}H${x2} M${x1} ${y - 6}v12 M${x2} ${y - 6}v12 M${x1 - 4} ${y + 4}l8-8 M${x2 - 4} ${y + 4}l8-8`}
/>
<text
  fill="currentColor"
  font-size="10"
  stroke="none"
  text-anchor="middle"
  x={(x1 + x2) / 2}
  y={y - labelOffset}
>
  {label}
</text>
