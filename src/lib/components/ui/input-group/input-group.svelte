<script lang="ts">
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import { cn } from '$lib/utils.js';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: Snippet;
}

let { class: className, children, ...restProps }: Props = $props();
</script>

<div
  class={cn(
    "relative inline-flex w-full min-w-0 items-center rounded-lg border border-input bg-background not-dark:bg-clip-padding text-base text-foreground shadow-xs/5 ring-ring/24 transition-shadow before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] not-has-[input:disabled,textarea:disabled]:not-has-[input:focus-visible,textarea:focus-visible]:not-has-[input[aria-invalid],textarea[aria-invalid]]:before:shadow-[0_1px_--theme(--color-black/4%)] has-[input:focus-visible,textarea:focus-visible]:has-[input[aria-invalid],textarea[aria-invalid]]:border-destructive/64 has-[input:focus-visible,textarea:focus-visible]:has-[input[aria-invalid],textarea[aria-invalid]]:ring-destructive/16 has-[textarea]:h-auto has-data-[align=block-end]:h-auto has-data-[align=block-start]:h-auto has-data-[align=block-end]:flex-col has-data-[align=block-start]:flex-col has-[input:focus-visible,textarea:focus-visible]:border-ring has-[input[aria-invalid],textarea[aria-invalid]]:border-destructive/36 has-autofill:bg-foreground/4 has-[input:disabled,textarea:disabled]:opacity-64 has-[input:disabled,textarea:disabled,input:focus-visible,textarea:focus-visible,input[aria-invalid],textarea[aria-invalid]]:shadow-none has-[input:focus-visible,textarea:focus-visible]:ring-[3px] sm:text-sm dark:bg-input/32 dark:has-autofill:bg-foreground/8 dark:has-[input[aria-invalid],textarea[aria-invalid]]:ring-destructive/24 dark:not-has-[input:disabled,textarea:disabled]:not-has-[input:focus-visible,textarea:focus-visible]:not-has-[input[aria-invalid],textarea[aria-invalid]]:before:shadow-[0_-1px_--theme(--color-white/6%)] has-data-[align=inline-start]:**:[[data-size=sm]_input]:ps-1.5 has-data-[align=inline-end]:**:[[data-size=sm]_input]:pe-1.5 *:[[data-slot=input-control],[data-slot=textarea-control]]:contents *:[[data-slot=input-control],[data-slot=textarea-control]]:before:hidden",
    className,
  )}
  data-slot="input-group"
  role="group"
  {...restProps}
>
  {@render children?.()}
</div>
