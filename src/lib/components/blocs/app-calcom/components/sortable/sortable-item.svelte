<script lang="ts">
  import { useSortable } from '@dnd-kit-svelte/svelte/sortable';
  import type { Snippet } from 'svelte';
  import { getSortableState, type SortableId } from './sortable-state.svelte.js';
  import type { SortableItemRenderProps } from './types.js';

  let {
    id,
    index,
    children
  }: {
    id: SortableId;
    /** Position of the item in the list (dnd-kit-svelte needs it explicitly). */
    index: number;
    children: Snippet<[SortableItemRenderProps]>;
  } = $props();

  const sortableState = getSortableState();
  const { ref, handleRef, isDragging } = useSortable({
    id: () => id,
    index: () => index
  });
</script>

{@render children({
  isDragging: isDragging.current,
  isDraggingAny: sortableState.isDraggingAny,
  hasDragged: sortableState.hasDragged,
  ref,
  handleRef,
  style: '--translate-y: 0px'
})}
