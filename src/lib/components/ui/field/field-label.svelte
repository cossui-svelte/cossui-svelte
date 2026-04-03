<script lang="ts">
  import * as Field from "$lib/components/base/field";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: Field.LabelProps & HTMLAttributes<HTMLDivElement> = $props();
</script>

<Field.Label
  bind:ref
  data-slot="field-label"
  class={cn(
    "inline-flex items-center gap-2 font-medium text-base/4.5 text-foreground sm:text-sm/4",
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</Field.Label>
