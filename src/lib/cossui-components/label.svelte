<script lang="ts">
  import { cn } from "../utils.js";
  import { Label as LabelPrimitive } from "bits-ui";

  let {
    class: className,
    ref = $bindable(null),
    children,
    ...restProps
  }: LabelPrimitive.RootProps = $props();
</script>

<LabelPrimitive.Root
  bind:ref
  data-slot="label"
  class={cn(
    "inline-flex items-center gap-2 text-base/4.5 sm:text-sm/4 font-medium text-foreground",
    className,
  )}
  {...restProps}
/>
