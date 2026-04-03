<script lang="ts">
  import * as Field from "$lib/components/base/field";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: HTMLAttributes<HTMLParagraphElement> & Field.DescriptionProps = $props();
</script>

<Field.Description
  bind:this={ref}
  class={cn("text-muted-foreground text-xs", className)}
  data-slot="field-description"
  {...restProps}
>
  {@render children?.()}
</Field.Description>
