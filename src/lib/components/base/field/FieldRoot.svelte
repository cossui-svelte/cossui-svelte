<script lang="ts">
  /**
   * Groups all parts of the field.
   * Renders a `<div>` element.
   *
   * @example
   * ```svelte
   * <Field.Root name="email" validate={(v) => v ? null : 'Required'}>
   *   <Field.Label>Email</Field.Label>
   *   <Field.Control type="email" />
   *   <Field.Description>We'll never share your email.</Field.Description>
   *   <Field.Error />
   * </Field.Root>
   * ```
   */
  import { setContext } from "svelte";
  import type { Snippet } from "svelte";
  import {
    FIELD_CONTEXT_KEY,
    type FieldContext,
    type FieldValidityData,
    type FieldRootState,
    type ValidationMode,
  } from "./context.js";
  import { DEFAULT_VALIDITY_STATE } from "./constants.js";

  // ---------------------------------------------------------------------------
  // Props
  // ---------------------------------------------------------------------------

  export interface Props {
    /**
     * Identifies the field when a form is submitted.
     * Takes precedence over the `name` prop on `<Field.Control>`.
     */
    name?: string;
    /**
     * Whether the field should ignore user interaction.
     * Takes precedence over `disabled` on `<Field.Control>`.
     * @default false
     */
    disabled?: boolean;
    /**
     * Whether the field is externally invalid (e.g. from a server error).
     * @default false
     */
    invalid?: boolean;
    /**
     * Controlled dirty state — whether the value has changed from its
     * initial value. When provided, internal dirty tracking is disabled.
     */
    dirty?: boolean;
    /**
     * Controlled touched state — whether the control has lost focus at least
     * once. When provided, internal touched tracking is disabled.
     */
    touched?: boolean;
    /**
     * Custom validation function. Return a string or array of strings with
     * error messages if the value is invalid, or `null` if valid.
     * Async functions are supported.
     */
    validate?: (
      value: unknown,
    ) => string | string[] | null | Promise<string | string[] | null>;
    /**
     * When to validate the field.
     * - `'onSubmit'` – on form submit, then re-validates on change.
     * - `'onBlur'`   – on blur.
     * - `'onChange'` – on every change (debounced via `validationDebounceTime`).
     * @default 'onSubmit'
     */
    validationMode?: ValidationMode;
    /**
     * How long to wait between `validate` callbacks when
     * `validationMode="onChange"`, in milliseconds.
     * @default 0
     */
    validationDebounceTime?: number;
    class?: string;
    style?: string;
    children?: Snippet;
    [key: string]: unknown;
  }

  let {
    name,
    disabled: disabledProp = false,
    invalid: invalidProp = false,
    dirty: dirtyProp,
    touched: touchedProp,
    validate: validateFn = () => null,
    validationMode = "onSubmit" as ValidationMode,
    validationDebounceTime = 0,
    class: className,
    style,
    children,
    ...restProps
  }: Props = $props();

  // ---------------------------------------------------------------------------
  // Internal reactive state
  // ---------------------------------------------------------------------------

  let touchedState = $state(false);
  let dirtyState = $state(false);
  let filled = $state(false);
  let focused = $state(false);
  /** Becomes `true` the first time `setDirty(true)` is called internally. */
  let markedDirty = $state(false);

  let validityData = $state<FieldValidityData>({
    state: { ...DEFAULT_VALIDITY_STATE },
    error: "",
    errors: [],
    value: null,
    initialValue: null,
  });

  // ARIA association IDs (set by child components via context mutators)
  let controlId = $state<string | undefined>(undefined);
  let labelId = $state<string | undefined>(undefined);
  let descriptionIds = $state<string[]>([]);

  // Non-reactive references (not tracked by Svelte's signal system)
  let inputEl: HTMLInputElement | null = null;
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;

  // ---------------------------------------------------------------------------
  // Derived / computed values
  // ---------------------------------------------------------------------------

  /** Effective touched: controlled prop takes precedence over internal state. */
  const touched = $derived(
    touchedProp !== undefined ? touchedProp : touchedState,
  );

  /** Effective dirty: controlled prop takes precedence over internal state. */
  const dirty = $derived(dirtyProp !== undefined ? dirtyProp : dirtyState);

  /** Whether the field is currently invalid. */
  const invalid = $derived(!!invalidProp);

  /**
   * Effective valid: `null` = not yet validated, `false` if externally invalid
   * or native/custom validation fails, `true` if all validations pass.
   */
  const valid = $derived<boolean | null>(
    invalid ? false : validityData.state.valid,
  );

  /** Composite state object shared with child components. */
  const fieldState = $derived<FieldRootState>({
    disabled: disabledProp,
    touched,
    dirty,
    valid,
    filled,
    focused,
  });

  /** `data-*` attributes derived from the current field state. */
  const dataAttrs = $derived({
    ...(disabledProp ? { "data-disabled": "" } : {}),
    ...(touched ? { "data-touched": "" } : {}),
    ...(dirty ? { "data-dirty": "" } : {}),
    ...(filled ? { "data-filled": "" } : {}),
    ...(focused ? { "data-focused": "" } : {}),
    ...(valid === true ? { "data-valid": "" } : {}),
    ...(valid === false ? { "data-invalid": "" } : {}),
  });

  // ---------------------------------------------------------------------------
  // Validation
  // ---------------------------------------------------------------------------

  function shouldValidateOnChange(): boolean {
    return validationMode === "onChange";
  }

  /**
   * Full validation pipeline.  Reads native constraint validity, calls the
   * custom `validate` prop, and writes the result to `validityData`.
   */
  async function commit(value: unknown, revalidate = false): Promise<void> {
    const element = inputEl;
    if (!element) return;

    // ── Lightweight revalidation path ───────────────────────────────────────
    // Used on every `oninput` when NOT in `onChange` mode so we can quickly
    // clear a previous error once the user resolves the `valueMissing` case.
    if (revalidate) {
      // Nothing to clear if already valid
      if (validityData.state.valid !== false) return;

      if (!element.validity.valueMissing) {
        // The required-field error has been resolved → mark temporarily valid
        validityData = {
          value,
          state: { ...DEFAULT_VALIDITY_STATE, valid: true },
          error: "",
          errors: [],
          initialValue: validityData.initialValue,
        };
        element.setCustomValidity("");
        return;
      }

      // If errors other than valueMissing are still present, bail — we don't
      // want to "scold" the user for every keystroke about pattern errors etc.
      const hasOtherErrors =
        element.validity.badInput ||
        element.validity.customError ||
        element.validity.patternMismatch ||
        element.validity.rangeOverflow ||
        element.validity.rangeUnderflow ||
        element.validity.stepMismatch ||
        element.validity.tooLong ||
        element.validity.tooShort ||
        element.validity.typeMismatch;
      if (hasOtherErrors) return;

      // valueMissing is still true but is the only issue — fall through to
      // the main validation path below.
    }

    // ── Full validation path ─────────────────────────────────────────────────

    const nextState: FieldValidityData["state"] = {
      badInput: element.validity.badInput,
      customError: element.validity.customError,
      patternMismatch: element.validity.patternMismatch,
      rangeOverflow: element.validity.rangeOverflow,
      rangeUnderflow: element.validity.rangeUnderflow,
      stepMismatch: element.validity.stepMismatch,
      tooLong: element.validity.tooLong,
      tooShort: element.validity.tooShort,
      typeMismatch: element.validity.typeMismatch,
      valueMissing: element.validity.valueMissing,
      valid: element.validity.valid as boolean | null,
    };

    // Don't mark a pristine field as invalid due to `valueMissing` alone —
    // only start showing that error once the user has actually changed the
    // value (i.e., `markedDirty === true`).
    const hasOnlyValueMissing =
      nextState.valueMissing &&
      !nextState.badInput &&
      !nextState.customError &&
      !nextState.patternMismatch &&
      !nextState.rangeOverflow &&
      !nextState.rangeUnderflow &&
      !nextState.stepMismatch &&
      !nextState.tooLong &&
      !nextState.tooShort &&
      !nextState.typeMismatch;

    if (hasOnlyValueMissing && !markedDirty) {
      nextState.valid = true;
      nextState.valueMissing = false;
    }

    let result: null | string | string[] = null;
    let validationErrors: string[] = [];
    let defaultValidationMessage: string | undefined;
    const validateOnChange = shouldValidateOnChange();

    if (element.validationMessage && !validateOnChange) {
      // Native constraint failed and we're not in onChange mode: surface the
      // browser's message directly without calling the custom validator.
      defaultValidationMessage = element.validationMessage;
      validationErrors = [element.validationMessage];
    } else {
      // Call the custom validate function
      const resultOrPromise = validateFn(value);
      if (resultOrPromise instanceof Promise) {
        result = await resultOrPromise;
      } else {
        result = resultOrPromise;
      }

      if (result !== null) {
        nextState.valid = false;
        nextState.customError = true;
        if (Array.isArray(result)) {
          validationErrors = result;
          element.setCustomValidity(result.join("\n"));
        } else {
          validationErrors = [result];
          element.setCustomValidity(result);
        }
      } else if (validateOnChange) {
        // Custom validator passed — clear any previously set custom validity
        element.setCustomValidity("");
        nextState.customError = false;
        if (element.validationMessage) {
          // There is still a native constraint error
          defaultValidationMessage = element.validationMessage;
          validationErrors = [element.validationMessage];
        } else if (element.validity.valid && !nextState.valid) {
          nextState.valid = true;
        }
      }
    }

    validityData = {
      value,
      state: nextState,
      error:
        defaultValidationMessage ??
        (Array.isArray(result) ? (result[0] ?? "") : (result ?? "")),
      errors: validationErrors,
      initialValue: validityData.initialValue,
    };
  }

  // ---------------------------------------------------------------------------
  // Context object
  //
  // Plain object with getter functions.  Because each getter reads `$state` or
  // `$derived` signals that live in this component's scope, any Svelte template
  // or `$derived`/`$effect` block in a child component that accesses one of
  // these getters will automatically re-run whenever the underlying signal
  // changes.
  // ---------------------------------------------------------------------------

  const ctx: FieldContext = {
    // -- reactive getters ----------------------------------------------------
    get name() {
      return name;
    },
    get disabled() {
      return disabledProp;
    },
    get invalid() {
      return invalid;
    },
    get touched() {
      return touched;
    },
    get dirty() {
      return dirty;
    },
    get filled() {
      return filled;
    },
    get focused() {
      return focused;
    },
    get valid() {
      return valid;
    },
    get validityData() {
      return validityData;
    },
    get validationMode() {
      return validationMode;
    },
    get validationDebounceTime() {
      return validationDebounceTime;
    },
    get markedDirty() {
      return markedDirty;
    },
    get state() {
      return fieldState;
    },
    get controlId() {
      return controlId;
    },
    get labelId() {
      return labelId;
    },
    get descriptionIds() {
      return descriptionIds;
    },

    // -- state mutators ------------------------------------------------------
    setTouched(val) {
      // Respect externally-controlled touched state
      if (touchedProp === undefined) touchedState = val;
    },
    setDirty(val) {
      // Respect externally-controlled dirty state
      if (dirtyProp === undefined) {
        if (val) markedDirty = true;
        dirtyState = val;
      }
    },
    setFilled(val) {
      filled = val;
    },
    setFocused(val) {
      focused = val;
    },
    setControlId(id) {
      controlId = id;
    },
    setLabelId(id) {
      labelId = id;
    },
    addDescriptionId(id) {
      if (!descriptionIds.includes(id)) {
        descriptionIds = [...descriptionIds, id];
      }
    },
    removeDescriptionId(id) {
      descriptionIds = descriptionIds.filter((d) => d !== id);
    },

    // -- validation ----------------------------------------------------------
    shouldValidateOnChange,
    commit,

    registerControl(el) {
      inputEl = el;
      // Capture the initial value the first time the control is registered
      if (el !== null && validityData.initialValue === null) {
        validityData = { ...validityData, initialValue: el.value };
      }
    },

    // -- debounce helpers ----------------------------------------------------
    startDebounce(fn) {
      if (debounceTimer !== null) clearTimeout(debounceTimer);
      if (validationDebounceTime > 0) {
        debounceTimer = setTimeout(fn, validationDebounceTime);
      } else {
        fn();
      }
    },
    clearDebounce() {
      if (debounceTimer !== null) {
        clearTimeout(debounceTimer);
        debounceTimer = null;
      }
    },
  };

  setContext(FIELD_CONTEXT_KEY, ctx);
</script>

<div class={className} {style} {...dataAttrs} {...restProps}>
  {@render children?.()}
</div>
