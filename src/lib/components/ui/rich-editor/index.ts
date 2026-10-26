import DragHandle from './components/DragHandle.svelte';
import DragHandleExtended from './components/DragHandleExtended.svelte';
import Toolbar from './components/Toolbar.svelte';
import Editor from './editor.svelte';
import { Tiptap } from './tiptap';
export { createEditor } from './editor.ts';
export * from '@tiptap/core';
import BubbleMenu from './components/menu/BubbleMenu.svelte';
import ToC from './components/ToC.svelte';

const RichEditor = Object.assign(Tiptap, {
  Content: Editor,
  Toolbar,
  BubbleMenu,
  DragHandle,
  DragHandleExtended,
  ToC
});
export { RichEditor };
