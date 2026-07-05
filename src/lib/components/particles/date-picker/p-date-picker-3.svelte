<script lang="ts">
  import { DateFormatter, type DateValue, getLocalTimeZone } from "@internationalized/date";
  import CalendarIcon from "@lucide/svelte/icons/calendar";
  import { buttonVariants } from "$lib/components/ui/button";
  import { Calendar } from "$lib/components/ui/calendar";
  import { Popover, PopoverPopup, PopoverTrigger } from "$lib/components/ui/popover";
  import { cn } from "$lib/utils";

  const df = new DateFormatter("en-US", { dateStyle: "long" });
  const id = "date-picker-3-start-date";

  let value = $state<DateValue | undefined>(undefined);
</script>

<div class="flex flex-col items-start gap-2">
  <label class="font-medium text-base/4.5 text-foreground sm:text-sm/4" for={id}>
    Start date
  </label>
  <Popover>
    <PopoverTrigger {id} class={cn(buttonVariants({ variant: "outline" }), "w-full justify-start")}>
      <CalendarIcon aria-hidden="true" />
      {value ? df.format(value.toDate(getLocalTimeZone())) : "Pick a date"}
    </PopoverTrigger>
    <PopoverPopup>
      <Calendar bind:value captionLayout="dropdown" mode="single" />
    </PopoverPopup>
  </Popover>
</div>
