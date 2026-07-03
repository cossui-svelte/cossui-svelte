<script lang="ts">
  import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";
  import { Calendar } from "$lib/components/ui/calendar";

  let value = $state(today(getLocalTimeZone()));

  const minValue = new CalendarDate(1980, 7, 1);
  const currentYear = today(getLocalTimeZone()).year;
  const years = Array.from({ length: currentYear - minValue.year + 1 }, (_, i) => minValue.year + i);
</script>

<Calendar
  bind:value
  captionLayout="dropdown"
  class="[&_nav]:hidden"
  {minValue}
  type="single"
  {years}
/>
