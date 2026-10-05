<script lang="ts">
  import type { CalendarDate } from '@internationalized/date';
  import { getLocalTimeZone } from '@internationalized/date';
  import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
  import { buttonVariants } from '#lib/components/ui/button/index.js';
  import { Calendar } from '#lib/components/ui/calendar/index.js';
  import { Input } from '#lib/components/ui/input/index.js';
  import { Label } from '#lib/components/ui/label/index.js';
  import { Popover, PopoverPopup, PopoverTrigger } from '#lib/components/ui/popover/index.js';
  import { cn } from '#lib/utils.js';

  const id = $props.id();

  let open = $state(false);
  let value = $state<CalendarDate | undefined>();
</script>

<div class="flex gap-4">
  <div class="flex flex-col gap-3">
    <Label for="{id}-date" class="px-1">Date</Label>
    <Popover bind:open>
      <PopoverTrigger
        id="{id}-date"
        class={cn(buttonVariants({ variant: 'outline' }), 'w-32 justify-between font-normal')}
      >
        {value ? value.toDate(getLocalTimeZone()).toLocaleDateString() : 'Select date'}
        <ChevronDownIcon />
      </PopoverTrigger>
      <PopoverPopup class="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          bind:value
          onValueChange={() => {
            open = false;
          }}
          captionLayout="dropdown"
        />
      </PopoverPopup>
    </Popover>
  </div>
  <div class="flex flex-col gap-3">
    <Label for="{id}-time" class="px-1">Time</Label>
    <Input
      type="time"
      id="{id}-time"
      step="1"
      value="10:30:00"
      class="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
    />
  </div>
</div>
