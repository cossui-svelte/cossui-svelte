<script lang="ts">
  import { Dialog as DrawerPrimitive } from "bits-ui";
  import { setContext } from "svelte";

  type DrawerPosition = "right" | "left" | "top" | "bottom";

  interface Props extends DrawerPrimitive.RootProps {
    position?: DrawerPosition;
  }

  let { position = "bottom", ...restProps }: Props = $props();

  setContext("drawer-position", { position: () => position });
</script>

<DrawerPrimitive.Root {...restProps} />
