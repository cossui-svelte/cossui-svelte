<script lang="ts">
  import { Accordion as AccordionPrimitive } from '@shardsui/svelte/accordion';
  import type { HTMLAttributes } from 'svelte/elements';

  let {
    ref = $bindable(null),
    value = $bindable(),
    class: className,
    multiple = false,
    disabled = false,
    ...restProps
  }: HTMLAttributes<HTMLDivElement> & {
    ref?: HTMLElement | null;
    value?: string | string[];
    multiple?: boolean;
    disabled?: boolean;
  } = $props();

  const internalValue = $derived.by((): string[] => {
    if (multiple) return Array.isArray(value) ? value : value != null ? [value] : [];
    const single = Array.isArray(value) ? value[0] : value;
    return single != null ? [single] : [];
  });
</script>

<AccordionPrimitive.Root
  bind:ref
  {disabled}
  {multiple}
  value={internalValue}
  class={className}
  data-slot="accordion"
  onValueChange={(next: string[]) => {
    value = multiple ? next : next[0];
  }}
  {...restProps as Record<string, unknown>}
/>
