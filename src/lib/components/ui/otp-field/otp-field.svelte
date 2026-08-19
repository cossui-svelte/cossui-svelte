<script lang="ts">
  import PinInputRoot from './internal/primitives/pin-input-root.svelte';
  import type { PinInputRootProps } from './internal/types';
  import { cn } from '$lib/utils';

  let {
    ref = $bindable(null),
    class: className,
    value = $bindable(''),
    size = 'default',
    ...restProps
  }: Omit<PinInputRootProps, 'size'> & {
    size?: 'default' | 'lg';
  } = $props();
</script>

<div data-slot="otp-field" data-size={size}>
  <PinInputRoot
    bind:ref
    bind:value
    spellcheck={false}
    class={cn(
      'flex items-center gap-2 has-disabled:opacity-64 has-disabled:**:data-[slot=otp-field-input]:shadow-none has-disabled:**:data-[slot=otp-field-input]:before:shadow-none!',
      className
    )}
    {...restProps}
  />
</div>
