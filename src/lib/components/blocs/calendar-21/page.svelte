<script lang="ts">
  import { CalendarDate, isWeekend } from '@internationalized/date';
  import { type DateRange } from '$lib/components/ui/calendar';
  import { RangeCalendar, Day as RangeCalendarDay } from '$lib/components/ui/range-calendar';

  let value = $state<DateRange | undefined>({
    start: new CalendarDate(2025, 6, 12),
    end: new CalendarDate(2025, 6, 17)
  });
</script>

<RangeCalendar
  bind:value
  class="rounded-lg border shadow-sm [--cell-size:--spacing(11)] md:[--cell-size:--spacing(13)]"
  monthFormat="long"
  captionLayout="dropdown"
>
  {#snippet day({ day, outsideMonth })}
    {@const dayIsWeekend = isWeekend(day, 'en-US')}
    <RangeCalendarDay class="flex flex-col items-center">
      {day.day}
      {#if !outsideMonth}
        <span>
          {dayIsWeekend ? '$220' : '$100'}
        </span>
      {/if}
    </RangeCalendarDay>
  {/snippet}
</RangeCalendar>
