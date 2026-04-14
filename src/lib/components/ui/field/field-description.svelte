<script lang="ts">
  import { Description, type DescriptionProps } from "formsnap";
  import { cn, type WithElementRef } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<DescriptionProps> = $props();
</script>

<Description
  bind:ref
  data-slot="field-description"
  class={cn("text-muted-foreground text-xs", className)}
  {...restProps}
>
  {@render children?.()}
</Description>
