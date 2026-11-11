<svelte:options namespace="svg" />

<script lang="ts">
  import type { Snippet } from 'svelte';
  import ConstructionMotion from './primitives-construction-motion.svelte';

  let { children, stage }: { children: Snippet; stage: number } = $props();
</script>

<g opacity="0">
  <ConstructionMotion
    attributeName="opacity"
    delay={0.78}
    duration={0.16}
    from={0}
    {stage}
    to={1}
  />
  {@render children()}
</g>
