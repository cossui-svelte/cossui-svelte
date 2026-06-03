<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";

  interface Props extends HTMLAttributes<HTMLLIElement> {
    children?: Snippet;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<li
  class={cn("group/menu-item relative", className)}
  data-sidebar="menu-item"
  data-slot="sidebar-menu-item"
  {...restProps}
>
  {@render children?.()}
</li>
