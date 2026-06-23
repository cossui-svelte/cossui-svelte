<script lang="ts">
  import { Collapsible } from "bits-ui";
  import type { Snippet } from "svelte";

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
