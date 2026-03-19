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

<label
  bind:ref
  data-slot="field-label"
  class={cn(
    "inline-flex items-center gap-2 font-medium text-base/4.5 text-foreground sm:text-sm/4",
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</label>
