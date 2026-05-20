<script lang="ts">
  import { Avatar as AvatarPrimitive } from "bits-ui";
  import { cn } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    loadingStatus = $bindable("loading"),
    size = "default",
    class: className,
    ...restProps
  }: AvatarPrimitive.RootProps & {
    size?: "default" | "sm" | "lg";
  } = $props();
</script>

<AvatarPrimitive.Root
  bind:ref
  bind:loadingStatus
  data-slot="avatar"
  data-size={size}
  class={cn(
    "relative flex size-8 shrink-0 overflow-hidden rounded-full",
    className,
  )}
  {...restProps}
/>
