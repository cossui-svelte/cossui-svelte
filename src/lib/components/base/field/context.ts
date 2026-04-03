/**
 * Shared context types and keys for the Svelte 5 Field component.
 */

// ---------------------------------------------------------------------------
// Context keys
// ---------------------------------------------------------------------------

export const FIELD_CONTEXT_KEY = Symbol('base-ui-field');
export const FIELD_ITEM_CONTEXT_KEY = Symbol('base-ui-field-item');

// ---------------------------------------------------------------------------
// Enums / union types
// ---------------------------------------------------------------------------

/** When field-level validation is triggered. */
export type ValidationMode = 'onSubmit' | 'onBlur' | 'onChange';

/** Transition phase exposed on `FieldValidity` and `FieldError`. */
export type TransitionStatus = 'idle' | 'entering' | 'exiting';

// ---------------------------------------------------------------------------
// Validity / state shapes
// ---------------------------------------------------------------------------

/** A subset of the browser's `ValidityState` plus a nullable `valid` flag. */
export interface FieldValidityStateShape {
  badInput: boolean;
  customError: boolean;
  patternMismatch: boolean;
  rangeOverflow: boolean;
  rangeUnderflow: boolean;
  stepMismatch: boolean;
  tooLong: boolean;
  tooShort: boolean;
  typeMismatch: boolean;
  valueMissing: boolean;
  /** `null` = not yet validated, `true` = valid, `false` = invalid */
  valid: boolean | null;
}

/** Full validity data stored in FieldRoot. */
export interface FieldValidityData {
  /** Native + custom validity flags. */
  state: FieldValidityStateShape;
  /** First (or only) error message string. */
  error: string;
  /** All error message strings. */
  errors: string[];
  /** Current value of the control. */
  value: unknown;
  /** Value when the control was first registered. */
  initialValue: unknown;
}

/** State shape exposed to child components via context. */
export interface FieldRootState {
  disabled: boolean;
  touched: boolean;
  dirty: boolean;
  /** `null` = not yet validated */
  valid: boolean | null;
  filled: boolean;
  focused: boolean;
}

// ---------------------------------------------------------------------------
// Context interfaces
// ---------------------------------------------------------------------------

/**
 * Reactive context provided by `FieldRoot` to all child components.
 *
 * All `readonly` getters are reactive — accessing them inside a Svelte
 * template, `$derived`, or `$effect` will automatically track changes.
 */
export interface FieldContext {
  // -- reactive read-only getters ------------------------------------------
  readonly name: string | undefined;
  readonly disabled: boolean;
  readonly invalid: boolean;
  readonly touched: boolean;
  readonly dirty: boolean;
  readonly filled: boolean;
  readonly focused: boolean;
  /** `null` = not yet validated */
  readonly valid: boolean | null;
  readonly validityData: FieldValidityData;
  readonly validationMode: ValidationMode;
  readonly validationDebounceTime: number;
  /** `true` once the field has been marked dirty at least once. */
  readonly markedDirty: boolean;
  /** Composite state object (useful for spreading data-* attributes). */
  readonly state: FieldRootState;

  // -- ARIA association IDs -------------------------------------------------
  /** ID of the registered `<Field.Control>` element. */
  readonly controlId: string | undefined;
  /** ID of the registered `<Field.Label>` element. */
  readonly labelId: string | undefined;
  /** IDs of registered `<Field.Description>` and `<Field.Error>` elements. */
  readonly descriptionIds: string[];

  // -- state mutators -------------------------------------------------------
  setTouched(value: boolean): void;
  setDirty(value: boolean): void;
  setFilled(value: boolean): void;
  setFocused(value: boolean): void;
  setControlId(id: string | undefined): void;
  setLabelId(id: string | undefined): void;
  addDescriptionId(id: string): void;
  removeDescriptionId(id: string): void;

  // -- validation -----------------------------------------------------------
  shouldValidateOnChange(): boolean;
  /**
   * Runs the full validation pipeline and updates `validityData`.
   *
   * @param value     - Current control value.
   * @param revalidate - When `true`, perform a lightweight re-check that
   *                    resolves a previous invalid state without "scolding"
   *                    the user for every keystroke.
   */
  commit(value: unknown, revalidate?: boolean): Promise<void>;

  // -- control registration -------------------------------------------------
  /**
   * Called by `<Field.Control>` when the underlying `<input>` mounts /
   * unmounts.  Pass `null` to deregister.
   */
  registerControl(el: HTMLInputElement | null): void;

  // -- debounce helpers -----------------------------------------------------
  startDebounce(fn: () => void): void;
  clearDebounce(): void;
}

/** Context provided by `FieldItem` to its direct children. */
export interface FieldItemContextType {
  readonly disabled: boolean;
}
