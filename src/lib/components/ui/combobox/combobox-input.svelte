<script lang="ts">
  import ChevronsUpDown from "@lucide/svelte/icons/chevrons-up-down";
  import { Combobox } from "bits-ui";
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";
  import { getComboboxCtx } from "./combobox.svelte";
  import ComboboxClear from "./combobox-clear.svelte";
  import ComboboxTrigger from "./combobox-trigger.svelte";

  interface Props extends Omit<Combobox.InputProps, "size"> {
    clearProps?: Omit<HTMLButtonAttributes, "class"> & { class?: string };
    showClear?: boolean;
    showTrigger?: boolean;
    size?: "sm" | "default" | "lg" | number;
    startAddon?: Snippet;
    triggerProps?: Omit<Combobox.TriggerProps, "class"> & { class?: string };
  }

  let {
    class: className,
    showTrigger = undefined as boolean | undefined,
    showClear = undefined as boolean | undefined,
    startAddon,
    size = "default",
    clearProps,
    triggerProps,
    onclick: userOnclick,
    oninput: userOninput,
    ...restProps
  }: Props = $props();

  const ctx = getComboboxCtx();
  const effectiveShowTrigger = $derived(showTrigger ?? ctx?.showTrigger ?? true);
  const effectiveShowClear = $derived(showClear ?? ctx?.showClear ?? false);
  const effectiveStartAddon = $derived(startAddon ?? ctx?.startAddon);

  let inputRef = $state<HTMLInputElement | null>(null);
  $effect(() => {
    ctx?.setInputEl(inputRef);
    return () => ctx?.setInputEl(null);
  });

  function handleClick(e: MouseEvent & { currentTarget: EventTarget & HTMLInputElement }) {
    ctx?.setOpen(true);
    (userOnclick as ((e: MouseEvent) => void) | null | undefined)?.(e);
  }

  function handleInput(e: Event & { currentTarget: EventTarget & HTMLInputElement }) {
    ctx?.setFilterText(e.currentTarget.value);
    (userOninput as ((e: Event) => void) | null | undefined)?.(e);
  }

  const clearPropsClass = $derived(clearProps?.class);
  const clearPropsRest = $derived.by(() => {
    if (!clearProps) return {};
    const { class: _, ...rest } = clearProps;
    return rest as Omit<NonNullable<typeof clearProps>, "class">;
  });

  const triggerPropsClass = $derived(triggerProps?.class);
  const triggerPropsRest = $derived.by(() => {
    if (!triggerProps) return {};
    const { class: _, ...rest } = triggerProps;
    return rest as Omit<NonNullable<typeof triggerProps>, "class">;
  });
</script>

<div
  class="relative not-has-[>*.w-full]:w-fit w-full text-foreground has-disabled:opacity-64"
>
  {#if effectiveStartAddon}
    <div
      aria-hidden="true"
      class="[&_svg]:-mx-0.5 pointer-events-none absolute inset-y-0 start-px z-10 flex items-center ps-[calc(--spacing(3)-1px)] opacity-80 has-[+[data-size=sm]]:ps-[calc(--spacing(2.5)-1px)] [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4"
      data-slot="combobox-start-addon"
    >
      {@render effectiveStartAddon()}
    </div>
  {/if}
  <span
    class="relative inline-flex w-full rounded-lg border border-input bg-background not-dark:bg-clip-padding text-base text-foreground shadow-xs/5 ring-ring/24 transition-shadow before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] not-has-disabled:not-has-focus-visible:not-has-aria-invalid:before:shadow-[0_1px_--theme(--color-black/4%)] has-focus-visible:has-aria-invalid:border-destructive/64 has-focus-visible:has-aria-invalid:ring-destructive/16 has-aria-invalid:border-destructive/36 has-focus-visible:border-ring has-autofill:bg-foreground/4 has-disabled:opacity-64 has-[:disabled,:focus-visible,[aria-invalid]]:shadow-none has-focus-visible:ring-[3px] sm:text-sm dark:bg-input/32 dark:has-autofill:bg-foreground/8 dark:has-aria-invalid:ring-destructive/24 dark:not-has-disabled:not-has-focus-visible:not-has-aria-invalid:before:shadow-[0_-1px_--theme(--color-white/6%)]"
    data-size={size}
    data-slot="combobox-input"
  >
    <Combobox.Input
      bind:ref={inputRef}
      onclick={handleClick}
      oninput={handleInput}
      class={cn(
        "h-8.5 w-full min-w-0 rounded-[inherit] px-[calc(--spacing(3)-1px)] leading-8.5 outline-none placeholder:text-muted-foreground/72 sm:h-7.5 sm:leading-7.5 [transition:background-color_5000000s_ease-in-out_0s]",
        effectiveStartAddon &&
          size !== "sm" &&
          "ps-[calc(--spacing(8.5)-1px)] sm:ps-[calc(--spacing(8)-1px)]",
        effectiveStartAddon &&
          size === "sm" &&
          "ps-[calc(--spacing(7.5)-1px)] sm:ps-[calc(--spacing(7)-1px)]",
        (effectiveShowTrigger || effectiveShowClear) && (size === "sm" ? "pe-6.5" : "pe-7"),
        size === "sm" &&
          "h-7.5 px-[calc(--spacing(2.5)-1px)] leading-7.5 sm:h-6.5 sm:leading-6.5",
        size === "lg" && "h-9.5 leading-9.5 sm:h-8.5 sm:leading-8.5",
        className,
      )}
      {...restProps}
    />
  </span>
  {#if effectiveShowTrigger}
    <ComboboxTrigger
      class={cn(
        "-translate-y-1/2 absolute top-1/2 inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md border border-transparent opacity-80 outline-none transition-colors pointer-coarse:after:absolute pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11 hover:opacity-100 has-[+[data-slot=combobox-clear]]:hidden sm:size-7 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        size === "sm" ? "end-0" : "end-0.5",
        triggerPropsClass,
      )}
      {...triggerPropsRest}
    >
      <ChevronsUpDown />
    </ComboboxTrigger>
  {/if}
  {#if effectiveShowClear}
    <ComboboxClear
      class={cn(
        "-translate-y-1/2 absolute top-1/2 inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md border border-transparent opacity-80 outline-none transition-colors pointer-coarse:after:absolute pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11 hover:opacity-100 sm:size-7 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        size === "sm" ? "end-0" : "end-0.5",
        clearPropsClass,
      )}
      {...clearPropsRest}
    />
  {/if}
</div>
