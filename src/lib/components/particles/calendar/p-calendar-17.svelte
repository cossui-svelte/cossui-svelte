<script lang="ts">
  import { type DateValue, getLocalTimeZone, parseDate, today } from '@internationalized/date';
  import CalendarIcon from '@lucide/svelte/icons/calendar';
  import { Button } from '$lib/components/ui/button';
  import { Calendar } from '$lib/components/ui/calendar';
  import { Field, FieldError, FieldLabel } from '$lib/components/ui/field';
  import { Form } from '$lib/components/ui/form';
  import { InputGroup, InputGroupAddon, InputGroupInput } from '$lib/components/ui/input-group';

  const todayValue = today(getLocalTimeZone());

  let loading = $state(false);
  let value = $state<DateValue | undefined>(todayValue);
  let placeholder = $state<DateValue>(todayValue);
  let dateText = $state(todayValue.toString());

  function handleCalendarSelect(selectedDate: DateValue | undefined) {
    if (!selectedDate) {
      dateText = '';
      value = undefined;
      return;
    }
    value = selectedDate;
    placeholder = selectedDate;
    dateText = selectedDate.toString();
  }

  function handleInputChange(e: Event & { currentTarget: HTMLInputElement }) {
    const rawValue = e.currentTarget.value;
    dateText = rawValue;

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

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    loading = true;
    await new Promise((r) => setTimeout(r, 800));
    loading = false;
    alert(`Selected date: ${dateText}`);
  }
</script>

<Form class="flex flex-col gap-2" onsubmit={handleSubmit}>
  <Calendar bind:placeholder bind:value onValueChange={handleCalendarSelect} mode="single" />
  <Field class="flex-row items-center gap-4" name="date">
    <FieldLabel class="whitespace-nowrap">Enter date</FieldLabel>
    <InputGroup>
      <InputGroupInput
        aria-label="Select date"
        class="*:[input]:[&::-webkit-calendar-picker-indicator]:hidden *:[input]:[&::-webkit-calendar-picker-indicator]:appearance-none"
        onchange={handleInputChange}
        type="date"
        value={dateText}
      />
      <InputGroupAddon>
        <CalendarIcon aria-hidden="true" />
      </InputGroupAddon>
    </InputGroup>
    <FieldError />
  </Field>
  <Button {loading} type="submit">Submit</Button>
</Form>
