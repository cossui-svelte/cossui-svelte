<script lang="ts" generics="T extends { id: string | number }">
  import { DragDropProvider, DragOverlay } from '@dnd-kit-svelte/svelte';
  import { move } from '@dnd-kit/helpers';
  import type { Snippet } from 'svelte';
  import { SortableState, setSortableState } from './sortable-state.svelte.js';

  let {
    items,
    onReorder,
    children,
    renderOverlay
  }: {
    items: T[];
    onReorder: (items: T[]) => void;
    children?: Snippet;
    renderOverlay?: Snippet<[T]>;
  } = $props();

  const state = setSortableState(new SortableState());

  // @dnd-kit packages resolve to duplicate type versions, hence the `never` casts
  function handleDragStart(event: { operation: { source: { id: string | number } | null } }): void {
    state.isDraggingAny = true;
    state.activeId = event.operation.source?.id ?? null;
    state.hasDragged = true;
  }

  function handleDragEnd(event: { canceled?: boolean; operation: { canceled?: boolean } }): void {
    state.isDraggingAny = false;
    state.activeId = null;
    if (event.canceled || event.operation.canceled) return;
    const next = move(items, event as never);
    if (next !== items) onReorder(next);
  }
</script>

<DragDropProvider onDragStart={handleDragStart as never} onDragEnd={handleDragEnd as never}>
  {@render children?.()}
  {#if renderOverlay}
    <DragOverlay>
      {#snippet children(source)}
        {@const activeItem = items.find((item) => item.id === source.id)}
        {#if activeItem}
          {@render renderOverlay(activeItem)}
        {/if}
      {/snippet}
    </DragOverlay>
  {/if}
</DragDropProvider>
