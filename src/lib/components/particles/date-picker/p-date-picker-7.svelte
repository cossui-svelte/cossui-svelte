<script lang="ts">
  import { DateFormatter, type DateValue, getLocalTimeZone } from "@internationalized/date";
  import CalendarIcon from "@lucide/svelte/icons/calendar";
  import { Badge } from "$lib/components/ui/badge";
  import { buttonVariants } from "$lib/components/ui/button";
  import { Calendar } from "$lib/components/ui/calendar";
  import { Popover, PopoverPopup, PopoverTrigger } from "$lib/components/ui/popover";
  import { cn } from "$lib/utils";

  const df = new DateFormatter("en-US", { day: "numeric", month: "short" });

  let value = $state<DateValue[]>([]);
</script>

<Popover>
  <PopoverTrigger class={cn(buttonVariants({ variant: "outline" }), "w-full justify-start")}>
    <CalendarIcon aria-hidden="true" class="shrink-0" />
    <span class="flex flex-wrap gap-1">
      {#if value.length > 0}
        {#each value.slice(0, 3) as date (date.toString())}
          <Badge variant="secondary">{df.format(date.toDate(getLocalTimeZone()))}</Badge>
        {/each}
        {#if value.length > 3}
          <Badge variant="secondary">+{value.length - 3}</Badge>
        {/if}
      {:else}
        <span>Pick dates</span>
      {/if}
    </span>
  </PopoverTrigger>
  <PopoverPopup>
    <Calendar bind:value mode="multiple" />
  </PopoverPopup>
</Popover>
