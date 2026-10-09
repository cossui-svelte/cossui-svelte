<script lang="ts">
  import TruncatedBadge from './truncated-badge.svelte';

  let { value }: { value?: string } = $props();
</script>

{#if value}
  <TruncatedBadge variant="secondary">{value}</TruncatedBadge>
{/if}
