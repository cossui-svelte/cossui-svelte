<script lang="ts">
  import { DateFormatter, type DateValue, getLocalTimeZone } from "@internationalized/date";
  import CalendarIcon from "@lucide/svelte/icons/calendar";
  import { buttonVariants } from "$lib/components/ui/button";
  import { Calendar } from "$lib/components/ui/calendar";
  import { Popover, PopoverPopup, PopoverTrigger } from "$lib/components/ui/popover";
  import { cn } from "$lib/utils";

  const df = new DateFormatter("en-US", { dateStyle: "long" });

  let value = $state<DateValue | undefined>(undefined);
  let open = $state(false);

  function handleSelect(selected: DateValue | undefined) {
    value = selected;
    open = false;
  }
</script>

<Popover bind:open>
  <PopoverTrigger class={cn(buttonVariants({ variant: "outline" }), "w-full justify-start")}>
    <CalendarIcon aria-hidden="true" />
    {value ? df.format(value.toDate(getLocalTimeZone())) : "Pick a date"}
  </PopoverTrigger>
  <PopoverPopup>
    <Calendar bind:value onValueChange={handleSelect} mode="single" />
  </PopoverPopup>
</Popover>
