<script lang="ts" module>
  import { CalendarDate, type DateValue } from '@internationalized/date';
  import type { DateRange } from '#lib/components/ui/range-calendar/internal/types.js';

  type DateRangePreset = {
    focusMonth: Date;
    label: string;
    range: DateRange;
    value: string;
  };

  function subDays(date: Date, days: number): Date {
    const next = new Date(date);
    next.setDate(next.getDate() - days);
    return next;
  }

  function startOfDay(date: Date): Date {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  function endOfDay(date: Date): Date {
    const d = new Date(date);
    d.setHours(23, 59, 59, 999);
    return d;
  }

  function daysSinceMonday(date: Date): number {
    return (date.getDay() + 6) % 7;
  }

  function startOfWeekMonday(date: Date): Date {
    return startOfDay(subDays(date, daysSinceMonday(date)));
  }

  function endOfWeekMonday(date: Date): Date {
    const start = startOfWeekMonday(date);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return endOfDay(end);
  }

  function toCalendarDate(d: Date): CalendarDate {
    return new CalendarDate(d.getFullYear(), d.getMonth() + 1, d.getDate());
  }

  function toDateStr(d: DateValue): string {
    return d.toString();
  }

  function parseDateStr(s: string): CalendarDate | null {
    const parts = s.split('-');
    if (parts.length !== 3) {
      return null;
    }
    const y = Number(parts[0]);
    const m = Number(parts[1]);
    const d = Number(parts[2]);
    if (Number.isNaN(y) || Number.isNaN(m) || Number.isNaN(d)) {
      return null;
    }
    const date = new Date(y, m - 1, d);
    return Number.isNaN(date.getTime()) ? null : toCalendarDate(date);
  }

  function valuesToRange(v: string[] | undefined): DateRange | undefined {
    const fromStr = v?.[0];
    const toStr = v?.[1];
    if (!fromStr || !toStr) {
      return undefined;
    }
    const start = parseDateStr(fromStr);
    const end = parseDateStr(toStr);
    if (!start || !end) {
      return undefined;
    }
    return { end, start };
  }

  function rangeToValues(range: DateRange | undefined): string[] {
    if (!range?.start || !range?.end) {
      return [];
    }
    return [toDateStr(range.start), toDateStr(range.end)];
  }

  function rangeMatchesPreset(
    committed: DateRange | undefined,
    presetFrom: DateValue,
    presetTo: DateValue
  ): boolean {
    if (!committed?.start || !committed?.end) {
      return false;
    }
    return (
      toDateStr(committed.start) === toDateStr(presetFrom) &&
      toDateStr(committed.end) === toDateStr(presetTo)
    );
  }

  function inferDatePresetId(
    committed: DateRange | undefined,
    presets: readonly DateRangePreset[]
  ): string | null {
    if (!committed?.start || !committed?.end) {
      return null;
    }
    for (const p of presets) {
      if (
        p.range.start &&
        p.range.end &&
        rangeMatchesPreset(committed, p.range.start, p.range.end)
      ) {
        return p.value;
      }
    }
    return null;
  }

  const rangeFormatter = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  function formatRangeLabel(range: DateRange): string {
    const fmt = (d: DateValue): string => rangeFormatter.format(d.toDate('UTC'));
    if (!range.start) {
      return '';
    }
    if (!range.end) {
      return fmt(range.start);
    }
    return `${fmt(range.start)} – ${fmt(range.end)}`;
  }

  function dateRangeTriggerLabel(
    committed: DateRange | undefined,
    presets: DateRangePreset[]
  ): string {
    if (!committed?.start || !committed?.end) {
      return 'Select';
    }
    const id = inferDatePresetId(committed, presets);
    if (id) {
      const preset = presets.find((p) => p.value === id);
      if (preset) {
        return preset.label;
      }
    }
    return formatRangeLabel(committed);
  }
</script>

<script lang="ts">
  import ChevronsUpDownIcon from '@lucide/svelte/icons/chevrons-up-down';
  import { untrack } from 'svelte';
  import { Button, buttonVariants } from '#lib/components/ui/button/index.js';
  import { Popover, PopoverPopup, PopoverTrigger } from '#lib/components/ui/popover/index.js';
  import { RangeCalendar } from '#lib/components/ui/range-calendar/index.js';
  import { cn } from '#lib/utils.js';
  import FilterChipShell from './filter-chip-shell.svelte';
  import type { ActiveFilter, FilterField } from './filter-chip-types.js';

  let {
    autoOpen = false,
    field,
    filter,
    onRemove,
    onUpdate
  }: {
    autoOpen?: boolean;
    field: Extract<FilterField, { kind: 'dateRange' }>;
    filter: ActiveFilter;
    onRemove: () => void;
    onUpdate: (values: string[]) => void;
  } = $props();

  let open = $state(untrack(() => autoOpen));
  let hasAutoOpened = false;

  const today = new Date();
  const yesterday = subDays(today, 1);
  const thisWeekStart = startOfWeekMonday(today);
  const thisWeekEnd = endOfWeekMonday(today);
  const lastWeekStart = startOfWeekMonday(subDays(today, 7));
  const lastWeekEnd = endOfWeekMonday(subDays(today, 7));
  const thisMonthStart = startOfDay(new Date(today.getFullYear(), today.getMonth(), 1));
  const thisMonthEnd = endOfDay(new Date(today.getFullYear(), today.getMonth() + 1, 0));
  const lastMonthStart = startOfDay(new Date(today.getFullYear(), today.getMonth() - 1, 1));
  const lastMonthEnd = endOfDay(new Date(today.getFullYear(), today.getMonth(), 0));

  const presets: DateRangePreset[] = [
    {
      focusMonth: today,
      label: 'Today',
      range: { end: toCalendarDate(today), start: toCalendarDate(today) },
      value: 'today'
    },
    {
      focusMonth: yesterday,
      label: 'Yesterday',
      range: { end: toCalendarDate(yesterday), start: toCalendarDate(yesterday) },
      value: 'yesterday'
    },
    {
      focusMonth: thisWeekEnd,
      label: 'This week',
      range: { end: toCalendarDate(thisWeekEnd), start: toCalendarDate(thisWeekStart) },
      value: 'this-week'
    },
    {
      focusMonth: lastWeekEnd,
      label: 'Last week',
      range: { end: toCalendarDate(lastWeekEnd), start: toCalendarDate(lastWeekStart) },
      value: 'last-week'
    },
    {
      focusMonth: thisMonthEnd,
      label: 'This month',
      range: { end: toCalendarDate(thisMonthEnd), start: toCalendarDate(thisMonthStart) },
      value: 'this-month'
    },
    {
      focusMonth: lastMonthEnd,
      label: 'Last month',
      range: { end: toCalendarDate(lastMonthEnd), start: toCalendarDate(lastMonthStart) },
      value: 'last-month'
    }
  ];

  const committedRange = $derived(valuesToRange(filter.v));
  let month = $state<DateValue>(
    untrack(() => committedRange?.end ?? committedRange?.start ?? toCalendarDate(today))
  );
  let range = $state<DateRange | undefined>(untrack(() => committedRange));
  let selectedPresetId = $state<string | null>(null);

  $effect(() => {
    if (autoOpen && !hasAutoOpened) {
      open = true;
      hasAutoOpened = true;
    }
  });

  function applyRange(next: DateRange | undefined): void {
    range = next;
    const values = rangeToValues(next);
    if (values.length === 2) {
      onUpdate(values);
    }
  }

  function handleOpenChange(isOpen: boolean): void {
    open = isOpen;
    if (isOpen) {
      const next = valuesToRange(filter.v);
      range = next;
      month = next?.end ?? next?.start ?? toCalendarDate(today);
      selectedPresetId = inferDatePresetId(next, presets);
    } else if (!filter.v || filter.v.length < 2) {
      onRemove();
    }
  }

  function handleRangeChange(next: DateRange | undefined): void {
    range = next;
    if (next?.start && next.end) {
      onUpdate(rangeToValues(next));
      selectedPresetId = inferDatePresetId(next, presets);
    } else {
      selectedPresetId = null;
    }
  }
</script>

<FilterChipShell label={field.label} {onRemove}>
  <Popover onOpenChange={handleOpenChange} {open}>
    <PopoverTrigger
      class={cn(
        buttonVariants({ size: 'xs', variant: 'outline' }),
        !committedRange && 'justify-between'
      )}
    >
      {dateRangeTriggerLabel(committedRange, presets)}
      {#if !committedRange}
        <ChevronsUpDownIcon class="-me-1!" />
      {/if}
    </PopoverTrigger>
    <PopoverPopup align="start" class="p-0 transition-none">
      <div class="flex max-sm:flex-col">
        <div class="relative py-1 ps-1 max-sm:order-1 max-sm:border-t">
          <div class="flex h-full flex-col gap-0.5 sm:border-e sm:pe-3">
            {#each presets as preset (preset.value)}
              <Button
                class="w-full justify-start"
                data-pressed={selectedPresetId === preset.value ? '' : undefined}
                onclick={() => {
                  selectedPresetId = preset.value;
                  applyRange(preset.range);
                  month = toCalendarDate(preset.focusMonth);
                  open = false;
                }}
                size="sm"
                variant="ghost"
              >
                {preset.label}
              </Button>
            {/each}
          </div>
        </div>
        <RangeCalendar
          bind:placeholder={month}
          class="max-sm:pb-3 sm:ps-2"
          numberOfMonths={1}
          onValueChange={handleRangeChange}
          value={range}
        />
      </div>
    </PopoverPopup>
  </Popover>
</FilterChipShell>
