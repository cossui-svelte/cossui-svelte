<script lang="ts">
  import ArrowRightIcon from "@lucide/svelte/icons/arrow-right";
  import CopyIcon from "@lucide/svelte/icons/copy";
  import PlusIcon from "@lucide/svelte/icons/plus";
  import SearchIcon from "@lucide/svelte/icons/search";
  import XIcon from "@lucide/svelte/icons/x";
  import { Button, buttonVariants } from "$lib/components/ui/button";
  import { Checkbox } from "$lib/components/ui/checkbox";
  import { CheckboxGroup } from "$lib/components/ui/checkbox-group";
  import {
    Combobox,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
    ComboboxPopup,
    ComboboxTrigger,
    ComboboxValue,
  } from "$lib/components/ui/combobox";
  import { Group, GroupSeparator, GroupText } from "$lib/components/ui/group";
  import { Label } from "$lib/components/ui/label";
  import { Popover, PopoverPopup, PopoverTrigger } from "$lib/components/ui/popover";
  import { Switch } from "$lib/components/ui/switch";
  import { Tooltip, TooltipPopup, TooltipProvider, TooltipTrigger } from "$lib/components/ui/tooltip";
  import { cn } from "$lib/utils";

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ] as const;

  type Day = (typeof days)[number];

  type TimeRange = {
    id: number;
    start: string;
    end: string;
  };

  const timeOptions = Array.from({ length: 96 }, (_, i) => {
    const hours = Math.floor(i / 4);
    const minutes = (i % 4) * 15;
    const period = hours < 12 ? "AM" : "PM";
    const displayHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  });

  const timeIndex = (time: string) => timeOptions.indexOf(time);

  let rangeId = 0;
  const createRange = (start: string, end: string): TimeRange => ({
    end,
    id: ++rangeId,
    start,
  });

  let availability = $state<Record<Day, TimeRange[]>>({
    Friday: [createRange("9:00 AM", "5:00 PM")],
    Monday: [createRange("9:00 AM", "5:00 PM")],
    Saturday: [],
    Sunday: [],
    Thursday: [createRange("9:00 AM", "5:00 PM")],
    Tuesday: [createRange("9:00 AM", "1:00 PM"), createRange("3:00 PM", "5:00 PM")],
    Wednesday: [createRange("9:00 AM", "5:00 PM")],
  });

  let copyOpen = $state<Record<Day, boolean>>(
    Object.fromEntries(days.map((day) => [day, false])) as unknown as Record<Day, boolean>,
  );
  let copySelectedDays = $state<Record<Day, string[]>>(
    Object.fromEntries(days.map((day) => [day, []])) as unknown as Record<Day, string[]>,
  );

  function setDayRanges(day: Day, ranges: TimeRange[]) {
    availability[day] = ranges;
  }

  function toggleDay(day: Day, enabled: boolean) {
    setDayRanges(day, enabled ? [createRange("9:00 AM", "5:00 PM")] : []);
  }

  function addRange(day: Day) {
    const ranges = availability[day];
    const lastRange = ranges[ranges.length - 1];
    if (!lastRange) {
      setDayRanges(day, [createRange("9:00 AM", "5:00 PM")]);
      return;
    }
    const startIndex = Math.min(timeIndex(lastRange.end) + 4, timeOptions.length - 2);
    const endIndex = Math.min(startIndex + 4, timeOptions.length - 1);
    setDayRanges(day, [
      ...ranges,
      createRange(timeOptions[startIndex] ?? "", timeOptions[endIndex] ?? ""),
    ]);
  }

  function removeRange(day: Day, id: number) {
    setDayRanges(
      day,
      availability[day].filter((range) => range.id !== id),
    );
  }

  function updateStart(day: Day, id: number, start: string) {
    setDayRanges(
      day,
      availability[day].map((range) => {
        if (range.id !== id) return range;
        const end =
          timeIndex(start) >= timeIndex(range.end)
            ? (timeOptions[Math.min(timeIndex(start) + 4, timeOptions.length - 1)] ?? range.end)
            : range.end;
        return { ...range, end, start };
      }),
    );
  }

  function updateEnd(day: Day, id: number, end: string) {
    setDayRanges(
      day,
      availability[day].map((range) => (range.id === id ? { ...range, end } : range)),
    );
  }

  function copyTo(source: Day, targets: Day[]) {
    for (const target of targets) {
      availability[target] = availability[source].map((range) => createRange(range.start, range.end));
    }
  }

  function openCopyPopover(day: Day, next: boolean) {
    copyOpen[day] = next;
    if (next) copySelectedDays[day] = [];
  }

  function applyCopy(day: Day) {
    copyTo(day, copySelectedDays[day] as Day[]);
    copyOpen[day] = false;
  }
</script>

