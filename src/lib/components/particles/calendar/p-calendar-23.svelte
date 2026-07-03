<script lang="ts">
  import { getLocalTimeZone, today } from "@internationalized/date";
  import { RangeCalendar } from "$lib/components/ui/range-calendar";

  const todayValue = today(getLocalTimeZone());
  let value = $state({ end: todayValue.add({ days: 48 }), start: todayValue });
</script>

<RangeCalendar
  bind:value
  class="**:data-outside-month:invisible [&>div]:gap-8 md:[&>div]:flex-row sm:[&>div]:flex-col"
  numberOfMonths={3}
  pagedNavigation
/>
