<script lang="ts">
  import { Field, FieldDescription, FieldLabel } from '$lib/components/ui/field';
  import { Input } from '$lib/components/ui/input';
</script>

<Field name="name">
  <FieldLabel>Name</FieldLabel>
  <Input placeholder="Enter your name" type="text" />
  <FieldDescription>Visible on your profile</FieldDescription>
</Field>
