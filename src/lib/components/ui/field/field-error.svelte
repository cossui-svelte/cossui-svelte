<script lang="ts">
  import * as Field from "$lib/components/base/field";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn, type WithElementRef } from "$lib/utils.js";

  interface Props extends HTMLAttributes<HTMLParagraphElement> {
    children?: Snippet;
  }

  let {
    class: className,
    children,
    ...restProps
  }: Props & WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<Field.Error
  class={cn("text-destructive-foreground text-xs", className)}
  data-slot="field-error"
  role="alert"
  {...restProps}
>
  {@render children?.()}
</Field.Error>
