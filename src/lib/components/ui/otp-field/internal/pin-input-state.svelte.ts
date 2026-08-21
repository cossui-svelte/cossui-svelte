import { Previous, watch } from 'runed';
import { onMount } from 'svelte';
import { on } from 'svelte/events';
import type { HTMLInputAttributes } from 'svelte/elements';
import {
  attachRef,
  DOMContext,
  simpleBox,
  type ReadableBox,
  type WritableBox
} from 'svelte-toolbelt';
import { usePasswordManagerBadge } from './use-password-manager.svelte';
import type { PinInputCell } from './types';

export const REGEXP_ONLY_DIGITS = '^\\d+$';
export const REGEXP_ONLY_CHARS = '^[a-zA-Z]+$';
export const REGEXP_ONLY_DIGITS_AND_CHARS = '^[a-zA-Z0-9]+$';

const PIN_INPUT_ROOT_ATTR = 'data-pin-input-root';
const PIN_INPUT_CELL_ATTR = 'data-pin-input-cell';

const KEYS_TO_IGNORE = [
  'Backspace',
  'Delete',
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown',
  'Home',
  'End',
  'Escape',
  'Enter',
  'Tab',
  'Shift',
  'Control',
  'Meta'
];

function boolToTrueOrUndef(condition: boolean): true | undefined {
  return condition ? true : undefined;
}

type SelectionDirection = 'forward' | 'backward' | 'none';

type PrevInputMetadata = {
  prev: [number | null, number | null, SelectionDirection];
  willSyntheticBlur: boolean;
};

type PinInputRootStateOpts = {
  id: ReadableBox<string>;
  ref: WritableBox<HTMLElement | null>;
  inputRef: WritableBox<HTMLInputElement | null>;
  inputId: ReadableBox<string>;
  autocomplete: ReadableBox<HTMLInputAttributes['autocomplete']>;
  maxLength: ReadableBox<number>;
  textAlign: ReadableBox<'left' | 'center' | 'right'>;
  disabled: ReadableBox<boolean>;
  inputmode: ReadableBox<HTMLInputAttributes['inputmode']>;
  pattern: ReadableBox<string | RegExp | undefined>;
  onComplete: ReadableBox<(value: string) => void>;
  value: WritableBox<string>;
  pushPasswordManagerStrategy: ReadableBox<'increase-width' | 'none'>;
  pasteTransformer: ReadableBox<((text: string) => string) | undefined>;
};

export class PinInputRootState {
  static create(opts: PinInputRootStateOpts) {
    return new PinInputRootState(opts);
  }

  readonly opts: PinInputRootStateOpts;
  readonly attachment: ReturnType<typeof attachRef<HTMLElement>>;
  readonly inputAttachment: ReturnType<typeof attachRef<HTMLInputElement>>;
  readonly domContext: DOMContext;

