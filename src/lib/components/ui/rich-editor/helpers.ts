import type { Editor } from '@tiptap/core';
import type { Node } from '@tiptap/pm/model';
import { Decoration, DecorationSet } from '@tiptap/pm/view';
export const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';

/**
 * Check if the current browser is in mac or not
 */
export const ISMAC = isBrowser
  ? navigator.userAgent.includes('Macintosh') || navigator.userAgent.includes('Mac OS X')
  : false;

export const getKeyboardShortcut = (key: string, ctrl = false, shift = false, alt = false) => {
  const modifiers: string[] = [];
  if (ISMAC) {
    if (ctrl) modifiers.push('⌘');
    if (shift) modifiers.push('⇧');
    if (alt) modifiers.push('⌥');
  } else {
    if (ctrl) modifiers.push('Ctrl');
    if (shift) modifiers.push('Shift');
    if (alt) modifiers.push('Alt');
  }

  return [...modifiers, key].join(' ');
};

/**
 * Find colors in the document
 * @param doc Node - node to find colors in
 * @returns DecorationSet - set of decorations for the colors found in the node
 */
export const findColors = (doc: Node) => {
  const hexColor = /(#[0-9a-f]{3,6})\b/gi;
  const decorations: Decoration[] = [];

  doc.descendants((node, position) => {
    if (!node.text) {
      return;
    }

    Array.from(node.text.matchAll(hexColor)).forEach((match: RegExpMatchArray) => {
      const color = match[0];
      const index = match.index || 0;
      const from = position + index;
      const to = from + color.length;
      const decoration = Decoration.inline(from, to, {
        class: 'color',
        style: `--color: ${color}`
      });

      decorations.push(decoration);
    });
  });

  return DecorationSet.create(doc, decorations);
};

/**
 * Dupilcate content at the current selection
 * @param editor Editor instance
 * @param node Node to be duplicated
 */
export const duplicateContent = (editor: Editor, node: Node) => {
  const { view } = editor;
  const { state } = view;
  const { selection } = state;

  editor
    .chain()
    .insertContentAt(selection.to, node.toJSON(), {
      updateSelection: true
    })
    .focus(selection.to)
    .run();
};

export const isURL = (str: string): boolean => {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
};

/**
 * Portal props for Shards UI floating content (popover, menu, combobox) that is
 * opened from inside a Tiptap node view.
 *
 * When such a popup opens, Shards UI marks every outside element with
 * `data-shards-ui-inert` (used for outside-press detection). If the popup is
 * still inside the ProseMirror DOM at that moment, the marker is written to
 * ProseMirror's own nodes. ProseMirror sees those attribute mutations, re-renders
 * the document and recreates the node view — resetting the popup's `open` state
 * so it vanishes immediately.
 *
 * Mounting the portal up front moves it to `document.body` before the markers
 * are calculated, so only the app shell (outside the editor) gets marked and the
 * node view is left untouched.
 */
export const nodeViewPortalProps = { keepMounted: true } as const;

export const quickcolors = [
  { label: 'Default', value: '' },
  { label: 'Blue', value: '#0E0E99' },
  { label: 'Brown', value: '#7D0404' },
  { label: 'Green', value: '#077507' },
  { label: 'Gray', value: '#636262' },
  { label: 'Orange', value: '#A34603' },
  { label: 'Pink', value: '#DB0762' },
  { label: 'Purple', value: '#83069C' },
  { label: 'Red', value: '#B30707' },
  { label: 'Yellow', value: '#C4C404' }
];
