<script lang="ts">
  import { Field, FieldDescription, FieldLabel } from '$lib/components/ui/field';
  import { Textarea } from '$lib/components/ui/textarea';
</script>

<Field name="bio">
  <FieldLabel>Bio</FieldLabel>
  <Textarea placeholder="Tell us about yourself…" />
  <FieldDescription>Write a short bio. Maximum 500 characters.</FieldDescription>
</Field>
