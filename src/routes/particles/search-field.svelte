<script lang="ts">
  import Search from '@lucide/svelte/icons/search';
  import Tag from '@lucide/svelte/icons/tag';
  import {
    Combobox,
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput,
    ComboboxGroup,
    ComboboxGroupLabel,
    ComboboxItem,
    ComboboxList,
    ComboboxPopup,
    ComboboxSeparator
  } from '$lib/components/ui/combobox';
  import { allParticles } from '$lib/registry/registry-particles';

  export interface SearchItem {
    label: string;
    value: string;
  }

  let {
    items,
    selectedItems,
    onItemsChange
  }: {
    items: SearchItem[];
    selectedItems: SearchItem[];
    onItemsChange: (items: SearchItem[]) => void;
  } = $props();

  let inputValue = $state('');
  let isOpen = $state(selectedItems.length === 0);

  $effect(() => {
    if (selectedItems.length === 0) isOpen = true;
  });

  const selectedValues = $derived(selectedItems.map((i) => i.value));

  const groupedItems = $derived.by(() => {
    const q = inputValue.toLowerCase();
    const visible = q ? items.filter((i) => i.label.toLowerCase().includes(q)) : items;

    const enabled: SearchItem[] = [];
    const disabled: SearchItem[] = [];

    for (const item of visible) {
      if (selectedValues.includes(item.value)) {
        enabled.push(item);
        continue;
      }
      const testValues = [...selectedValues, item.value];
      const hasMatches = Object.values(allParticles).some((p) => {
        const cats = p.tags ?? [];
        return testValues.every((v) => cats.includes(v));
      });
      if (hasMatches) enabled.push(item);
      else disabled.push(item);
    }

    const matchRank = (label: string) => {
      if (!q) return 0;
      const lower = label.toLowerCase();
      if (lower === q) return 0;
      if (lower.startsWith(q)) return 1;
      if (lower.includes(` ${q}`)) return 2;
      return 3;
    };

    const sortedEnabled = [...enabled].sort((a, b) => {
      const aSelected = selectedValues.includes(a.value);
      const bSelected = selectedValues.includes(b.value);
      if (aSelected && !bSelected) return -1;
      if (!aSelected && bSelected) return 1;
      const rankDiff = matchRank(a.label) - matchRank(b.label);
      if (rankDiff !== 0) return rankDiff;
      return a.label.localeCompare(b.label, undefined, { numeric: true });
    });

    const sortedDisabled = [...disabled].sort((a, b) =>
      a.label.localeCompare(b.label, undefined, { numeric: true })
    );

    return { disabled: sortedDisabled, enabled: sortedEnabled };
  });

  function matchParts(label: string) {
    const q = inputValue.trim();
    if (!q) return [{ text: label, match: false }];

    const index = label.toLowerCase().indexOf(q.toLowerCase());
    if (index === -1) return [{ text: label, match: false }];

    return [
      { text: label.slice(0, index), match: false },
      { text: label.slice(index, index + q.length), match: true },
      { text: label.slice(index + q.length), match: false }
    ].filter((part) => part.text.length > 0);
  }

  function handleValueChange(newValues: string[]) {
    const newItems = newValues
      .map((v) => items.find((i) => i.value === v))
      .filter((i): i is SearchItem => !!i);
    onItemsChange(newItems);
    inputValue = '';
    isOpen = false;
  }
</script>

<div class="mx-auto max-w-2xl">
  <Combobox
    multiple
    autoHighlight
    value={selectedValues}
    onValueChange={handleValueChange}
    open={isOpen}
    onOpenChange={(v) => (isOpen = v)}
    {inputValue}
  >
    <ComboboxChips
      class="rounded-xl p-[calc(--spacing(2)-1px)] before:rounded-xl **:data-[slot=combobox-start-addon]:[&_svg]:-me-0.5"
    >
      {#snippet startAddon()}
        <Search class="size-5.5 sm:size-5" strokeWidth={2} />
      {/snippet}
      {#each selectedItems as item (item.value)}
        <ComboboxChip>
          <div class="flex items-center gap-1.5">
            <Tag class="size-3 opacity-80" strokeWidth={2} />
            <span>{item.label}</span>
          </div>
        </ComboboxChip>
      {/each}
      <ComboboxChipsInput
        size="lg"
        oninput={(e) => (inputValue = (e.currentTarget as HTMLInputElement).value)}
        placeholder={selectedItems.length === 0 ? 'Search components...' : ''}
        aria-label="Filter particles"
      />
    </ComboboxChips>

    <ComboboxPopup>
      <ComboboxList>
        {#if groupedItems.enabled.length === 0 && groupedItems.disabled.length === 0}
          <div class="p-2 text-center text-muted-foreground text-sm">No filters found.</div>
        {/if}

        {#if groupedItems.enabled.length > 0}
          <ComboboxGroup>
            <ComboboxGroupLabel>Filter particles</ComboboxGroupLabel>
            {#each groupedItems.enabled as item (item.value)}
              <ComboboxItem value={item.value} label={item.label}>
                <Tag class="size-3.5 opacity-80" strokeWidth={2} />
                <span>
                  {#each matchParts(item.label) as part, i (i)}
                    {#if part.match}
                      <mark class="rounded-xs bg-primary/20 text-inherit">{part.text}</mark>
                    {:else}
                      {part.text}
                    {/if}
                  {/each}
                </span>
              </ComboboxItem>
            {/each}
          </ComboboxGroup>
        {/if}

        {#if groupedItems.disabled.length > 0}
          <ComboboxSeparator />
          <ComboboxGroup>
            <ComboboxGroupLabel>No matches</ComboboxGroupLabel>
            {#each groupedItems.disabled as item (item.value)}
              <ComboboxItem value={item.value} label={item.label} disabled>
                <Tag class="size-3.5 opacity-80" strokeWidth={2} />
                <span>
                  {#each matchParts(item.label) as part, i (i)}
                    {#if part.match}
                      <mark class="rounded-xs bg-primary/20 text-inherit">{part.text}</mark>
                    {:else}
                      {part.text}
                    {/if}
                  {/each}
                </span>
              </ComboboxItem>
            {/each}
          </ComboboxGroup>
        {/if}
      </ComboboxList>
    </ComboboxPopup>
  </Combobox>
</div>
