<script lang="ts">
  import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";
  import { Calendar } from "$lib/components/ui/calendar";

  let value = $state(today(getLocalTimeZone()));

  const minValue = new CalendarDate(1930, 1, 1);
  const maxValue = new CalendarDate(2030, 12, 31);
  const years = Array.from({ length: maxValue.year - minValue.year + 1 }, (_, i) => minValue.year + i);
</script>

<Calendar
  bind:value
  captionLayout="dropdown"
  {maxValue}
  {minValue}
  type="single"
  {years}
/>
