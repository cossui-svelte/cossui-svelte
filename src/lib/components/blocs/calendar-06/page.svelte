<script lang="ts">
  import { CalendarDate } from '@internationalized/date';
  import { type DateRange } from '#lib/components/ui/calendar/index.js';
  import { RangeCalendar } from '#lib/components/ui/range-calendar/index.js';

  let value = $state<DateRange>({
    start: new CalendarDate(2025, 6, 12),
    end: new CalendarDate(2025, 6, 26)
  });
</script>

<div class="flex min-w-0 flex-col gap-2">
  <RangeCalendar bind:value minDays={5} class="rounded-lg border shadow-sm" />
  <div class="text-center text-xs text-muted-foreground">A minimum of 5 days is required</div>
</div>
