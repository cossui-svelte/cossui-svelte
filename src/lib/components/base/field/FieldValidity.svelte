<script lang="ts">
  /**
   * Used to display custom content based on the field's validity state.
   *
   * Unlike the other Field parts, this component takes a `children` snippet
   * that receives the current `FieldValidityState` as its argument — the
   * Svelte 5 equivalent of React's render-prop pattern.
   *
   * @example
   * ```svelte
   * <Field.Validity>
   *   {#snippet children(validity)}
   *     {#if !validity.validity.valid}
   *       <p>Error: {validity.error}</p>
   *     {/if}
   *   {/snippet}
   * </Field.Validity>
   * ```
   */
  import { getContext } from "svelte";
  import type { Snippet } from "svelte";
  import {
    FIELD_CONTEXT_KEY,
    type FieldContext,
    type FieldValidityData,
    type TransitionStatus,
  } from "./context.js";
  import { DEFAULT_VALIDITY_STATE } from "./constants.js";

  // ---------------------------------------------------------------------------
  // Public types
  // ---------------------------------------------------------------------------

  /**
   * Validity state passed to the `children` snippet.
   * Mirrors the React `FieldValidityState` interface.
   */
  export interface FieldValidityState extends Omit<FieldValidityData, "state"> {
    /**
     * The native + custom validity flags (renamed from `state` in
     * `FieldValidityData` to avoid confusion with field root state).
     */
    validity: FieldValidityData["state"];
    /** Current transition phase for animation hooks. */
    transitionStatus: TransitionStatus;
  }

  // ---------------------------------------------------------------------------
  // Props
  // ---------------------------------------------------------------------------

  export interface Props {
    /**
     * A snippet that receives the full `FieldValidityState` as its argument.
     * Use it to render any custom content based on the field's validity.
     */
    children: Snippet<[FieldValidityState]>;
  }

  const { children }: Props = $props();

  // ---------------------------------------------------------------------------
  // Context
  // ---------------------------------------------------------------------------

  const ctx = getContext<FieldContext>(FIELD_CONTEXT_KEY);

  // ---------------------------------------------------------------------------
  // Transition tracking
  // ---------------------------------------------------------------------------

  let transitionStatus = $state<TransitionStatus>("idle");
  let wasInvalid = $state(false);

  const isInvalid = $derived(ctx?.valid === false);

  $effect(() => {
    const nowInvalid = isInvalid;

    if (nowInvalid !== wasInvalid) {
      transitionStatus = nowInvalid ? "entering" : "exiting";
      requestAnimationFrame(() => {
        transitionStatus = "idle";
      });
      wasInvalid = nowInvalid;
    }
  });

  // ---------------------------------------------------------------------------
  // Validity state object passed to the snippet
  // ---------------------------------------------------------------------------

  const validityState = $derived<FieldValidityState>({
    validity: ctx?.validityData.state ?? { ...DEFAULT_VALIDITY_STATE },
    error: ctx?.validityData.error ?? "",
    errors: ctx?.validityData.errors ?? [],
    value: ctx?.validityData.value ?? null,
    initialValue: ctx?.validityData.initialValue ?? null,
    transitionStatus,
  });
</script>

{@render children(validityState)}
