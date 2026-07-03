<script lang="ts">
  import { type DateValue, getLocalTimeZone, parseDate, today } from "@internationalized/date";
  import CalendarIcon from "@lucide/svelte/icons/calendar";
  import { z } from "zod";
  import { Button } from "$lib/components/ui/button";
  import { Calendar } from "$lib/components/ui/calendar";
  import { Field, FieldError, FieldLabel } from "$lib/components/ui/field";
  import { Form } from "$lib/components/ui/form";
  import { InputGroup, InputGroupAddon, InputGroupInput } from "$lib/components/ui/input-group";
  import { createForm } from "$lib/hooks/use-superform";

  const todayValue = today(getLocalTimeZone());

  const schema = z.object({
    date: z.string().min(1, { message: "Please select a date." }),
  });

  const superform = createForm({
    initialData: { date: todayValue.toString() },
    onUpdated: (data) => {
      alert(`Selected date: ${data.date}`);
    },
    schema,
  });

  const { form: formData, submitting } = superform;

  let value = $state<DateValue | undefined>(todayValue);
  let placeholder = $state<DateValue>(todayValue);

  function handleCalendarSelect(selectedDate: DateValue | undefined) {
    if (!selectedDate) {
      $formData.date = "";
      value = undefined;
      return;
    }
    value = selectedDate;
    placeholder = selectedDate;
    $formData.date = selectedDate.toString();
  }

  function handleInputChange(e: Event & { currentTarget: HTMLInputElement }) {
    const rawValue = e.currentTarget.value;
    $formData.date = rawValue;

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

<Form class="flex flex-col gap-2" {superform}>
  <Calendar
    bind:placeholder
    bind:value
    onValueChange={handleCalendarSelect}
    type="single"
  />
  <Field class="flex-row items-center gap-4" name="date">
    <FieldLabel class="whitespace-nowrap">Enter date</FieldLabel>
    <InputGroup>
      <InputGroupInput
        aria-label="Select date"
        class="*:[input]:[&::-webkit-calendar-picker-indicator]:hidden *:[input]:[&::-webkit-calendar-picker-indicator]:appearance-none"
        onchange={handleInputChange}
        type="date"
        value={$formData.date}
      />
      <InputGroupAddon>
        <CalendarIcon aria-hidden="true" />
      </InputGroupAddon>
    </InputGroup>
    <FieldError />
  </Field>
  <Button loading={$submitting} type="submit">Submit</Button>
</Form>
