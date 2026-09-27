<script lang="ts">
  import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date';
  import { Button } from '$lib/components/ui/button';
  import { Calendar } from '$lib/components/ui/calendar';
  import {
    Card,
    CardAction,
    CardDescription,
    CardHeader,
    CardPanel,
    CardTitle
  } from '$lib/components/ui/card';

  let value = $state<CalendarDate | undefined>(new CalendarDate(2025, 6, 12));
</script>

<Card>
  <CardHeader>
    <CardTitle>Appointment</CardTitle>
    <CardDescription>Find a date.</CardDescription>
    <CardAction>
      <Button size="sm" variant="outline" onclick={() => (value = today(getLocalTimeZone()))}>
        Today
      </Button>
    </CardAction>
  </CardHeader>
  <CardPanel>
    <Calendar mode="single" bind:value class="bg-transparent p-0" />
  </CardPanel>
</Card>
