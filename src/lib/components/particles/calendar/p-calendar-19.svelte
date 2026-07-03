<script lang="ts">
  import { type DateValue, DateFormatter, getLocalTimeZone, today } from "@internationalized/date";
  import { Calendar } from "$lib/components/ui/calendar";
  import { ScrollArea } from "$lib/components/ui/scroll-area";
  import { ToggleGroup, ToggleGroupItem } from "$lib/components/ui/toggle-group";

  const todayValue = today(getLocalTimeZone());
  let date = $state<DateValue>(todayValue);
  let time = $state<string | undefined>(undefined);

  const timeSlots = [
    { available: false, time: "09:00" },
    { available: false, time: "09:30" },
    { available: true, time: "10:00" },
    { available: true, time: "10:30" },
    { available: true, time: "11:00" },
    { available: true, time: "11:30" },
    { available: false, time: "12:00" },
    { available: true, time: "12:30" },
    { available: true, time: "13:00" },
    { available: true, time: "13:30" },
    { available: true, time: "14:00" },
    { available: false, time: "14:30" },
    { available: false, time: "15:00" },
    { available: true, time: "15:30" },
    { available: true, time: "16:00" },
    { available: true, time: "16:30" },
    { available: true, time: "17:00" },
    { available: true, time: "17:30" },
  ];

  const dayFormatter = new DateFormatter("en-US", { day: "numeric", weekday: "long" });

  function isDateDisabled(d: DateValue): boolean {
    return d.compare(todayValue) < 0;
  }
</script>

<div class="flex max-sm:flex-col">
  <Calendar
    bind:value={date}
    class="max-sm:pb-3 sm:pe-5"
    {isDateDisabled}
    onValueChange={(newDate) => {
      if (newDate) {
        time = undefined;
      }
    }}
    type="single"
  />
  <div class="relative w-full max-sm:h-48 sm:w-40">
    <div class="absolute inset-0 max-sm:border-t">
      <ScrollArea class="h-full sm:border-s" scrollbarGutter scrollFade>
        <div class="flex flex-col gap-3 py-3 sm:pt-0 sm:pb-2">
          <div class="flex shrink-0 items-center font-medium text-sm sm:h-8 sm:px-5">
            {dayFormatter.format(date.toDate(getLocalTimeZone()))}
          </div>
          <ToggleGroup bind:value={time} class="grid w-full gap-1.5 max-sm:grid-cols-2 sm:px-5" type="single">
            {#each timeSlots as { time: timeSlot, available } (timeSlot)}
              <ToggleGroupItem disabled={!available} size="sm" value={timeSlot} variant="outline">
                {timeSlot}
              </ToggleGroupItem>
            {/each}
          </ToggleGroup>
        </div>
      </ScrollArea>
    </div>
  </div>
</div>
