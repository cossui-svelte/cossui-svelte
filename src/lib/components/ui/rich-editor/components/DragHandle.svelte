<script lang="ts">
  import { autoPlacement } from '@floating-ui/dom';
  import GripVertical from '@lucide/svelte/icons/grip-vertical';
  import type { Editor } from '@tiptap/core';
  import { DragHandlePlugin } from '@tiptap/extension-drag-handle';
  import type { Node } from '@tiptap/pm/model';
  import { onMount, type Snippet } from 'svelte';
  import { cn } from '#lib/utils.js';
  import { getEditor } from '../tiptap';

  interface Props {
    /** Additional classes applied to the drag handle wrapper. */
    class?: string;
    /**
     * Optional interactive controls rendered inside the handle. When omitted,
     * the handle only renders a non-clickable grip that can be dragged.
     */
    children?: Snippet;
    /** The node currently next to the drag handle. */
    node?: Node | null;
    /** The document position of the node currently next to the drag handle. */
    pos?: number;
    /** The wrapper element, exposed so menus can be portalled inside the handle. */
    element?: HTMLElement | null;
  }

  let {
    class: className,
    children,
    node = $bindable(null),
    pos = $bindable(-1),
    element = $bindable(null)
  }: Props = $props();

  const editor = getEditor();
  const pluginKey = 'globalDragHandle';

  const onNodeChange = (data: { editor: Editor; node: Node | null; pos: number }) => {
    if (data.node) node = data.node;
    pos = data.pos;
  };

  onMount(() => {
    if (!element) return;

    const plugin = DragHandlePlugin({
      element,
      pluginKey,
      editor,
      computePositionConfig: {
        strategy: 'absolute',
        middleware: [
          autoPlacement({
            allowedPlacements: ['left', 'left-start', 'left-end']
          })
        ]
      },
      nestedOptions: {
        enabled: true,
        rules: [],
        defaultRules: true,
        allowedContainers: undefined,
        edgeDetection: {
          threshold: 1,
          edges: ['left', 'top', 'bottom'],
          strength: 1
        }
      },
      onNodeChange
    });

    editor.registerPlugin(plugin.plugin);

    return () => editor.unregisterPlugin(pluginKey);
  });
</script>

<div
  bind:this={element}
  data-slot="drag-handle"
  class={cn('z-0! flex items-center', className)}
  style="visibility: hidden;"
>
  {#if children}
    {@render children()}
  {:else}
    <div
      class="flex size-7 cursor-grab items-center justify-center rounded-sm opacity-60 transition-opacity hover:opacity-100 active:cursor-grabbing"
      aria-hidden="true"
    >
      <GripVertical class="size-4" />
    </div>
  {/if}
</div>
