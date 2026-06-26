<script lang="ts">
  import ArrowRight from '@lucide/svelte/icons/arrow-right';
  import { Button } from '$lib/components/ui/button';
  import { Field, FieldError, FieldLabel } from '$lib/components/ui/field';
  import { InputGroup, InputGroupAddon, InputGroupInput } from '$lib/components/ui/input-group';
</script>

<Field name="email">
  <FieldLabel>Subscribe</FieldLabel>
  <InputGroup>
    <InputGroupInput placeholder="Your best email" type="email" />
    <InputGroupAddon align="inline-end">
      <Button aria-label="Subscribe" size="icon-xs" variant="ghost">
        <ArrowRight aria-hidden="true" />
      </Button>
    </InputGroupAddon>
  </InputGroup>
  <FieldError>Please enter a valid email address.</FieldError>
</Field>
