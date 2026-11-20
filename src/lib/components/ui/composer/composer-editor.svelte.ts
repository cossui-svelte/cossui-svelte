import { Autocomplete as AutocompletePrimitive } from '@shardsui/svelte/autocomplete';
import { createContext, untrack } from 'svelte';
import { SvelteMap } from 'svelte/reactivity';
import { COMPOSER_CLIPBOARD_TYPE, parseComposerClipboard } from './composer-clipboard';
import {
  type ActiveQuery,
  type ComposerItemValue,
  type ComposerPart,
  type ComposerQuery,
  type ComposerSelection,
  type ComposerSnapshot,
  type ComposerTokenPart,
  type ComposerTrigger,
  type ComposerValue,
  currentQuery,
  equalValue,
  getComposerText,
  getFilteredItems,
  hasVisibleItems,
  insertItem,
  insertPlainText,
  readSelection,
  readValue,
  restoreSelection,
  writeValue
} from './composer-document';

export type ComposerChangeDetails = {
  reason: 'input' | 'selection' | 'history' | 'reset';
};

export type ComposerEditorOptions = {
  value: ComposerValue;
  onValueChange: (value: ComposerValue, details: ComposerChangeDetails) => void;
  /** Value `reset()` returns to. Defaults to an empty draft. */
  defaultValue?: ComposerValue;
  onSubmit?: (value: ComposerValue) => void;
  onQueryChange?: (query: ComposerQuery | null) => void;
  onAction?: (item: ComposerItemValue, query: ComposerQuery) => void;
  submitOnEmptySuggestions?: boolean;
  triggers?: readonly ComposerTrigger[];
  disabled?: boolean;
  readOnly?: boolean;
  submitDisabled?: boolean;
  allowEmpty?: boolean;
  submitOnEnter?: 'desktop' | 'always' | 'never';
};

type History = {
  current: ComposerSnapshot;
  past: ComposerSnapshot[];
  future: ComposerSnapshot[];
  inputType: string;
  timestamp: number;
};

function createHistory(value: ComposerValue): History {
  return {
    current: { value, selection: null },
    past: [],
    future: [],
    inputType: '',
    timestamp: 0
  };
}

/**
 * Creates a filter with the same `contains` / `startsWith` / `endsWith` helpers
 * the composer uses for its default suggestion matching.
 */
export function useComposerFilter(
  options?: Parameters<typeof AutocompletePrimitive.createFilter>[0]
) {
  return AutocompletePrimitive.createFilter({ sensitivity: 'base', ...options });
}

const defaultFilter = useComposerFilter();

type EventHandlers = {
  onkeydown: (event: KeyboardEvent) => void;
  onkeyup: (event: KeyboardEvent) => void;
  onclick: (event: MouseEvent) => void;
  onblur: (event: FocusEvent) => void;
  oninput: (event: Event) => void;
  oncompositionstart: (event: CompositionEvent) => void;
  oncompositionend: (event: CompositionEvent) => void;
  oncopy: (event: ClipboardEvent) => void;
  oncut: (event: ClipboardEvent) => void;
  onpaste: (event: ClipboardEvent) => void;
  ondrop: (event: DragEvent) => void;
};

/**
 * Headless engine behind `<Composer>`: owns the contenteditable (or textarea)
 * DOM sync, undo history, trigger queries and clipboard handling.
 * Must be constructed during component initialisation (it registers effects).
 */
export class ComposerEditor {
  #options: () => ComposerEditorOptions;

  inputElement = $state<HTMLElement | null>(null);
  rootElement = $state<HTMLFormElement | null>(null);

  isComposing = $state(false);
  query = $state.raw<ActiveQuery | null>(null);
  tokenHosts = $state.raw<readonly HTMLSpanElement[]>([]);
  revision = $state(0);

