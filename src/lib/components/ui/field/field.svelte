<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn, type WithElementRef } from "$lib/utils.js";

  // interface Props extends HTMLAttributes<HTMLDivElement> {
  //   name?: string;
  //   children?: Snippet;
  // }

  // let { class: className, name, children, ...restProps }: Props = $props();

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
  class={cn("flex flex-col items-start gap-2", className)}
  data-slot="field"
  {...restProps}
>
  {@render children?.()}
</div>
