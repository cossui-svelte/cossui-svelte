<script lang="ts">
  import { Combobox as ComboboxPrimitive } from '@shardsui/svelte/combobox';
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '$lib/utils';

  interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
    children?: Snippet<[unknown]>;
    placeholder?: string;
  }

  let { class: className, children, placeholder, ...restProps }: Props = $props();
</script>

<span class={cn(className)} data-slot="combobox-value" {...restProps as Record<string, unknown>}>
  <ComboboxPrimitive.Value {children} {placeholder} />
</span>
