<script lang="ts">
  import type { Snippet } from "svelte";
  import { Collapsible } from "bits-ui";
  import { cn } from "$lib/utils.js";

  type Props = Collapsible.ContentProps & { children?: Snippet };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<Collapsible.Content
  class={cn(
    "h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 data-ending-style:h-0 data-starting-style:h-0",
    className,
  )}
  data-slot="collapsible-panel"
  {...restProps}
>
  {@render children?.()}
</Collapsible.Content>
