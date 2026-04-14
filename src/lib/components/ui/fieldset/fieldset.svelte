<script lang="ts">
  import { Fieldset } from "formsnap";
  import { cn } from "$lib/utils.js";
  import type { ComponentProps, Snippet } from "svelte";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: ComponentProps<typeof Fieldset> & {
    children: Snippet;
  } = $props();
</script>

<Fieldset
  bind:ref
  data-slot="fieldset"
  class={cn("flex w-full max-w-64 flex-col gap-6", className)}
  {...restProps}
>
  {@render children?.()}
</Fieldset>
