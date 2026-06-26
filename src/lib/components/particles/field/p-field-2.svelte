<script lang="ts">
  import { Field, FieldError, FieldLabel } from '$lib/components/ui/field';
  import { Input } from '$lib/components/ui/input';
</script>

<Field name="password">
  <FieldLabel>Password <span class="text-destructive-foreground">*</span></FieldLabel>
  <Input placeholder="Enter password" required type="password" />
  <FieldError>Please fill out this field.</FieldError>
</Field>
