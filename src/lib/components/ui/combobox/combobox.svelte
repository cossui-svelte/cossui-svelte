<script lang="ts" module>
  import { getContext, setContext } from "svelte";

  interface ComboboxCtx {
    readonly multiple: boolean;
    readonly value: string | string[] | undefined;
    readonly chipsEl: HTMLElement | null;
    clearValue(): void;
    setChipsEl(el: HTMLElement | null): void;
    setOpen(v: boolean): void;
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

  let {
    children,
    type = "single",
    value = $bindable(),
    onValueChange,
    open = $bindable(),
    onOpenChange,
    ...restProps
  }: Props = $props();

  let chipsEl = $state<HTMLElement | null>(null);

  // Internal state bridges the discriminated-union value and open state so
  // child components (clear button, input click) can drive them without
  // needing access to bits-ui internals.
  let internalValue = $state<string | string[] | undefined>(
    value as string | string[] | undefined,
  );
  let internalOpen = $state(open ?? false);

  // Sync external controlled props → internal state.
  $effect(() => {
    internalValue = value as string | string[] | undefined;
  });
  $effect(() => {
    if (open !== undefined) internalOpen = open;
  });

  function handleValueChange(v: string | string[]) {
    internalValue = v;
    value = v as never;
    onValueChange?.(v as never);
  }

  function handleOpenChange(v: boolean) {
    internalOpen = v;
    open = v as never;
    onOpenChange?.(v);
  }

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
    setOpen(v) {
      internalOpen = v;
      open = v as never;
      onOpenChange?.(v);
    },
  });
</script>

<Combobox.Root
  {...({
    type,
    value: internalValue,
    onValueChange: handleValueChange,
    open: internalOpen,
    onOpenChange: handleOpenChange,
    ...restProps,
  } as Combobox.RootProps)}
>
  {@render children?.()}
</Combobox.Root>
