<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils.js";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    children?: Snippet;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<div
  class={cn(
    "flex flex-col gap-2 p-6 text-center max-sm:pb-4 sm:text-left",
    className,
  )}
  data-slot="alert-dialog-header"
  {...restProps}
>
  {@render children?.()}
</div>
