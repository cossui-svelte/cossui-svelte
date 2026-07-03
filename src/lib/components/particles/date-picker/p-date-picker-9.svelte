<script lang="ts">
  import { DateFormatter, type DateValue, getLocalTimeZone } from "@internationalized/date";
  import CalendarIcon from "@lucide/svelte/icons/calendar";
  import { buttonVariants } from "$lib/components/ui/button";
  import { Popover, PopoverPopup, PopoverTrigger } from "$lib/components/ui/popover";
  import { RangeCalendar } from "$lib/components/ui/range-calendar";
  import { cn } from "$lib/utils";

  const df = new DateFormatter("en-US", { dateStyle: "medium" });

  let value = $state<{ end: DateValue; start: DateValue } | undefined>(undefined);
</script>

<Popover>
  <PopoverTrigger class={cn(buttonVariants({ variant: "outline" }), "w-full justify-start")}>
    <CalendarIcon aria-hidden="true" />
    {#if value?.start}
      {#if value.end}
        {df.format(value.start.toDate(getLocalTimeZone()))} - {df.format(value.end.toDate(getLocalTimeZone()))}
      {:else}
        {df.format(value.start.toDate(getLocalTimeZone()))}
      {/if}
    {:else}
      <span>Pick a date range</span>
    {/if}
  </PopoverTrigger>
  <PopoverPopup>
    <RangeCalendar bind:value numberOfMonths={2} />
  </PopoverPopup>
</Popover>
