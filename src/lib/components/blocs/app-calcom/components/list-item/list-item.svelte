<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { Attachment } from 'svelte/attachments';
  import { createAttachmentKey } from 'svelte/attachments';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '#lib/utils.js';
  import ItemLabel from './item-label.svelte';

  let {
    children,
    child,
    class: className,
    sortable = false,
    labelColorLight,
    labelColorDark,
    isOverlay,
    sortableRef,
    sortableStyle,
    sortableDragging,
    sortableDraggingAny,
    hasDragged,
    ...restProps
  }: HTMLAttributes<HTMLDivElement> & {
    children?: Snippet;
    child?: Snippet<[{ props: Record<string, unknown>; children: Snippet }]>;
    sortable?: boolean;
    labelColorLight?: string;
    labelColorDark?: string;
    isOverlay?: boolean;
    sortableRef?: Attachment<Element>;
    sortableStyle?: string;
    sortableDragging?: boolean;
    sortableDraggingAny?: boolean;
    hasDragged?: boolean;
  } = $props();

  const baseClasses =
    'not-last:border-b bg-clip-padding has-[[data-spanning-trigger]:hover]:z-1 has-[[data-spanning-trigger]:hover]:bg-[color-mix(in_srgb,var(--card),var(--color-black)_2%)] dark:has-[[data-spanning-trigger]:hover]:bg-[color-mix(in_srgb,var(--card),var(--color-white)_2%)] first:rounded-t-[calc(var(--radius-2xl)-1px)] last:rounded-b-[calc(var(--radius-2xl)-1px)] in-[[data-slot=card-frame]:has([data-slot=card-frame-header])]:first:rounded-t-[calc(var(--radius-xl)-1px)] in-[[data-slot=card-frame]:has([data-slot=card-frame-footer])]:last:rounded-b-[calc(var(--radius-xl)-1px)]';

  const staticClasses = 'transition-[background-color]';

  const sortableClasses =
    'after:-inset-px relative translate-y-(--translate-y) data-has-dragged:starting:rounded-2xl not-data-drag-on:transition-[background-color] data-has-dragged:not-data-drag-on:transition-[background-color,border-radius] after:pointer-events-none after:invisible after:absolute data-has-dragged:starting:after:inset-y-1 data-has-dragged:starting:after:rounded-2xl first:after:rounded-t-2xl last:after:rounded-b-2xl after:border after:border-border after:bg-card after:transition-[border-radius,inset] data-drag-overlay:data-drag-release:hidden data-drag-overlay:pointer-events-none data-drag-on:not-data-drag-ghost:z-1 data-drag-on:rounded-2xl data-drag-on:transition-[translate] data-drag-on:after:visible data-drag-overlay:after:visible data-drag-on:after:inset-y-1 data-drag-overlay:after:inset-y-1 data-drag-on:after:rounded-2xl data-drag-overlay:after:rounded-2xl data-drag-ghost:after:border-dashed data-drag-ghost:after:bg-muted/24 not-dark:data-drag-overlay:after:bg-clip-padding data-drag-overlay:after:shadow-lg data-drag-ghost:*:opacity-0 before:pointer-events-none before:absolute before:inset-x-0 before:inset-y-[5px] before:rounded-[calc(var(--radius-2xl)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/6%)] not-data-drag-overlay:before:hidden before:z-1';

  const mergedProps = $derived({
    'data-drag-ghost': sortable && sortableDragging ? '' : undefined,
    'data-drag-on': sortable && sortableDraggingAny ? '' : undefined,
    'data-drag-overlay': sortable && isOverlay ? '' : undefined,
    'data-draggable': sortable ? '' : undefined,
    'data-has-dragged': sortable && hasDragged ? '' : undefined,
    'data-slot': 'list-item',
    style: sortable ? sortableStyle : undefined,
    ...(sortable && sortableRef ? { [createAttachmentKey()]: sortableRef } : {}),
    ...restProps,
    class: cn(baseClasses, sortable ? sortableClasses : staticClasses, className)
  });
</script>

{#snippet inner()}
  <div class={cn('relative flex items-center justify-between gap-4 px-6 py-4', sortable && 'z-1')}>
    {#if sortable}
      <ItemLabel colorDark={labelColorDark} colorLight={labelColorLight} />
    {/if}
    {@render children?.()}
  </div>
{/snippet}

{#if child}
  {@render child({ props: mergedProps, children: inner })}
{:else}
  <div {...mergedProps}>
    {@render inner()}
  </div>
{/if}
