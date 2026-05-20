<script lang="ts">
  import { Dialog as DrawerPrimitive } from "bits-ui";

  let { ...restProps }: DrawerPrimitive.TriggerProps = $props();
</script>

<DrawerPrimitive.Trigger data-slot="drawer-trigger" {...restProps} />
