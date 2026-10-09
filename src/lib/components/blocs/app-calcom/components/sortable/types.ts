import type { Attachment } from 'svelte/attachments';

export interface SortableItemRenderProps {
  isDragging: boolean;
  isDraggingAny: boolean;
  hasDragged: boolean;
  /** Attach to the draggable root (pass to ListItem's `sortableRef`). */
  ref: Attachment<Element>;
  /** Optional: attach to a dedicated drag handle instead of making the whole row the activator. */
  handleRef: Attachment<Element>;
  /** CSS string for the row (`--translate-y`). */
  style: string;
}
