<script lang="ts">
  import { Checkbox as CheckboxPrimitive } from '@shardsui/svelte/checkbox';
  import type { ComponentProps, Snippet } from 'svelte';
  import { cn } from '$lib/utils';

  type Props = Omit<ComponentProps<typeof CheckboxPrimitive.Root>, 'children'> & {
    children?: Snippet;
    variant?: 'default' | 'switch';
  };

  let {
    checked = $bindable(false),
    class: className,
    children,
    variant = 'default',
    ...restProps
  }: Props = $props();
</script>

<CheckboxPrimitive.Root
  bind:checked
  class={cn(
    "grid min-h-9 w-full cursor-default select-none items-center gap-2 rounded-sm px-2 py-1 text-base text-foreground outline-none hover:bg-accent hover:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-64 sm:min-h-8 sm:text-sm [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:-mx-0.5 [&_svg]:shrink-0",
    variant === 'switch' ? 'grid-cols-[1fr_auto] gap-4 pe-1.5' : 'grid-cols-[1rem_1fr] pe-4',
    className
  )}
  data-slot="drawer-menu-checkbox-item"
  {...restProps}
>
  {#if variant === 'switch'}
    <span class="col-start-1">{@render children?.()}</span>
    <CheckboxPrimitive.Indicator
      keepMounted
      class="inset-shadow-[0_1px_--theme(--color-black/4%)] col-start-2 inline-flex h-[calc(var(--thumb-size)+2px)] w-[calc(var(--thumb-size)*2-2px)] shrink-0 items-center rounded-full p-px outline-none transition-[background-color,box-shadow] duration-200 [--thumb-size:--spacing(4)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background data-checked:bg-primary data-unchecked:bg-input data-disabled:opacity-64 sm:[--thumb-size:--spacing(3)]"
    >
      <span
        class="pointer-events-none block aspect-square h-full in-[[data-slot=drawer-menu-checkbox-item][data-checked]]:origin-[var(--thumb-size)_50%] origin-left in-[[data-slot=drawer-menu-checkbox-item][data-checked]]:translate-x-[calc(var(--thumb-size)-4px)] in-[[data-slot=drawer-menu-checkbox-item]:active]:not-data-disabled:scale-x-110 in-[[data-slot=drawer-menu-checkbox-item]:active]:rounded-[var(--thumb-size)/calc(var(--thumb-size)*1.10)] rounded-(--thumb-size) bg-background shadow-sm/5 will-change-transform [transition:translate_.15s,border-radius_.15s,scale_.1s_.1s,transform-origin_.15s]"
      ></span>
    </CheckboxPrimitive.Indicator>
  {:else}
    <CheckboxPrimitive.Indicator class="col-start-1">
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
    </CheckboxPrimitive.Indicator>
    <span class="col-start-2">{@render children?.()}</span>
  {/if}
</CheckboxPrimitive.Root>
