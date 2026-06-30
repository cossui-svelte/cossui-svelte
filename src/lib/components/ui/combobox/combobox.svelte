<script lang="ts" module>
  import type { Snippet } from "svelte";
  import { getContext, setContext } from "svelte";

  interface ComboboxCtx {
    readonly anchorEl: HTMLElement | null;
    readonly chipsEl: HTMLElement | null;
    clearValue(): void;
    readonly filterText: string;
    readonly hasVisibleItems: boolean;
    readonly multiple: boolean;
    removeLastValue(): void;
    setAnchorEl(el: HTMLElement | null): void;
    setChipsEl(el: HTMLElement | null): void;
    setFilterText(v: string): void;
    setInputEl(el: HTMLInputElement | null): void;
    setOpen(v: boolean): void;
    setTriggerEl(el: HTMLElement | null): void;
    readonly showClear: boolean;
    readonly showTrigger: boolean;
    readonly startAddon: Snippet | undefined;
    readonly triggerEl: HTMLElement | null;
    readonly value: string | string[] | undefined;
  }

  const COMBOBOX_CTX_KEY = Symbol("combobox");
  export const INSIDE_COMBOBOX_POPUP = Symbol("inside-combobox-popup");

  export function setComboboxCtx(ctx: ComboboxCtx): void {
    setContext(COMBOBOX_CTX_KEY, ctx);
  }

  export function getComboboxCtx(): ComboboxCtx | undefined {
    return getContext<ComboboxCtx>(COMBOBOX_CTX_KEY);
  }
</script>

<script lang="ts">
  import { Combobox } from "bits-ui";
  import { tick } from "svelte";

  type DefaultValue = string | { label?: string; value: string };

  type Props = Omit<Combobox.RootProps, "type"> & {
    children?: Snippet;
    type?: "single" | "multiple";
    defaultValue?: DefaultValue;
    autoHighlight?: boolean;
    showClear?: boolean;
    showTrigger?: boolean;
    startAddon?: Snippet;
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
    autoHighlight = false,
    showClear = false,
    showTrigger = true,
    startAddon,
    ...restProps
  }: Props = $props();

  let anchorEl = $state<HTMLElement | null>(null);
  let chipsEl = $state<HTMLElement | null>(null);
  let inputEl = $state<HTMLInputElement | null>(null);
  let triggerEl = $state<HTMLElement | null>(null);

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
    if (value !== undefined)
      internalValue = value as string | string[] | undefined;
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
    // Keep inputValueProxy in sync so re-renders don't push a stale "" back to bits-ui.
    if (type !== "multiple") {
      const selected = v as string;
      inputValueProxy = selected
        ? (items?.find((i) => i.value === selected)?.label ?? selected)
        : "";
    } else {
      // For multiple, clear the input so the user can search for the next chip.
      inputValueProxy = "";
    }
  }

  let filterText = $state("");

  $effect(() => {
    if (internalOpen && autoHighlight) {
      tick().then(() => {
        inputEl?.dispatchEvent(
          new KeyboardEvent("keydown", {
            bubbles: true,
            cancelable: true,
            key: "ArrowDown",
          }),
        );
      });
    }
  });

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
    get anchorEl() {
      return anchorEl;
    },
    get chipsEl() {
      return chipsEl;
    },
    clearValue() {
      const empty = type === "multiple" ? ([] as string[]) : undefined;
      internalValue = empty;
      inputValueProxy = "";
      value = empty as never;
      onValueChange?.(empty as never);
    },
    get filterText() {
      return filterText;
    },
    get hasVisibleItems() {
      return hasVisibleItems;
    },
    get multiple() {
      return type === "multiple";
    },
    removeLastValue() {
      if (type === "multiple") {
        const current = internalValue as string[] | undefined;
        if (!current?.length) return;
        const next = current.slice(0, -1);
        internalValue = next;
        value = next as never;
        onValueChange?.(next as never);
      } else {
        internalValue = undefined;
        inputValueProxy = "";
        value = undefined as never;
        onValueChange?.(undefined as never);
      }
    },
    setAnchorEl(el) {
      anchorEl = el;
    },
    setChipsEl(el) {
      chipsEl = el;
    },
    setFilterText(v) {
      filterText = v;
      // Track typed text in multiple mode so clearing inputValueProxy in
      // handleValueChange registers as an actual change that Svelte will push.
      if (type === "multiple") inputValueProxy = v;
    },
    setInputEl(el) {
      inputEl = el;
    },
    setOpen(v) {
      internalOpen = v;
      open = v as never;
      onOpenChange?.(v);
    },
    setTriggerEl(el) {
      triggerEl = el;
    },
    get showClear() {
      return showClear;
    },
    get showTrigger() {
      return showTrigger;
    },
    get startAddon() {
      return startAddon;
    },
    get triggerEl() {
      return triggerEl;
    },
    get value() {
      return internalValue;
    },
  });
</script>

<Combobox.Root
  {type}
  value={internalValue}
  open={internalOpen}
  onValueChange={handleValueChange}
  onOpenChange={handleOpenChange}
  inputValue={inputValueProxy}
  {items}
  {...restProps}
>
  {@render children?.()}
</Combobox.Root>
