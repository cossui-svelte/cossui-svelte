/**
 * Sortable (port of calcom components/sortable.tsx) on @dnd-kit-svelte/svelte.
 *
 * Exports
 * - SortableList<T extends { id: string | number }>
 *     props: items: T[], onReorder(items: T[]), children: Snippet, renderOverlay?: Snippet<[T]>
 *     Wraps a DragDropProvider; calls onReorder with the reordered array on drop (not on cancel).
 *     `renderOverlay` renders the floating drag preview (use `{#snippet renderOverlay(item)}`).
 * - SortableItem
 *     props: id, index (NEW: required in Svelte, the item's position), children: Snippet<[SortableItemRenderProps]>
 *     Render props: { isDragging, isDraggingAny, hasDragged, ref, handleRef, style }.
 *     Usage: `{#each items as item, i (item.id)}<SortableItem id={item.id} index={i}>{#snippet children(s)}
 *       <SortableListItem sortableRef={s.ref} sortableStyle={s.style} sortableDragging={s.isDragging}
 *         sortableDraggingAny={s.isDraggingAny} hasDragged={s.hasDragged}>...` (see ../list-item).
 * - arrayMove (re-export from @dnd-kit/helpers)
 * - type SortableItemRenderProps
 *
 * Differences from the React original: `attributes`/`listeners`/`setNodeRef` are replaced by the `ref`
 * attachment; no custom drop animation (data-drag-release is not set) and default pointer/keyboard sensors.
 */
export { arrayMove } from '@dnd-kit/helpers';
export { default as SortableItem } from './sortable-item.svelte';
export { default as SortableList } from './sortable-list.svelte';
export type { SortableItemRenderProps } from './types.js';
