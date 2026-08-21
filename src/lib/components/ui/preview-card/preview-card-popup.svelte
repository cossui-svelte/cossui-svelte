<script lang="ts">
  import { PreviewCard as PreviewCardPrimitive } from '@shardsui/svelte/preview-card';
  import type { ComponentProps, Snippet } from 'svelte';
  import { cn, type WithoutChildren } from '$lib/utils';

  type Props = Omit<ComponentProps<typeof PreviewCardPrimitive.Popup>, 'children'> & {
    children?: Snippet;
    side?: ComponentProps<typeof PreviewCardPrimitive.Positioner>['side'];
    align?: ComponentProps<typeof PreviewCardPrimitive.Positioner>['align'];
    sideOffset?: ComponentProps<typeof PreviewCardPrimitive.Positioner>['sideOffset'];
    alignOffset?: ComponentProps<typeof PreviewCardPrimitive.Positioner>['alignOffset'];
    customAnchor?: ComponentProps<typeof PreviewCardPrimitive.Positioner>['anchor'];
    showArrow?: boolean;
    portalProps?: WithoutChildren<ComponentProps<typeof PreviewCardPrimitive.Portal>>;
  };

  let {
    ref = $bindable(null),
    class: className,
    children,
    showArrow = false,
    side = 'bottom',
    align = 'center',
    sideOffset = 4,
    alignOffset = 0,
    customAnchor,
    portalProps,
    ...restProps
  }: Props = $props();
</script>

<PreviewCardPrimitive.Portal {...portalProps}>
  <PreviewCardPrimitive.Positioner
    {side}
    {align}
    {sideOffset}
    {alignOffset}
    anchor={customAnchor}
    class="z-50"
    data-slot="preview-card-positioner"
  >
    <PreviewCardPrimitive.Popup
      bind:ref
      class={cn(
        'relative flex w-64 origin-(--transform-origin) text-balance rounded-lg border bg-popover not-dark:bg-clip-padding p-4 text-popover-foreground text-sm shadow-lg/5 transition-[scale,opacity] data-starting-style:scale-98 data-starting-style:opacity-0 data-ending-style:scale-98 data-ending-style:opacity-0 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/6%)]',
        className
      )}
      data-slot="preview-card-content"
      {...restProps}
    >
      {@render children?.()}
      {#if showArrow}
        <PreviewCardPrimitive.Arrow
          class="text-popover -my-px drop-shadow-[0_1px_0_hsl(var(--border))] data-[side=bottom]:-top-1.75 data-[side=bottom]:rotate-180 data-[side=left]:-right-2.75 data-[side=left]:-rotate-90 data-[side=right]:-left-2.75 data-[side=right]:rotate-90 data-[side=top]:-bottom-1.75"
        >
          <svg viewBox="0 0 30 10" width="10" height="5" preserveAspectRatio="none">
            <polygon points="0,0 30,0 15,10" fill="currentColor" />
          </svg>
        </PreviewCardPrimitive.Arrow>
      {/if}
    </PreviewCardPrimitive.Popup>
  </PreviewCardPrimitive.Positioner>
</PreviewCardPrimitive.Portal>
