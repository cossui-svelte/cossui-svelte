<script lang="ts">
  import { DateFormatter, type DateValue, getLocalTimeZone, today } from "@internationalized/date";
  import CalendarIcon from "@lucide/svelte/icons/calendar";
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import { Calendar } from "$lib/components/ui/calendar";
  import { Popover, PopoverPopup, PopoverTrigger } from "$lib/components/ui/popover";
  import { cn } from "$lib/utils";

  const df = new DateFormatter("en-US", { dateStyle: "long" });
  const todayValue = today(getLocalTimeZone());

  let value = $state<DateValue | undefined>(undefined);
  let placeholder = $state<DateValue>(todayValue);

  function setPreset(date: DateValue) {
    value = date;
    placeholder = date;
  }
</script>

<Popover>
  <PopoverTrigger class={cn(buttonVariants({ variant: "outline" }), "w-full justify-start")}>
    <CalendarIcon aria-hidden="true" />
    {value ? df.format(value.toDate(getLocalTimeZone())) : "Pick a date"}
  </PopoverTrigger>
  <PopoverPopup>
    <div class="flex max-sm:flex-col">
      <div class="relative py-1 ps-1 max-sm:order-1 max-sm:border-t">
        <div class="flex h-full flex-col sm:border-e sm:pe-3">
          <Button class="w-full justify-start" onclick={() => setPreset(todayValue)} size="sm" variant="ghost">
            Today
          </Button>
          <Button
            class="w-full justify-start"
            onclick={() => setPreset(todayValue.add({ days: 1 }))}
            size="sm"
            variant="ghost"
          >
            Tomorrow
          </Button>
          <Button
            class="w-full justify-start"
            onclick={() => setPreset(todayValue.add({ days: 3 }))}
            size="sm"
            variant="ghost"
          >
            In 3 days
          </Button>
          <Button
            class="w-full justify-start"
            onclick={() => setPreset(todayValue.add({ days: 7 }))}
            size="sm"
            variant="ghost"
          >
            In a week
          </Button>
        </div>
      </div>
      <Calendar bind:placeholder bind:value class="max-sm:pb-3 sm:ps-2" mode="single" />
    </div>
  </PopoverPopup>
</Popover>
