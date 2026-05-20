<script lang="ts">
  import { Dialog as DrawerPrimitive } from "bits-ui";
  import { cn } from "$lib/utils.js";

  let { class: className, ...restProps }: DrawerPrimitive.TitleProps = $props();
</script>

<DrawerPrimitive.Title
  class={cn("font-heading font-semibold text-xl leading-none", className)}
  data-slot="drawer-title"
  {...restProps}
/>
