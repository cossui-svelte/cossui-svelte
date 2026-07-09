<script module lang="ts">
  import { getContext, setContext } from "svelte";

  interface AutocompleteCtx {
    setInputEl(el: HTMLInputElement | null): void;
  }

  const AUTOCOMPLETE_CTX_KEY = Symbol("autocomplete");

  export function setAutocompleteCtx(ctx: AutocompleteCtx): void {
    setContext(AUTOCOMPLETE_CTX_KEY, ctx);
  }

  export function getAutocompleteCtx(): AutocompleteCtx | undefined {
    return getContext<AutocompleteCtx>(AUTOCOMPLETE_CTX_KEY);
  }
</script>

<script lang="ts">
  import { Combobox } from "bits-ui";
  import type { Snippet } from "svelte";
  import { tick } from "svelte";

  type SingleRootProps = Extract<Combobox.RootProps, { type: "single" }>;
  type Props = (Combobox.RootProps | (Omit<SingleRootProps, "type"> & { type?: undefined })) & {
    /**
     * Whether to automatically highlight the first item when the popup opens.
     *
     * @default false
     */
    autoHighlight?: boolean;
    children?: Snippet;
  };

  let {
    children,
    autoHighlight = false,
    open = $bindable(),
    onOpenChange,
    ...rootProps
  }: Props = $props();

  let inputEl = $state<HTMLInputElement | null>(null);
  let internalOpen = $state(open ?? false);

  $effect(() => {
    if (open !== undefined) internalOpen = open;
  });

  function handleOpenChange(v: boolean) {
    internalOpen = v;
    open = v as never;
    onOpenChange?.(v);
  }

  $effect(() => {
    if (internalOpen && autoHighlight) {
      tick().then(() => {
        inputEl?.dispatchEvent(
          new KeyboardEvent("keydown", { bubbles: true, cancelable: true, key: "ArrowDown" }),
        );
      });
    }
  });

  setAutocompleteCtx({
    setInputEl(el) {
      inputEl = el;
    },
  });
</script>

<Combobox.Root type="single" open={internalOpen} onOpenChange={handleOpenChange} {...rootProps}>
  {@render children?.()}
</Combobox.Root>
