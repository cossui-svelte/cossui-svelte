<script lang="ts">
  import { Select as SelectPrimitive } from '@shardsui/svelte/select';
  import type { ComponentProps } from 'svelte';

  let { ref = $bindable(null), ...restProps }: ComponentProps<typeof SelectPrimitive.Group> =
    $props();
</script>

<SelectPrimitive.Group bind:ref data-slot="select-group" {...restProps} />
