<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../utils.js";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    children?: Snippet;
    value?: string[];
    onValueChange?: (value: string[]) => void;
  }

  let { class: className, children, value = $bindable([]), onValueChange, ...restProps }: Props =
    $props();
</script>

<div
  class={cn("flex flex-col items-start gap-3", className)}
  data-slot="checkbox-group"
  {...restProps}
>
  {@render children?.()}
</div>
