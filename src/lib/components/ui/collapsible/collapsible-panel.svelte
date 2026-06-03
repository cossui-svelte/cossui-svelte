<script lang="ts">
  import type { Snippet } from "svelte";
  import { Collapsible } from "bits-ui";
  import { cn } from "$lib/utils";

  type Props = Collapsible.ContentProps & { children?: Snippet };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<Collapsible.Content
  class={cn(
    "overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down",
    className,
  )}
  data-slot="collapsible-panel"
  {...restProps}
>
  {@render children?.()}
</Collapsible.Content>
