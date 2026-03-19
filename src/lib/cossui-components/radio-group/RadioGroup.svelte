<script lang="ts" module>
  import { RadioGroup } from "bits-ui";

  export const RadioGroupItem = RadioGroup.Item;
</script>

<script lang="ts">
  import { cn } from "$lib/utils.js";

  let {
    children,
    class: className,
    ref = $bindable(null),
    value = $bindable(undefined),
    ...restProps
  }: RadioGroup.RootProps = $props();
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