  #history: History;
  #pendingInput: { type: string; selection: ComposerSelection | null } = {
    type: '',
    selection: null
  };
  #lastSelection: ComposerSelection | null = null;
  #composing = false;
  #compositionValue: ComposerValue;
  #ignoreCompositionInput = false;
  #dismissedQuery: string | null = null;

  constructor(options: () => ComposerEditorOptions) {
    this.#options = options;
    const initial = untrack(() => options().value);
    this.#history = createHistory(initial);
    this.#compositionValue = initial;

    $effect(() => {
      const query = this.query;
      const text = query?.text;
      const key = query?.key;
      const character = query?.character;
      untrack(() =>
        this.#options().onQueryChange?.(
          character && text !== undefined && key ? { character, text, key } : null
        )
      );
    });

    $effect(() => {
      const { disabled, readOnly, triggers = [] } = this.#options();
      const query = this.query;
      if (query && (disabled || readOnly || !triggers.some((t) => t.character === query.character)))
        untrack(() => (this.query = null));
    });

    $effect(() => {
      const input = this.inputElement;
      if (!input || input instanceof HTMLTextAreaElement) return;
      const beforeInput = (event: InputEvent) => {
        if (event.defaultPrevented) return;
        if (this.disabled || this.readOnly || event.inputType.startsWith('format')) {
          event.preventDefault();
          return;
        }
        if (event.inputType === 'historyUndo' || event.inputType === 'historyRedo') {
          event.preventDefault();
          this.#historyAction(event.inputType === 'historyUndo' ? 'undo' : 'redo');
        } else if (!this.#composing) {
          this.#pendingInput = {
            type: event.inputType,
            selection: readSelection(input)
          };
        }
      };
      input.addEventListener('beforeinput', beforeInput);
      return () => input.removeEventListener('beforeinput', beforeInput);
    });

    $effect(() => {
      const input = this.inputElement;
      if (!input || input instanceof HTMLTextAreaElement || this.disabled || this.readOnly) return;
      const initializeCaret = () => {
        if (this.#composing || readValue(input).length > 0) return;
        input.ownerDocument.getSelection()?.setBaseAndExtent(input, 0, input, 0);
      };
      // Initialize before focusin, while the drawer's temporary focus geometry is
      // still applied, so Safari doesn't pan to reveal the empty editor's caret.
      input.addEventListener('focus', initializeCaret);
      return () => input.removeEventListener('focus', initializeCaret);
    });

    $effect(() => {
      const onSelectionChange = () => {
        const input = this.inputElement;
        if (input && document.activeElement === input && !this.#composing) {
          this.#lastSelection = readSelection(input);
          this.#updateQuery();
        }
      };
      document.addEventListener('selectionchange', onSelectionChange);
      return () => document.removeEventListener('selectionchange', onSelectionChange);
    });

    // Reconcile after every commit, including edits the controlled owner rejects
    // without changing the value (`revision` is bumped by every local edit).
    $effect(() => {
      const input = this.inputElement;
      const { value, disabled = false, readOnly = false } = this.#options();
      void this.revision;
      if (!input || this.#composing) return;
      untrack(() => {
        const expected: ComposerValue =
          input instanceof HTMLTextAreaElement
            ? getComposerText(value)
              ? [{ type: 'text', text: getComposerText(value) }]
              : []
            : value;
        if (!equalValue(this.#history.current.value, expected)) {
          this.#lastSelection = null;
          this.#history = createHistory(expected);
        }
        if (!equalValue(readValue(input), expected)) {
          const selection = readSelection(input);
          writeValue(input, expected);
          restoreSelection(input, selection);
          this.query = null;
          this.#dismissedQuery = null;
        }
        this.#syncTokenHosts(input);
        if (input instanceof HTMLTextAreaElement) {
          input.disabled = disabled;
          input.readOnly = readOnly;
        }
      });
    });
  }

  // --- derived state -------------------------------------------------------

  get value(): ComposerValue {
    return this.#options().value;
  }
  get disabled(): boolean {
    return this.#options().disabled ?? false;
  }
  get readOnly(): boolean {
    return this.#options().readOnly ?? false;
  }
  get isTextarea(): boolean {
    return this.inputElement?.tagName === 'TEXTAREA';
  }
  get isEmpty(): boolean {
    return !getComposerText(this.value);
  }
  get triggers(): readonly ComposerTrigger[] {
    return this.#options().triggers ?? [];
  }
  get trigger(): ComposerTrigger | undefined {
    return this.triggers.find((item) => item.character === this.query?.character);
  }
  get items(): readonly ComposerItemValue[] {
    return getFilteredItems(this.trigger, this.query, defaultFilter.contains);
  }
  get open(): boolean {
    return (
      !this.isTextarea &&
      !this.isComposing &&
      !this.disabled &&
      !this.readOnly &&
      Boolean(this.query) &&
      hasVisibleItems(this.trigger, this.items)
    );
  }
  get canSubmit(): boolean {
    const { submitDisabled = false, allowEmpty = false } = this.#options();
    return (
      !this.isComposing &&
      !this.disabled &&
      !this.readOnly &&
      !submitDisabled &&
      (allowEmpty || Boolean(getComposerText(this.value).trim()))
    );
  }
  get status(): 'ready' | 'loading' | 'error' {
    return this.trigger?.status ?? 'ready';
  }

  /** Props for the suggestion controller. */
  get suggestions() {
    const { submitOnEmptySuggestions = false } = this.#options();
    return {
      submitOnEmptySuggestions,
      enabled:
        this.triggers.length > 0 &&
        !this.isTextarea &&
        !this.isComposing &&
        !this.disabled &&
        !this.readOnly,
      items: this.items,
      open: this.open,
      onOpenChange: (nextOpen: boolean) => {
        if (!nextOpen) this.#dismissSuggestions();
      },
      onItemSelect: (item: ComposerItemValue) => this.#selectItem(item)
    };
  }

  // --- internals -----------------------------------------------------------

  #syncTokenHosts(input: HTMLElement): void {
    const next = Array.from(
      input.querySelectorAll<HTMLSpanElement>('[data-slot="composer-token-renderer"]')
    );
    const previous = this.tokenHosts;
    if (previous.length === next.length && previous.every((host, index) => host === next[index]))
      return;
    this.tokenHosts = next;
  }

  #updateQuery = (): void => {
    const input = this.inputElement;
    const { triggers = [], disabled = false, readOnly = false } = this.#options();
    const next =
      input &&
      !this.#composing &&
      document.activeElement === input &&
      triggers.length > 0 &&
      !disabled &&
      !readOnly &&
      !(input instanceof HTMLTextAreaElement)
        ? currentQuery(input as HTMLElement, triggers)
        : null;
    if (!next || next.key !== this.#dismissedQuery) this.#dismissedQuery = null;
    const active = next?.key === this.#dismissedQuery ? null : next;
    const previous = this.query;
    this.query =
      previous?.key === active?.key && previous?.node === active?.node ? previous : active;
  };

  #dismissSuggestions = (): void => {
    this.#dismissedQuery = this.query?.key ?? null;
    this.query = null;
  };

  #publish = (reason: ComposerChangeDetails['reason'] = 'input'): void => {
    const input = this.inputElement;
    if (!input || this.#composing || this.disabled || this.readOnly) return;
    const next = readValue(input);
    if (!(input instanceof HTMLTextAreaElement)) {
      const previous = this.#history;
      if (!equalValue(previous.current.value, next)) {
        const before = this.#pendingInput;
        const now = Date.now();
        const group =
          reason === 'input' &&
          /^(insertText|deleteContentBackward|deleteContentForward)$/.test(before.type) &&
          previous.inputType === before.type &&
          now - previous.timestamp < 1000 &&
          before.selection?.anchor === previous.current.selection?.anchor &&
          before.selection?.focus === previous.current.selection?.focus;
        if (!group) previous.past.push({ ...previous.current, selection: before.selection });
        if (previous.past.length > 100) previous.past.shift();
        previous.future = [];
        previous.current = { value: next, selection: readSelection(input) };
        previous.inputType = before.type;
        previous.timestamp = now;
      }
      this.#pendingInput = { type: '', selection: null };
    }
    if (!equalValue(next, this.value)) this.#options().onValueChange(next, { reason });
    this.revision++;
    this.#syncTokenHosts(input);
    this.#dismissedQuery = null;
    this.#updateQuery();
  };

  #selectItem = (suggestion: ComposerItemValue): void => {
    const input = this.inputElement;
    const query = this.query;
    if (
      this.disabled ||
      this.readOnly ||
      this.#composing ||
      suggestion.disabled ||
      !query ||
      !input?.contains(query.node)
    )
      return;
    this.#pendingInput = { type: 'selection', selection: readSelection(input) };
    const { onAction } = this.#options();
    if (suggestion.type === 'action' && onAction) {
      const range = document.createRange();
      range.setStart(query.node, query.start);
      range.setEnd(query.node, query.end);
      range.deleteContents();
      range.collapse(true);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
      this.#publish('selection');
      this.query = null;
      onAction(suggestion, { character: query.character, text: query.text, key: query.key });
      return;
    }
    insertItem(input as HTMLDivElement, query, suggestion);
    this.#publish('selection');
    this.query = null;
  };

  #historyAction = (direction: 'undo' | 'redo'): void => {
    const input = this.inputElement;
    if (
      !input ||
      input instanceof HTMLTextAreaElement ||
      this.disabled ||
      this.readOnly ||
      this.#composing
    )
      return;
    const state = this.#history;
    const source = direction === 'undo' ? state.past : state.future;
    const destination = direction === 'undo' ? state.future : state.past;
    const snapshot = source.pop();
    if (!snapshot) return;
    destination.push({ value: readValue(input), selection: readSelection(input) });
    state.current = snapshot;
    state.inputType = '';
    writeValue(input, snapshot.value);
    restoreSelection(input, snapshot.selection);
    this.#options().onValueChange(snapshot.value, { reason: 'history' });
    this.revision++;
    this.#syncTokenHosts(input);
    this.#dismissSuggestions();
  };

  #performSubmit = (): void => {
    if (!this.canSubmit || this.#composing) return;
    this.#dismissSuggestions();
    this.#options().onSubmit?.(this.value);
  };

  // --- public actions ------------------------------------------------------

  submit = (): void => {
    if (!this.canSubmit || this.#composing) return;
    const root = this.rootElement;
    if (root instanceof HTMLFormElement) root.requestSubmit();
    else this.#performSubmit();
  };

  insertTrigger = (character: string): void => {
    const input = this.inputElement;
    if (
      !input ||
      input instanceof HTMLTextAreaElement ||
      this.disabled ||
      this.readOnly ||
      this.#composing ||
      !this.triggers.some((trigger) => trigger.character === character)
    )
      return;
    const text = getComposerText(readValue(input));
    const selection = readSelection(input) ??
      this.#lastSelection ?? { anchor: text.length, focus: text.length };
    input.focus({ preventScroll: true });
    restoreSelection(input, selection);
    const start = Math.min(selection.anchor, selection.focus);
    const end = Math.max(selection.anchor, selection.focus);
    const preceding = text.slice(0, start);
    const following = text.slice(end);
    const prefix = preceding && !/\s$/u.test(preceding) ? ' ' : '';
    const suffix = following && !/^\s/u.test(following) ? ' ' : '';
    this.#pendingInput = { type: 'trigger', selection: readSelection(input) };
    insertPlainText(input, `${prefix}${character}${suffix}`);
    if (suffix) {
      const caret = start + prefix.length + character.length;
      restoreSelection(input, { anchor: caret, focus: caret });
    }
    this.#publish();
    this.#lastSelection = readSelection(input);
  };

  reset = (next?: ComposerValue): void => {
    const value = next ?? this.#options().defaultValue ?? [];
    this.#lastSelection = null;
    this.#history = createHistory(value);
    this.#dismissSuggestions();
    this.#options().onValueChange(value, { reason: 'reset' });
    this.revision++;
  };

  // --- event handlers ------------------------------------------------------

  #onKeyDown = (event: KeyboardEvent): void => {
    if (event.defaultPrevented || this.#composing || event.isComposing || event.keyCode === 229)
      return;
    if (
      !this.isTextarea &&
      (event.metaKey || event.ctrlKey) &&
      !event.altKey &&
      (event.key.toLowerCase() === 'z' || (event.ctrlKey && event.key.toLowerCase() === 'y'))
    ) {
      event.preventDefault();
      this.#historyAction(event.shiftKey || event.key.toLowerCase() === 'y' ? 'redo' : 'undo');
      return;
    }
    const { submitOnEnter = 'always' } = this.#options();
    if (
      event.key === 'Enter' &&
      !event.shiftKey &&
      (submitOnEnter === 'always' ||
        (submitOnEnter === 'desktop' && window.matchMedia('(pointer: fine)').matches))
    ) {
      event.preventDefault();
      this.submit();
    }
  };

  #copySelection(event: ClipboardEvent): { selection: Selection; copied: ComposerValue } | null {
    const input = this.inputElement;
    if (event.defaultPrevented || !input || input instanceof HTMLTextAreaElement) return null;
    const selection = window.getSelection();
    if (
      !selection?.rangeCount ||
      selection.isCollapsed ||
      !input.contains(selection.anchorNode) ||
      !input.contains(selection.focusNode)
    )
      return null;
    const fragment = document.createElement('div');
    fragment.appendChild(selection.getRangeAt(0).cloneContents());
    const copied = readValue(fragment, false);
    event.clipboardData?.setData('text/plain', getComposerText(copied));
    event.clipboardData?.setData(COMPOSER_CLIPBOARD_TYPE, JSON.stringify(copied));
    event.preventDefault();
    return { selection, copied };
  }

  #onCopy = (event: ClipboardEvent): void => {
    this.#copySelection(event);
  };

  #onCut = (event: ClipboardEvent): void => {
    const input = this.inputElement;
    const result = this.#copySelection(event);
    if (!result || !input) return;
    if (this.disabled || this.readOnly || this.#composing) return;
    this.#pendingInput = { type: 'cut', selection: readSelection(input) };
    result.selection.getRangeAt(0).deleteContents();
    this.#publish();
  };

  #onPaste = (event: ClipboardEvent): void => {
    const input = this.inputElement;
    if (event.defaultPrevented || !input || input instanceof HTMLTextAreaElement) return;
    event.preventDefault();
    if (this.disabled || this.readOnly || this.#composing) return;
    this.#pendingInput = { type: 'paste', selection: readSelection(input) };
    const pastedValue = parseComposerClipboard(
      event.clipboardData?.getData(COMPOSER_CLIPBOARD_TYPE) ?? ''
    );
    if (pastedValue) {
      const selection = window.getSelection();
      if (
        !selection?.rangeCount ||
        !input.contains(selection.anchorNode) ||
        !input.contains(selection.focusNode)
      )
        return;
      const range = selection.getRangeAt(0);
      range.deleteContents();
      const fragment = document.createElement('div');
      writeValue(fragment, pastedValue);
      const nodes = Array.from(fragment.childNodes).filter(
        (node) => !(node instanceof HTMLElement && node.hasAttribute('data-composer-placeholder'))
      );
      const last = nodes.at(-1);
      for (const node of nodes.reverse()) range.insertNode(node);
      if (last) range.setStartAfter(last);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    } else insertPlainText(input, event.clipboardData?.getData('text/plain') ?? '');
    this.#publish();
  };

  #onDrop = (event: DragEvent): void => {
    const input = this.inputElement;
    if (event.defaultPrevented || !input || input instanceof HTMLTextAreaElement) return;
    event.preventDefault();
    if (this.disabled || this.readOnly || this.#composing) return;
    const text = event.dataTransfer?.getData('text/plain');
    if (!text) return;
    const documentWithCaret = document as Document & {
      caretPositionFromPoint?: (
        x: number,
        y: number
      ) => { offsetNode: Node; offset: number } | null;
      caretRangeFromPoint?: (x: number, y: number) => Range | null;
    };
    const position = documentWithCaret.caretPositionFromPoint?.(event.clientX, event.clientY);
    const range = documentWithCaret.caretRangeFromPoint?.(event.clientX, event.clientY);
    const node = position?.offsetNode ?? range?.startContainer;
    const offset = position?.offset ?? range?.startOffset;
    if (!node || offset === undefined || !input.contains(node)) return;
    const token = (node instanceof Element ? node : node.parentElement)?.closest(
      '[data-composer-token]'
    );
    if (token) {
      const afterToken = document.createRange();
      afterToken.setStartAfter(token);
      afterToken.collapse(true);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(afterToken);
    } else {
      window.getSelection()?.collapse(node, offset);
    }
    input.focus({ preventScroll: true });
    this.#pendingInput = { type: 'drop', selection: readSelection(input) };
    insertPlainText(input, text);
    this.#publish();
  };

  readonly handlers: EventHandlers = {
    onkeydown: this.#onKeyDown,
    onkeyup: (event) => {
      if (!event.defaultPrevented && !this.#composing) this.#updateQuery();
    },
    onclick: () => this.#updateQuery(),
    onblur: () => {
      const input = this.inputElement;
      this.#lastSelection = (input && readSelection(input)) ?? this.#lastSelection;
      this.#dismissSuggestions();
    },
    oninput: () => {
      if (this.#ignoreCompositionInput) return;
      this.#publish();
    },
    oncompositionstart: () => {
      const input = this.inputElement;
      this.#pendingInput = {
        type: 'composition',
        selection: input ? readSelection(input) : null
      };
      this.#composing = true;
      this.isComposing = true;
      this.#compositionValue = this.value;
      this.query = null;
    },
    oncompositionend: () => {
      this.#composing = false;
      this.isComposing = false;
      this.#ignoreCompositionInput = true;
      queueMicrotask(() => {
        this.#ignoreCompositionInput = false;
      });
      if (equalValue(this.#compositionValue, this.value)) this.#publish();
      this.revision++;
    },
    oncopy: this.#onCopy,
    oncut: this.#onCut,
    onpaste: this.#onPaste,
    ondrop: this.#onDrop
  };

  /** Attributes (non-handler) for the input element. */
  get inputAttributes() {
    return {
      contenteditable: this.isTextarea ? undefined : !this.disabled && !this.readOnly,
      role: 'textbox' as const,
      tabindex: this.disabled ? -1 : 0,
      'aria-disabled': this.disabled || undefined,
      'aria-readonly': this.readOnly || undefined,
      'aria-multiline': true as const
    };
  }

  onFormSubmit = (event: SubmitEvent): void => {
    if (event.defaultPrevented || event.target !== event.currentTarget) return;
    event.preventDefault();
    this.#performSubmit();
  };
}

// ---------------------------------------------------------------------------
// Suggestions
// ---------------------------------------------------------------------------

type RegisteredItem = { element: HTMLElement; disabled: boolean };

export type ComposerSuggestionsOptions = {
  listId: string;
  enabled: boolean;
  submitOnEmptySuggestions: boolean;
  items: readonly ComposerItemValue[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onItemSelect: (item: ComposerItemValue) => void;
  getSuggestionsAnnouncement?: (count: number) => string;
};

function defaultAnnouncement(count: number): string {
  return `${count} suggestion${count === 1 ? '' : 's'} available. Use the up and down arrow keys to navigate.`;
}

/** Keyboard navigation, highlight state and ARIA wiring for the suggestion list. */
export class ComposerSuggestions {
  #options: () => ComposerSuggestionsOptions;
  #highlightedValue = $state<string | undefined>(undefined);
  #registered = new SvelteMap<string, RegisteredItem>();
  listElement = $state<HTMLElement | null>(null);

  constructor(options: () => ComposerSuggestionsOptions) {
    this.#options = options;
  }

  get listId(): string {
    return this.#options().listId;
  }
  get items(): readonly ComposerItemValue[] {
    return this.#options().items;
  }
  get open(): boolean {
    return this.#options().open;
  }
  get enabledItems(): ComposerItemValue[] {
    return this.items.filter(
      (item) =>
        !item.disabled && this.#registered.has(item.id) && !this.#registered.get(item.id)?.disabled
    );
  }
  get highlightedId(): string | undefined {
    const enabled = this.enabledItems;
    return enabled.find((item) => item.id === this.#highlightedValue)?.id ?? enabled[0]?.id;
  }
  get announcement(): string {
    const { getSuggestionsAnnouncement = defaultAnnouncement } = this.#options();
    const count = this.enabledItems.length;
    return this.open && this.listElement && count ? getSuggestionsAnnouncement(count) : '';
  }

  registerItem = (id: string, item: RegisteredItem | null): void => {
    if (item) this.#registered.set(id, item);
    else this.#registered.delete(id);
  };

  highlightItem = (value: ComposerItemValue): void => {
    this.#highlightedValue = value.id;
  };

  selectItem = (value: ComposerItemValue): void => {
    const item = this.enabledItems.find((candidate) => candidate.id === value.id);
    if (!this.open || !item) return;
    const { onItemSelect, onOpenChange } = this.#options();
    onItemSelect(item);
    onOpenChange(false);
    this.#highlightedValue = undefined;
  };

  onOpenChange = (open: boolean): void => {
    if (!open) this.#highlightedValue = undefined;
    this.#options().onOpenChange(open);
  };

  onKeyDown = (event: KeyboardEvent): void => {
    const { onOpenChange, submitOnEmptySuggestions } = this.#options();
    if (!this.open || event.defaultPrevented || event.isComposing || event.keyCode === 229) return;
    const enabled = this.enabledItems;
    const highlightedId = this.highlightedId;
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      onOpenChange(false);
      this.#highlightedValue = undefined;
    } else if (event.key === 'Tab' || (event.key === 'Enter' && event.shiftKey)) {
      onOpenChange(false);
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!enabled.length) return;
      const direction = event.key === 'ArrowDown' ? 1 : -1;
      const index = enabled.findIndex((item) => item.id === highlightedId);
      const item = enabled[(index + direction + enabled.length) % enabled.length];
      if (!item) return;
      this.#highlightedValue = item.id;
      this.#registered.get(item.id)?.element.scrollIntoView({ block: 'nearest' });
    } else if (event.key === 'Enter' && !event.shiftKey) {
      if (!enabled.length && submitOnEmptySuggestions) return;
      event.preventDefault();
      const item = enabled.find((candidate) => candidate.id === highlightedId);
      if (item) this.selectItem(item);
    }
  };

  /** ARIA attributes for the input while suggestions are available. */
  get inputAttributes() {
    const { enabled } = this.#options();
    const highlightedId = this.highlightedId;
    const open = this.open;
    return {
      'aria-autocomplete': enabled ? ('list' as const) : undefined,
      'aria-haspopup': enabled ? ('listbox' as const) : undefined,
      'aria-controls': open ? this.listElement?.id || undefined : undefined,
      'aria-activedescendant':
        open && this.listElement && highlightedId
          ? this.#registered.get(highlightedId)?.element.id || undefined
          : undefined
    };
  }
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const [getEditorContext, setEditorContext] = createContext<ComposerEditor>();
const [getSuggestionsContext, setSuggestionsContext] = createContext<ComposerSuggestions>();

function optional<T>(getter: () => T): T | undefined {
  try {
    return getter();
  } catch {
    return undefined;
  }
}

export { setEditorContext as setComposerEditorContext };
export { setSuggestionsContext as setComposerSuggestionsContext };

export function useComposerEditorContext(): ComposerEditor | undefined {
  return optional(getEditorContext);
}

export function useComposerSuggestionsContext(): ComposerSuggestions | undefined {
  return optional(getSuggestionsContext);
}

/** Access the surrounding `<Composer>` state. Throws outside a `<Composer>`. */
export function useComposerContext(): ComposerEditor {
  const context = useComposerEditorContext();
  if (!context) throw new Error('useComposerContext must be used within Composer.');
  return context;
}

export function useComposerAnchor(): HTMLFormElement | null {
  return useComposerEditorContext()?.rootElement ?? null;
}

const INTERACTIVE_SELECTOR =
  "button, a, input, select, textarea, label, summary, [data-slot='composer-input'], [contenteditable], [role='button'], [role='combobox'], [role='menuitem'], [tabindex]:not([tabindex='-1'])";

export function focusComposerInput(event: MouseEvent, preventDefault: boolean): void {
  const frame = event.currentTarget;
  if (event.defaultPrevented || !(event.target instanceof Element) || !(frame instanceof Element))
    return;
  const interactive = event.target.closest(INTERACTIVE_SELECTOR);
  if (interactive && interactive !== frame && frame.contains(interactive)) return;
  const input = frame.querySelector<HTMLElement>('[data-slot="composer-input"]');
  if (!input || input.matches(":disabled, [aria-disabled='true']")) return;
  if (preventDefault) event.preventDefault();
  input.focus();
}

export {
  getComposerText,
  type ComposerItemValue,
  type ComposerPart,
  type ComposerQuery,
  type ComposerTokenPart,
  type ComposerTrigger,
  type ComposerValue
};
