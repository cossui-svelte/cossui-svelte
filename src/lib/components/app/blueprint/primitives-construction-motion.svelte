<svelte:options namespace="svg" />

<script lang="ts">
  import { morphCycleDuration, morphKeyTimes, morphStageDuration } from './primitives-morph-timing';

  // Construction finishes during the first second of each 2.4s hold. Reset only
  // after its parent is hidden, so subsequent cycles never flash the final state.
  let {
    attributeName,
    delay = 0.12,
    duration = 0.68,
    from,
    stage,
    to,
    type
  }: {
    attributeName: string;
    delay?: number;
    duration?: number;
    from: string | number;
    stage: number;
    to: string | number;
    type?: 'rotate';
  } = $props();

  const timing = $derived({
    attributeName,
    begin: `${stage * morphStageDuration}s`,
    calcMode: 'spline' as const,
    dur: `${morphCycleDuration}s`,
    keySplines: '0 0 1 1;0.22 0 0.12 1;0 0 1 1;0 0 1 1;0 0 1 1',
    keyTimes: morphKeyTimes(0, delay, delay + duration, 2.45, 2.5, morphCycleDuration),
    repeatCount: 'indefinite',
    values: [from, from, to, to, from, from].join(';')
  });
</script>

{#if type}
  <animateTransform {...timing} {type} />
{:else}
  <animate {...timing} />
{/if}
