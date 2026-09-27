<script lang="ts">
  import type { CalendarDate } from '@internationalized/date';
  import { getLocalTimeZone } from '@internationalized/date';
  import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
  import { buttonVariants } from '$lib/components/ui/button';
  import { Calendar } from '$lib/components/ui/calendar';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Popover, PopoverPopup, PopoverTrigger } from '$lib/components/ui/popover';
  import { cn } from '$lib/utils';

  const id = $props.id();

  let openFrom = $state(false);
  let openTo = $state(false);
  let valueFrom = $state<CalendarDate | undefined>();
  let valueTo = $state<CalendarDate | undefined>();
</script>

<div class="flex flex-col gap-6">
  <div class="flex gap-4">
    <div class="flex flex-1 flex-col gap-3">
      <Label for="{id}-date-from" class="px-1">Check-in</Label>
      <Popover bind:open={openFrom}>
        <PopoverTrigger
          id="{id}-date-from"
          class={cn(buttonVariants({ variant: 'outline' }), 'w-full justify-between font-normal')}
        >
          {valueFrom
    ? valueFrom.toDate(getLocalTimeZone()).toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
    : 'Select date'}
          <ChevronDownIcon />
        </PopoverTrigger>
        <PopoverPopup class="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            bind:value={valueFrom}
            captionLayout="dropdown"
            onValueChange={() => {
    openFrom = false;
  }}
          />
        </PopoverPopup>
      </Popover>
    </div>
    <div class="flex flex-col gap-3">
      <Label for="{id}-time-from" class="invisible px-1">From</Label>
      <Input
        type="time"
        id="{id}-time-from"
        step="1"
        value="10:30:00"
        class="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
      />
    </div>
  </div>
  <div class="flex gap-4">
    <div class="flex flex-1 flex-col gap-3">
      <Label for="{id}-date-to" class="px-1">Check-out</Label>
      <Popover bind:open={openTo}>
        <PopoverTrigger
          id="{id}-date-to"
          class={cn(buttonVariants({ variant: 'outline' }), 'w-full justify-between font-normal')}
        >
          {valueTo
    ? valueTo.toDate(getLocalTimeZone()).toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
    : 'Select date'}
          <ChevronDownIcon />
        </PopoverTrigger>
        <PopoverPopup class="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            bind:value={valueTo}
            captionLayout="dropdown"
            onValueChange={() => {
    openTo = false;
  }}
            isDateDisabled={(date) => {
    return (valueFrom && date.compare(valueFrom) < 0) ?? false;
  }}
          />
        </PopoverPopup>
      </Popover>
    </div>
    <div class="flex flex-col gap-3">
      <Label for="{id}-time-to" class="invisible px-1">To</Label>
      <Input
        type="time"
        id="{id}-time-to"
        step="1"
        value="12:30:00"
        class="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
      />
    </div>
  </div>
</div>
