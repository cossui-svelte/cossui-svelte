<script lang="ts">
  import ArrowRight from "@lucide/svelte/icons/arrow-right";
  import { z } from "zod";
  import { Button } from "$lib/components/ui/button";
  import { Field, FieldError, FieldLabel } from "$lib/components/ui/field";
  import { Form } from "$lib/components/ui/form";
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
  } from "$lib/components/ui/input-group";
  import { createForm } from "$lib/hooks/use-superform";

  const schema = z.object({
    email: z.email({ message: "Please enter a valid email address." }),
  });

  const superform = createForm({
    onUpdated: (data) => {
      alert(`Subscribed: ${data.email}`);
    },
    schema,
  });

  const { form: formData, submitting } = superform;
</script>

<Form {superform}>
  <Field name="email">
    <FieldLabel>Subscribe</FieldLabel>
    <InputGroup>
      <InputGroupInput
        bind:value={$formData.email}
        placeholder="Your best email"
        type="email"
      />
      <InputGroupAddon align="inline-end">
        <Button
          aria-label="Subscribe"
          loading={$submitting}
          size="icon-xs"
          type="submit"
          variant="ghost"
        >
          <ArrowRight aria-hidden="true" />
        </Button>
      </InputGroupAddon>
    </InputGroup>
    <FieldError />
  </Field>
</Form>
