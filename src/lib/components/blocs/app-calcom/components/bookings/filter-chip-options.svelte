<script lang="ts" module>
  function getInitials(name: string): string {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) {
      return parts[0]?.charAt(0).toUpperCase() ?? '';
    }
    const first = parts[0]?.charAt(0) ?? '';
    const last = parts[parts.length - 1]?.charAt(0) ?? '';
    return (first + last).toUpperCase();
  }
</script>

<script lang="ts">
  import ChevronsUpDownIcon from '@lucide/svelte/icons/chevrons-up-down';
  import SearchIcon from '@lucide/svelte/icons/search';
  import { untrack } from 'svelte';
  import { Avatar, AvatarFallback, AvatarImage } from '#lib/components/ui/avatar/index.js';
  import { Badge } from '#lib/components/ui/badge/index.js';
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
  import FilterChipShell from './filter-chip-shell.svelte';
  import type { ActiveFilter, FilterField, FilterOption } from './filter-chip-types.js';

  let {
    autoOpen = false,
    field,
    filter,
    onRemove,
    onUpdate
  }: {
    autoOpen?: boolean;
    field: Extract<FilterField, { kind: 'options' }>;
    filter: ActiveFilter;
    onRemove: () => void;
    onUpdate: (values: string[]) => void;
  } = $props();

  let open = $state(untrack(() => autoOpen));
  let hasAutoOpened = false;
  let sortedItems = $state<FilterOption[]>(untrack(() => field.options));
  const showAvatar = $derived(field.showAvatar === true);

  $effect(() => {
    if (autoOpen && !hasAutoOpened) {
      open = true;
      hasAutoOpened = true;
    }
  });

  const selectedValues = $derived(filter.v ?? []);
  const selectedOptions = $derived(
    selectedValues
      .map((id) => field.options.find((opt) => opt.id === id))
      .filter((opt): opt is FilterOption => opt !== undefined)
  );
  const firstOption = $derived(selectedOptions[0]);
  const remainingCount = $derived(selectedOptions.length - 1);
  const comboboxItems = $derived(sortedItems.map((o) => ({ label: o.label, value: o.id })));

  function handleValueChange(newValue: string[]): void {
    const existingIds = selectedValues.filter((id) => newValue.includes(id));
    const addedIds = newValue.filter((id) => !selectedValues.includes(id));
    onUpdate([...existingIds, ...addedIds]);
  }

  function handleOpenChange(isOpen: boolean): void {
    open = isOpen;
    if (isOpen) {
      const selected = field.options.filter((opt) => selectedValues.includes(opt.id));
      const unselected = field.options.filter((opt) => !selectedValues.includes(opt.id));
      sortedItems = [...selected, ...unselected];
    }
    if (!isOpen && selectedValues.length === 0) {
      onRemove();
    }
  }
</script>

{#snippet optionAvatar(avatarUrl: string | null | undefined, name: string)}
  <Avatar class="size-4">
    {#if avatarUrl}
      <AvatarImage alt={name} src={avatarUrl} />
    {/if}
    <AvatarFallback class="text-[0.5rem]">
      {getInitials(name)}
    </AvatarFallback>
  </Avatar>
{/snippet}

{#snippet countBadge(count: number)}
  <Badge class="tabular-nums" variant="secondary">
    +{count}
  </Badge>
{/snippet}

<FilterChipShell label={field.label} {onRemove}>
  <Combobox
    autoHighlight
    items={comboboxItems}
    multiple
    onOpenChange={handleOpenChange}
    onValueChange={handleValueChange}
    {open}
    value={selectedValues}
  >
    <ComboboxTrigger class={buttonVariants({ size: 'xs', variant: 'outline' })}>
      {#if selectedOptions.length === 0}
        Select
      {:else if showAvatar}
        <div class="flex items-center gap-2">
          {@render optionAvatar(firstOption?.avatar, firstOption?.label ?? '')}
          <span class="truncate">{firstOption?.label ?? ''}</span>
          {#if remainingCount > 0}
            {@render countBadge(remainingCount)}
          {/if}
        </div>
      {:else if remainingCount > 0}
        <div class="flex items-center gap-2">
          <span class="truncate">{firstOption?.label ?? ''}</span>
          {@render countBadge(remainingCount)}
        </div>
      {:else}
        {firstOption?.label ?? 'Select'}
      {/if}
      {#if selectedOptions.length === 0}
        <ChevronsUpDownIcon class="-me-1!" />
      {/if}
    </ComboboxTrigger>
    <ComboboxPopup aria-label={`Select ${field.label}`}>
      <div class="border-b p-2">
        <ComboboxInput
          class="rounded-md before:rounded-[calc(var(--radius-md)-1px)]"
          placeholder={`Search ${field.label.toLowerCase()}`}
          showTrigger={false}
          size="sm"
        >
          {#snippet startAddon()}
            <SearchIcon />
          {/snippet}
        </ComboboxInput>
      </div>
      <ComboboxEmpty>No items found.</ComboboxEmpty>
      <ComboboxList>
        <ComboboxCollection>
          {#snippet children(item: { label: string; value: string })}
            {@const option = field.options.find((o) => o.id === item.value)}
            <ComboboxItem label={item.label} value={item.value}>
              {#if showAvatar}
                <div class="flex items-center gap-2">
                  {@render optionAvatar(option?.avatar, item.label)}
                  <span>{item.label}</span>
                </div>
              {:else}
                {item.label}
              {/if}
            </ComboboxItem>
          {/snippet}
        </ComboboxCollection>
      </ComboboxList>
      {#if selectedOptions.length > 0}
        <div class="border-t p-2">
          <Button class="w-full" onclick={() => onUpdate([])} size="sm" variant="outline">
            Clear all
          </Button>
        </div>
      {/if}
    </ComboboxPopup>
  </Combobox>
</FilterChipShell>
