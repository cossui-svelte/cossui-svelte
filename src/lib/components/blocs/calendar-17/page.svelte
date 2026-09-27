<script lang="ts">
  import { CalendarDate } from '@internationalized/date';
  import { Calendar } from '$lib/components/ui/calendar';
  import { Card, CardFooter, CardPanel } from '$lib/components/ui/card';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';

  let value = $state<CalendarDate | undefined>(new CalendarDate(2025, 6, 12));
</script>

<Card class="w-fit py-4">
  <CardPanel class="px-4">
    <Calendar mode="single" bind:value class="bg-transparent p-0 [--cell-size:--spacing(10.5)]" />
  </CardPanel>
  <CardFooter class="flex gap-2 border-t px-4 !pt-4 *:[div]:w-full">
    <div>
      <Label for="time-from" class="sr-only">Start Time</Label>
      <Input
        id="time-from"
        type="time"
        step="1"
        value="10:30:00"
        class="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
      />
    </div>
    <span>-</span>
    <div>
      <Label for="time-to" class="sr-only">End Time</Label>
      <Input
        id="time-to"
        type="time"
        step="1"
        value="12:30:00"
        class="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
      />
    </div>
  </CardFooter>
</Card>
