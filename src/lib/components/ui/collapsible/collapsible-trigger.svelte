<script lang="ts">
  import type { Snippet } from "svelte";
  import { Collapsible } from "bits-ui";
  import { cn } from "$lib/utils";

  type Props = Collapsible.TriggerProps & { children?: Snippet };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<Collapsible.Trigger
  class={cn("cursor-pointer [&_svg]:transition-transform [&_svg]:duration-200", className)}
  data-slot="collapsible-trigger"
  {...restProps}
>
  {@render children?.()}
</Collapsible.Trigger>
