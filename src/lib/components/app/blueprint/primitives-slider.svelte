<svelte:options namespace="svg" />

<script lang="ts" module>
  export const travelGuides = 'M204 116V292 M364 116V292 M204 164H364 M204 244H364';
</script>

<script lang="ts">
  import ConstructionAnnotation from './primitives-construction-annotation.svelte';
  import ConstructionMotion from './primitives-construction-motion.svelte';
  import { secondaryLine } from './primitives-morph-style';

  const scalePositions = [124, 164, 204, 244, 284, 324, 364, 404, 444];
</script>

<g>
  <g opacity="0.38" stroke-dasharray="4 4" stroke-width="1" stroke-opacity="0.65">
    <path d={travelGuides} />
    <circle cx="204" cy="204" r="40" />
  </g>
  <circle cx="204" cy="204" fill="none" r="40" stroke-width="1" stroke-opacity="1">
    <ConstructionMotion
      attributeName="cx"
      delay={0.3}
      duration={0.55}
      from={204}
      stage={5}
      to={364}
    />
  </circle>
  <g {...secondaryLine}>
    <path d="M124 292H444" />
    {#each scalePositions as x, index (x)}
      {@const halfTick = index % 2 === 0 ? 4 : 2}
      <path d={`M${x} ${292 - halfTick}v${2 * halfTick}`} />
    {/each}
  </g>
  <ConstructionAnnotation stage={5}>
    <g {...secondaryLine}>
      <path d="M204 132H270 M298 132H364 m-164 4 8-8 m152 8 8-8" />
    </g>
    <g fill="currentColor" font-size="10" opacity="0.58" stroke="none">
      <text text-anchor="middle" x="284" y="135">4u</text>
      <text text-anchor="middle" x="124" y="312">0%</text>
      <text text-anchor="middle" x="284" y="312">50%</text>
      <text text-anchor="middle" x="444" y="312">100%</text>
      <text text-anchor="end" x="464" y="384">06 / Slider</text>
    </g>
  </ConstructionAnnotation>
</g>
