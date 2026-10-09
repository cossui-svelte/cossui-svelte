<script lang="ts">
  import MembersPageClient from './members-page-client.svelte';

  let { params: _params }: { params: Record<string, string> } = $props();
</script>

<MembersPageClient />
