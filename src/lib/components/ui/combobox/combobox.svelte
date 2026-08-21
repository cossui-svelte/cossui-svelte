<script lang="ts" module>
  import { getContext, setContext } from 'svelte';

  export interface ComboboxChipsRefCtx {
    current: HTMLElement | null;
  }

  const CHIPS_REF_KEY = Symbol('combobox-chips-ref');

  export function setComboboxChipsRefCtx(ctx: ComboboxChipsRefCtx) {
    setContext(CHIPS_REF_KEY, ctx);
  }

  export function getComboboxChipsRefCtx(): ComboboxChipsRefCtx | undefined {
    return getContext<ComboboxChipsRefCtx | undefined>(CHIPS_REF_KEY);
  }
</script>

<script lang="ts">
  import { Combobox as ComboboxPrimitive } from '@shardsui/svelte/combobox';

  type ComboboxItemDef = { label: string; value: string };
  type DefaultValue = string | { label?: string; value: string };

  let {
    value = $bindable(),
    inputValue = $bindable(),
    open = $bindable(false),
    items = [],
    defaultValue,
    multiple = false,
    ...restProps
  }: {
    value?: string | string[];
    inputValue?: string;
    open?: boolean;
    items?: ComboboxItemDef[];
    defaultValue?: DefaultValue;
    multiple?: boolean;
    [key: string]: unknown;
  } = $props();

  // Uncontrolled seed: only applies when the consumer hasn't already bound `value`.
  if (value === undefined && defaultValue !== undefined) {
    value = typeof defaultValue === 'string' ? defaultValue : defaultValue.value;
  }

  let chipsRef = $state<HTMLElement | null>(null);
  setComboboxChipsRefCtx({
    get current() {
      return chipsRef;
    },
    set current(v) {
      chipsRef = v;
    }
  });
</script>

<ComboboxPrimitive.Root
  bind:value={value as never}
  bind:inputValue
  bind:open
  {multiple}
  items={items as never}
  {...restProps as Record<string, unknown>}
/>
