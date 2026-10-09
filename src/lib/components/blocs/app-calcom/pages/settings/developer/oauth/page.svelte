<script lang="ts">
  import OAuthPageContent from './oauth-page-content.svelte';

  let { params: _params }: { params?: Record<string, string> } = $props();
</script>

<OAuthPageContent />
