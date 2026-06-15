<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";
  import Kbd from "$lib/components/ui/kbd/kbd.svelte";

  interface Props extends HTMLAttributes<HTMLElement> {
    children?: Snippet;
    class?: string;
  }

  let { children, class: className, ...restProps }: Props = $props();
</script>

<Kbd
  class={cn("ms-auto text-muted-foreground/72 tracking-widest", className)}
  data-slot="context-menu-shortcut"
  {...restProps}
>
  {@render children?.()}
</Kbd>
