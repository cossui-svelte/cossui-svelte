<script lang="ts">
  import { Radio as RadioPrimitive } from '@shardsui/svelte/radio';
  import type { ComponentProps } from 'svelte';
  import { cn } from '$lib/utils';

  let {
    class: className,
    ref = $bindable(null),
    value,
    ...restProps
  }: ComponentProps<typeof RadioPrimitive.Root> = $props();
</script>

<RadioPrimitive.Root
  bind:ref
  {value}
  class={cn(
    "relative inline-flex size-4.5 shrink-0 items-center justify-center rounded-full border border-input bg-background not-dark:bg-clip-padding shadow-xs/5 outline-none transition-shadow before:pointer-events-none before:absolute before:inset-0 before:rounded-full not-data-disabled:not-data-checked:not-aria-invalid:before:shadow-[0_1px_--theme(--color-black/4%)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background aria-invalid:border-destructive/36 focus-visible:aria-invalid:border-destructive/64 focus-visible:aria-invalid:ring-destructive/48 data-disabled:cursor-not-allowed data-disabled:opacity-64 sm:size-4 dark:not-data-checked:bg-input/32 dark:aria-invalid:ring-destructive/24 dark:not-data-disabled:not-data-checked:not-aria-invalid:before:shadow-[0_-1px_--theme(--color-white/6%)] [[data-disabled],[data-checked],[aria-invalid]]:shadow-none",
    className
  )}
  data-slot="radio"
  {...restProps}
>
  <RadioPrimitive.Indicator
    class="absolute -inset-px flex size-4.5 items-center justify-center rounded-full before:size-2 before:rounded-full before:bg-primary-foreground data-unchecked:hidden data-checked:bg-primary sm:size-4 sm:before:size-1.5"
    data-slot="radio-indicator"
  />
</RadioPrimitive.Root>
