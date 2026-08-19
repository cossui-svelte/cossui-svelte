<script lang="ts">
  import { Form as FormPrimitive } from '@shardsui/svelte/form';
  import type { ComponentProps } from 'svelte';

  let { ref = $bindable(null), ...restProps }: ComponentProps<typeof FormPrimitive> = $props();
</script>

<FormPrimitive bind:ref data-slot="form" {...restProps} />
