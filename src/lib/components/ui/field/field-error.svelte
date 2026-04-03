<script lang="ts">
  import * as Field from "$lib/components/base/field";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: Field.ErrorProps & HTMLAttributes<HTMLDivElement> = $props();
</script>

<Field.Error
  bind:this={ref}
  class={cn("text-destructive-foreground text-xs", className)}
  data-slot="field-error"
  role="alert"
  {...restProps}
>
  {@render children?.()}
</Field.Error>
