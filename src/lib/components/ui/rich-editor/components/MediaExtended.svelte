<script lang="ts">
  import Captions from '@lucide/svelte/icons/captions';
  import CopyIcon from '@lucide/svelte/icons/copy';
  import EllipsisVertical from '@lucide/svelte/icons/ellipsis-vertical';
  import Fullscreen from '@lucide/svelte/icons/fullscreen';
  import AlignCenter from '@lucide/svelte/icons/text-align-center';
  import AlignRight from '@lucide/svelte/icons/text-align-end';
  import AlignLeft from '@lucide/svelte/icons/text-align-start';
  import Trash from '@lucide/svelte/icons/trash-2';
  import type { NodeViewProps } from '@tiptap/core';
  import { onDestroy, onMount, type Snippet } from 'svelte';
  import { Button, buttonVariants } from '#lib/components/ui/button/index.js';
  import { Menu, MenuItem, MenuPopup, MenuTrigger } from '#lib/components/ui/menu/index.js';
  import { cn } from '#lib/utils.js';
  import { duplicateContent } from '../helpers.ts';
  import { NodeViewWrapper } from '../tiptap';

  interface MediaExtendedProps extends NodeViewProps {
    children: Snippet<[]>;
    mediaRef?: HTMLElement;
  }

  const {
    node,
    editor,
    selected,
    deleteNode,
    updateAttributes,
    children,
    mediaRef = $bindable()
  }: MediaExtendedProps = $props();

  const minWidthPercent = 20;
  const maxWidthPercent = 100;

  let nodeRef = $state<HTMLElement>();

  let resizing = $state(false);
  let resizingInitialWidthPercent = $state(0);
  let resizingInitialMouseX = $state(0);
  let resizingPosition = $state<'left' | 'right'>('left');
  let openedMore = $state(false);

  function handleResizingPosition(e: MouseEvent, position: 'left' | 'right') {
    startResize(e);
    resizingPosition = position;
  }

  function startResize(e: MouseEvent) {
    e.preventDefault();
    resizing = true;
    resizingInitialMouseX = e.clientX;
    if (mediaRef && nodeRef?.parentElement) {
      const currentWidth = mediaRef.offsetWidth;
      const parentWidth = nodeRef.parentElement.offsetWidth;
      resizingInitialWidthPercent = (currentWidth / parentWidth) * 100;
    }
  }

  function resize(e: MouseEvent) {
    if (!resizing || !nodeRef?.parentElement) return;
    let dx = e.clientX - resizingInitialMouseX;
    if (resizingPosition === 'left') {
      dx = resizingInitialMouseX - e.clientX;
    }
    const parentWidth = nodeRef.parentElement.offsetWidth;
    const deltaPercent = (dx / parentWidth) * 100;
    const newWidthPercent = Math.max(
      Math.min(resizingInitialWidthPercent + deltaPercent, maxWidthPercent),
      minWidthPercent
    );
    updateAttributes({ width: `${newWidthPercent}%` });
  }

  function endResize() {
    resizing = false;
    resizingInitialMouseX = 0;
    resizingInitialWidthPercent = 0;
  }

  function handleTouchStart(e: TouchEvent, position: 'left' | 'right') {
    e.preventDefault();
    resizing = true;
    resizingPosition = position;
    resizingInitialMouseX = e.touches[0].clientX;
    if (mediaRef && nodeRef?.parentElement) {
      const currentWidth = mediaRef.offsetWidth;
      const parentWidth = nodeRef.parentElement.offsetWidth;
      resizingInitialWidthPercent = (currentWidth / parentWidth) * 100;
    }
  }

  function handleTouchMove(e: TouchEvent) {
    if (!resizing || !nodeRef?.parentElement) return;
    let dx = e.touches[0].clientX - resizingInitialMouseX;
    if (resizingPosition === 'left') {
      dx = resizingInitialMouseX - e.touches[0].clientX;
    }
    const parentWidth = nodeRef.parentElement.offsetWidth;
    const deltaPercent = (dx / parentWidth) * 100;
    const newWidthPercent = Math.max(
      Math.min(resizingInitialWidthPercent + deltaPercent, maxWidthPercent),
      minWidthPercent
    );
    updateAttributes({ width: `${newWidthPercent}%` });
  }

  function handleTouchEnd() {
    resizing = false;
    resizingInitialMouseX = 0;
    resizingInitialWidthPercent = 0;
  }

  onMount(() => {
    // Attach id to nodeRef
    nodeRef = document.getElementById('resizable-container-media') as HTMLDivElement;

    // Mouse events
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', endResize);
    // Touch events
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
  });

  onDestroy(() => {
    window.removeEventListener('mousemove', resize);
    window.removeEventListener('mouseup', endResize);
    window.removeEventListener('touchmove', handleTouchMove);
    window.removeEventListener('touchend', handleTouchEnd);
  });
