<script lang="ts">
  import { ScrollArea as ScrollAreaPrimitive } from '@shardsui/svelte/scroll-area';
  import type { ComponentProps, Snippet } from 'svelte';
  import { cn } from '$lib/utils';
  import Scrollbar from './scroll-area-scrollbar.svelte';

  let {
    ref = $bindable(null),
    viewportRef = $bindable(null),
    class: className,
    orientation = 'both',
    scrollbarXClasses = '',
    scrollbarYClasses = '',
    children,
    scrollFade = false,
    scrollbarGutter = false,
    fill = false,
    clampContentMinWidth = true,
    ...restProps
  }: Omit<ComponentProps<typeof ScrollAreaPrimitive.Root>, 'children'> & {
    orientation?: 'vertical' | 'horizontal' | 'both' | undefined;
    scrollbarXClasses?: string | undefined;
    scrollbarYClasses?: string | undefined;
    viewportRef?: HTMLElement | null;
    scrollFade?: boolean;
    scrollbarGutter?: boolean;
    fill?: boolean;
    clampContentMinWidth?: boolean;
    children?: Snippet;
  } = $props();
</script>

<ScrollAreaPrimitive.Root
  bind:ref
  data-slot="scroll-area"
  class={cn('flex size-full min-h-0 flex-col', className)}
  {...restProps}
>
  <ScrollAreaPrimitive.Viewport
    bind:ref={viewportRef}
    class={cn(
      'min-h-0 flex-1 rounded-[inherit] outline-none transition-shadows focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background data-has-overflow-y:overscroll-y-contain data-has-overflow-x:overscroll-x-contain',
      scrollFade &&
        'mask-t-from-[calc(100%-min(var(--fade-size),var(--scroll-area-overflow-y-start)))] mask-b-from-[calc(100%-min(var(--fade-size),var(--scroll-area-overflow-y-end)))] mask-l-from-[calc(100%-min(var(--fade-size),var(--scroll-area-overflow-x-start)))] mask-r-from-[calc(100%-min(var(--fade-size),var(--scroll-area-overflow-x-end)))] [--fade-size:1.5rem]',
      scrollbarGutter && 'data-has-overflow-y:pe-2.5 data-has-overflow-x:pb-2.5'
    )}
    data-slot="scroll-area-viewport"
  >
    <ScrollAreaPrimitive.Content
      class={cn(fill && 'size-full')}
      data-slot="scroll-area-content"
      style={clampContentMinWidth ? 'min-width: 0' : ''}
    >
      {@render children?.()}
    </ScrollAreaPrimitive.Content>
  </ScrollAreaPrimitive.Viewport>
  {#if orientation === 'vertical' || orientation === 'both'}
    <Scrollbar orientation="vertical" class={scrollbarYClasses} />
  {/if}
  {#if orientation === 'horizontal' || orientation === 'both'}
    <Scrollbar orientation="horizontal" class={scrollbarXClasses} />
  {/if}
  <ScrollAreaPrimitive.Corner data-slot="scroll-area-corner" />
</ScrollAreaPrimitive.Root>
