<script lang="ts">
  import { CalendarDate } from '@internationalized/date';
  import Clock2Icon from '@lucide/svelte/icons/clock-2';
  import { Calendar } from '#lib/components/ui/calendar/index.js';
  import { Card, CardFooter, CardPanel } from '#lib/components/ui/card/index.js';
  import { Input } from '#lib/components/ui/input/index.js';
  import { Label } from '#lib/components/ui/label/index.js';

  let value = $state<CalendarDate | undefined>(new CalendarDate(2025, 6, 12));
</script>

<Card class="w-fit py-4">
  <CardPanel class="px-4">
    <Calendar mode="single" bind:value class="bg-transparent p-0" />
  </CardPanel>
  <CardFooter class="flex flex-col gap-6 border-t px-4 !pt-4">
    <div class="flex w-full flex-col gap-3">
      <Label for="time-from">Start Time</Label>
      <div class="relative flex w-full items-center gap-2">
        <Clock2Icon
          class="pointer-events-none absolute start-2.5 size-4 text-muted-foreground select-none"
        />
        <Input
          id="time-from"
          type="time"
          step="1"
          value="10:30:00"
          class="appearance-none ps-8 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
    </div>
    <div class="flex w-full flex-col gap-3">
      <Label for="time-to">End Time</Label>
      <div class="relative flex w-full items-center gap-2">
        <Clock2Icon
          class="pointer-events-none absolute start-2.5 size-4 text-muted-foreground select-none"
        />
        <Input
          id="time-to"
          type="time"
          step="1"
          value="12:30:00"
          class="appearance-none ps-8 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
    </div>
  </CardFooter>
</Card>
