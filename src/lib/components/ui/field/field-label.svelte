<script lang="ts">
  import type { LabelRootProps } from "bits-ui";
  import type { HTMLAttributes } from "svelte/elements";
  import { Label } from "$lib/formsnap";
  import { cn } from "$lib/utils";

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
