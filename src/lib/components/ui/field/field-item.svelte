<script lang="ts">
  import * as Field from "$lib/components/base/field";
  import { cn, type WithElementRef } from "$lib/utils.js";
  import type { HTMLAttributes } from "svelte/elements";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: Field.LabelProps &
    WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<Field.Label
  bind:this={ref}
  class={cn("flex", className)}
  data-slot="field-item"
  {...restProps}
>
  {@render children?.()}
</Field.Label>
