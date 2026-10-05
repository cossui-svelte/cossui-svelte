<script lang="ts">
  import ArrowRight from '@lucide/svelte/icons/arrow-right';
  import { Button } from '#lib/components/ui/button/index.js';
  import { Field, FieldError, FieldLabel } from '#lib/components/ui/field/index.js';
  import { Form } from '#lib/components/ui/form/index.js';
  import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput
  } from '#lib/components/ui/input-group/index.js';

  let loading = $state(false);

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    loading = true;
    await new Promise((r) => setTimeout(r, 800));
    loading = false;
    alert(`Subscribed: ${formData.get('email') ?? ''}`);
  }
</script>

<Form onsubmit={handleSubmit}>
  <Field name="email">
    <FieldLabel>Subscribe</FieldLabel>
    <InputGroup>
      <InputGroupInput placeholder="Your best email" required type="email" />
      <InputGroupAddon align="inline-end">
        <Button aria-label="Subscribe" {loading} size="icon-xs" type="submit" variant="ghost">
          <ArrowRight aria-hidden="true" />
        </Button>
      </InputGroupAddon>
    </InputGroup>
    <FieldError>Please enter a valid email address.</FieldError>
  </Field>
</Form>
