<script lang="ts">
  /**
   * Groups individual items in a checkbox group or radio group together
   * with a label and description.
   * Renders a `<div>` element.
   *
   * Provides a nested `FieldItemContext` so that `<Field.Label>` and
   * `<Field.Description>` inside this item can be wired to the correct
   * control without needing a separate `<Field.Root>`.
   */
  import { getContext, setContext } from "svelte";
  import type { Snippet } from "svelte";
  import {
    FIELD_CONTEXT_KEY,
    FIELD_ITEM_CONTEXT_KEY,
    type FieldContext,
    type FieldItemContextType,
  } from "./context.js";

  // ---------------------------------------------------------------------------
  // Props
  // ---------------------------------------------------------------------------

  export interface Props {
    /**
     * Whether the wrapped control should ignore user interaction.
     * `<Field.Root disabled>` takes precedence over this prop.
     * @default false
     */
    disabled?: boolean;
    class?: string;
    style?: string;
    children?: Snippet;
    [key: string]: unknown;
  }

  let {
    disabled: disabledProp = false,
    class: className,
    style,
    children,
    ...restProps
  }: Props = $props();

  // ---------------------------------------------------------------------------
  // Context
  // ---------------------------------------------------------------------------

  const ctx = getContext<FieldContext>(FIELD_CONTEXT_KEY);

  /** Effective disabled — field root disabled takes precedence. */
  const disabled = $derived(!!(ctx?.disabled || disabledProp));

  // ---------------------------------------------------------------------------
  // Provide FieldItem context to children
  // ---------------------------------------------------------------------------

  const itemCtx: FieldItemContextType = {
    get disabled() {
      return disabled;
    },
  };

  setContext(FIELD_ITEM_CONTEXT_KEY, itemCtx);

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

<div class={className} {style} {...dataAttrs} {...restProps}>
  {@render children?.()}
</div>
