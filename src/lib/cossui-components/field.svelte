<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../utils.js";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    name?: string;
    children?: Snippet;
  }

  let { class: className, name, children, ...restProps }: Props = $props();
</script>

<div
  class={cn("flex flex-col items-start gap-2", className)}
  data-slot="field"
  {...restProps}
>
  {@render children?.()}
</div>
