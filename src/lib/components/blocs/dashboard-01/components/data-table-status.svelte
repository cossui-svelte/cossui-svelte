<script lang="ts">
  import CircleCheckFilledIcon from '@lucide/svelte/icons/circle-check';
  import LoaderIcon from '@lucide/svelte/icons/loader';
  import type { Row } from '@tanstack/svelte-table';
  import { Badge } from '$lib/components/ui/badge';
  import type { DashboardTableFeatures } from './data-table-features.js';
  import type { Schema } from './schemas.js';

  let { row }: { row: Row<DashboardTableFeatures, Schema> } = $props();
</script>

<Badge variant="outline" class="px-1.5 text-muted-foreground">
  {#if row.original.status === 'Done'}
    <CircleCheckFilledIcon class="fill-green-500 dark:fill-green-400" />
  {:else}
    <LoaderIcon />
  {/if}
  {row.original.status}
</Badge>
