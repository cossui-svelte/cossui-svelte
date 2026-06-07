<script lang="ts" module>
  import { getContext, setContext } from "svelte";

  interface ComboboxCtx {
    readonly multiple: boolean;
    readonly value: string | string[] | undefined;
    readonly chipsEl: HTMLElement | null;
    clearValue(): void;
    setChipsEl(el: HTMLElement | null): void;
  }

  const COMBOBOX_CTX_KEY = Symbol("combobox");

  export function setComboboxCtx(ctx: ComboboxCtx): void {
    setContext(COMBOBOX_CTX_KEY, ctx);
  }

  export function getComboboxCtx(): ComboboxCtx | undefined {
    return getContext<ComboboxCtx>(COMBOBOX_CTX_KEY);
  }
</script>

<script lang="ts">
  import type { Snippet } from "svelte";
  import { Combobox } from "bits-ui";

  type Props = Omit<Combobox.RootProps, "type"> & {
    children?: Snippet;
    type?: "single" | "multiple";
  };

  let { children, type = "single", value = $bindable(), onValueChange, ...restProps }: Props = $props();

  let chipsEl = $state<HTMLElement | null>(null);

  // Internal state bridges the discriminated-union value for bits-ui and
  // keeps uncontrolled mode working (bits-ui needs a stable reference to
  // know what's selected when no external bind:value is provided).
  let internalValue = $state<string | string[] | undefined>(
    value as string | string[] | undefined,
  );

  // When the caller changes value externally (controlled mode), keep in sync.
  $effect(() => {
    internalValue = value as string | string[] | undefined;
  });

  setComboboxCtx({
    get multiple() { return type === "multiple"; },
    get value() { return internalValue; },
    get chipsEl() { return chipsEl; },
    clearValue() {
      const empty = type === "multiple" ? ([] as string[]) : undefined;
      internalValue = empty;
      value = empty as never;
      onValueChange?.(empty as never);
    },
    setChipsEl(el) { chipsEl = el; },
  });

  function handleValueChange(v: string | string[]) {
    internalValue = v;
    value = v as never;
    onValueChange?.(v as never);
  }
</script>

<Combobox.Root
  {...({ type, value: internalValue, onValueChange: handleValueChange, ...restProps } as Combobox.RootProps)}
>
  {@render children?.()}
</Combobox.Root>
