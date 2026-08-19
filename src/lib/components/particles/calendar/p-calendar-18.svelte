<script lang="ts">
  import { type DateValue, getLocalTimeZone, today } from '@internationalized/date';
  import ClockIcon from '@lucide/svelte/icons/clock';
  import { Button } from '$lib/components/ui/button';
  import { Calendar } from '$lib/components/ui/calendar';
  import { Field, FieldError, FieldLabel } from '$lib/components/ui/field';
  import { Form } from '$lib/components/ui/form';
  import { InputGroup, InputGroupAddon, InputGroupInput } from '$lib/components/ui/input-group';

  const todayValue = today(getLocalTimeZone());

  let loading = $state(false);
  let value = $state<DateValue | undefined>(todayValue);
  let placeholder = $state<DateValue>(todayValue);
  let time = $state('12:00:00');

  function handleCalendarSelect(selectedDate: DateValue | undefined) {
    value = selectedDate;
    if (selectedDate) {
      placeholder = selectedDate;
    }
  }

  function handleTimeChange(e: Event & { currentTarget: HTMLInputElement }) {
    time = e.currentTarget.value;
  }

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    loading = true;
    await new Promise((r) => setTimeout(r, 800));
    loading = false;
    alert(`Selected time: ${time}`);
  }
</script>

<div class="flex flex-col gap-2">
  <Calendar bind:placeholder bind:value onValueChange={handleCalendarSelect} mode="single" />
  <Form class="flex flex-col gap-2" onsubmit={handleSubmit}>
    <Field class="flex-row items-center gap-3" name="time">
      <FieldLabel class="whitespace-nowrap text-xs">Enter time</FieldLabel>
      <InputGroup class="grow">
        <InputGroupInput
          aria-label="Select time"
          class="*:[input]:[&::-webkit-calendar-picker-indicator]:hidden *:[input]:[&::-webkit-calendar-picker-indicator]:appearance-none"
          onchange={handleTimeChange}
          step="1"
          type="time"
          value={time}
        />
        <InputGroupAddon>
          <ClockIcon aria-hidden="true" />
        </InputGroupAddon>
      </InputGroup>
      <FieldError />
    </Field>
    <Button {loading} type="submit">Submit</Button>
  </Form>
</div>
