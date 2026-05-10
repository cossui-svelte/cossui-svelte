<script lang="ts">
  import { Drawer as DrawerPrimitive } from "vaul-svelte";

  type DrawerPosition = "right" | "left" | "top" | "bottom";

  //TODO: omit the direction parameter
  let {
    shouldScaleBackground = true,
    open = $bindable(false),
    position = "bottom",
    activeSnapPoint = $bindable(null),
    ...restProps
  }: DrawerPrimitive.RootProps & {
    position?: DrawerPosition;
  } = $props();
  // }: Omit<DrawerPrimitive.RootProps, "direction"> & DProps = $props();
</script>

<DrawerPrimitive.Root
  {shouldScaleBackground}
  bind:open
  bind:activeSnapPoint
  direction={position}
  {...restProps}
/>
