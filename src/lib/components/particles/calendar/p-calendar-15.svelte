<script lang="ts">
  import { type DateValue, getLocalTimeZone, today } from "@internationalized/date";
  import { Button } from "$lib/components/ui/button";
  import { Calendar } from "$lib/components/ui/calendar";

  const todayValue = today(getLocalTimeZone());
  const selectedDay = todayValue.subtract({ days: 28 });

  let placeholder = $state<DateValue>(selectedDay);
  let value = $state<DateValue | undefined>(selectedDay);
</script>

<div class="flex flex-col items-start gap-2">
  <Calendar bind:placeholder bind:value type="single" />
  <Button onclick={() => (placeholder = todayValue)} size="sm" variant="outline">
    Current month
  </Button>
</div>
