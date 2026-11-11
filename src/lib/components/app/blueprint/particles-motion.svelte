<script lang="ts">
  import type { Snippet } from 'svelte';
  import BlueprintMotion from './blueprint-motion.svelte';
  import ParticlesAssemblyDrawing from './particles-assembly-drawing.svelte';

  let { children }: { children: Snippet } = $props();
</script>

<BlueprintMotion {children}>
  {#snippet animation()}
    <ParticlesAssemblyDrawing />
  {/snippet}
</BlueprintMotion>
