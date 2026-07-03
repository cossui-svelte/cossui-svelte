<script lang="ts">
  import { getLocalTimeZone, today } from "@internationalized/date";
  import { Calendar } from "$lib/components/ui/calendar";

  const todayValue = today(getLocalTimeZone());
  let value = $state([
    todayValue.subtract({ days: 17 }),
    todayValue.add({ days: 2 }),
    todayValue.add({ days: 6 }),
    todayValue.add({ days: 8 }),
  ]);
</script>

<Calendar bind:value type="multiple" />
