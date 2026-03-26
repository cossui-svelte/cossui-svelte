<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn, type WithElementRef } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLFormElement>> = $props();
</script>

<form
  class={cn("flex w-full flex-col gap-4", className)}
  data-slot="form"
  {...restProps}
>
  {@render children?.()}
</form>
