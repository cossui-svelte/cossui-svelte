<script lang="ts">
  import { type CalendarDate, getLocalTimeZone, today } from '@internationalized/date';
  import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
  import { buttonVariants } from '$lib/components/ui/button';
  import { Calendar } from '$lib/components/ui/calendar';
  import { Label } from '$lib/components/ui/label';
  import { Popover, PopoverPopup, PopoverTrigger } from '$lib/components/ui/popover';
  import { cn } from '$lib/utils';

  const id = $props.id();

  let open = $state(false);
  let value = $state<CalendarDate | undefined>();
</script>

<div class="flex flex-col gap-3">
  <Label for="{id}-date" class="px-1">Date of birth</Label>
  <Popover bind:open>
    <PopoverTrigger
      id="{id}-date"
      class={cn(buttonVariants({ variant: 'outline' }), 'w-48 justify-between font-normal')}
    >
      {value ? value.toDate(getLocalTimeZone()).toLocaleDateString() : 'Select date'}
      <ChevronDownIcon />
    </PopoverTrigger>
    <PopoverPopup class="w-auto overflow-hidden p-0" align="start">
      <Calendar
        mode="single"
        bind:value
        captionLayout="dropdown"
        onValueChange={() => {
    open = false;
  }}
        maxValue={today(getLocalTimeZone())}
      />
    </PopoverPopup>
  </Popover>
</div>
