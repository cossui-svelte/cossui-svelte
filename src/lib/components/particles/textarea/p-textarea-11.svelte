<script lang="ts">
  import { Field, FieldDescription, FieldLabel } from '$lib/components/ui/field';
  import { Textarea } from '$lib/components/ui/textarea';

  const maxlength = 280;

  let value = $state('');
</script>

<Field name="message">
  <FieldLabel class="sr-only">Message</FieldLabel>
  <Textarea {maxlength} bind:value placeholder="Type your message here" />
  <FieldDescription>
    <span class="tabular-nums">{maxlength - value.length}</span>
    characters left
  </FieldDescription>
</Field>