<TooltipProvider delay={0}>
  <div class="divide-y">
    {#each days as day (day)}
      {@const ranges = availability[day]}
      {@const lastRange = ranges[ranges.length - 1]}
      {@const addDisabled = lastRange ? timeIndex(lastRange.end) >= timeOptions.length - 2 : false}
      <div class="flex flex-col gap-4 py-3 first:pt-0 last:pb-0 md:flex-row md:flex-wrap md:items-start">
        <Label class="flex h-8 w-30 shrink-0 items-center gap-2.5 sm:h-7">
          <Switch checked={ranges.length > 0} onCheckedChange={(checked) => toggleDay(day, checked)} />
          {day}
        </Label>
        <div class="flex w-full min-w-0 items-start gap-4 md:flex-1">
          <div class="flex min-w-0 flex-col gap-2">
            {#if ranges.length === 0}
              <p class="flex h-8 items-center text-muted-foreground sm:h-7 sm:text-sm">Unavailable</p>
            {:else}
              {#each ranges as range (range.id)}
                <div class="flex items-center gap-2">
                  <Group aria-label={`${day} time range`}>
                    <Combobox
                      autoHighlight
                      value={range.start}
                      onValueChange={(v) => {
                        if (typeof v === "string") updateStart(day, range.id, v);
                      }}
                    >
                      <ComboboxTrigger
                        aria-label={`${day} start time`}
                        class={cn(buttonVariants({ size: "sm", variant: "outline" }), "w-24 font-normal tabular-nums")}
                      >
                        <ComboboxValue value={range.start} />
                      </ComboboxTrigger>
                      <ComboboxPopup aria-label={`${day} start time`} class="min-w-44">
                        <div class="border-b p-2">
                          <ComboboxInput
                            class="rounded-md before:rounded-[calc(var(--radius-md)-1px)]"
                            placeholder="Search time"
                            showTrigger={false}
                            size="sm"
                          >
                            {#snippet startAddon()}<SearchIcon />{/snippet}
                          </ComboboxInput>
                        </div>
                        <ComboboxEmpty>No times found.</ComboboxEmpty>
                        <ComboboxList>
                          {#each timeOptions as time (time)}
                            <ComboboxItem value={time} label={time}>
                              <span class="tabular-nums">{time}</span>
                            </ComboboxItem>
                          {/each}
                        </ComboboxList>
                      </ComboboxPopup>
                    </Combobox>
                    <GroupSeparator />
                    <GroupText aria-hidden="true" class="px-2">
                      <ArrowRightIcon class="size-3.5" />
                    </GroupText>
                    <GroupSeparator />
                    <Combobox
                      autoHighlight
                      value={range.end}
                      onValueChange={(v) => {
                        if (typeof v === "string") updateEnd(day, range.id, v);
                      }}
                    >
                      <ComboboxTrigger
                        aria-label={`${day} end time`}
                        class={cn(buttonVariants({ size: "sm", variant: "outline" }), "w-24 font-normal tabular-nums")}
                      >
                        <ComboboxValue value={range.end} />
                      </ComboboxTrigger>
                      <ComboboxPopup aria-label={`${day} end time`} class="min-w-44">
                        <div class="border-b p-2">
                          <ComboboxInput
                            class="rounded-md before:rounded-[calc(var(--radius-md)-1px)]"
                            placeholder="Search time"
                            showTrigger={false}
                            size="sm"
                          >
                            {#snippet startAddon()}<SearchIcon />{/snippet}
                          </ComboboxInput>
                        </div>
                        <ComboboxEmpty>No times found.</ComboboxEmpty>
                        <ComboboxList>
                          {#each timeOptions.slice(timeIndex(range.start) + 1) as time (time)}
                            <ComboboxItem value={time} label={time}>
                              <span class="tabular-nums">{time}</span>
                            </ComboboxItem>
                          {/each}
                        </ComboboxList>
                      </ComboboxPopup>
                    </Combobox>
                  </Group>
                  <Tooltip disableHoverableContent>
                    <TooltipTrigger>
                      {#snippet child({ props })}
                        <Button
                          aria-label={`Delete ${range.start} to ${range.end} on ${day}`}
                          onclick={() => removeRange(day, range.id)}
                          size="icon-sm"
                          variant="ghost"
                          {...props}
                        >
                          <XIcon aria-hidden="true" />
                        </Button>
                      {/snippet}
                    </TooltipTrigger>
                    <TooltipPopup>Delete range</TooltipPopup>
                  </Tooltip>
                </div>
              {/each}
            {/if}
          </div>
          <div class="ml-auto flex shrink-0 gap-1">
            <Tooltip disableHoverableContent>
              <TooltipTrigger>
                {#snippet child({ props })}
                  <Button
                    aria-label={`Add time range to ${day}`}
                    disabled={addDisabled}
                    onclick={() => addRange(day)}
                    size="icon-sm"
                    variant="ghost"
                    {...props}
                  >
                    <PlusIcon aria-hidden="true" />
                  </Button>
                {/snippet}
              </TooltipTrigger>
              <TooltipPopup>Add range</TooltipPopup>
            </Tooltip>
            <Tooltip disableHoverableContent>
              <TooltipTrigger>
                {#snippet child({ props })}
                  <Popover open={copyOpen[day]} onOpenChange={(next) => openCopyPopover(day, next)}>
                    <PopoverTrigger
                      aria-label={`Copy ${day} times to other days`}
                      class={buttonVariants({ size: "icon-sm", variant: "ghost" })}
                      disabled={ranges.length === 0}
                      {...props}
                    >
                      <CopyIcon aria-hidden="true" />
                    </PopoverTrigger>
                    <PopoverPopup align="end" class="w-44">
                      <div class="flex flex-col gap-3">
                        <div class="font-medium text-foreground text-sm">Copy times to</div>
                        <CheckboxGroup
                          aria-label={`Copy ${day} times to`}
                          value={copySelectedDays[day]}
                          onValueChange={(v) => {
                            copySelectedDays[day] = v;
                          }}
                        >
                          {#each days.filter((target) => target !== day) as target (target)}
                            <Label>
                              <Checkbox value={target} />
                              {target}
                            </Label>
                          {/each}
                        </CheckboxGroup>
                        <Button
                          disabled={copySelectedDays[day].length === 0}
                          onclick={() => applyCopy(day)}
                          size="sm"
                        >
                          Apply
                        </Button>
                      </div>
                    </PopoverPopup>
                  </Popover>
                {/snippet}
              </TooltipTrigger>
              <TooltipPopup>Copy to other days</TooltipPopup>
            </Tooltip>
          </div>
        </div>
      </div>
    {/each}
  </div>
</TooltipProvider>
