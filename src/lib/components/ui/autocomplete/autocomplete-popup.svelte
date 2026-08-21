<script lang="ts">
  import { Autocomplete as AutocompletePrimitive } from '@shardsui/svelte/autocomplete';
  import type { ComponentProps, Snippet } from 'svelte';
  import { cn, type WithoutChildren } from '$lib/utils';

  type Props = Omit<ComponentProps<typeof AutocompletePrimitive.Popup>, 'children'> & {
    children?: Snippet;
    side?: ComponentProps<typeof AutocompletePrimitive.Positioner>['side'];
    align?: ComponentProps<typeof AutocompletePrimitive.Positioner>['align'];
    sideOffset?: ComponentProps<typeof AutocompletePrimitive.Positioner>['sideOffset'];
    alignOffset?: ComponentProps<typeof AutocompletePrimitive.Positioner>['alignOffset'];
    portalProps?: WithoutChildren<ComponentProps<typeof AutocompletePrimitive.Portal>>;
  };

  let {
    ref = $bindable(null),
    class: className,
    children,
    side = 'bottom',
    sideOffset = 4,
    alignOffset = 0,
    align = 'start',
    portalProps,
    ...restProps
  }: Props = $props();
</script>

<AutocompletePrimitive.Portal {...portalProps}>
  <AutocompletePrimitive.Positioner
    {side}
    {align}
    {sideOffset}
    {alignOffset}
    class="z-50 select-none"
  >
    <AutocompletePrimitive.Popup
      bind:ref
      class={cn(
        'relative flex max-h-[min(var(--available-height),23rem)] min-w-(--anchor-width) max-w-(--available-width) origin-(--transform-origin) flex-1 flex-col overflow-hidden rounded-lg border bg-popover not-dark:bg-clip-padding text-foreground shadow-lg/5 transition-[scale,opacity] before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] data-starting-style:scale-98 data-starting-style:opacity-0 data-ending-style:scale-98 data-ending-style:opacity-0 dark:before:shadow-[0_-1px_--theme(--color-white/6%)]',
        className
      )}
      data-slot="autocomplete-popup"
      {...restProps}
    >
      {@render children?.()}
    </AutocompletePrimitive.Popup>
  </AutocompletePrimitive.Positioner>
</AutocompletePrimitive.Portal>
