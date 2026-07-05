<script lang="ts">
  import { DateFormatter, type DateValue, getLocalTimeZone } from "@internationalized/date";
  import ChevronsUpDown from "@lucide/svelte/icons/chevrons-up-down";
  import { Calendar } from "$lib/components/ui/calendar";
  import { Popover, PopoverPopup, PopoverTrigger } from "$lib/components/ui/popover";
  import { selectTriggerVariants } from "$lib/components/ui/select";
  import { cn } from "$lib/utils";

  const df = new DateFormatter("en-US", { dateStyle: "long" });

  let value = $state<DateValue | undefined>(undefined);
</script>

<Popover>
  <PopoverTrigger class={selectTriggerVariants()}>
    <span class={cn("pointer-events-none flex-1 truncate text-left", !value && "text-muted-foreground/72")}>
      {value ? df.format(value.toDate(getLocalTimeZone())) : "Pick a date"}
    </span>
    <ChevronsUpDown class="-me-1 size-4.5 opacity-80 sm:size-4" />
  </PopoverTrigger>
  <PopoverPopup>
    <Calendar bind:value mode="single" />
  </PopoverPopup>
</Popover>
