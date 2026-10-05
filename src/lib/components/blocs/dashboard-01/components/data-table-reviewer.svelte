<script lang="ts">
  import type { Row } from '@tanstack/svelte-table';
  import { Label } from '#lib/components/ui/label/index.js';
  import {
    Select,
    SelectItem,
    SelectPopup,
    SelectTrigger
  } from '#lib/components/ui/select/index.js';
  import type { DashboardTableFeatures } from './data-table-features.js';
  import type { Schema } from './schemas.js';

  let { row }: { row: Row<DashboardTableFeatures, Schema> } = $props();

  const isAssigned = $derived(row.original.reviewer !== 'Assign reviewer');
  let reviewer = $state('');
</script>

{#if isAssigned}
  {row.original.reviewer}
{:else}
  <Label for="{row.original.id}-reviewer" class="sr-only">Reviewer</Label>
  <Select bind:value={reviewer}>
    <SelectTrigger
      class="w-38 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
      size="sm"
      id="{row.original.id}-reviewer"
    >
      <span data-slot="select-value">
        {reviewer !== '' ? reviewer : 'Assign reviewer'}
      </span>
    </SelectTrigger>
    <SelectPopup align="end">
      <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
      <SelectItem value="Jamik Tashpulatov">Jamik Tashpulatov</SelectItem>
    </SelectPopup>
  </Select>
{/if}
