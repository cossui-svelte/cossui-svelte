<script lang="ts">
  import { Label } from "$lib/components/ui/label/index.js";
  import { cn } from "$lib/utils.js";
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
  class={cn("flex", className)}
  data-slot="field-item"
  {...restProps}
>
  {@render children?.()}
</Label>
