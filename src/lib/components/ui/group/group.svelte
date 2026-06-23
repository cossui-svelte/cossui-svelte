<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";
  import { type GroupVariants, groupVariants } from "./groupVariants";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    children?: Snippet;
    orientation?: GroupVariants;
  }

  let {
    class: className,
    orientation,
    children,
    ...restProps
  }: Props = $props();
</script>

<div
  class={cn(groupVariants({ orientation }), className)}
  data-orientation={orientation}
  data-slot="group"
  role="group"
  {...restProps}
>
  {@render children?.()}
</div>
