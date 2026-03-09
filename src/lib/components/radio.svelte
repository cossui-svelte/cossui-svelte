<script lang="ts">
  import { RadioGroup } from "bits-ui";
  import { cn } from "../utils.js";

  type Props = RadioGroup.ItemProps;

  let { class: className, ...restProps }: Props = $props();
</script>

<RadioGroup.Item
  class={cn(
    "relative inline-flex size-4.5 shrink-0 items-center justify-center rounded-full border border-input bg-background not-dark:bg-clip-padding shadow-xs/5 outline-none transition-shadow before:pointer-events-none before:absolute before:inset-0 before:rounded-full data-[state=unchecked]:not-disabled:not-[aria-invalid]:before:shadow-[0_1px_--theme(--color-black/4%)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background aria-invalid:border-destructive/36 focus-visible:aria-invalid:border-destructive/64 focus-visible:aria-invalid:ring-destructive/48 data-disabled:opacity-64 sm:size-4 dark:data-[state=unchecked]:bg-input/32 [[data-disabled],[data-state=checked],[aria-invalid]]:shadow-none",
    className,
  )}
  data-slot="radio"
  {...restProps}
>
  <RadioGroup.ItemIndicator
    class="-inset-px absolute flex size-4.5 items-center justify-center rounded-full before:size-2 before:rounded-full before:bg-primary-foreground data-[state=unchecked]:hidden data-[state=checked]:bg-primary sm:size-4 sm:before:size-1.5"
    data-slot="radio-indicator"
  />
</RadioGroup.Item>
