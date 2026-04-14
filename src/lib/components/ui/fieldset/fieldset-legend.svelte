<script lang="ts">
  import { Label } from "$lib/components/ui/label";
  import { cn, type WithElementRef } from "$lib/utils.js";
  import type { ComponentProps } from "svelte";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: ComponentProps<typeof Label> = $props();
</script>

<Label
  bind:ref
  data-slot="fieldset-legend"
  class={cn("font-semibold text-foreground", className)}
  {...restProps}
>
  {@render children?.()}
</Label>
