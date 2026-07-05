<script lang="ts">
  import { getLocalTimeZone, today } from "@internationalized/date";
  import { Calendar } from "$lib/components/ui/calendar";

  let value = $state(today(getLocalTimeZone()));
</script>

<Calendar mode="single" bind:value />