  #isHoveringInput = $state(false);
  #isFocused = simpleBox(false);
  #mirrorSelectionStart = $state<number | null>(null);
  #mirrorSelectionEnd = $state<number | null>(null);
  #previousValue: Previous<string>;
  #regexPattern = $derived.by(() => {
    const pattern = this.opts.pattern.current;
    if (typeof pattern === 'string') return new RegExp(pattern);
    return pattern;
  });
  #prevInputMetadata: PrevInputMetadata = {
    prev: [null, null, 'none'],
    willSyntheticBlur: false
  };
  #pwmb: ReturnType<typeof usePasswordManagerBadge>;
  #initialLoad: { value: ReadableBox<string>; isIOS: boolean };

  constructor(opts: PinInputRootStateOpts) {
    this.opts = opts;
    this.attachment = attachRef(this.opts.ref);
    this.inputAttachment = attachRef(this.opts.inputRef);
    this.domContext = new DOMContext(opts.ref);
    this.#previousValue = new Previous(() => this.opts.value.current ?? '');

    this.#initialLoad = {
      value: this.opts.value,
      isIOS:
        typeof window !== 'undefined' && window?.CSS?.supports('-webkit-touch-callout', 'none')
    };

    this.#pwmb = usePasswordManagerBadge({
      containerRef: this.opts.ref,
      inputRef: this.opts.inputRef,
      isFocused: this.#isFocused,
      pushPasswordManagerStrategy: this.opts.pushPasswordManagerStrategy,
      domContext: this.domContext
    });

    onMount(() => {
      const input = this.opts.inputRef.current;
      const container = this.opts.ref.current;
      if (!input || !container) return;

      if (this.#initialLoad.value.current !== input.value) {
        this.opts.value.current = input.value;
      }

      this.#prevInputMetadata.prev = [
        input.selectionStart,
        input.selectionEnd,
        (input.selectionDirection as SelectionDirection) ?? 'none'
      ];

      const unsub = on(this.domContext.getDocument(), 'selectionchange', this.#onDocumentSelectionChange, {
        capture: true
      });
      this.#onDocumentSelectionChange();

      if (this.domContext.getActiveElement() === input) {
        this.#isFocused.current = true;
      }

      if (!this.domContext.getElementById('pin-input-style')) {
        this.#applyStyles();
      }

      const updateRootHeight = () => {
        if (container) {
          container.style.setProperty('--bits-pin-input-root-height', `${input.clientHeight}px`);
        }
      };
      updateRootHeight();
      const resizeObserver = new ResizeObserver(updateRootHeight);
      resizeObserver.observe(input);

      return () => {
        unsub();
        resizeObserver.disconnect();
      };
    });

    watch([() => this.opts.value.current, () => this.opts.inputRef.current], () => {
      syncTimeouts(() => {
        const input = this.opts.inputRef.current;
        if (!input) return;

        // forcefully remove :autofill state
        input.dispatchEvent(new Event('input'));

        const start = input.selectionStart;
        const end = input.selectionEnd;
        const dir = (input.selectionDirection as SelectionDirection) ?? 'none';
        if (start !== null && end !== null) {
          this.#mirrorSelectionStart = start;
          this.#mirrorSelectionEnd = end;
          this.#prevInputMetadata.prev = [start, end, dir];
        }
      }, this.domContext);
    });

    $effect(() => {
      // invoke `onComplete` when the input is completely filled
      const value = this.opts.value.current;
      const prevValue = this.#previousValue.current;
      const maxLength = this.opts.maxLength.current;
      const onComplete = this.opts.onComplete.current;
      if (prevValue === undefined) return;
      if (value !== prevValue && prevValue.length < maxLength && value.length === maxLength) {
        onComplete(value);
      }
    });
  }

  onkeydown = (e: KeyboardEvent) => {
    const key = e.key;
    if (KEYS_TO_IGNORE.includes(key)) return;
    // ctrl/cmd combinations are likely shortcuts and shouldn't be tested against the regex
    if (e.ctrlKey || e.metaKey) return;
    if (key && this.#regexPattern && !this.#regexPattern.test(key)) {
      e.preventDefault();
    }
  };

  #rootStyles = $derived.by(() => ({
    position: 'relative',
    cursor: this.opts.disabled.current ? 'default' : 'text',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    pointerEvents: 'none'
  }));

  rootProps = $derived.by(() => ({
    id: this.opts.id.current,
    [PIN_INPUT_ROOT_ATTR]: '',
    style: this.#rootStyles,
    ...this.attachment
  }));

  inputWrapperProps = $derived.by(() => ({
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none'
    }
  }));

  #inputStyle = $derived.by(() => ({
    position: 'absolute',
    inset: 0,
    width: this.#pwmb.willPushPwmBadge
      ? `calc(100% + ${this.#pwmb.PWM_BADGE_SPACE_WIDTH})`
      : '100%',
    clipPath: this.#pwmb.willPushPwmBadge ? `inset(0 ${this.#pwmb.PWM_BADGE_SPACE_WIDTH} 0 0)` : undefined,
    height: '100%',
    display: 'flex',
    textAlign: this.opts.textAlign.current,
    opacity: '1',
    color: 'transparent',
    pointerEvents: 'all',
    background: 'transparent',
    caretColor: 'transparent',
    border: '0 solid transparent',
    outline: '0 solid transparent',
    boxShadow: 'none',
    lineHeight: '1',
    letterSpacing: '-.5em',
    fontSize: 'var(--bits-pin-input-root-height)',
    fontFamily: 'monospace',
    fontVariantNumeric: 'tabular-nums'
  }));

  #applyStyles() {
    const doc = this.domContext.getDocument();
    const styleEl = doc.createElement('style');
    styleEl.id = 'pin-input-style';
    doc.head.appendChild(styleEl);
    if (styleEl.sheet) {
      const autoFillStyles =
        'background: transparent !important; color: transparent !important; border-color: transparent !important; opacity: 0 !important; box-shadow: none !important; -webkit-box-shadow: none !important; -webkit-text-fill-color: transparent !important;';
      safeInsertRule(
        styleEl.sheet,
        '[data-pin-input-input]::selection { background: transparent !important; color: transparent !important; }'
      );
      safeInsertRule(styleEl.sheet, `[data-pin-input-input]:autofill { ${autoFillStyles} }`);
      safeInsertRule(styleEl.sheet, `[data-pin-input-input]:-webkit-autofill { ${autoFillStyles} }`);
      // iOS
      safeInsertRule(
        styleEl.sheet,
        `@supports (-webkit-touch-callout: none) { [data-pin-input-input] { letter-spacing: -.6em !important; font-weight: 100 !important; font-stretch: ultra-condensed; font-optical-sizing: none !important; left: -1px !important; right: 1px !important; } }`
      );
      // password manager badges
      safeInsertRule(styleEl.sheet, `[data-pin-input-input] + * { pointer-events: all !important; }`);
    }
  }

  #onDocumentSelectionChange = () => {
    const input = this.opts.inputRef.current;
    const container = this.opts.ref.current;
    if (!input || !container) return;

    if (this.domContext.getActiveElement() !== input) {
      this.#mirrorSelectionStart = null;
      this.#mirrorSelectionEnd = null;
      return;
    }

    const selStart = input.selectionStart;
    const selEnd = input.selectionEnd;
    const selDir = (input.selectionDirection as SelectionDirection) ?? 'none';
    const maxLength = input.maxLength;
    const val = input.value;
    const prev = this.#prevInputMetadata.prev;

    let start = -1;
    let end = -1;
    let direction: SelectionDirection | undefined;

    if (val.length !== 0 && selStart !== null && selEnd !== null) {
      const isSingleCaret = selStart === selEnd;
      const isInsertMode = selStart === val.length && val.length < maxLength;

      if (isSingleCaret && !isInsertMode) {
        const c = selStart;
        if (c === 0) {
          start = 0;
          end = 1;
          direction = 'forward';
        } else if (c === maxLength) {
          start = c - 1;
          end = c;
          direction = 'backward';
        } else if (maxLength > 1 && val.length > 1) {
          let offset = 0;
          if (prev[0] !== null && prev[1] !== null) {
            direction = c < prev[1] ? 'backward' : 'forward';
            const wasPreviouslyInserting = prev[0] === prev[1] && prev[0] < maxLength;
            if (direction === 'backward' && !wasPreviouslyInserting) {
              offset = -1;
            }
          }
          start = offset + c;
          end = offset + c + 1;
        }
      }

      if (start !== -1 && end !== -1 && start !== end) {
        this.opts.inputRef.current?.setSelectionRange(start, end, direction);
      }
    }

    const s = start !== -1 ? start : selStart;
    const e = end !== -1 ? end : selEnd;
    const dir = direction ?? selDir;

    this.#mirrorSelectionStart = s;
    this.#mirrorSelectionEnd = e;
    this.#prevInputMetadata.prev = [s, e, dir];
  };

  /**
   * Keeps only the characters that individually satisfy the configured pattern.
   * Used as a defense-in-depth filter for both typed/autofilled input and paste,
   * since `preventDefault()` on a native `input` event does not actually revert
   * a value the browser (or a mobile IME/virtual keyboard) already committed.
   */
  #filterToPattern(text: string): string {
    if (!this.#regexPattern) return text;
    return Array.from(text)
      .filter((char) => this.#regexPattern!.test(char))
      .join('');
  }

  oninput = (e: Event & { currentTarget: HTMLInputElement }) => {
    const rawValue = e.currentTarget.value.slice(0, this.opts.maxLength.current);
    const newValue = this.#filterToPattern(rawValue);

    if (newValue !== e.currentTarget.value) {
      // some mobile virtual keyboards/IMEs don't fire a preventable `keydown`
      // per character, so invalid characters can land directly in the DOM
      // value; correct it here since `input` events aren't cancelable.
      e.currentTarget.value = newValue;
      e.currentTarget.setSelectionRange(newValue.length, newValue.length);
    }

    const maybeHasDeleted =
      typeof this.#previousValue.current === 'string' &&
      newValue.length < this.#previousValue.current.length;
    if (maybeHasDeleted) {
      // cutting/deleting text doesn't trigger selectionchange, so dispatch it manually
      this.domContext.getDocument().dispatchEvent(new Event('selectionchange'));
    }

    this.opts.value.current = newValue;
  };

  onfocus = () => {
    const input = this.opts.inputRef.current;
    if (input) {
      const start = Math.min(input.value.length, this.opts.maxLength.current - 1);
      const end = input.value.length;
      input.setSelectionRange(start, end);
      this.#mirrorSelectionStart = start;
      this.#mirrorSelectionEnd = end;
    }
    this.#isFocused.current = true;
  };

  onpaste = (e: ClipboardEvent) => {
    const input = this.opts.inputRef.current;
    if (!input) return;

    const getNewValue = (finalContent: string | undefined) => {
      const start = input.selectionStart === null ? undefined : input.selectionStart;
      const end = input.selectionEnd === null ? undefined : input.selectionEnd;
      const isReplacing = start !== end;
      const initNewVal = this.opts.value.current;
      const newValueUncapped = isReplacing
        ? initNewVal.slice(0, start) + finalContent + initNewVal.slice(end)
        : initNewVal.slice(0, start) + finalContent + initNewVal.slice(start);
      return newValueUncapped.slice(0, this.opts.maxLength.current);
    };

    const isValueInvalid = (newValue: string) => {
      return Boolean(newValue.length > 0 && this.#regexPattern && !this.#regexPattern.test(newValue));
    };

    if (
      !this.opts.pasteTransformer?.current &&
      (!this.#initialLoad.isIOS || !e.clipboardData || !input)
    ) {
      const rawContent = e.clipboardData?.getData('text/plain') ?? '';
      const filteredContent = this.#filterToPattern(rawContent);
      if (filteredContent === rawContent) {
        // nothing to filter out; let the native paste behavior handle it
        const newValue = getNewValue(rawContent);
        if (isValueInvalid(newValue)) {
          e.preventDefault();
        }
        return;
      }
      // pasted text contains characters the pattern rejects (e.g. spaces or
      // dashes in a copied code) - strip them instead of rejecting the whole
      // paste, then insert the filtered content ourselves.
      e.preventDefault();
      const newValue = getNewValue(filteredContent);
      if (isValueInvalid(newValue)) return;
      input.value = newValue;
      this.opts.value.current = newValue;
      const selStart = Math.min(newValue.length, this.opts.maxLength.current - 1);
      const selEnd = newValue.length;
      input.setSelectionRange(selStart, selEnd);
      this.#mirrorSelectionStart = selStart;
      this.#mirrorSelectionEnd = selEnd;
      return;
    }

    const rawContent = e.clipboardData?.getData('text/plain') ?? '';
    const content = this.opts.pasteTransformer?.current
      ? this.opts.pasteTransformer.current(rawContent)
      : this.#filterToPattern(rawContent);

    e.preventDefault();
    const newValue = getNewValue(content);
    if (isValueInvalid(newValue)) return;

    input.value = newValue;
    this.opts.value.current = newValue;

    const selStart = Math.min(newValue.length, this.opts.maxLength.current - 1);
    const selEnd = newValue.length;
    input.setSelectionRange(selStart, selEnd);
    this.#mirrorSelectionStart = selStart;
    this.#mirrorSelectionEnd = selEnd;
  };

  onmouseover = () => {
    this.#isHoveringInput = true;
  };

  onmouseleave = () => {
    this.#isHoveringInput = false;
  };

  onblur = () => {
    if (this.#prevInputMetadata.willSyntheticBlur) {
      this.#prevInputMetadata.willSyntheticBlur = false;
      return;
    }
    this.#isFocused.current = false;
  };

  inputProps = $derived.by(() => ({
    id: this.opts.inputId.current,
    style: this.#inputStyle,
    autocomplete: this.opts.autocomplete.current || 'one-time-code',
    'data-pin-input-input': '',
    'data-pin-input-input-mss': this.#mirrorSelectionStart,
    'data-pin-input-input-mse': this.#mirrorSelectionEnd,
    inputmode: this.opts.inputmode.current,
    pattern: this.#regexPattern?.source,
    maxlength: this.opts.maxLength.current,
    value: this.opts.value.current,
    disabled: boolToTrueOrUndef(this.opts.disabled.current),
    onpaste: this.onpaste,
    oninput: this.oninput,
    onkeydown: this.onkeydown,
    onmouseover: this.onmouseover,
    onmouseleave: this.onmouseleave,
    onfocus: this.onfocus,
    onblur: this.onblur,
    ...this.inputAttachment
  }));

  #cells = $derived.by(() =>
    Array.from({ length: this.opts.maxLength.current }).map((_, idx) => {
      const isActive =
        this.#isFocused.current &&
        this.#mirrorSelectionStart !== null &&
        this.#mirrorSelectionEnd !== null &&
        ((this.#mirrorSelectionStart === this.#mirrorSelectionEnd && idx === this.#mirrorSelectionStart) ||
          (idx >= this.#mirrorSelectionStart && idx < this.#mirrorSelectionEnd));
      const char = this.opts.value.current[idx] !== undefined ? this.opts.value.current[idx] : null;
      return {
        char,
        isActive,
        hasFakeCaret: isActive && char === null
      } satisfies PinInputCell;
    })
  );

  snippetProps = $derived.by(() => ({
    cells: this.#cells,
    isFocused: this.#isFocused.current,
    isHovering: this.#isHoveringInput
  }));
}

type PinInputCellStateOpts = {
  id: ReadableBox<string>;
  ref: WritableBox<HTMLElement | null>;
  cell: ReadableBox<PinInputCell>;
};

export class PinInputCellState {
  static create(opts: PinInputCellStateOpts) {
    return new PinInputCellState(opts);
  }

  readonly opts: PinInputCellStateOpts;
  readonly attachment: ReturnType<typeof attachRef<HTMLElement>>;

  constructor(opts: PinInputCellStateOpts) {
    this.opts = opts;
    this.attachment = attachRef(this.opts.ref);
  }

  props = $derived.by(() => ({
    id: this.opts.id.current,
    [PIN_INPUT_CELL_ATTR]: '',
    'data-active': this.opts.cell.current.isActive ? '' : undefined,
    'data-inactive': !this.opts.cell.current.isActive ? '' : undefined,
    ...this.attachment
  }));
}

function syncTimeouts(cb: () => void, domContext: DOMContext) {
  const t1 = domContext.setTimeout(cb, 0); // faster machines
  const t2 = domContext.setTimeout(cb, 10);
  const t3 = domContext.setTimeout(cb, 50);
  return [t1, t2, t3];
}

function safeInsertRule(sheet: CSSStyleSheet, rule: string) {
  try {
    sheet.insertRule(rule);
  } catch {
    console.error('pin input could not insert CSS rule:', rule);
  }
}
