<script lang="ts">
  import * as Field from "$lib/components/base/field";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: Field.RootProps & HTMLAttributes<HTMLDivElement> = $props();
</script>

<Field.Root
  bind:ref
  data-slot="field"
  class={cn("flex flex-col items-start gap-2", className)}
  {...restProps}
>
  {@render children?.()}
</Field.Root>
