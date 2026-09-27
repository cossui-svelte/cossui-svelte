<script lang="ts">
  import type { PageData } from './$types';

  // Rendered without the site chrome (see the root layout) so it can be embedded in an iframe.
  let { data }: { data: PageData } = $props();

  const Bloc = $derived(data.component);
</script>

{#if data.meta.containerClass}
  <div class={data.meta.containerClass}>
    <Bloc />
  </div>
{:else}
  <Bloc />
{/if}
