<script lang="ts">
  import { getLocalTimeZone } from '@internationalized/date';
  import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
  import { buttonVariants } from '#lib/components/ui/button/index.js';
  import { type DateRange } from '#lib/components/ui/calendar/index.js';
  import { Label } from '#lib/components/ui/label/index.js';
  import { Popover, PopoverPopup, PopoverTrigger } from '#lib/components/ui/popover/index.js';
  import { RangeCalendar } from '#lib/components/ui/range-calendar/index.js';
  import { cn } from '#lib/utils.js';

  const id = $props.id();

  let open = $state(false);
  let value = $state<DateRange | undefined>();
</script>

<div class="flex flex-col gap-3">
  <Label for="{id}-dates" class="px-1">Select your stay</Label>
  <Popover bind:open>
    <PopoverTrigger
      id="{id}-dates"
      class={cn(buttonVariants({ variant: 'outline' }), 'w-56 justify-between font-normal')}
    >
      {value?.start && value?.end
        ? `${value.start.toDate(getLocalTimeZone()).toLocaleDateString()} - ${value.end.toDate(getLocalTimeZone()).toLocaleDateString()}`
        : 'Select date'}
      <ChevronDownIcon />
    </PopoverTrigger>
    <PopoverPopup class="w-auto overflow-hidden p-0" align="start">
      <RangeCalendar bind:value captionLayout="dropdown" />
    </PopoverPopup>
  </Popover>
</div>
