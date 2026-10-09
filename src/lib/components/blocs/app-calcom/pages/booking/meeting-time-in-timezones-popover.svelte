<script lang="ts">
  import { Popover, PopoverPopup, PopoverTrigger } from '#lib/components/ui/popover/index.js';
  import type { Booking } from '../../lib/mock-bookings-data.js';
  import { getMeetingTimezoneEntries } from './booking-timezones.js';

  let { booking, timeStr }: { booking: Booking; timeStr: string } = $props();

  const userTimeZone = $derived(booking.user?.timeZone ?? 'Europe/Rome');
  const timezoneEntries = $derived(getMeetingTimezoneEntries(booking, userTimeZone));
</script>

{#if timezoneEntries.length <= 1}
  <p class="text-muted-foreground text-sm">{timeStr}</p>
{:else}
  <Popover>
    <PopoverTrigger
      class="relative cursor-pointer text-left text-muted-foreground text-sm decoration-current/32 decoration-dotted underline-offset-2 hover:text-foreground hover:underline"
      onclick={(event: MouseEvent) => event.stopPropagation()}
      openOnHover
      type="button"
    >
      {timeStr}
    </PopoverTrigger>
    <PopoverPopup side="top" tooltipStyle>
      <div class="tabular-nums">
        {#each timezoneEntries as entry (entry.timeZone)}
          <div class="not-first:mt-2">
            <div class="inline-flex items-baseline gap-2">
              <span>
                {entry.startTime} - {entry.endTime}
              </span>
              {#if entry.dayOffset !== 0}
                <span
                  class="inline-flex size-5 items-center justify-center rounded-full bg-muted text-[10px]"
                >
                  {entry.dayOffset > 0 ? '+1' : '-1'}
                </span>
              {/if}
            </div>
            <div class="text-muted-foreground">{entry.timeZone}</div>
          </div>
        {/each}
      </div>
    </PopoverPopup>
  </Popover>
{/if}
