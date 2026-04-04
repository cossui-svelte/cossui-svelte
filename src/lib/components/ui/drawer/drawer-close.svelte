<script lang="ts">
  import { Dialog as DrawerPrimitive } from "bits-ui";

  let { ...restProps }: DrawerPrimitive.CloseProps = $props();
</script>

<DrawerPrimitive.Close data-slot="drawer-close" {...restProps} />
