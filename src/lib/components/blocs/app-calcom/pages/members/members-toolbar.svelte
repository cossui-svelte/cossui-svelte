<script lang="ts">
  import FunnelIcon from '@lucide/svelte/icons/funnel';
  import PlusIcon from '@lucide/svelte/icons/plus';
  import SearchIcon from '@lucide/svelte/icons/search';
  import SlidersHorizontalIcon from '@lucide/svelte/icons/sliders-horizontal';
  import { Button, buttonVariants } from '#lib/components/ui/button/index.js';
  import {
    Combobox,
    ComboboxCollection,
    ComboboxEmpty,
    ComboboxGroup,
    ComboboxGroupLabel,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
    ComboboxPopup,
    ComboboxTrigger
  } from '#lib/components/ui/combobox/index.js';
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput
  } from '#lib/components/ui/input-group/index.js';
  import {
    COLUMN_TOGGLE_ITEMS,
    type ColumnKey,
    type ColumnToggleItem,
    DEFAULT_COLUMN_VISIBILITY,
    ROLE_FILTER_ITEMS,
    type RoleFilter
  } from './members-data.js';

  let {
    searchValue = $bindable(''),
    roleFilter = $bindable('all'),
    columnVisibility,
    onColumnVisibilityChange
  }: {
    searchValue?: string;
    roleFilter?: RoleFilter;
    columnVisibility: Record<ColumnKey, boolean>;
    onColumnVisibilityChange: (next: Record<ColumnKey, boolean>) => void;
  } = $props();

  const columnToggleValue = $derived(
    COLUMN_TOGGLE_ITEMS.filter((item) => columnVisibility[item.value]).map((item) => item.value)
  );

  const roleFilterLabel = $derived(
    (ROLE_FILTER_ITEMS.find((item) => item.value === roleFilter) ?? ROLE_FILTER_ITEMS[0]).label
  );
</script>

<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
  <div class="flex flex-1 flex-wrap items-center gap-2">
    <InputGroup class="w-full sm:max-w-52">
      <InputGroupInput
        aria-label="Search members"
        bind:value={searchValue}
        placeholder="Search"
        type="search"
      />
      <InputGroupAddon>
        <SearchIcon aria-hidden="true" />
      </InputGroupAddon>
    </InputGroup>

    <Combobox
      autoHighlight
      items={COLUMN_TOGGLE_ITEMS}
      multiple
      onValueChange={(items: string[] | null) => {
        const selected = new Set(items ?? []);
        onColumnVisibilityChange(
          Object.fromEntries(
            COLUMN_TOGGLE_ITEMS.map((item) => [item.value, selected.has(item.value)])
          ) as Record<ColumnKey, boolean>
        );
      }}
      value={columnToggleValue}
    >
      <ComboboxTrigger aria-label="Display" class={buttonVariants({ variant: 'outline' })}>
        <SlidersHorizontalIcon aria-hidden="true" />
        Display
      </ComboboxTrigger>
      <ComboboxPopup align="start" aria-label="Toggle columns">
        <div class="border-b p-2">
          <ComboboxInput placeholder="Search" showTrigger={false} size="sm">
            {#snippet startAddon()}
              <SearchIcon aria-hidden="true" />
            {/snippet}
          </ComboboxInput>
        </div>
        <ComboboxEmpty>No columns found.</ComboboxEmpty>
        <ComboboxList>
          <ComboboxCollection>
            {#snippet children(item: ColumnToggleItem)}
              <ComboboxItem value={item.value} label={item.label}>{item.label}</ComboboxItem>
            {/snippet}
          </ComboboxCollection>
        </ComboboxList>
        <div class="border-t p-2">
          <Button
            class="w-full"
            onclick={() => onColumnVisibilityChange({ ...DEFAULT_COLUMN_VISIBILITY })}
            size="sm"
            variant="outline"
          >
            Show all columns
          </Button>
        </div>
      </ComboboxPopup>
    </Combobox>

    <Combobox
      items={ROLE_FILTER_ITEMS}
      onValueChange={(item: string | null) => {
        if (item) roleFilter = item as RoleFilter;
      }}
      value={roleFilter}
    >
      <ComboboxTrigger class={buttonVariants({ variant: 'outline' })}>
        <FunnelIcon aria-hidden="true" />
        <span>{roleFilterLabel}</span>
      </ComboboxTrigger>
      <ComboboxPopup align="start" aria-label="Filter by role">
        <ComboboxEmpty>No roles found.</ComboboxEmpty>
        <ComboboxList>
          <ComboboxGroup items={ROLE_FILTER_ITEMS}>
            <ComboboxGroupLabel>Role</ComboboxGroupLabel>
            <ComboboxCollection>
              {#snippet children(item: (typeof ROLE_FILTER_ITEMS)[number])}
                <ComboboxItem value={item.value} label={item.label}>{item.label}</ComboboxItem>
              {/snippet}
            </ComboboxCollection>
          </ComboboxGroup>
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>
  </div>

  <Button>
    <PlusIcon aria-hidden="true" />
    Add
  </Button>
</div>
