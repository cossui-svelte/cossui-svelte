<script lang="ts">
  import { CalendarDate } from '@internationalized/date';
  import { type DateRange } from '#lib/components/ui/calendar/index.js';
  import { RangeCalendar } from '#lib/components/ui/range-calendar/index.js';

  let value = $state<DateRange>({
    start: new CalendarDate(2025, 6, 12),
    end: new CalendarDate(2025, 7, 15)
  });
</script>

<RangeCalendar bind:value class="rounded-lg border shadow-sm" numberOfMonths={2} />
