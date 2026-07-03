<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";

  export type TableVariant = "default" | "card";

  interface Props extends HTMLAttributes<HTMLTableElement> {
    children?: Snippet;
    variant?: TableVariant;
  }

  let {
    class: className,
    variant = "default",
    children,
    ...restProps
  }: Props = $props();
</script>

<div
  class="relative w-full overflow-x-auto"
  data-slot="table-container"
  data-variant={variant}
>
  <table
    class={cn(
      "w-full caption-bottom in-data-[variant=card]:border-separate in-data-[variant=card]:border-spacing-0 text-sm",
      className,
    )}
    data-slot="table"
    {...restProps}
  >
    {@render children?.()}
  </table>
</div>
