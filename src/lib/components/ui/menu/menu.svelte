<script lang="ts">
  import { Menu as MenuPrimitive } from '@shardsui/svelte/menu';
  import type { ComponentProps } from 'svelte';

  let { open = $bindable(false), ...restProps }: ComponentProps<typeof MenuPrimitive.Root> =
    $props();
</script>

<MenuPrimitive.Root bind:open {...restProps} />
