<script lang="ts">
  import { Legend } from "formsnap";
  import { cn } from "$lib/utils.js";
  import type { ComponentProps } from "svelte";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: ComponentProps<typeof Legend> = $props();
</script>

<Legend
  bind:ref
  data-slot="fieldset-legend"
  class={cn("font-semibold text-foreground", className)}
  {...restProps}
>
  {@render children?.()}
</Legend>
