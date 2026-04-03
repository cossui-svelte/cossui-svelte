<script lang="ts">
  /**
   * An error message displayed when the field control fails validation.
   * Renders a `<div>` element.
   *
   * - Registers its ID with FieldRoot so the control gets a matching
   *   `aria-describedby` attribute automatically.
   * - Supports CSS enter / exit transitions via `data-entering` and
   *   `data-exiting` attributes (analogous to React's transition status).
   * - When there are multiple errors the content is rendered as a `<ul>` list.
   */
  import { getContext } from "svelte";
  import type { Snippet } from "svelte";
  import { FIELD_CONTEXT_KEY, type FieldContext } from "./context.js";

  // ---------------------------------------------------------------------------
  // Props
  // ---------------------------------------------------------------------------

  export interface Props {
    /**
     * Explicit ID for this error element.
     * Auto-generated when omitted.
     */
    id?: string | undefined;
    /**
     * Controls when this error element is shown:
     * - `undefined` – show whenever `validityData.state.valid === false`.
     * - `true`      – always show (useful when controlled externally).
     * - A `ValidityState` key such as `'valueMissing'` – show when that
     *   specific native constraint is violated.
     */
    match?: boolean | keyof ValidityState | undefined;
    class?: string | undefined;
    style?: string | undefined;
    /** Optional custom content.  Falls back to the error string(s) from context. */
    children?: Snippet;
    [key: string]: unknown;
  }

  let {
    id: idProp,
    match,
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

  const generatedId = `bui-field-err-${Math.random().toString(36).slice(2, 9)}`;
  const id = $derived(idProp ?? generatedId);

  // ---------------------------------------------------------------------------
  // Visibility logic
  // ---------------------------------------------------------------------------

  /**
   * Whether this error node should logically be present in the DOM.
   * Mirrors the React `rendered` variable logic.
   */
  const rendered = $derived((): boolean => {
    if (!ctx) return false;
    const { state } = ctx.validityData;
    if (match === true) return true;
    if (typeof match === "string") {
      // `match` is a key of ValidityState — show when that flag is set
      return Boolean(state[match as keyof typeof state]);
    }
    // Default: show when field is invalid
    return state.valid === false;
  });

  // ---------------------------------------------------------------------------
  // Transition state machine
  //
  // `mounted`  – whether the element should be in the DOM at all.
  // `entering` – true for one animation frame after the element appears;
  //              exposes `data-entering` for CSS enter animations.
  // `exiting`  – true while a CSS exit animation is playing;
  //              exposes `data-exiting` for CSS exit animations.
  //              The element is removed from the DOM once the CSS
  //              transition/animation ends (or after a 500 ms fallback).
  // ---------------------------------------------------------------------------

  let mounted = $state(false);
  let entering = $state(false);
  let exiting = $state(false);
  let errorRef: HTMLDivElement | null = $state(null);

  $effect(() => {
    const isRendered = rendered();

    if (isRendered && !mounted) {
      // --- Element entering ---
      mounted = true;
      entering = true;
      exiting = false;
      // Remove data-entering after the first frame so CSS transitions fire
      requestAnimationFrame(() => {
        entering = false;
      });
    } else if (!isRendered && mounted && !exiting) {
      // --- Element exiting ---
      exiting = true;
      entering = false;

      const el = errorRef;

      // Unmount once the CSS transition / animation finishes, or after a
      // safety timeout if the element has no transitions defined.
      let cleaned = false;

      function unmount() {
        if (cleaned) return;
        cleaned = true;
        mounted = false;
        exiting = false;
        el?.removeEventListener("transitionend", unmount);
        el?.removeEventListener("animationend", unmount);
        clearTimeout(fallback);
      }

      const fallback = setTimeout(unmount, 500);

      if (el) {
        el.addEventListener("transitionend", unmount, { once: true });
        el.addEventListener("animationend", unmount, { once: true });
      } else {
        // No element reference yet — unmount immediately
        unmount();
      }

      // Return cleanup in case the component unmounts mid-exit
      return () => {
        cleaned = true;
        clearTimeout(fallback);
        el?.removeEventListener("transitionend", unmount);
        el?.removeEventListener("animationend", unmount);
      };
    }
  });

  // ---------------------------------------------------------------------------
  // Register error ID for aria-describedby
  // ---------------------------------------------------------------------------

  $effect(() => {
    const capturedId = id;
    const isRendered = rendered();

    if (isRendered) {
      ctx?.addDescriptionId(capturedId);
    } else {
      ctx?.removeDescriptionId(capturedId);
    }

    return () => {
      ctx?.removeDescriptionId(capturedId);
    };
  });

  // ---------------------------------------------------------------------------
  // Error message
  // ---------------------------------------------------------------------------

  /**
   * The message(s) to display.  Multiple errors become an array so the
   * template can render a `<ul>` list.
   */
  const errorMessage = $derived((): string | string[] => {
    if (!ctx) return "";
    const { errors, error } = ctx.validityData;
    return errors.length > 1 ? errors : error;
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
    ...(entering ? { "data-entering": "" } : {}),
    ...(exiting ? { "data-exiting": "" } : {}),
  });
</script>

{#if mounted}
  <div
    {id}
    class={className}
    {style}
    role="alert"
    aria-live="assertive"
    bind:this={errorRef}
    {...dataAttrs}
    {...restProps}
  >
    {#if children}
      {@render children()}
    {:else}
      {@const msg = errorMessage()}
      {#if Array.isArray(msg)}
        <ul>
          {#each msg as message}
            <li>{message}</li>
          {/each}
        </ul>
      {:else}
        {msg}
      {/if}
    {/if}
  </div>
{/if}
