<script lang="ts">
  import { Field, FieldError, FieldLabel } from "$lib/components/ui/field";
  import { Input } from "$lib/components/ui/input";
</script>

<Field name="email">
  <FieldLabel>Email</FieldLabel>
  <Input placeholder="Enter your email" type="email" />
  <FieldError>Please enter a valid email address.</FieldError>
</Field>
