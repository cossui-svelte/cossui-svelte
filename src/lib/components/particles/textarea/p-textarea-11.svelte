<script lang="ts">
  import { z } from "zod";
  import { Field, FieldDescription, FieldLabel } from "$lib/components/ui/field";
  import { Form } from "$lib/components/ui/form";
  import { Textarea } from "$lib/components/ui/textarea";
  import { createForm } from "$lib/hooks/use-superform";

  const maxlength = 280;

  const schema = z.object({
    message: z.string().max(maxlength),
  });

  const superform = createForm({
    initialData: { message: "" },
    schema,
  });

  const { form } = superform;

  let value = $state($form.message as string);

  $effect(() => {
    $form.message = value;
  });
</script>

<Form {superform}>
  <Field name="message">
    <FieldLabel class="sr-only">Message</FieldLabel>
    <Textarea
      {maxlength}
      bind:value
      placeholder="Type your message here"
    />
    <FieldDescription>
      <span class="tabular-nums">{maxlength - value.length}</span>{" "}
      characters left
    </FieldDescription>
  </Field>
</Form>
