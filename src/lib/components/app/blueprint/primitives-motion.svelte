<script lang="ts">
  import type { Snippet } from 'svelte';
  import BlueprintMotion from './blueprint-motion.svelte';
  import PrimitivesMorph from './primitives-morph.svelte';

  let { children }: { children: Snippet } = $props();
</script>

<BlueprintMotion {children}>
  {#snippet animation(paused: boolean)}
    <PrimitivesMorph {paused} />
  {/snippet}
</BlueprintMotion>
