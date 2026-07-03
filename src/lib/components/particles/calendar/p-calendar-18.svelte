<script lang="ts">
  import { type DateValue, getLocalTimeZone, today } from "@internationalized/date";
  import ClockIcon from "@lucide/svelte/icons/clock";
  import { Calendar } from "$lib/components/ui/calendar";
  import { Field, FieldLabel } from "$lib/components/ui/field";
  import { InputGroup, InputGroupAddon, InputGroupInput } from "$lib/components/ui/input-group";

  const todayValue = today(getLocalTimeZone());

  let value = $state<DateValue | undefined>(todayValue);
  let placeholder = $state<DateValue>(todayValue);
  let timeValue = $state("12:00:00");

  function handleCalendarSelect(selectedDate: DateValue | undefined) {
    value = selectedDate;
    if (selectedDate) {
      placeholder = selectedDate;
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
  <Field class="flex-row items-center gap-3">
    <FieldLabel class="whitespace-nowrap text-xs">Enter time</FieldLabel>
    <InputGroup class="grow">
      <InputGroupInput
        aria-label="Select time"
        class="*:[input]:[&::-webkit-calendar-picker-indicator]:hidden *:[input]:[&::-webkit-calendar-picker-indicator]:appearance-none"
        bind:value={timeValue}
        step="1"
        type="time"
      />
      <InputGroupAddon>
        <ClockIcon aria-hidden="true" />
      </InputGroupAddon>
    </InputGroup>
  </Field>
</div>
