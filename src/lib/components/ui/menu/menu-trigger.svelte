<script lang="ts">
  import { Menu as MenuPrimitive } from '@shardsui/svelte/menu';
  import type { ComponentProps } from 'svelte';

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: ComponentProps<typeof MenuPrimitive.Trigger> = $props();
</script>

<MenuPrimitive.Trigger bind:ref class={className} data-slot="menu-trigger" {...restProps} />
