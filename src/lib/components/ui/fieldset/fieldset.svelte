<script lang="ts">
  import { cn, type WithElementRef } from "$lib/utils.js";
  import type { HTMLAttributes } from "svelte/elements";
  import { Fieldset } from "formsnap";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  } = $props();
</script>

<Fieldset
  bind:this={ref}
  data-slot="fieldset"
  class={cn("flex w-full max-w-64 flex-col gap-6", className)}
  {...restProps}
>
  {@render children?.()}
</Fieldset>
