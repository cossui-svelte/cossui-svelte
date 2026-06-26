<script lang="ts">
  import { Field, FieldDescription, FieldLabel } from '$lib/components/ui/field';
  import { Slider } from '$lib/components/ui/slider';
</script>

<Field class="items-stretch gap-3" name="volume">
  <FieldLabel>Volume</FieldLabel>
  <Slider value={50} />
  <FieldDescription>This is an optional field</FieldDescription>
</Field>
