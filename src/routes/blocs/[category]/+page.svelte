<script lang="ts">
  import BlocViewer from '#lib/components/app/bloc-viewer.svelte';
  import { blocMetadata } from '#lib/components/blocs/bloc-metadata.js';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

{#each data.blocs as name (name)}
  <BlocViewer {name} meta={blocMetadata[name]} />
{/each}
