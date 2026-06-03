<script lang="ts">
  import { Label as LabelPrimitive } from "bits-ui";
  import { cn } from "$lib/utils";

  let {
    ref = $bindable(null),
    class: className,
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
