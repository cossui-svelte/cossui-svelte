<script lang="ts">
  import { Separator } from "bits-ui";
  import { cn } from "$lib/utils";

  type Props = Separator.RootProps;

  let { class: className, ...restProps }: Props = $props();
</script>

<Separator.Root
  class={cn(
    "shrink-0 bg-border data-[orientation=horizontal]:my-0.5 data-[orientation=vertical]:my-1.5 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:not-[[class^='h-']]:not-[[class*='_h-']]:self-stretch",
    className,
  )}
  data-slot="toolbar-separator"
  {...restProps}
/>
