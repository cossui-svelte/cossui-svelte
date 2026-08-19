import type { Snippet } from 'svelte';
import type { HTMLAttributes, HTMLInputAttributes } from 'svelte/elements';

export type OnChangeFn<T> = (value: T) => void;

export type PinInputCell = {
  char: string | null | undefined;
  isActive: boolean;
  hasFakeCaret: boolean;
};

export type PinInputRootSnippetProps = {
  cells: PinInputCell[];
  isFocused: boolean;
  isHovering: boolean;
};

type PinInputRootBaseProps = {
  /** @bindable */
  value?: string;
  onValueChange?: OnChangeFn<string>;
  /**
   * Called with pasted text; return the sanitized text that should be
   * inserted (e.g. stripping hyphens from a pasted code).
   */
  pasteTransformer?: (text: string) => string;
  maxlength: number;
  textalign?: 'left' | 'center' | 'right';
  pattern?: string | RegExp;
  onComplete?: (value: string) => void;
  pushPasswordManagerStrategy?: 'increase-width' | 'none';
  disabled?: boolean;
  inputId?: string;
  /** @bindable */
  inputRef?: HTMLInputElement | null;
  /** @bindable */
  ref?: HTMLDivElement | null;
  children: Snippet<[PinInputRootSnippetProps]>;
};

export type PinInputRootProps = PinInputRootBaseProps &
  Omit<HTMLInputAttributes, keyof PinInputRootBaseProps>;

type PinInputCellBaseProps = {
  cell: PinInputCell;
  /** @bindable */
  ref?: HTMLDivElement | null;
  child?: Snippet<[{ props: Record<string, unknown> }]>;
  children?: Snippet;
};

export type PinInputCellProps = PinInputCellBaseProps &
  Omit<HTMLAttributes<HTMLDivElement>, keyof PinInputCellBaseProps | 'children'>;
