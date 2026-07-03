<script lang="ts">
  import { type DateValue, getLocalTimeZone, today } from "@internationalized/date";
  import ClockIcon from "@lucide/svelte/icons/clock";
  import { z } from "zod";
  import { Button } from "$lib/components/ui/button";
  import { Calendar } from "$lib/components/ui/calendar";
  import { Field, FieldError, FieldLabel } from "$lib/components/ui/field";
  import { Form } from "$lib/components/ui/form";
  import { InputGroup, InputGroupAddon, InputGroupInput } from "$lib/components/ui/input-group";
  import { createForm } from "$lib/hooks/use-superform";

  const todayValue = today(getLocalTimeZone());

  const schema = z.object({
    time: z.string().min(1, { message: "Please enter a time." }),
  });

  const superform = createForm({
    initialData: { time: "12:00:00" },
    onUpdated: (data) => {
      alert(`Selected time: ${data.time}`);
    },
    schema,
  });

  const { form: formData, submitting } = superform;

  let value = $state<DateValue | undefined>(todayValue);
  let placeholder = $state<DateValue>(todayValue);

  function handleCalendarSelect(selectedDate: DateValue | undefined) {
    value = selectedDate;
    if (selectedDate) {
      placeholder = selectedDate;
    }
  }

  function handleTimeChange(e: Event & { currentTarget: HTMLInputElement }) {
    $formData.time = e.currentTarget.value;
  }
</script>

<div class="flex flex-col gap-2">
  <Calendar
    bind:placeholder
    bind:value
    onValueChange={handleCalendarSelect}
    type="single"
  />
  <Form class="flex flex-col gap-2" {superform}>
    <Field class="flex-row items-center gap-3" name="time">
      <FieldLabel class="whitespace-nowrap text-xs">Enter time</FieldLabel>
      <InputGroup class="grow">
        <InputGroupInput
          aria-label="Select time"
          class="*:[input]:[&::-webkit-calendar-picker-indicator]:hidden *:[input]:[&::-webkit-calendar-picker-indicator]:appearance-none"
          onchange={handleTimeChange}
          step="1"
          type="time"
          value={$formData.time}
        />
        <InputGroupAddon>
          <ClockIcon aria-hidden="true" />
        </InputGroupAddon>
      </InputGroup>
      <FieldError />
    </Field>
    <Button loading={$submitting} type="submit">Submit</Button>
  </Form>
</div>
