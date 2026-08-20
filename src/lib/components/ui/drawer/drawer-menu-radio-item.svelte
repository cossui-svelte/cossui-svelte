<script lang="ts">
  import { Radio as RadioPrimitive } from '@shardsui/svelte/radio';
  import type { ComponentProps, Snippet } from 'svelte';
  import { cn } from '$lib/utils';

  type Props = Omit<ComponentProps<typeof RadioPrimitive.Root>, 'children'> & {
    children?: Snippet;
  };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<RadioPrimitive.Root
  class={cn(
    "grid min-h-9 w-full cursor-default select-none items-center gap-2 rounded-sm px-2 py-1 text-base text-foreground outline-none hover:bg-accent hover:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-64 sm:min-h-8 sm:text-sm [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:-mx-0.5 [&_svg]:shrink-0",
    'grid-cols-[1rem_1fr] items-center pe-4',
    className
  )}
  data-slot="drawer-menu-radio-item"
  {...restProps}
>
  <RadioPrimitive.Indicator class="col-start-1">
    <svg
      aria-hidden="true"
      fill="none"
      height="24"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5.252 12.7 10.2 18.63 18.748 5.37" />
    </svg>
  </RadioPrimitive.Indicator>
  <span class="col-start-2">{@render children?.()}</span>
</RadioPrimitive.Root>
