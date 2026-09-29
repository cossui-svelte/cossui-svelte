<script lang="ts">
  import { CalendarDate, type DateValue, getLocalTimeZone } from '@internationalized/date';
  import CalendarIcon from '@lucide/svelte/icons/calendar';
  import { untrack } from 'svelte';
  import { buttonVariants } from '$lib/components/ui/button';
  import { Calendar } from '$lib/components/ui/calendar';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Popover, PopoverPopup, PopoverTrigger } from '$lib/components/ui/popover';
  import { cn } from '$lib/utils';

  function formatDate(date: DateValue | undefined) {
    if (!date) return '';
    return date.toDate(getLocalTimeZone()).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }

  function isValidDate(date: Date | undefined): date is Date {
    if (!date) return false;
    return !isNaN(date.getTime());
  }

  const id = $props.id();
  let value = $state<DateValue | undefined>(new CalendarDate(2025, 6, 1));
  let open = $state(false);
  let inputValue = $state(untrack(() => formatDate(value)));
</script>

<div class="flex flex-col gap-3">
  <Label for="{id}-date" class="px-1">Subscription Date</Label>
  <div class="relative flex gap-2">
    <Input
      id="{id}-date"
      placeholder="June 01, 2025"
      class="bg-background pe-10"
      bind:value={
        () => inputValue,
        (v) => {
          const date = new Date(v);
          inputValue = v;
          if (isValidDate(date)) {
            value = new CalendarDate(date.getFullYear(), date.getMonth(), date.getDate());
          }
        }
      }
      onkeydown={(e) => {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          open = true;
        }
      }}
    />
    <Popover bind:open>
      <PopoverTrigger
        id="{id}-date-picker"
        class={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute end-2 top-1/2 size-6 -translate-y-1/2'
        )}
      >
        <CalendarIcon class="size-3.5" />
        <span class="sr-only">Select date</span>
      </PopoverTrigger>
      <PopoverPopup class="w-auto overflow-hidden p-0" align="end" alignOffset={-8} sideOffset={10}>
        <Calendar
          mode="single"
          bind:value
          captionLayout="dropdown"
          onValueChange={(v) => {
            inputValue = formatDate(v);
            open = false;
          }}
        />
      </PopoverPopup>
    </Popover>
  </div>
</div>
