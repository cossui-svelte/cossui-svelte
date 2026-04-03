<script lang="ts">
  /**
   * A paragraph with additional information about the field.
   * Renders a `<p>` element.
   *
   * Registers its ID with FieldRoot so the control gets a matching
   * `aria-describedby` attribute automatically.
   */
  import { getContext } from "svelte";
  import type { Snippet } from "svelte";
  import { FIELD_CONTEXT_KEY, type FieldContext } from "./context.js";

  // ---------------------------------------------------------------------------
  // Props
  // ---------------------------------------------------------------------------

  export interface Props {
    /**
     * Explicit ID for this description element.
     * Auto-generated when omitted.
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

  const generatedId = `bui-field-desc-${Math.random().toString(36).slice(2, 9)}`;
  const id = $derived(idProp ?? generatedId);

  // ---------------------------------------------------------------------------
  // Register ID for aria-describedby
  // ---------------------------------------------------------------------------

  $effect(() => {
    const capturedId = id;
    ctx?.addDescriptionId(capturedId);
    return () => {
      ctx?.removeDescriptionId(capturedId);
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

<p {id} class={className} {style} {...dataAttrs} {...restProps}>
  {@render children?.()}
</p>
