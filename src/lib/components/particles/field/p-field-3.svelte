<script lang="ts">
  import { Field, FieldDescription, FieldLabel } from '$lib/components/ui/field';
  import { Input } from '$lib/components/ui/input';
</script>

<Field name="email">
  <FieldLabel>Email</FieldLabel>
  <Input disabled placeholder="Enter your email" type="email" />
  <FieldDescription>This field is currently disabled.</FieldDescription>
</Field>
