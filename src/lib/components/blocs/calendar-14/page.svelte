<script lang="ts">
  import { CalendarDate } from '@internationalized/date';
  import { Calendar } from '$lib/components/ui/calendar';

  let value = $state<CalendarDate | undefined>(new CalendarDate(2025, 6, 12));

  const bookedDates = Array.from({ length: 12 }, (_, i) => new CalendarDate(2025, 6, 15 + i));
</script>

<Calendar
  mode="single"
  bind:value
  class="rounded-lg border shadow-sm"
  isDateUnavailable={(date) => bookedDates.some((d) => d.compare(date) === 0)}
/>
