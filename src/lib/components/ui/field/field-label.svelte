<script lang="ts">
  import { Label } from "$lib/components/ui/label";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils.js";
  import type { LabelRootProps } from "bits-ui";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: LabelRootProps & HTMLAttributes<HTMLDivElement> = $props();
</script>

<Label
  bind:ref
  data-slot="field-label"
  class={cn(
    "inline-flex items-center gap-2 font-medium text-base/4.5 text-foreground sm:text-sm/4",
    // "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col",
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</Label>
