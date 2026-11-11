<script lang="ts">
  import type { Snippet } from 'svelte';
  import BlueprintMotion from './blueprint-motion.svelte';
  import NotFoundBlueprint from './not-found-blueprint.svelte';

  let { children }: { children: Snippet } = $props();
</script>

{#snippet animation()}
  <NotFoundBlueprint animated />
{/snippet}

<BlueprintMotion {animation}>
  {@render children()}
</BlueprintMotion>
