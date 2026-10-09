<script lang="ts">
  import RepeatIcon from '@lucide/svelte/icons/repeat';
  import { Popover, PopoverPopup, PopoverTrigger } from '#lib/components/ui/popover/index.js';
  import { cn } from '#lib/utils.js';
  import { recurringDatesPreview } from './booking-timezones.js';

  let { count }: { count: number } = $props();
</script>

<Popover>
  <PopoverTrigger
    class="relative flex cursor-pointer items-center gap-1 px-0.5 text-muted-foreground text-xs decoration-current/32 decoration-dotted underline-offset-2 hover:text-foreground hover:underline"
    onclick={(event: MouseEvent) => event.stopPropagation()}
    openOnHover
    type="button"
  >
    <RepeatIcon class="size-3 opacity-80" aria-hidden="true" />
    {count}
    {count === 1 ? 'event' : 'events'} remaining
  </PopoverTrigger>
  <PopoverPopup side="top" tooltipStyle>
    <div class="tabular-nums">
      {#each recurringDatesPreview as date (date.label)}
        <div class={cn(date.completed && 'line-through')}>
          {date.label}
        </div>
      {/each}
    </div>
  </PopoverPopup>
</Popover>
