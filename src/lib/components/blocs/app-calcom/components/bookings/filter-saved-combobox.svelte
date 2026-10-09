<script lang="ts" module>
  export type SavedFilter = {
    id: string;
    isDefault?: boolean;
    label: string;
  };
</script>

<script lang="ts">
  import ChevronsUpDownIcon from '@lucide/svelte/icons/chevrons-up-down';
  import CopyIcon from '@lucide/svelte/icons/copy';
  import EllipsisIcon from '@lucide/svelte/icons/ellipsis';
  import PencilIcon from '@lucide/svelte/icons/pencil';
  import SearchIcon from '@lucide/svelte/icons/search';
  import TrashIcon from '@lucide/svelte/icons/trash';
  import { Button, buttonVariants } from '#lib/components/ui/button/index.js';
  import {
    Combobox,
    ComboboxCollection,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
    ComboboxPopup,
    ComboboxTrigger
  } from '#lib/components/ui/combobox/index.js';
  import { Group, GroupSeparator } from '#lib/components/ui/group/index.js';
  import {
    Menu,
    MenuItem,
    MenuPopup,
    MenuSeparator,
    MenuTrigger
  } from '#lib/components/ui/menu/index.js';
  import { selectTriggerVariants } from '#lib/components/ui/select/index.js';
  import { cn } from '#lib/utils.js';

  let { filters }: { filters: SavedFilter[] } = $props();

  let selectedId = $state<string | null>(null);

  const items = $derived(filters.map((f) => ({ label: f.label, value: f.id })));
  const selectedFilter = $derived(filters.find((f) => f.id === selectedId) ?? null);

  function handleValueChange(next: string | null | undefined): void {
    selectedId = next ?? null;
  }
</script>

{#if !selectedFilter}
  <Combobox {items} onValueChange={handleValueChange} value={selectedId ?? undefined}>
    <ComboboxTrigger class={cn(selectTriggerVariants({ size: 'sm' }), 'w-fit min-w-0')}>
      <span class="flex-1 truncate">Saved Filters</span>
      <ChevronsUpDownIcon class="-me-1 size-4.5 opacity-80 sm:size-4" />
    </ComboboxTrigger>
    <ComboboxPopup align="end" aria-label="Select saved filter">
      <div class="border-b p-2">
        <ComboboxInput
          class="rounded-md before:rounded-[calc(var(--radius-md)-1px)]"
          placeholder="Search saved filters"
          showTrigger={false}
          size="sm"
        >
          {#snippet startAddon()}
            <SearchIcon />
          {/snippet}
        </ComboboxInput>
      </div>
      <ComboboxEmpty>No saved filters.</ComboboxEmpty>
      <ComboboxList>
        <ComboboxCollection>
          {#snippet children(filter: { label: string; value: string })}
            <ComboboxItem label={filter.label} value={filter.value}>{filter.label}</ComboboxItem>
          {/snippet}
        </ComboboxCollection>
      </ComboboxList>
    </ComboboxPopup>
  </Combobox>
{:else}
  <div class="flex items-center gap-2">
    <Group>
      <Combobox {items} onValueChange={handleValueChange} value={selectedId ?? undefined}>
        <ComboboxTrigger class={buttonVariants({ size: 'sm', variant: 'outline' })}>
          {selectedFilter.label}
          <ChevronsUpDownIcon />
        </ComboboxTrigger>
        <ComboboxPopup align="end" aria-label="Select saved filter">
          <div class="border-b p-2">
            <ComboboxInput placeholder="Search saved filters" showTrigger={false}>
              {#snippet startAddon()}
                <SearchIcon />
              {/snippet}
            </ComboboxInput>
          </div>
          <ComboboxEmpty>No saved filters.</ComboboxEmpty>
          <ComboboxList>
            <ComboboxCollection>
              {#snippet children(filter: { label: string; value: string })}
                <ComboboxItem label={filter.label} value={filter.value}>
                  {filter.label}
                </ComboboxItem>
              {/snippet}
            </ComboboxCollection>
          </ComboboxList>
          <div class="border-t p-2">
            <Button
              class="w-full rounded-md before:rounded-[calc(var(--radius-md)-1px)]"
              onclick={() => (selectedId = null)}
              size="sm"
              variant="outline"
            >
              Clear selection
            </Button>
          </div>
        </ComboboxPopup>
      </Combobox>
      <GroupSeparator />
      <Menu>
        <MenuTrigger
          aria-label="Edit saved filter"
          class={buttonVariants({ size: 'icon-sm', variant: 'outline' })}
        >
          <EllipsisIcon />
        </MenuTrigger>
        <MenuPopup align="end">
          {#if !selectedFilter.isDefault}
            <MenuItem>
              <PencilIcon />
              Rename
            </MenuItem>
          {/if}
          <MenuItem>
            <CopyIcon />
            Duplicate
          </MenuItem>
          {#if !selectedFilter.isDefault}
            <MenuSeparator />
            <MenuItem variant="destructive">
              <TrashIcon />
              Delete
            </MenuItem>
          {/if}
        </MenuPopup>
      </Menu>
    </Group>
  </div>
{/if}
