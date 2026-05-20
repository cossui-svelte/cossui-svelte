<script lang="ts">
  import type { Snippet } from "svelte";
  import { Collapsible } from "bits-ui";

  type Props = Collapsible.RootProps & { children?: Snippet };

  let {
    ref = $bindable(null),
    open = $bindable(false),
    children,
    ...restProps
  }: Props = $props();
</script>

<Collapsible.Root bind:ref bind:open data-slot="collapsible" {...restProps}>
  {@render children?.()}
</Collapsible.Root>
