<script lang="ts" module>
  export type FilterAddMenuVariant = 'button' | 'icon';
</script>

<script lang="ts">
  import ListFilterIcon from '@lucide/svelte/icons/list-filter';
  import PlusIcon from '@lucide/svelte/icons/plus';
  import { Badge } from '#lib/components/ui/badge/index.js';
  import { buttonVariants } from '#lib/components/ui/button/index.js';
  import {
    Menu,
    MenuGroup,
    MenuGroupLabel,
    MenuItem,
    MenuPopup,
    MenuTrigger
  } from '#lib/components/ui/menu/index.js';
  import type { FilterField } from './filter-chip-types.js';

  let {
    activeFilterIds,
    fields,
    hasFilters = false,
    onSelectField,
    variant = 'button'
  }: {
    activeFilterIds: string[];
    fields: FilterField[];
    hasFilters?: boolean;
    onSelectField: (fieldId: string) => void;
    variant?: FilterAddMenuVariant;
  } = $props();

  const available = $derived(fields.filter((f) => !activeFilterIds.includes(f.id)));
</script>

{#snippet menuPopup()}
  <MenuPopup align="start">
    <MenuGroup>
      <MenuGroupLabel>Filter by</MenuGroupLabel>
      {#each available as field (field.id)}
        <MenuItem onclick={() => onSelectField(field.id)}>
          {field.label}
        </MenuItem>
      {/each}
    </MenuGroup>
  </MenuPopup>
{/snippet}

{#if available.length === 0 && hasFilters}
  <!-- nothing left to add -->
{:else if variant === 'icon'}
  <Menu>
    <MenuTrigger
      aria-label="Add filter"
      class={buttonVariants({ size: 'icon-xs', variant: 'ghost' })}
    >
      <PlusIcon />
    </MenuTrigger>
    {@render menuPopup()}
  </Menu>
{:else}
  <Menu>
    <MenuTrigger aria-label="Add Filter" class={buttonVariants({ size: 'sm', variant: 'outline' })}>
      <ListFilterIcon />
      Filter
      {#if activeFilterIds.length > 0}
        <Badge class="-me-1" variant="secondary">
          {activeFilterIds.length}
        </Badge>
      {/if}
    </MenuTrigger>
    {@render menuPopup()}
  </Menu>
{/if}
