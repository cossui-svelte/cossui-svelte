<script lang="ts">
  import { CalendarDate } from '@internationalized/date';
  import { Calendar } from '#lib/components/ui/calendar/index.js';

  let value = $state<CalendarDate | undefined>(new CalendarDate(2025, 6, 12));
</script>

<Calendar
  mode="single"
  bind:value
  class="rounded-lg border shadow-sm"
  minValue={new CalendarDate(2025, 6, 12)}
/>
