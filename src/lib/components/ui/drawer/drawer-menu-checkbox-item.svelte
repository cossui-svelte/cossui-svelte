<script lang="ts">
  import type { Snippet } from "svelte";
  import { Checkbox as CheckboxPrimitive } from "bits-ui";
  import { cn } from "$lib/utils.js";

  interface Props extends Omit<CheckboxPrimitive.RootProps, "children"> {
    variant?: "default" | "switch";
    label?: Snippet;
  }

  let { class: className, variant = "default", label, ...restProps }: Props = $props();
</script>

<CheckboxPrimitive.Root
  class={cn(
    "grid min-h-9 w-full cursor-default select-none items-center gap-2 rounded-sm px-2 py-1 text-base text-foreground outline-none hover:bg-accent hover:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-64 sm:min-h-8 sm:text-sm [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:-mx-0.5 [&_svg]:shrink-0",
    variant === "switch" ? "grid-cols-[1fr_auto] gap-4 pe-1.5" : "grid-cols-[1rem_1fr] pe-4",
    className,
  )}
  data-slot="drawer-menu-checkbox-item"
  {...restProps}
>
  {#snippet children({ checked })}
    {#if variant === "switch"}
      <span class="col-start-1">{@render label?.()}</span>
      <span
        class={cn(
          "inset-shadow-[0_1px_--theme(--color-black/4%)] col-start-2 inline-flex h-[calc(var(--thumb-size)+2px)] w-[calc(var(--thumb-size)*2-2px)] shrink-0 items-center rounded-full p-px outline-none transition-[background-color,box-shadow] duration-200 [--thumb-size:--spacing(4)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background sm:[--thumb-size:--spacing(3)]",
          checked === true ? "bg-primary" : "bg-input",
        )}
      >
        <span
          class={cn(
            "pointer-events-none block aspect-square h-full rounded-(--thumb-size) bg-background shadow-sm/5 will-change-transform [transition:translate_.15s,border-radius_.15s,scale_.1s_.1s,transform-origin_.15s]",
            checked === true && "translate-x-[calc(var(--thumb-size)-4px)] origin-[var(--thumb-size)_50%]",
          )}
        />
      </span>
    {:else}
      <span class="col-start-1 flex items-center justify-center">
        {#if checked === true}
          <svg
            fill="none"
            height="24"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5.252 12.7 10.2 18.63 18.748 5.37" />
          </svg>
        {/if}
      </span>
      <span class="col-start-2">{@render label?.()}</span>
    {/if}
  {/snippet}
</CheckboxPrimitive.Root>
