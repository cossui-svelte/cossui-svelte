<script lang="ts">
  import { Combobox } from "bits-ui";
  import { cn } from "$lib/utils";
  import { getComboboxCtx } from "./combobox.svelte";

  interface Props extends Omit<Combobox.InputProps, "size"> {
    size?: "sm" | "default" | "lg" | number;
  }

  let { class: className, size = "default", onclick: userOnclick, oninput: userOninput, onkeydown: userOnkeydown, ...restProps }: Props = $props();

  const ctx = getComboboxCtx();
  const numericSize = $derived(typeof size === "number" ? size : undefined);

  function handleClick(e: MouseEvent & { currentTarget: EventTarget & HTMLInputElement }) {
    ctx?.setOpen(true);
    (userOnclick as ((e: MouseEvent) => void) | null | undefined)?.(e);
  }

  function handleInput(e: Event & { currentTarget: EventTarget & HTMLInputElement }) {
    ctx?.setFilterText(e.currentTarget.value);
    (userOninput as ((e: Event) => void) | null | undefined)?.(e);
  }

  function handleKeydown(e: KeyboardEvent & { currentTarget: EventTarget & HTMLInputElement }) {
    if (e.key === "Backspace" && e.currentTarget.value === "") {
      ctx?.removeLastValue();
    }
    (userOnkeydown as ((e: KeyboardEvent) => void) | null | undefined)?.(e);
  }
</script>

<Combobox.Input
  onclick={handleClick}
  oninput={handleInput}
  onkeydown={handleKeydown}
  class={cn(
    "min-w-12 flex-1 text-base outline-none sm:text-sm [[data-slot=combobox-chip]+&]:ps-0.5",
    size === "sm" ? "ps-1.5" : "ps-2",
    className,
  )}
  data-size={typeof size === "string" ? size : undefined}
  data-slot="combobox-chips-input"
  {...(numericSize !== undefined ? ({ size: numericSize } as object) : {})}
  {...restProps}
/>
