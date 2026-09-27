<script lang="ts">
  import { CalendarDate, type DateValue, getLocalTimeZone } from '@internationalized/date';
  import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
  import { formatDateRange } from 'little-date';
  import { buttonVariants } from '$lib/components/ui/button';
  import { type DateRange } from '$lib/components/ui/calendar';
  import { Label } from '$lib/components/ui/label';
  import { Popover, PopoverPopup, PopoverTrigger } from '$lib/components/ui/popover';
  import { RangeCalendar } from '$lib/components/ui/range-calendar';
  import { cn } from '$lib/utils';

  const id = $props.id();

  let value = $state<DateRange | undefined>({
    start: new CalendarDate(2025, 6, 4),
    end: new CalendarDate(2025, 6, 10)
  });

  function formatRange(start: DateValue, end: DateValue) {
    return formatDateRange(start.toDate(getLocalTimeZone()), end.toDate(getLocalTimeZone()), {
      includeTime: false
    });
  }
</script>

<div class="flex flex-col gap-3">
  <Label for="{id}-dates" class="px-1">Select your stay</Label>
  <Popover>
    <PopoverTrigger
      id="{id}-dates"
      class={cn(buttonVariants({ variant: 'outline' }), 'w-56 justify-between font-normal')}
    >
      {#if value?.start && value?.end}
        {formatRange(value.start, value.end)}
      {:else}
        Select date
      {/if}
      <ChevronDownIcon />
    </PopoverTrigger>
    <PopoverPopup class="w-auto overflow-hidden p-0" align="start">
      <RangeCalendar bind:value captionLayout="dropdown" />
    </PopoverPopup>
  </Popover>
</div>
