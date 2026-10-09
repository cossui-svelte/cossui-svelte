import { getContext, setContext } from 'svelte';

export type SortableId = string | number;

export class SortableState {
  isDraggingAny = $state(false);
  activeId = $state<SortableId | null>(null);
  hasDragged = $state(false);
}

const KEY = Symbol('sortable-state');

export function setSortableState(state: SortableState): SortableState {
  return setContext(KEY, state);
}

export function getSortableState(): SortableState {
  return getContext<SortableState | undefined>(KEY) ?? new SortableState();
}
