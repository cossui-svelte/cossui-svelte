<script lang="ts">
  import { CalendarDate } from '@internationalized/date';
  import { type DateRange } from '$lib/components/ui/calendar';
  import { RangeCalendar } from '$lib/components/ui/range-calendar';

  let value = $state<DateRange>({
    start: new CalendarDate(2025, 6, 9),
    end: new CalendarDate(2025, 6, 26)
  });
</script>

<RangeCalendar bind:value class="rounded-lg border shadow-sm" />
