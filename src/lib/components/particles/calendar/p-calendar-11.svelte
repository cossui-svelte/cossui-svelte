<script lang="ts">
  import { getLocalTimeZone, today } from "@internationalized/date";
  import { Calendar } from "$lib/components/ui/calendar";

  let value = $state(today(getLocalTimeZone()));
</script>

<Calendar
  bind:value
  class="[&_header]:me-[calc(var(--cell-size)*2)] [&_header]:ms-0 [&_header]:justify-start [&_nav]:justify-end"
  type="single"
/>
