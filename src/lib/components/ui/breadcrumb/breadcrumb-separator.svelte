<script lang="ts">
  import { cn, type WithElementRef } from "$lib/utils.js";
  import { ChevronRight } from "@lucide/svelte";
  import type { HTMLAttributes } from "svelte/elements";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLLIElement>> = $props();
</script>

<li
  bind:this={ref}
  aria-hidden="true"
  class={cn("opacity-80 [&>svg]:size-4", className)}
  data-slot="breadcrumb-separator"
  role="presentation"
  {...restProps}
>
  {#if children}
    {@render children()}
  {:else}
    <ChevronRight />
  {/if}
</li>
