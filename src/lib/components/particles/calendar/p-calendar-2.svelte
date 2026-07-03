<script lang="ts">
  import { getLocalTimeZone, today } from "@internationalized/date";
  import { Calendar } from "$lib/components/ui/calendar";

  let value = $state(today(getLocalTimeZone()));
</script>

<Calendar
  bind:value
  class="[--cell-size:--spacing(11)] sm:[--cell-size:--spacing(10)]"
  type="single"
/>
