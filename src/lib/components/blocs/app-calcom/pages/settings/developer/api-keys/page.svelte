<script lang="ts">
  import ApiKeysPageContent from './api-keys-page-content.svelte';

  let { params: _params }: { params?: Record<string, string> } = $props();
</script>

<ApiKeysPageContent />
