<script lang="ts">
  import { CalendarDate } from '@internationalized/date';
  import { type DateRange } from '#lib/components/ui/calendar/index.js';
  import { RangeCalendar } from '#lib/components/ui/range-calendar/index.js';

  let value = $state<DateRange>({
    start: new CalendarDate(2025, 6, 17),
    end: new CalendarDate(2025, 6, 20)
  });
</script>

<div class="flex min-w-0 flex-col gap-2">
  <RangeCalendar
    bind:value
    numberOfMonths={2}
    minValue={new CalendarDate(2025, 6, 1)}
    maxValue={new CalendarDate(2025, 7, 31)}
    class="rounded-lg border shadow-sm"
  />
  <div class="text-center text-xs text-muted-foreground">We are open in June and July only.</div>
</div>
