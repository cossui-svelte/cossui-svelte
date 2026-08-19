<script lang="ts">
  import { Fieldset as FieldsetPrimitive } from '@shardsui/svelte/fieldset';
  import type { ComponentProps } from 'svelte';

  let { ref = $bindable(null), ...restProps }: ComponentProps<typeof FieldsetPrimitive.Root> =
    $props();
</script>

<FieldsetPrimitive.Root bind:ref data-slot="fieldset" {...restProps} />
