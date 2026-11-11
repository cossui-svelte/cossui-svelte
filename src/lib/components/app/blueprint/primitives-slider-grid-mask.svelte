<svelte:options namespace="svg" />

<script lang="ts">
  import {
    morphCycleDuration,
    morphHoldDuration,
    morphKeyTimes,
    morphStageDuration
  } from './primitives-morph-timing';
  import { travelGuides } from './primitives-slider.svelte';
</script>

<!-- Remove only coincident grid strokes, so the construction dashes retain gaps. -->
<g opacity="0">
  <animate
    attributeName="opacity"
    begin={`${5 * morphStageDuration}s`}
    dur={`${morphCycleDuration}s`}
    keyTimes={morphKeyTimes(0, 0.18, 2.2, morphHoldDuration, morphCycleDuration)}
    repeatCount="indefinite"
    values="0;1;1;0;0"
  />
  <path d={travelGuides} stroke="black" stroke-width="1.3" stroke-opacity="1" />
</g>
