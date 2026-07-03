<script lang="ts">
  import { type DateValue, getLocalTimeZone, parseDate, today } from "@internationalized/date";
  import CalendarIcon from "@lucide/svelte/icons/calendar";
  import { Calendar } from "$lib/components/ui/calendar";
  import { Field, FieldLabel } from "$lib/components/ui/field";
  import { InputGroup, InputGroupAddon, InputGroupInput } from "$lib/components/ui/input-group";

  const todayValue = today(getLocalTimeZone());

  let value = $state<DateValue | undefined>(todayValue);
  let placeholder = $state<DateValue>(todayValue);
  let inputValue = $state(todayValue.toString());

  function handleCalendarSelect(selectedDate: DateValue | undefined) {
    if (!selectedDate) {
      inputValue = "";
      value = undefined;
      return;
    }
    value = selectedDate;
    placeholder = selectedDate;
    inputValue = selectedDate.toString();
  }

  function handleInputChange(e: Event & { currentTarget: HTMLInputElement }) {
    const rawValue = e.currentTarget.value;
    inputValue = rawValue;

    if (!rawValue) {
      value = undefined;
      return;
    }

    try {
      const parsedDate = parseDate(rawValue);
      value = parsedDate;
      placeholder = parsedDate;
    } catch {
      // ignore invalid dates while typing
    }
  }
</script>

<div class="flex flex-col gap-2">
  <Calendar
    bind:placeholder
    onValueChange={handleCalendarSelect}
    type="single"
    {value}
  />
  <Field class="flex-row items-center gap-4">
    <FieldLabel class="whitespace-nowrap">Enter date</FieldLabel>
    <InputGroup>
      <InputGroupInput
        aria-label="Select date"
        class="*:[input]:[&::-webkit-calendar-picker-indicator]:hidden *:[input]:[&::-webkit-calendar-picker-indicator]:appearance-none"
        onchange={handleInputChange}
        type="date"
        value={inputValue}
      />
      <InputGroupAddon>
        <CalendarIcon aria-hidden="true" />
      </InputGroupAddon>
    </InputGroup>
  </Field>
</div>