</script>

<NodeViewWrapper
  id="resizable-container-media"
  class={cn(
    'relative my-4! flex flex-col rounded-md border border-transparent',
    selected && 'is-media-selected',
    node.attrs.align === 'left' && 'left-0 translate-x-0',
    node.attrs.align === 'center' && 'left-1/2 -translate-x-1/2',
    node.attrs.align === 'right' && 'left-full -translate-x-full'
  )}
  style={`width: ${node.attrs.width}`}
>
  <div class={cn('group relative flex flex-col rounded-md', resizing && '')}>
    {@render children()}
    {#if node.attrs.title !== null && node.attrs.title.trim() !== ''}
      <input
        value={node.attrs.title}
        type="text"
        class="my-1 w-full bg-transparent text-center text-sm text-muted-foreground outline-none"
        onchange={(e) => {
          const target = e.target as HTMLInputElement;
          updateAttributes({ title: target.value });
        }}
      />
    {/if}
    {#if editor.isEditable}
      <div
        role="button"
        tabindex="0"
        aria-label="back"
        class="absolute inset-y-0 z-20 flex w-5 cursor-col-resize items-center justify-start p-2"
        style="left: 0px"
        onmousedown={(event: MouseEvent) => {
          handleResizingPosition(event, 'left');
        }}
        ontouchstart={(event: TouchEvent) => {
          handleTouchStart(event, 'left');
        }}
      >
        <div
          class="z-20 h-16 w-1 rounded-xl border bg-muted opacity-0 transition-all group-hover:opacity-100"
        ></div>
      </div>

      <div
        role="button"
        tabindex="0"
        aria-label="back"
        class="absolute inset-y-0 z-20 flex w-5 cursor-col-resize items-center justify-end p-2"
        style="right: 0px"
        onmousedown={(event: MouseEvent) => {
          handleResizingPosition(event, 'right');
        }}
        ontouchstart={(event: TouchEvent) => {
          handleTouchStart(event, 'right');
        }}
      >
        <div
          class="z-20 h-16 w-1 rounded-xl border bg-muted opacity-0 transition-all group-hover:opacity-100"
        ></div>
      </div>
      <div
        class={cn(
          'absolute -top-2 left-[calc(50%-3rem)] z-50! flex items-center gap-1 rounded-md border bg-background/50 p-1 opacity-0 backdrop-blur-sm transition-opacity',
          !resizing && 'group-hover:opacity-100',
          openedMore && 'opacity-100'
        )}
      >
        <Button
          variant="ghost"
          size="icon-xs"
          class={cn(node.attrs.align === 'left' && 'bg-muted')}
          onclick={() => updateAttributes({ align: 'left' })}
          title="Align Left"
        >
          <AlignLeft />
        </Button>
        <Button
          variant="ghost"
          size="icon-xs"
          class={cn(node.attrs.align === 'center' && 'bg-muted')}
          onclick={() => updateAttributes({ align: 'center' })}
          title="Align Center"
        >
          <AlignCenter />
        </Button>
        <Button
          variant="ghost"
          size="icon-xs"
          class={cn(node.attrs.align === 'right' && 'bg-muted')}
          onclick={() => updateAttributes({ align: 'right' })}
          title="Align Right"
        >
          <AlignRight />
        </Button>
        <Menu bind:open={openedMore} onOpenChange={(value: boolean) => (openedMore = value)}>
          <MenuTrigger
            class={buttonVariants({ variant: 'ghost', size: 'icon-xs' })}
            title="More Options"
          >
            <EllipsisVertical />
          </MenuTrigger>
          <MenuPopup align="start" class="mt-1 overflow-auto text-sm">
            <MenuItem
              onclick={() => {
                if (node.attrs.title === null || node.attrs.title.trim() === '')
                  updateAttributes({
                    title: 'Caption'
                  });
              }}
            >
              <Captions />
              Caption
            </MenuItem>
            <MenuItem
              onclick={() => {
                duplicateContent(editor, node);
              }}
            >
              <CopyIcon />
              Duplicate
            </MenuItem>
            <MenuItem
              onclick={() => {
                updateAttributes({
                  width: '100%'
                });
              }}
            >
              <Fullscreen />
              Fullscreen
            </MenuItem>
            <MenuItem
              onclick={() => {
                deleteNode();
              }}
              class="text-destructive"
            >
              <Trash />
              Delete
            </MenuItem>
          </MenuPopup>
        </Menu>
      </div>
    {/if}
  </div>
</NodeViewWrapper>
