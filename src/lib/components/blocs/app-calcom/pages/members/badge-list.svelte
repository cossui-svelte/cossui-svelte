<script lang="ts">
  import { badgeVariants } from '#lib/components/ui/badge/index.js';
  import { cn } from '#lib/utils.js';
  import TruncatedBadge from './truncated-badge.svelte';

  let { items, visibleCount = 2 }: { items: string[]; visibleCount?: number } = $props();

  let isExpanded = $state(false);

  const visible = $derived(isExpanded ? items : items.slice(0, visibleCount));
  const remaining = $derived(items.length - visible.length);
</script>

{#if items.length > 0}
  <div class="flex w-full min-w-0 flex-wrap gap-1">
    {#each visible as item (item)}
      <TruncatedBadge variant="secondary">{item}</TruncatedBadge>
    {/each}
    {#if remaining > 0}
      <button
        class={cn(
          badgeVariants({ variant: 'secondary' }),
          'min-w-0 max-w-full shrink overflow-hidden tabular-nums'
        )}
        aria-label={`Show ${remaining} more ${remaining === 1 ? 'badge' : 'badges'}`}
        data-slot="badge"
        onclick={() => (isExpanded = true)}
        type="button"
      >
        <span class="min-w-0 truncate">+{remaining}</span>
      </button>
    {/if}
  </div>
{/if}
