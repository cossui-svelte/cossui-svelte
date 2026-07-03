<script lang="ts">
  import { getLocalTimeZone, today } from "@internationalized/date";
  import { RangeCalendar } from "$lib/components/ui/range-calendar";

  const start = today(getLocalTimeZone());
  let value = $state({ end: start.add({ days: 7 }), start });
</script>

<RangeCalendar bind:value />
