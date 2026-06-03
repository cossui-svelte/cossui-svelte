<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn, type WithElementRef } from "$lib/utils";

  type InputOTPSize = "default" | "lg";

  let {
    ref = $bindable(null),
    class: className,
    size = "default",
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    size?: InputOTPSize;
  } = $props();
</script>

<div
  bind:this={ref}
  data-slot="input-otp-group"
  data-size={size}
  class={cn("flex items-center gap-2", className)}
  {...restProps}
>
  {@render children?.()}
</div>
