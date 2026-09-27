<script lang="ts">
  import BlocViewer from '$lib/components/app/bloc-viewer.svelte';
  import { blocMetadata, FEATURED_BLOCS } from '$lib/components/blocs/bloc-metadata';
</script>

{#each FEATURED_BLOCS as name (name)}
  <BlocViewer {name} meta={blocMetadata[name]} />
{/each}
