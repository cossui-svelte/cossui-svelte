<script lang="ts">
  import * as Field from "$lib/components/base/field";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn, type WithElementRef } from "$lib/utils.js";

  let {
    class: className,
    children,
    ...restProps
  }: {
    children?: Snippet;
  } & WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<Field.Error
  class={cn("text-destructive-foreground text-xs", className)}
  data-slot="field-error"
  role="alert"
  {...restProps}
>
  {@render children?.()}
</Field.Error>
