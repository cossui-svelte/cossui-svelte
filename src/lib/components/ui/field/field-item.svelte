<script lang="ts">
  import * as Field from "$lib/components/base/field";
  import { cn } from "$lib/utils.js";
  import type { HTMLAttributes } from "svelte/elements";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: Field.LabelProps & HTMLAttributes<HTMLDivElement> = $props();
</script>

<Field.Item
  bind:this={ref}
  class={cn("flex", className)}
  data-slot="field-item"
  {...restProps}
>
  {@render children?.()}
</Field.Item>
