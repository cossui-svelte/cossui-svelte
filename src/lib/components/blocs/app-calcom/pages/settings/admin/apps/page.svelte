<script lang="ts">
  import { router } from '../../../../lib/router.svelte.js';

  let { params: _params }: { params?: Record<string, string> } = $props();

  $effect(() => {
    router.replace('/settings/admin/apps/analytics');
  });
</script>
