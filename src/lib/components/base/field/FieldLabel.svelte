<script lang="ts">
  /**
   * An accessible label that is automatically associated with the field control.
   * Renders a `<label>` element.
   *
   * The label's `for` attribute and the control's `aria-labelledby` are wired
   * automatically — no manual ID management required.
   */
  import { getContext } from "svelte";
  import type { Snippet } from "svelte";
  import { FIELD_CONTEXT_KEY, type FieldContext } from "./context.js";

  // ---------------------------------------------------------------------------
  // Props
  // ---------------------------------------------------------------------------

  export interface Props {
    /**
     * Explicit ID for this label element.
     * Auto-generated when omitted — the control uses this for `aria-labelledby`.
     */
    id?: string | undefined;
    class?: string | undefined;
    style?: string | undefined;
    children?: Snippet;
    [key: string]: unknown;
  }

  let {
    id: idProp,
    class: className,
    style,
    children,
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
   * Stable unique ID for this label instance.
   * The control reads this from context to set `aria-labelledby`.
   */
  const generatedId = `bui-field-label-${Math.random().toString(36).slice(2, 9)}`;
  const id = $derived(idProp ?? generatedId);

  // ---------------------------------------------------------------------------
  // Register label ID with FieldRoot
  // ---------------------------------------------------------------------------

  $effect(() => {
    // Capture current `id` so the cleanup closure uses the value from this run
    const capturedId = id;
    ctx?.setLabelId(capturedId);
    return () => {
      ctx?.setLabelId(undefined);
    };
  });

  // ---------------------------------------------------------------------------
  // Derived data attributes
  // ---------------------------------------------------------------------------

  const state = $derived(ctx?.state);

  const dataAttrs = $derived({
    ...(state?.disabled ? { "data-disabled": "" } : {}),
    ...(state?.touched ? { "data-touched": "" } : {}),
    ...(state?.dirty ? { "data-dirty": "" } : {}),
    ...(state?.filled ? { "data-filled": "" } : {}),
    ...(state?.focused ? { "data-focused": "" } : {}),
    ...(state?.valid === true ? { "data-valid": "" } : {}),
    ...(state?.valid === false ? { "data-invalid": "" } : {}),
  });
</script>

<!--
  `for` points to the control's ID (set by Field.Control via context).
  `id` is this element's own ID, used by the control for `aria-labelledby`.
-->
<label
  {id}
  for={ctx?.controlId}
  class={className}
  {style}
  {...dataAttrs}
  {...restProps}
>
  {@render children?.()}
</label>
