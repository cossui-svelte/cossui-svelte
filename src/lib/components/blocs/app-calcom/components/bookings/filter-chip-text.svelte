<script lang="ts" module>
  import type { TextFilterOperator } from './filter-chip-types.js';

  const TEXT_FILTER_OPERATORS: {
    label: string;
    value: TextFilterOperator;
  }[] = [
    { label: 'is', value: 'is' },
    { label: 'is not', value: 'is-not' },
    { label: 'contains', value: 'contains' },
    { label: 'does not contain', value: 'does-not-contain' },
    { label: 'starts with', value: 'starts-with' },
    { label: 'ends with', value: 'ends-with' },
    { label: 'is empty', value: 'is-empty' },
    { label: 'not empty', value: 'not-empty' }
  ];

  const textFilterSelectItems = TEXT_FILTER_OPERATORS.map(({ label, value }) => ({
    label,
    value
  }));

  function textOperatorNeedsValue(op: TextFilterOperator): boolean {
    return op !== 'is-empty' && op !== 'not-empty';
  }

  function textFilterOperatorLabel(op: TextFilterOperator): string {
    return TEXT_FILTER_OPERATORS.find((o) => o.value === op)?.label ?? 'is';
  }
</script>

<script lang="ts">
  import ChevronsUpDownIcon from '@lucide/svelte/icons/chevrons-up-down';
  import { untrack } from 'svelte';
  import { Badge } from '#lib/components/ui/badge/index.js';
  import { Button, buttonVariants } from '#lib/components/ui/button/index.js';
  import { Input } from '#lib/components/ui/input/index.js';
  import { Popover, PopoverPopup, PopoverTrigger } from '#lib/components/ui/popover/index.js';
  import {
    Select,
    SelectItem,
    SelectPopup,
    SelectTrigger,
    SelectValue
  } from '#lib/components/ui/select/index.js';
  import { cn } from '#lib/utils.js';
  import FilterChipShell from './filter-chip-shell.svelte';
  import {
    type ActiveFilter,
    type FilterField,
    isTextFilterComplete
  } from './filter-chip-types.js';

  let {
    autoOpen = false,
    field,
    filter,
    onRemove,
    onUpdate
  }: {
    autoOpen?: boolean;
    field: Extract<FilterField, { kind: 'text' }>;
    filter: ActiveFilter;
    onRemove: () => void;
    onUpdate: (values: string[], op: TextFilterOperator) => void;
  } = $props();

  let open = $state(untrack(() => autoOpen));
  let hasAutoOpened = false;
  let draftOp = $state<TextFilterOperator>(
    untrack(() => (filter.op ?? 'is') as TextFilterOperator)
  );
  let draftValue = $state(untrack(() => filter.v?.[0] ?? ''));

  $effect(() => {
    if (autoOpen && !hasAutoOpened) {
      open = true;
      hasAutoOpened = true;
    }
  });

  function handleOpenChange(isOpen: boolean): void {
    open = isOpen;
    if (isOpen) {
      draftOp = (filter.op ?? 'is') as TextFilterOperator;
      draftValue = filter.v?.[0] ?? '';
    } else if (!isTextFilterComplete(filter)) {
      onRemove();
    }
  }

  const applyDisabled = $derived(textOperatorNeedsValue(draftOp) && draftValue.trim().length === 0);

  function handleApply(): void {
    if (applyDisabled) {
      return;
    }
    if (textOperatorNeedsValue(draftOp)) {
      onUpdate([draftValue.trim()], draftOp);
    } else {
      onUpdate([], draftOp);
    }
    open = false;
  }

  const incomplete = $derived(!isTextFilterComplete(filter));
  const committedOp = $derived((filter.op ?? 'is') as TextFilterOperator);
  const committedValue = $derived(filter.v?.[0]?.trim());
</script>

<FilterChipShell label={field.label} {onRemove}>
  <Popover onOpenChange={handleOpenChange} {open}>
    <PopoverTrigger
      class={cn(
        buttonVariants({ size: 'xs', variant: 'outline' }),
        'min-w-0 gap-2',
        incomplete ? 'justify-between' : 'justify-start'
      )}
    >
      <span class="flex min-w-0 flex-1 items-center gap-2">
        <Badge size="sm" variant="secondary">
          {textFilterOperatorLabel(committedOp)}
        </Badge>
        {#if textOperatorNeedsValue(committedOp)}
          {#if committedValue}
            <span class="min-w-0 truncate">{committedValue}</span>
          {:else}
            <span aria-label="Select value" class="text-muted-foreground">…</span>
          {/if}
        {/if}
      </span>
      {#if incomplete}
        <ChevronsUpDownIcon class="-me-1!" />
      {/if}
    </PopoverTrigger>
    <PopoverPopup align="start" class="min-w-64 transition-none">
      <div class="flex flex-col gap-2">
        <Select
          aria-label="match type"
          items={textFilterSelectItems}
          onValueChange={(next: string | null) => {
            if (next) {
              draftOp = next as TextFilterOperator;
            }
          }}
          value={draftOp}
        >
          <SelectTrigger class="rounded-md before:rounded-[calc(var(--radius-md)-1px)]" size="sm">
            <SelectValue placeholder="match type" />
          </SelectTrigger>
          <SelectPopup>
            {#each TEXT_FILTER_OPERATORS as { label: opLabel, value } (value)}
              <SelectItem {value}>
                {opLabel}
              </SelectItem>
            {/each}
          </SelectPopup>
        </Select>
        {#if textOperatorNeedsValue(draftOp)}
          <Input
            aria-label={`${field.label} value`}
            bind:value={draftValue}
            class="rounded-md before:rounded-[calc(var(--radius-md)-1px)]"
            placeholder={`Enter ${field.label.toLowerCase()}`}
            size="sm"
            type="text"
          />
        {/if}
        <Button
          class="rounded-md before:rounded-[calc(var(--radius-md)-1px)]"
          disabled={applyDisabled}
          onclick={handleApply}
          size="sm"
          type="button"
          variant="outline"
        >
          Apply
        </Button>
      </div>
    </PopoverPopup>
  </Popover>
</FilterChipShell>
