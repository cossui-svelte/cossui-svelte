<script lang="ts" module>
  import { getContext, setContext } from "svelte";

  interface ComboboxCtx {
    readonly multiple: boolean;
    readonly value: string | string[] | undefined;
    readonly chipsEl: HTMLElement | null;
    readonly filterText: string;
    readonly hasVisibleItems: boolean;
    clearValue(): void;
    setChipsEl(el: HTMLElement | null): void;
    setOpen(v: boolean): void;
    setFilterText(v: string): void;
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

  type DefaultValue = string | { label?: string; value: string };

  type Props = Omit<Combobox.RootProps, "type"> & {
    children?: Snippet;
    type?: "single" | "multiple";
    defaultValue?: DefaultValue;
  };

  let {
    children,
    type = "single",
    value = $bindable(),
    onValueChange,
    open = $bindable(),
    onOpenChange,
    inputValue: externalInputValue,
    defaultValue,
    items,
    ...restProps
  }: Props = $props();

  let chipsEl = $state<HTMLElement | null>(null);

  // Resolve value string and display label from defaultValue (computed once).
  const defaultVal =
    defaultValue === undefined
      ? undefined
      : typeof defaultValue === "string"
        ? defaultValue
        : defaultValue.value;

  const defaultLabel =
    defaultValue === undefined
      ? ""
      : typeof defaultValue === "string"
        ? defaultValue
        : (defaultValue.label ?? defaultValue.value);

  // internalValue — uses controlled `value` when provided, otherwise defaultValue.
  let internalValue = $state<string | string[] | undefined>(
    value !== undefined ? (value as string | string[] | undefined) : defaultVal,
  );

  // inputValueProxy — two-way bound to bits-ui's inputValue so the input field
  // stays in sync when items are selected or the user types.
  let inputValueProxy = $state(externalInputValue ?? defaultLabel);

  let internalOpen = $state(open ?? false);

  // Sync externally controlled props → internal state.
  // Only sync value when it is defined so defaultValue is not overwritten
  // in pure uncontrolled usage.
  $effect(() => {
    if (value !== undefined) internalValue = value as string | string[] | undefined;
  });
  $effect(() => {
    if (externalInputValue !== undefined) inputValueProxy = externalInputValue;
  });
  $effect(() => {
    if (open !== undefined) internalOpen = open;
  });

  function handleValueChange(v: string | string[]) {
    internalValue = v;
    value = v as never;
    onValueChange?.(v as never);
  }

  let filterText = $state("");

  const hasVisibleItems = $derived.by(() => {
    if (!filterText || !items?.length) return true;
    const q = filterText.toLowerCase();
    return items.some((i) => (i.label ?? i.value).toLowerCase().includes(q));
  });

  function handleOpenChange(v: boolean) {
    internalOpen = v;
    open = v as never;
    onOpenChange?.(v);
    if (v) filterText = "";
  }

  setComboboxCtx({
    get multiple() { return type === "multiple"; },
    get value() { return internalValue; },
    get chipsEl() { return chipsEl; },
    get filterText() { return filterText; },
    get hasVisibleItems() { return hasVisibleItems; },
    clearValue() {
      const empty = type === "multiple" ? ([] as string[]) : undefined;
      internalValue = empty;
      inputValueProxy = "";
      value = empty as never;
      onValueChange?.(empty as never);
    },
    setChipsEl(el) { chipsEl = el; },
    setOpen(v) {
      internalOpen = v;
      open = v as never;
      onOpenChange?.(v);
    },
    setFilterText(v) { filterText = v; },
  });
</script>

<Combobox.Root
  {...({
    type,
    value: internalValue,
    onValueChange: handleValueChange,
    open: internalOpen,
    onOpenChange: handleOpenChange,
    inputValue: inputValueProxy,
    items,
    ...restProps,
  } as Combobox.RootProps)}
>
  {@render children?.()}
</Combobox.Root>
