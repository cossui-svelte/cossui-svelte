<svelte:options namespace="svg" />

<script lang="ts">
  import ConstructionAnnotation from './primitives-construction-annotation.svelte';
  import { secondaryLine } from './primitives-morph-style';
</script>

<g>
  <path
    d="M112 204H456"
    opacity="0.24"
    stroke-dasharray="4 4"
    stroke-width="1"
    stroke-opacity="0.65"
  />
  <circle
    cx="204"
    cy="204"
    fill="none"
    opacity="0.14"
    r="60"
    stroke-width="1"
    stroke-opacity="0.65"
  />
  <ConstructionAnnotation stage={2}>
    <g {...secondaryLine}>
      <path d="M204 300V318 M364 300V318 M204 310H270 M298 310H364" />
      <path d="m200 314 8-8 m152 8 8-8" />
    </g>
    <g fill="currentColor" font-size="10" opacity="0.58" stroke="none">
      <text text-anchor="middle" x="284" y="313">4u</text>
      <text text-anchor="end" x="464" y="384">03 / Switch</text>
    </g>
  </ConstructionAnnotation>
</g>
