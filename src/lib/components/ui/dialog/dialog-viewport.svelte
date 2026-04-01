<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils.js";
  import { ScrollArea } from "$lib/components/ui/scroll-area";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    children?: Snippet;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<div
  class={cn(
    "fixed inset-0 z-50 grid grid-rows-[1fr_auto_3fr] justify-items-center p-4",
    className,
  )}
  data-slot="dialog-viewport"
  {...restProps}
>
  {@render children?.()}
</div>
