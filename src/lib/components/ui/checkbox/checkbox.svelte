<script lang="ts">
  import { cn } from "$lib/utils.js";
  import { Checkbox as CheckboxPrimitive } from "bits-ui";

  let {
    checked = $bindable(false),
    class: className,
    indeterminate = $bindable(false),
    ref = $bindable(null),
    ...restProps
  }: CheckboxPrimitive.RootProps = $props();
</script>

<CheckboxPrimitive.Root
  bind:ref
  bind:checked
  bind:indeterminate
  class={cn(
    "relative inline-flex size-4.5 shrink-0 items-center justify-center rounded-[.25rem] border border-input bg-background not-dark:bg-clip-padding shadow-xs/5 outline-none ring-ring transition-shadow before:pointer-events-none before:absolute before:inset-0 before:rounded-[3px] data-[state=unchecked]:not-disabled:not-[aria-invalid]:before:shadow-[0_1px_--theme(--color-black/4%)] focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-background aria-invalid:border-destructive/36 focus-visible:aria-invalid:border-destructive/64 focus-visible:aria-invalid:ring-destructive/48 data-disabled:opacity-64 sm:size-4 dark:data-[state=unchecked]:bg-input/32 dark:aria-invalid:ring-destructive/24 dark:data-[state=unchecked]:not-disabled:not-[aria-invalid]:before:shadow-[0_-1px_--theme(--color-white/6%)] [[data-disabled],[data-state=checked],[aria-invalid]]:shadow-none",
    className,
  )}
  data-slot="checkbox"
  {...restProps}
>
  {#snippet children({ checked, indeterminate })}
    <div
      class="-inset-px absolute flex items-center justify-center rounded-[.25rem] text-primary-foreground data-[state=unchecked]:hidden data-[state=checked]:bg-primary data-[state=indeterminate]:text-foreground"
      data-slot="checkbox-indicator"
    >
      <span {...restProps}>
        {#if indeterminate}
          <svg
            class="size-3.5 sm:size-3"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5.252 12h13.496" />
          </svg>
          ) : (
          <svg
            class="size-3.5 sm:size-3"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5.252 12.7 10.2 18.63 18.748 5.37" />
          </svg>
        {/if}
      </span>
    </div>
  {/snippet}
</CheckboxPrimitive.Root>
