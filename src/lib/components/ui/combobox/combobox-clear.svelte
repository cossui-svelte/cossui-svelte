<script lang="ts">
  import { Combobox as ComboboxPrimitive } from '@shardsui/svelte/combobox';
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';

  interface Props extends HTMLButtonAttributes {
    children?: Snippet;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<ComboboxPrimitive.Clear
  class={className}
  data-slot="combobox-clear"
  {...restProps as Record<string, unknown>}
>
  {@render children?.()}
</ComboboxPrimitive.Clear>
