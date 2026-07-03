<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLTdAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";

  interface Props extends HTMLTdAttributes {
    children?: Snippet;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<td
  class={cn(
    "whitespace-nowrap bg-clip-padding p-2.5 in-data-[slot=table-footer]:py-3.5 align-middle leading-none in-data-[variant=card]:first:ps-[calc(--spacing(2.5)-1px)] in-data-[variant=card]:last:pe-[calc(--spacing(2.5)-1px)] has-[[role=checkbox]]:w-px last:has-[[role=checkbox]]:ps-0 first:has-[[role=checkbox]]:pe-0",
    className,
  )}
  data-slot="table-cell"
  {...restProps}
>
  {@render children?.()}
</td>
