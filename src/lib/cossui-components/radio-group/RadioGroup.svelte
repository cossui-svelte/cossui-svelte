<script lang="ts">
  import type { Snippet } from "svelte";
  import { RadioGroup } from "bits-ui";
  import { cn } from "$lib/utils.js";

  type Props = RadioGroup.RootProps & { children?: Snippet };
  let {
    class: className,
    children,
    ref = $bindable(null),
    value = $bindable(undefined),
    ...restProps
  }: Props = $props();
</script>

<RadioGroup.Root
  bind:ref
  bind:value
  class={cn("flex flex-col gap-3", className)}
  data-slot="radio-group"
  {...restProps}
>
  {@render children?.()}
</RadioGroup.Root>
