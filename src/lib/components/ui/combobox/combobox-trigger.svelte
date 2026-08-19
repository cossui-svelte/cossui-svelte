<script lang="ts">
  import { Combobox as ComboboxPrimitive } from '@shardsui/svelte/combobox';
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import { cn } from '$lib/utils';

  interface Props extends HTMLButtonAttributes {
    children?: Snippet;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<ComboboxPrimitive.Trigger
  class={cn(className)}
  data-slot="combobox-trigger"
  {...restProps as Record<string, unknown>}
>
  {@render children?.()}
</ComboboxPrimitive.Trigger>
