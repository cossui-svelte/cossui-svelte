<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../utils.js";

  interface Props extends HTMLAttributes<HTMLElement> {
    children?: Snippet;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<main
  class={cn(
    "relative flex w-full flex-1 flex-col bg-background",
    "md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ms-2 md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ms-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm/5",
    className,
  )}
  data-slot="sidebar-inset"
  {...restProps}
>
  {@render children?.()}
</main>
