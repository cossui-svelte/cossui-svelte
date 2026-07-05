<script lang="ts">
  import { type DateValue, getLocalTimeZone, parseDate, today } from "@internationalized/date";
  import CalendarIcon from "@lucide/svelte/icons/calendar";
  import { buttonVariants } from "$lib/components/ui/button";
  import { Calendar } from "$lib/components/ui/calendar";
  import { InputGroup, InputGroupAddon, InputGroupInput } from "$lib/components/ui/input-group";
  import { Popover, PopoverPopup, PopoverTrigger } from "$lib/components/ui/popover";

  let value = $state<DateValue | undefined>(undefined);
  let placeholder = $state<DateValue>(today(getLocalTimeZone()));
  let inputValue = $state("");

  function handleInputChange(e: Event & { currentTarget: HTMLInputElement }) {
    const raw = e.currentTarget.value;
    inputValue = raw;

    if (!raw) {
      value = undefined;
      return;
    }

    try {
      const parsed = parseDate(raw);
      value = parsed;
      placeholder = parsed;
    } catch {
      // ignore invalid dates while typing
    }
  }

  function handleSelect(selected: DateValue | undefined) {
    inputValue = selected ? selected.toString() : "";
    if (selected) placeholder = selected;
  }
</script>

<Popover>
  <InputGroup>
    <InputGroupInput
      aria-label="Select date"
      class="*:[input]:[&::-webkit-calendar-picker-indicator]:hidden *:[input]:[&::-webkit-calendar-picker-indicator]:appearance-none"
      onchange={handleInputChange}
      onclick={(e) => e.stopPropagation()}
      type="date"
      value={inputValue}
    />
    <InputGroupAddon>
      <PopoverTrigger aria-label="Select date" class={buttonVariants({ size: "icon-xs", variant: "ghost" })}>
        <CalendarIcon aria-hidden="true" />
      </PopoverTrigger>
    </InputGroupAddon>
  </InputGroup>
  <PopoverPopup align="start" alignOffset={-4} sideOffset={8}>
    <Calendar bind:placeholder bind:value onValueChange={handleSelect} mode="single" />
  </PopoverPopup>
</Popover>
