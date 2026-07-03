<script lang="ts">
  import { getLocalTimeZone, today } from "@internationalized/date";
  import { Day, RangeCalendar } from "$lib/components/ui/range-calendar";

  const todayValue = today(getLocalTimeZone());
  let value = $state({ end: todayValue.add({ days: 3 }), start: todayValue });
</script>

<RangeCalendar bind:value>
  {#snippet day()}
    <Day class="rounded-full" />
  {/snippet}
</RangeCalendar>
