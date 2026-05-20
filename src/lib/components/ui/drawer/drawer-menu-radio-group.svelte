<script lang="ts">
  import type { Snippet } from "svelte";
  import { RadioGroup } from "bits-ui";
  import { cn } from "$lib/utils.js";

  interface Props extends RadioGroup.RootProps {
    children?: Snippet;
  }

  let { class: className, children, ...restProps }: Props = $props();
</script>

<RadioGroup.Root
  class={cn("flex flex-col", className)}
  data-slot="drawer-menu-radio-group"
  {...restProps}
>
  {@render children?.()}
</RadioGroup.Root>
