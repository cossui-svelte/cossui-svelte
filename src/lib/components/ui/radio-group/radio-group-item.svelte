<script lang="ts">
  import { cn } from "$lib/utils";
  import { RadioGroup as RadioGroupPrimitive } from "bits-ui";

  let {
    class: className,
    ref = $bindable(null),
    value = $bindable(""),
    ...restProps
  }: RadioGroupPrimitive.ItemProps = $props();
</script>

<RadioGroupPrimitive.Item
  {value}
  bind:ref
  class={cn(
    "border-border-input bg-background hover:border-dark-40 data-[state=checked]:border-foreground data-[state=checked]:border-6 size-5 shrink-0 cursor-default rounded-full border transition-all duration-100 ease-in-out",
    className,
  )}
  data-slot="radio"
  {...restProps}
></RadioGroupPrimitive.Item>
