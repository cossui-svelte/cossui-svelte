<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../../utils.js";

  interface Props extends HTMLAttributes<HTMLTableCellElement> {
    children?: Snippet;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<td
  class={cn(
    "whitespace-nowrap p-2.5 align-middle leading-none has-[[role=checkbox]]:pe-0",
    className,
  )}
  data-slot="table-cell"
  {...restProps}
>
  {@render children?.()}
</td>
