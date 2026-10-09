<script lang="ts">
  import AttributesPageContent from './attributes-page-content.svelte';

  let { params: _params }: { params?: Record<string, string> } = $props();
</script>

<AttributesPageContent attributes={[]} />
