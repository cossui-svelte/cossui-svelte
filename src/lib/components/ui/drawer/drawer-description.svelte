<script lang="ts">
  import { Dialog as DrawerPrimitive } from "bits-ui";
  import { cn } from "$lib/utils.js";

  let { class: className, ...restProps }: DrawerPrimitive.DescriptionProps = $props();
</script>

<DrawerPrimitive.Description
  class={cn("text-muted-foreground text-sm", className)}
  data-slot="drawer-description"
  {...restProps}
/>
