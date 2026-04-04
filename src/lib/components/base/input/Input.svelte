<script lang="ts">
  /**
   * A native input element that automatically works with [Field](https://base-ui.com/react/components/field).
   * Renders an `<input>` element.
   *
   * This is a thin wrapper around `Field.Control` — it wires into the nearest
   * `<Field.Root>` for labelling, validation, and state management exactly as
   * `Field.Control` does.  Use `Input` when you want a standalone, self-contained
   * input primitive without reaching for the `Field.*` namespace directly.
   *
   * Documentation: [Base UI Input](https://base-ui.com/react/components/input)
   */
  import FieldControl from '../field/FieldControl.svelte';

  // ---------------------------------------------------------------------------
  // Props
  // ---------------------------------------------------------------------------

  interface Props {
    /**
     * Explicit ID for this control.  Auto-generated when omitted.
     * The label's `for` attribute and `aria-labelledby` on this element are
     * wired automatically — you generally do not need to provide an ID.
     */
    id?: string | undefined;
    /**
     * `name` attribute for form submission.
     * Overridden by `name` on `<Field.Root>` when that is set.
     */
    name?: string | undefined;
    /**
     * Controlled value.  When provided, the input reflects this value on every
     * render.  Combine with `oninput`/`onValueChange` to update state.
     *
     * Omit for uncontrolled usage (the browser manages the value).
     */
    value?: string | undefined;
    /**
     * Initial value for uncontrolled usage.
     * Ignored when `value` is provided.
     */
    defaultValue?: string | undefined;
    /**
     * Disables the control.  Overridden by `disabled` on `<Field.Root>`.
     * @default false
     */
    disabled?: boolean | undefined;
    /**
     * Auto-focuses this control on mount.
     * @default false
     */
    autoFocus?: boolean | undefined;
    class?: string | undefined;
    style?: string | undefined;
    /**
     * Callback fired when the `value` changes. Use when controlled.
     */
    onValueChange?: ((value: string) => void) | undefined;
    [key: string]: unknown;
  }

  let props: Props = $props();
</script>

<!--
  Delegate everything to Field.Control, which handles all Field integration:
  context wiring, aria attributes, validation lifecycle, and state management.
-->
<FieldControl {...props} />
