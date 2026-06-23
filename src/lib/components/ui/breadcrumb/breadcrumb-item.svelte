<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn, type WithElementRef } from "$lib/utils";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLLIElement>> = $props();
</script>

<li
  bind:this={ref}
  class={cn("inline-flex items-center gap-1.5", className)}
  data-slot="breadcrumb-item"
  {...restProps}
>
  {@render children?.()}
</li>
