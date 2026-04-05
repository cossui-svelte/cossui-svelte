<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils.js";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "bare";
    children?: Snippet;
  }

  let {
    class: className,
    variant = "default",
    children,
    ...restProps
  }: Props = $props();
</script>

<div
  class={cn(
    "flex flex-col-reverse gap-2 px-6 sm:flex-row sm:justify-end sm:rounded-b-[calc(var(--radius-2xl)-1px)]",
    variant === "default" && "border-t bg-muted/72 py-4",
    variant === "bare" && "pb-6",
    className,
  )}
  data-slot="alert-dialog-footer"
  {...restProps}
>
  {@render children?.()}
</div>
