<script lang="ts">
  import Ellipsis from "@lucide/svelte/icons/ellipsis";
  import type { HTMLAttributes } from "svelte/elements";
  import { type WithElementRef } from "$lib/utils";

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLSpanElement>> = $props();
</script>

<span
  bind:this={ref}
  aria-hidden="true"
  class={className}
  data-slot="breadcrumb-ellipsis"
  role="presentation"
  {...restProps}
>
  <Ellipsis class="size-4" />
  <span class="sr-only">More</span>
</span>
