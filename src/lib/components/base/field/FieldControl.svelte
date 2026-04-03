<script lang="ts">
  /**
   * The form control to label and validate.
   * Renders an `<input>` element by default.
   *
   * Connects to the nearest `<Field.Root>` via context and:
   * - registers its ID for `aria-labelledby` / `aria-describedby` wiring,
   * - drives touched / dirty / filled / focused field state,
   * - triggers validation at the appropriate time.
   */
  import { getContext } from "svelte";
  import { FIELD_CONTEXT_KEY, type FieldContext } from "./context.js";

  // ---------------------------------------------------------------------------
  // Props
  // ---------------------------------------------------------------------------

  export interface Props {
    /**
     * Explicit ID for this control.  Auto-generated when omitted.
     * The label's `for` attribute and `aria-labelledby` on this element are
     * wired automatically — you generally do not need to provide an ID.
     */
    id?: string;
    /**
     * `name` attribute for form submission.
     * Overridden by `name` on `<Field.Root>` when that is set.
     */
    name?: string;
    /**
     * Controlled value.  When provided, the input reflects this value on
     * every render.  Combine with `oninput`/`onValueChange` to update state.
     *
     * Omit for uncontrolled usage (the browser manages the value).
     */
    value?: string;
    /**
     * Initial value for uncontrolled usage.
     * Ignored when `value` is provided.
     */
    defaultValue?: string;
    /**
     * Disables the control.  Overridden by `disabled` on `<Field.Root>`.
     * @default false
     */
    disabled?: boolean;
    /**
     * Auto-focuses this control on mount.
     * @default false
     */
    // autoFocus?: boolean;
    class?: string;
    style?: string;
    /**
     * Called whenever the input value changes (mirrors React's `onValueChange`).
     */
    onValueChange?: (value: string) => void;
    [key: string]: unknown;
  }

  let {
    id: idProp,
    name: nameProp,
    value: valueProp,
    defaultValue,
    disabled: disabledProp = false,
    autoFocus = false,
    class: className,
    style,
    onValueChange,
    ...restProps
  }: Props = $props();

  // ---------------------------------------------------------------------------
  // Context
  // ---------------------------------------------------------------------------

  const ctx = getContext<FieldContext>(FIELD_CONTEXT_KEY);

  // ---------------------------------------------------------------------------
  // ID
  // ---------------------------------------------------------------------------

  /**
   * Stable unique ID for this control instance.
   * Uses the user-supplied `id` prop when available, falls back to a
   * random string generated once at component initialisation.
   */
  const generatedId = `bui-field-ctrl-${Math.random().toString(36).slice(2, 9)}`;
  const id = $derived(idProp ?? generatedId);

  // ---------------------------------------------------------------------------
  // Derived state
  // ---------------------------------------------------------------------------

  /** Effective name: field-level name takes precedence. */
  const name = $derived(ctx?.name ?? nameProp);

  /** Effective disabled: field-level disabled takes precedence. */
  const disabled = $derived(!!(ctx?.disabled || disabledProp));

  /** Current field state for data attributes. */
  const fieldState = $derived(ctx?.state);

  const dataAttrs = $derived({
    ...(fieldState?.disabled ? { "data-disabled": "" } : {}),
    ...(fieldState?.touched ? { "data-touched": "" } : {}),
    ...(fieldState?.dirty ? { "data-dirty": "" } : {}),
    ...(fieldState?.filled ? { "data-filled": "" } : {}),
    ...(fieldState?.focused ? { "data-focused": "" } : {}),
    ...(fieldState?.valid === true ? { "data-valid": "" } : {}),
    ...(fieldState?.valid === false ? { "data-invalid": "" } : {}),
  });

  /** `aria-describedby` — space-separated IDs of description + error nodes. */
  const ariaDescribedBy = $derived(
    ctx?.descriptionIds.length ? ctx.descriptionIds.join(" ") : undefined,
  );

  /** `aria-invalid` — only set when the field is explicitly invalid. */
  const ariaInvalid = $derived<true | undefined>(
    fieldState?.valid === false ? true : undefined,
  );

  // ---------------------------------------------------------------------------
  // Element reference — must be $state for $effect to track it
  // ---------------------------------------------------------------------------

  let inputEl: HTMLInputElement | null = $state(null);

  // ---------------------------------------------------------------------------
  // Effects
  // ---------------------------------------------------------------------------

  /**
   * Register / deregister this control with FieldRoot whenever the element
   * mounts, unmounts, or the ID changes.
   *
   * We explicitly capture `id` as `capturedId` in the effect body so that the
   * cleanup closure holds the value from this particular run (not the latest).
   */
  $effect(() => {
    const capturedId = id;
    ctx?.setControlId(capturedId);
    ctx?.registerControl(inputEl);

    return () => {
      ctx?.setControlId(undefined);
      ctx?.registerControl(null);
    };
  });

  /**
   * Sync the filled state when a controlled `value` prop is passed from
   * outside — the `oninput` handler cannot detect programmatic changes.
   */
  $effect(() => {
    if (valueProp !== undefined) {
      ctx?.setFilled(valueProp !== "");
    }
  });

  /**
   * Set focused state when `autoFocus` is active.
   * Runs once after mount; `inputEl` is the dependency.
   */
  $effect(() => {
    if (autoFocus && inputEl && inputEl === document.activeElement) {
      ctx?.setFocused(true);
    }
  });

  // ---------------------------------------------------------------------------
  // Event handlers
  // ---------------------------------------------------------------------------

  function handleInput(event: Event) {
    const input = event.currentTarget as HTMLInputElement;
    const value = input.value;

    // Surface to the consumer
    onValueChange?.(value);

    // Update field state
    const initialValue = ctx?.validityData.initialValue;
    ctx?.setDirty(value !== initialValue);
    ctx?.setFilled(value !== "");

    if (!ctx?.shouldValidateOnChange()) {
      // Not in onChange mode: do a lightweight revalidation pass to resolve
      // a previous "required" error as soon as the user types something.
      ctx?.commit(value, /* revalidate */ true);
      return;
    }

    // onChange mode: run (debounced) full validation on every keystroke.
    ctx?.clearDebounce();

    if (value === "") {
      // Empty value: validate immediately (no debounce) so the "required"
      // error shows up right away.
      ctx?.commit(value);
      return;
    }

    ctx?.startDebounce(() => {
      ctx?.commit(value);
    });
  }

  function handleFocus() {
    ctx?.setFocused(true);
  }

  function handleBlur(event: FocusEvent) {
    ctx?.setTouched(true);
    ctx?.setFocused(false);
    ctx?.clearDebounce();

    if (ctx?.validationMode === "onBlur") {
      const input = event.currentTarget as HTMLInputElement;
      ctx.commit(input.value);
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    const input = event.currentTarget as HTMLInputElement;
    // Pressing Enter in an input should commit validation (same as blur)
    if (input.tagName === "INPUT" && event.key === "Enter") {
      ctx?.setTouched(true);
      ctx?.commit(input.value);
    }
  }
</script>

<!--
  The `value` attribute is set reactively:
  - When `valueProp` is defined, the input is controlled — Svelte will update
    the DOM value whenever `valueProp` changes.
  - When `valueProp` is undefined, `defaultValue` is used as the initial value
    and the browser manages subsequent state (uncontrolled).
-->
<input
  {id}
  {name}
  {disabled}
  value={valueProp ?? defaultValue}
  class={className}
  {style}
  aria-labelledby={ctx?.labelId}
  aria-describedby={ariaDescribedBy}
  aria-invalid={ariaInvalid}
  bind:this={inputEl}
  oninput={handleInput}
  onfocus={handleFocus}
  onblur={handleBlur}
  onkeydown={handleKeyDown}
  {...dataAttrs}
  {...restProps}
/>
